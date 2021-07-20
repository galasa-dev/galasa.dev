---
path: "/docs/ecosystem/ecosystem-cli"
title: "Using the Galasa CLI"
---

Submit and monitor Galasa test runs either locally or in automation by using a command line interface (Galasa CLI). The Galasa CLI lets you submit and monitor test runs by using the same set of commands, regardless of the technology that you are using to run your pipeline. 

[Download the CLI tool](https://github.com/galasa-dev/cli/releases) and [access the code](https://github.com/galasa-dev/cli) from the cli repository in GitHub. 

## Getting started 

To use the CLI commands you must reference the Galasa bootstrap file or URL. You can do this either by setting the `--bootstrap` flag or the `GALASA_BOOTSTRAP`environment variable.

There are two key commands - `runs prepare` and `runs submit`.

The `runs prepare` command builds a portfolio of tests which can then be run by using the `runs submit` command. You can build a portfolio of tests from single or multiple [test streams](../../docs/writing-own-tests/test-streams). 

The `runs submit` command submits and monitors tests in the Galasa Ecosystem.  Tests can be input either from a portfolio or directly from a test package. 

## Working with the `runs prepare` command

The following section provides a subset of examples of how you can use the `runs prepare` command to complete various tasks, for example, getting help, selecting tests, and setting overrides.

### Getting help

Use the following commands to get more information about the command and command options.

```
galasactl --help
galasactl runs --help
galasactl runs prepare --help
```

### Selecting tests from a test steam

The following example command selects tests from a test stream called `inttests` for inclusion in a portfolio called `test.yaml`. Tests are selected from test packages within the `inttests` test stream. Packages are selected if the name contains a specified string or matches the regex if --regex is specified.  

```
galasactl runs prepare
                        --portfolio test.yaml
                        --stream inttests
                        --package test.package.one
                        --package test.package.two
```

### Selecting tests without a test stream

You can use test class names to build a portfolio when a test stream or test catalog is not available. 

The following example command selects specified tests (`Test1` and `Test2`) from a test package called `test.package.one` and puts these tests in the `test.yaml` portfolio. 

```
galasactl runs prepare
                        --portfolio test.yaml
                        --class test.package.one/Test1
                        --class test.package.one/Test2
```

### Setting test-specific overrides

You can set overrides to be sent with the tests by using the `--override` parameter. Note that overrides in the portfolio file take precedence.

The following example creates a portfolio called `test.yaml` that contains tests from the `inttests` test stream where the test package is `test.package.one`.

All the tests in the `test.yaml` portfolio will run on the z/OS LPAR `MV2C` in the `PLEX2` cluster when the `galasactl runs submit --portfolio test.yaml` command is run.

```
galasactl runs prepare
                        --portfolio test.yaml
                        --stream inttests
                        --package test.package.one
                        --override zos.default.lpar=MV2C
                        --override zos.default.cluster=PLEX2
```

### Building a portfolio over multiple selections and overrides

In the following example, the first command creates a portfolio called `test.yaml` that contains tests from the `inttests` test stream where the test package name is `test.package.one`. The second command adds more tests to the `test.yaml` portfolio from the `inttests` test stream where the test package name is `test.package.two`. 

All the tests in the `test.yaml` portfolio from `test.package.one` will run on the z/OS LPAR `MV2C` in the `PLEX2` cluster. The tests from `test.package.two` will run on the z/OS LPAR `MV2D` in the `PLEX2` cluster when the `galasactl runs submit --portfolio test.yaml` command is run.

```
galasactl runs prepare 
                        --portfolio test.yaml
                        --stream inttests
                        --package test.package.one
                        --override zos.default.lpar=MV2C
                        --override zos.default.cluster=PLEX2
galasactl runs prepare
                        --portfolio test.yaml
                        --append
                        --stream inttests
                        --package test.package.two
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
- the CLI polls the Ecosystem for test run status every `5` seconds. The default value is `30` seconds. 
- the CLI reports the overall progress of the test runs every `1` minute. The default value is `5` minutes. A value of  `-1` or less disables progress reports.
- `5` test runs can be submitted in parallel. The default value is `3`. A value of `0` or less  prevents throttling.

```
galasactl runs submit
                        --portfolio test.yaml
                        --poll 5
                        --progress 1
                        --throttle 5
```

### Submitting tests without a portfolio

You can use test class names to submit test runs without using a portfolio.

The following command runs `Test1` and `Test2` from `test.package.one`. 

```
galasactl runs submit
                        --class test.package.one/Test1
                        --class test.package.one/Test2
```

### Setting overrides for all tests during a run

The following command runs all the tests in the `test.yaml` portfolio are on the z/OS LPAR `MV2C` in the `PLEX2` cluster.

```
galasactl runs submit
                        --portfolio test.yaml
                        --override zos.default.lpar=MV2C
                        --override zos.default.cluster=PLEX2
```






