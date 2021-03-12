# Comunica Annotate Provenance RDF Metadata Extract Actor

> This module is part of the PROV4ITDaTa project

An [RDF Metadata Extract](https://github.com/comunica/comunica/tree/master/packages/bus-rdf-metadata-extract) actor that
extracts source-level provenance data.


## Install

```bash
$ yarn add @prov4itdata/actor-rdf-metadata-extract-annotate-provenance
```

## Configure 

After installing, this package can be added to your engine's configuration as follows:

```text
{
  "@context": [
    ...
    "https://linkedsoftwaredependencies.org/bundles/npm/@prov4itdata/actor-rdf-metadata-extract-annotate-provenance/^1.0.0/components/context.jsonld",

    {
      "caisa": "npmd:@prov4itdata/actor-init-sparql/",
      "files-caisa": "caisa:^1.0.0/",
      "config-setsa": "files-caisa:config/sets/"
    }
  ],
  "@id": "urn:comunica:my",
  "actors": [
    ...
    {
      "@id": "config-setsa:rdf-metadata-extract-annotate-provenance.json#myRdfMetadataExtractAnnotateProvenance",
      "@type": "ActorRdfMetadataExtractAnnotateProvenance"
    }
  ]
}
```
