# Comunica PROV4ITDaTa Init Actor

A custom Comunica query engine, configured to be used by the PROV4ITDaTa project.

<!-- This module is part of the [Comunica framework](https://comunica.dev/). -->

## Install

```bash
$ yarn add @prov4itdata/actor-init-sparql
```

or

```bash
$ npm install -g @prov4itdata/actor-init-sparql
```

### Usage within application

This engine can be used in JavaScript/TypeScript applications as follows:

```javascript
const newEngine = require('@comunica/actor-init-sparql-amf').newEngine;
const myEngine = newEngine();

const result = await myEngine.query(`
  SELECT * WHERE {
      ?s ?p ?o
  }`, {
  sources: ['http://localhost:3000/dataset'],
});

// Consume results as a stream (best performance)
result.bindingsStream.on('data', (binding) => {
    console.log(binding.get('?s').value);
    console.log(binding.get('?s').termType);

    console.log(binding.get('?p').value);

    console.log(binding.get('?o').value);
});

// Consume results as an array (easier)
const bindings = await result.bindings();
console.log(bindings[0].get('?s').value);
console.log(bindings[0].get('?s').termType);

// Log metadata containing source-level provenance information
const metadata = await result.metadata();
console.log(metadata)
```

_[**Read more** about querying an application](https://comunica.dev/docs/query/getting_started/query_app/)._
