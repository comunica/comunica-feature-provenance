import {
  // ActorQueryOperation,
  // ActorQueryOperationTypedMediated,
  IActionQueryOperation,
  IActorQueryOperationOutput,
  IActorQueryOperationOutputBindings, IActorQueryOperationOutputQuads,
  // IActorQueryOperationTypedMediatedArgs
} from '@comunica/types';

import {
   ActorQueryOperation,
  ActorQueryOperationTypedMediated,
    IActorQueryOperationTypedMediatedArgs

} from '@comunica/bus-query-operation'
import {ActionContext, ActionObserver, Actor, IActionObserverArgs, IActorTest} from '@comunica/core';
import { Algebra } from 'sparqlalgebrajs';
import {KeysInitSparql} from "../../context-entries";

class QueryOperationObserver extends ActionObserver<IActionQueryOperation, IActorQueryOperationOutput> {

  public observedRecords : {
    actor: string,
    action: IActionQueryOperation,
    output?: Promise<IActorQueryOperationOutput>,
    recordId: number,
    parentRecordId?: number,
    metadata?: () => Promise<Record<string, any>>
  }[] = []

  public flattenedQueryOperation : { operationType?: string, parentType?: any, recordIdx? : number[] }[] = []

  constructor(args: IActionObserverArgs<IActionQueryOperation, IActorQueryOperationOutput>) {
    super(args);
    // Subscribe this observer to the query-operation bus.
    // this.bus.subscribeObserver(this);
  }


  onRun(actor: Actor<IActionQueryOperation, IActorTest, IActorQueryOperationOutput>, action: IActionQueryOperation, output: Promise<IActorQueryOperationOutput>): void {


    // find
    const parentRecordId= this.observedRecords.findIndex(x => {
      const parentOperation = x.action.operation
      const a = parentOperation.input;
      const b = action.operation;


      // TODO: if current opeation is of type pattern
      // --> find parent bgp that has this pattern in its 'patterns' property
      if(action.operation.type === 'pattern' && parentOperation.type === 'bgp') {
        const parentPatterns = parentOperation.patterns;
        // TODO: find currnet pattern in parentPattern
        const found = parentPatterns.includes(action.operation)
        return found;
      }else {
        return a === b;
      }

    })

    const proxy = async ()=>{
      const o = await output;
      const ob =(<IActorQueryOperationOutputBindings>o);
      return ob.metadata ? ob.metadata() : new Promise<Record<string, any>>((resolve, reject)=>{resolve({})});
    }

    //
    this.observedRecords.push({actor: actor.name,
      action,
      // output,
      recordId: this.observedRecords.length,
      parentRecordId,
      metadata:  () => proxy()
    });


  }
}

/**
 * todo
 */
export class ActorQueryOperationCollectProvenance extends ActorQueryOperationTypedMediated<Algebra.Operation> {

  private readonly queryOperationObserver: QueryOperationObserver

  public constructor(args: IActorQueryOperationTypedMediatedArgs) {
    super(args, 'collect-provenance');
    console.log(`initialized ${this.name}`)

    // Initialize query operation observer
    this.queryOperationObserver = new QueryOperationObserver(args)
    // Subscribe query operation observer to the query operation bus
    this.bus.subscribeObserver(this.queryOperationObserver)
  }

  public async testOperation(pattern: Algebra.Operation, context: ActionContext): Promise<IActorTest> {
    return true; // TODO implement
  }

  public async runOperation(pattern: Algebra.Operation, context: ActionContext):
  Promise<IActorQueryOperationOutputBindings> {

    // Call wrapped query operation (pattern.input)
    const output: IActorQueryOperationOutputBindings = ActorQueryOperation.getSafeBindings(
        await this.mediatorQueryOperation.mediate({ operation: pattern.input, context }),
    );

    // Create promise to the merged metadata
    const metadata = output.metadata?
        output.metadata:
        ()=>{return new Promise<Record<string,any>>(()=>{return {}})};

    const mergedMetadata = () => new Promise<Record<string,any>>( async(resolve,reject)=>{
      try {
        resolve({...await metadata(),
          observationRecords: this.queryOperationObserver.observedRecords,
        })
      } catch (err) {
        reject(err)
      }
    })

    return {
      type: 'bindings',
      bindingsStream: output.bindingsStream,
      metadata: mergedMetadata,
      variables: output.variables,
      canContainUndefs: output.canContainUndefs,
    };
  }
}
