# Comunica Collect Provenance Query Operation Actor

[![npm version](https://badge.fury.io/js/%40comunica%2Factor-query-operation-collect-provenance.svg)](https://www.npmjs.com/package/@prov4itdata/actor-query-operation-collect-provenance)

Uses a Comunica observer to collect metadata from query operations executed on the query operation bus, and passes it on to the query result.

This module is part of the [Comunica framework](https://github.com/comunica/comunica),
and should only be used by [developers that want to build their own query engine](https://comunica.dev/docs/modify/).

[Click here if you just want to query with Comunica](https://comunica.dev/docs/query/).

## Install

```bash
$ yarn add @prov4itdata/actor-query-operation-collect-provenance
```

## Configure

After installing, this package can be added to your engine's configuration as follows:
```text
{
  "@context": [
    ...
    "https://linkedsoftwaredependencies.org/bundles/npm/@prov4itdata/actor-query-operation-collect-provenance/^1.0.0/components/context.jsonld"  
  ],
  "actors": [
    ...
    {
      "@id": "config-sets:sparql-queryoperators.json#myCollectProvenanceQueryOperator",
      "@type": "ActorQueryOperationCollectProvenance",
      "cbqo:mediatorQueryOperation": { "@id": "config-sets:sparql-queryoperators.json#mediatorQueryOperation" }
    }
  ]
}
```

### Config Parameters

* `cbqo:mediatorQueryOperation`: A mediator over the [Query Operation bus](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation).
