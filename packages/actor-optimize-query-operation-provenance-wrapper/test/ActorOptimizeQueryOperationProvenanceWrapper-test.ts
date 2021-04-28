import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import { Bus } from '@comunica/core';
import { ActorOptimizeQueryOperationProvenanceWrapper } from '../lib/ActorOptimizeQueryOperationProvenanceWrapper';

describe('ActorOptimizeQueryOperationProvenanceWrapper', () => {
  let bus: any;

  beforeEach(() => {
    bus = new Bus({ name: 'bus' });
  });

  describe('An ActorOptimizeQueryOperationProvenanceWrapper instance', () => {
    let actor: ActorOptimizeQueryOperationProvenanceWrapper;

    beforeEach(() => {
      actor = new ActorOptimizeQueryOperationProvenanceWrapper({ name: 'actor', bus });
    });

    it('should test', () => {
      return expect(actor.test({ todo: true })).resolves.toEqual({ todo: true }); // TODO
    });

    it('should run', () => {
      return expect(actor.run({ todo: true })).resolves.toMatchObject({ todo: true }); // TODO
    });
  });
});
