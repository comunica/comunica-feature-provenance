import { Bindings, IActorQueryOperationOutputBindings } from '@comunica/bus-query-operation';
import { Bus } from '@comunica/core';
import { literal } from '@rdfjs/data-model';
import { ArrayIterator } from 'asynciterator';
import { ActorQueryOperationCollectProvenance } from '../lib/ActorQueryOperationCollectProvenance';
const arrayifyStream = require('arrayify-stream');

describe('ActorQueryOperationCollectProvenance', () => {
  let bus: any;
  let mediatorQueryOperation: any;

  beforeEach(() => {
    bus = new Bus({ name: 'bus' });
    mediatorQueryOperation = {
      mediate: (arg: any) => Promise.resolve({
        bindingsStream: new ArrayIterator([
          Bindings({ '?a': literal('1') }),
          Bindings({ '?a': literal('2') }),
          Bindings({ '?a': literal('3') }),
        ], { autoStart: false }),
        metadata: () => Promise.resolve({ totalItems: 3 }),
        operated: arg,
        type: 'bindings',
        variables: [ '?a' ],
        canContainUndefs: false,
      }),
    };
  });

  describe('An ActorQueryOperationCollectProvenance instance', () => {
    let actor: ActorQueryOperationCollectProvenance;

    beforeEach(() => {
      actor = new ActorQueryOperationCollectProvenance({ name: 'actor', bus, mediatorQueryOperation });
    });

    it('should test on collect-provenance', () => {
      const op = { operation: { type: 'collect-provenance' }};
      return expect(actor.test(op)).resolves.toBeTruthy();
    });

    it('should not test on non-collect-provenance', () => {
      const op = { operation: { type: 'some-other-type' }};
      return expect(actor.test(op)).rejects.toBeTruthy();
    });

    it('should run', () => {
      const op = { operation: { type: 'collect-provenance' }};
      return actor.run(op).then(async(output: IActorQueryOperationOutputBindings) => {
        expect(await output.metadata!()).toEqual({ totalItems: 3 });
        expect(output.variables).toEqual([ '?a' ]);
        expect(output.type).toEqual('bindings');
        expect(output.canContainUndefs).toEqual(false);
        expect(await arrayifyStream(output.bindingsStream)).toEqual([
          Bindings({ '?a': literal('1') }),
          Bindings({ '?a': literal('2') }),
          Bindings({ '?a': literal('3') }),
        ]);
      });
    });
  });
});
