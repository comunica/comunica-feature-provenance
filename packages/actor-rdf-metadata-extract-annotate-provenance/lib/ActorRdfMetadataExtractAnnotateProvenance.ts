import { ActorRdfMetadataExtract, IActionRdfMetadataExtract, IActorRdfMetadataExtractOutput } from '@comunica/bus-rdf-metadata-extract';
import { IActorArgs, IActorTest } from '@comunica/core';

/**
 * A comunica Annotate Provenance RDF Metadata Extract Actor.
 */
export class ActorRdfMetadataExtractAnnotateProvenance extends ActorRdfMetadataExtract {
  public constructor(args: IActorArgs<IActionRdfMetadataExtract, IActorTest, IActorRdfMetadataExtractOutput>) {
    super(args);
  }

  public async test(action: IActionRdfMetadataExtract): Promise<IActorTest> {
    return true;
  }

  public async run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput> {
    return new Promise((resolve, reject) => {
      // Forward errors
      action.metadata.on('error', reject);

      const metadata: any = {};
      // Add provenance to metadata
      action.metadata.on('end', (...args) => {
        metadata.__prov = {
          resolvedFrom: action.url,
        };
        resolve({ metadata });
      });
    });
  }
}
