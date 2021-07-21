---
path: "/docs/ecosystem/ecosystem-cli"
title: "Using the Galasa CLI"
---

Submit and monitor Galasa test runs in you Galasa Ecosystem by using a command line interface (Galasa CLI). The Galasa CLI lets you submit and monitor test runs by using the same set of commands, regardless of the technology that you are using to run your pipeline. 

[Download the CLI tool](https://github.com/galasa-dev/cli/releases) and [access the code](https://github.com/galasa-dev/cli) from the _cli_ repository in GitHub. 

## Getting started 

To use the CLI commands you must reference the Galasa bootstrap file or URL. You can do this either by setting the `--bootstrap` flag or the `GALASA_BOOTSTRAP`environment variable.

There are two key commands - `runs prepare` and `runs submit`.

The `runs prepare` command builds a portfolio of tests which can then be run by using the `runs submit` command. You can build a portfolio of tests from single or multiple [test streams](../../docs/writing-own-tests/test-streams). 

The `runs submit` command submits and monitors tests in the Galasa Ecosystem.  Tests can be input either from a portfolio or directly from a [test package](../../docs/running-simbank-tests/writing-a-simbank-test). 

## Working with the `runs prepare` command

The following section provides a subset of examples on using the `runs prepare` command to complete various tasks, for example, getting help, selecting tests, and setting overrides.

### Getting help

Use the following commands to get more information about a command and command options.

```
galasactl --help
galasactl runs --help
galasactl runs prepare --help
```

### Selecting tests from a test steam

The following example command selects tests from a test stream called `BestSoFar` for inclusion in a portfolio called `test.yaml`. All tests in the `dev.galasa.simbank.tests`  package within the `BestSoFar` test stream are added to the `test.yaml` portfolio. Packages are selected if the name contains a specified string or matches the regex if --regex is specified.  

```
galasactl runs prepare
                        --portfolio test.yaml
                        --stream BestSoFar
                        --package dev.galasa.simbank.tests
```

### Selecting tests without a test stream

You can use test class names to build a portfolio when a test stream or test catalog is not available. 

The following example command selects specified tests (`SimBankIVT` and `BasicAccountCreditTest`) from the `dev.galasa.simbank.tests` test package and adds these tests to the `test.yaml` portfolio. 

```
galasactl runs prepare
                        --portfolio test.yaml
                        --class dev.galasa.simbank.tests/SimBankIVT
                        --class dev.galasa.simbank.tests/BasicAccountCreditTest
```

### Setting test-specific overrides

Specifying overrides is useful if you want to run a set of tests against a particular configuration without changing the test code. For example, you might have multiple versions of software that you need to test. How can you do that without changing the test code? The answer is to use override properties. If you are running tests locally, you can set overrides properties by editing your `Overrides Properties` file. If you are running tests in an ecosystem, you can use the `--override` parameter in the Galasa CLI. Note that overrides that are specified in the Galasa CLI take precedence over those set in your local `Overrides Properties` file.

The following example creates a portfolio called `test.yaml` that contains tests from the `BestSoFar` test stream where the test package is `dev.galasa.simbank.tests`.

All the tests in the `test.yaml` portfolio will run on the z/OS LPAR `MV2C` in the `PLEX2` cluster when the `galasactl runs submit --portfolio test.yaml` command is run, regardless of the LPAR and cluster that is specified in the CPS properties file.

```
galasactl runs prepare
                        --portfolio test.yaml
                        --stream BestSoFar
                        --package dev.galasa.simbank.tests
                        --override zos.default.lpar=MV2C
                        --override zos.default.cluster=PLEX2
```

### Building a portfolio over multiple selections and overrides

In the following example, the first command creates a portfolio called `test.yaml` that contains tests from the `BestSoFar` test stream where the test package name is `dev.galasa.simbank.tests`. The second command adds more tests to the `test.yaml` portfolio from the `BestSoFar` test stream where the test package name is `dev.galasa.simbank.tests.two`. 

All the tests in the `test.yaml` portfolio from `dev.galasa.simbank.tests` will run on the z/OS LPAR `MV2C` in the `PLEX2` cluster. The tests from `dev.galasa.simbank.tests.two` will run on the z/OS LPAR `MV2D` in the `PLEX2` cluster when the `galasactl runs submit --portfolio test.yaml` command is run.

```
galasactl runs prepare 
                        --portfolio test.yaml
                        --stream BestSoFar
                        --package dev.galasa.simbank.tests
                        --override zos.default.lpar=MV2C
                        --override zos.default.cluster=PLEX2
galasactl runs prepare
                        --portfolio test.yaml
                        --append
                        --stream BestSoFar
                        --package dev.galasa.simbank.tests.two
                        --override zos.default.lpar=MV2D
                        --override zos.default.cluster=PLEX2
```

## Working with the `runs submit` command

The following section provides a subset of examples of how you can use the `runs submit` command to complete various tasks, for example, getting help, submitting tests, and setting overrides.

### Getting help

Use the following commands to get more information about the command and command options.

```
galasactl --help
galasactl runs --help
galasactl runs runs --help
```

### Submitting tests from a portfolio

The example command submits tests from the `test.yaml` portfolio, and specifies the following settings: 
```
galasactl runs submit
                        --portfolio test.yaml
                        --poll 5
                        --progress 1
                        --throttle 5
```
where: 
- `poll` specifies the frequency in seconds that the CLI polls the Ecosystem for test run status. The default value is `30` seconds. 
- `progress` specifies the frequency in minutes that the CLI reports the overall progress of the test runs. The default value is `5` minutes. A value of  `-1` or less disables progress reports.
- `throttle` specifies the number of test runs that can be submitted in parallel. The default value is `3`. A value of `0` or less  prevents throttling.

### Submitting tests without a portfolio

You can use test class names to submit test runs without using a portfolio.

The following command runs `SimBankIVT` and `BasicAccountCreditTest` from `dev.galasa.simbank.tests`. 

```
galasactl runs submit
                        --class dev.galasa.simbank.tests/SimBankIVT
                        --class dev.galasa.simbank.tests/BasicAccountCreditTest
```

### Setting overrides for all tests during a run

The following command runs all the tests in the `test.yaml` portfolio are on the z/OS LPAR `MV2C` in the `PLEX2` cluster.

```
galasactl runs submit
                        --portfolio test.yaml
                        --override zos.default.lpar=MV2C
                        --override zos.default.cluster=PLEX2
```






