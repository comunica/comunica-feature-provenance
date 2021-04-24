import {
  ActorOptimizeQueryOperation,
  IActionOptimizeQueryOperation,
  IActorOptimizeQueryOperationOutput
} from '@comunica/bus-optimize-query-operation';
import { IActorArgs, IActorTest } from '@comunica/core';
import {Algebra} from "sparqlalgebrajs";

/**
 * Creates a collect-provenance wrapper operation
 * @param input
 */
function createCollectProvenanceOperation(input: Algebra.Operation): Algebra.Operation {
  return {
    type:'collect-provenance',
    input
  }
}

/**
 * A comunica Provenance Wrapper Optimize Query Operation Actor.
 */
export class ActorOptimizeQueryOperationProvenanceWrapper extends ActorOptimizeQueryOperation {
  public constructor(args: IActorArgs<IActionOptimizeQueryOperation, IActorTest, IActorOptimizeQueryOperationOutput>) {
    super(args);
  }

  public async test(action: IActionOptimizeQueryOperation): Promise<IActorTest> {
    return true;
  }

  public async run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput> {
    let operation = createCollectProvenanceOperation(action.operation);
    return {operation};
  }
}
