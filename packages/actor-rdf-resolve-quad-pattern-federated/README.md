# Comunica Federated RDF Resolve Quad Pattern Actor

> This module is part of the PROV4ITDaTa project

An [RDF Resolve Quad Pattern](https://github.com/comunica/comunica/tree/master/packages/bus-rdf-resolve-quad-pattern) actor
that handles [a federation of multiple sources](https://comunica.dev/docs/query/advanced/federation/),
and delegates resolving each source separately using the [RDF Resolve Quad Pattern bus](https://github.com/comunica/comunica/tree/master/packages/bus-rdf-resolve-quad-pattern).

This module is a slightly updated version of [`@comunica/actor-rdf-resolve-quad-pattern-federated`](https://github.com/comunica/comunica/tree/master/packages/actor-rdf-resolve-quad-pattern-federated) that allows to collect the provenance data from the federated sources.

## Install

```bash
$ yarn add @prov4itdata/actor-rdf-resolve-quad-pattern-federated
```

## Configure

After installing, this package can be added to your engine's configuration as follows:

```text
{
  "@context": [
    ...
    "https://linkedsoftwaredependencies.org/bundles/npm/@prov4itdata/actor-rdf-resolve-quad-pattern-federated/^1.0.0/components/context.jsonld",
  ],
  "@id": "urn:comunica:my",
  "actors": [
    ...
    {
      "@id": "config-sets:resolve-federated.json#myFederatedQuadPatternResolver",
      "@type": "ActorRdfResolveQuadPatternFederated",
      "carrqpf:Actor/RdfResolveQuadPattern/Federated/mediatorResolveQuadPattern": {
        "@id": "config-sets:sparql-queryoperators.json#mediatorResolveQuadPattern"
      }
    }
  ]
}
```

### Config Parameters

* `carrqpf:Actor/RdfResolveQuadPattern/Federated/mediatorResolveQuadPattern`: A mediator over the [RDF Resolve Quad Pattern bus](https://github.com/comunica/comunica/tree/master/packages/bus-rdf-resolve-quad-pattern).