#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Run given query using given context.
 * @param q: query
 * @param context: context to pass on to the comunica engine
 * @param onSuccess: callback for handling query result upon success
 * @param onError: error callback
 * @returns {Promise<void>}
 */
async function runQuery (q, context, onSuccess, onError) {
  let engine = undefined;

  try {
    engine = require('@prov4itdata/actor-init-sparql').newEngine();
    const result = await engine.query(q, context);
    onSuccess(result);
  } catch (err) {
    onError(err);
  } finally {
    delete engine
  }
}


/**
 * - Reads query from given query file path
 * - Executes the query and stores the query result's metadata as JSON
 */
const _execute = async (experimentArgs) => {


  const {queryFilePath, output: { metadataOutputFilePath }, context} = experimentArgs
  const query = fs.readFileSync(queryFilePath, { encoding: 'utf-8' });
  
  // delete existing metadataOutputFile
  if (fs.existsSync(metadataOutputFilePath)) {
    fs.unlinkSync(metadataOutputFilePath);
  }

  await runQuery(query, context,
    // onSuccess
    async (queryResult) => {

      if (queryResult.metadata) {

        // Extract metadata from query result
        const metadataPromise = await queryResult.metadata();

        // Helper for processing an observation record.
        const processObservationRecord = async (or) => {
          const metadata = await or.metadata()

          // Following keys are excluded to reduce verbosity
          const actionKeysToExclude = ['context']
          actionKeysToExclude.forEach(k => {
            delete or.action[k]
          })
          
          return  {
            ...or,
            metadata,
          }
        }

        const { observationRecords } = metadataPromise;
        // skip first observation record (duplicate)
        const [_,...processedObservationRecords] = await Promise.all(observationRecords.map(processObservationRecord));

        // Update metadata with processed observation records
        const metadata = {
          ...metadataPromise,
          observationRecords: processedObservationRecords
        }

        // JSON string
        const metadataJSONSerialized = JSON.stringify(metadata, null, 2);
        // Write metadata to file
        fs.writeFileSync(metadataOutputFilePath, metadataJSONSerialized, { encoding: 'utf8' });
      }
    }, 
    // onError
    (err) => {
      console.error('ERROR WHILE RUNNING QUERY \n', query);
    });
};

// Parse CLI arguments & run experiment
// First argument: path to the query
// Second argument: path of the metadata output file
// Remaining argument(s): query source(s)
const [, , queryFilePath, metadataOutputFilePath, ...sources] = process.argv

const experimentArgs = {
  queryFilePath,
  context: {
    sources
  },
  output: {
    metadataOutputFilePath
  }
}

_execute(experimentArgs)
.then(()=>{
  console.info(`Successfully executed experiment: 
  ${JSON.stringify(experimentArgs, null, 2)}`)
})
.catch((err)=>{
  console.error(`Error while executing experiment: 
  ${JSON.stringify(experimentArgs, null, 2)}\nError: ${err}`)
})