<p align="center">
  <a href="https://comunica.dev/">
    <img alt="Comunica" src="https://comunica.dev/img/comunica_red.svg" width="200">
  </a>
</p>

<p align="center">
  <strong>Comunica: PROV4ITDaTa project</strong>
</p>


This is a monorepo that contains a custom Comunica engine with custom actors, 
tailored to needs of the PROV4ITDaTa project.</br>
Concretely, this monorepo provides the following packages:
- [`@prov4itdata/actor-init-sparql`](https://www.npmjs.com/package/@prov4itdata/actor-init-sparql): a custom configuration of the Comunica engine. 
- [`@prov4itdata/actor-rdf-resolve-quad-pattern-federated`](https://www.npmjs.com/package/@prov4itdata/actor-rdf-resolve-quad-pattern-federated): a slightly updated version of [`@comunica/actor-rdf-resolve-quad-pattern-federated`](https://github.com/comunica/comunica/tree/master/packages/actor-rdf-resolve-quad-pattern-federated) that allows to collect the provenance data from the federated sources.
- [`@prov4itdata/actor-rdf-metadata-extract-annotate-provenance`](https://www.npmjs.com/package/@prov4itdata/actor-rdf-metadata-extract-annotate-provenance): a new actor that captures source-level provenance.
- [`@prov4itdata/context-entries`](https://www.npmjs.com/package/@prov4itdata/context-entries): this package is a plain copy of the not-yet-published https://github.com/comunica/comunica/tree/master/packages/context-entries

## Experiments

```bash
cd ./experiments

node run-experiment.js observation_records/queries/q00.rq observation_records/outputs/q00.rq-metadata.json https://ruben.verborgh.org/profile/ https://www.rubensworks.net

node run-experiment.js observation_records/queries/q01.rq observation_records/outputs/q02.rq-metadata.json https://ruben.verborgh.org/profile/ https://www.rubensworks.net

node run-experiment.js observation_records/queries/q02.rq observation_records/outputs/q02.rq-metadata.json https://ruben.verborgh.org/profile/ https://www.rubensworks.net

```
## License
This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/)
and released under the [MIT license](http://opensource.org/licenses/MIT).