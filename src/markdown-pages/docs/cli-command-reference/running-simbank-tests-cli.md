---
path: "/docs/running-simbank-tests-cli"
title: "Running the SimBank tests using the CLI"
---

Galasa SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) which logs on to SimBank  - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as `BasicAccountCreditTest.java` in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

The following sections explain how to run the `SimBankIVT` test class by using the CLI. 

## Running the SimBank IVT test class by using the CLI

The SimBank tests are held in the <a href="https://github.com/galasa-dev/simplatform" target="_blank"> Galasa simplatform repository</a> in GitHub. To start running the tests you need to clone the repository and launch SimBank so that the tests are available on your local machine. To find out how to clone the cli repository and launch the SimBank application, follow the instructions in the `Launching SimBank` section in the [Exploring Galasa SimBank using the CLI]() documentation.

After cloning the repository and launching SimBank, complete the following steps to run the SimBankIVT test that is provided with Galasa. The following example uses SimBank OBR version `0.25.0` and Galasa OBR version `0.29.0`.

1. In a new terminal, navigate to your `simplatform` directory and run the following command to install and build your project:

```
galasactl local init
```

2. In the same `simplatform` directory, run the following command to run the SimBankIVT test:

On Mac or Unix:

```
galasactl runs submit local --log - \
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr \
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.29.0/obr \
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.SimBankIVT 
```

On Windows (Powershell):

```
galasactl runs submit local --log - `
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr `
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.29.0/obr `
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.SimBankIVT
```

where:

- `--log` specifies that debugging information is directed somewhere, and the `-` means that it is sent to the console (stderr).
- `--obr`  The `--obr` parameter specifies the Maven co-ordinates of the OBR jar file, in the format `mvn:groupId/artifactId/version/classifier`. The first instance specifies the OBR where the  CLI tool can find an OBR which refers to the bundle where the tests are stored. When running locally, all tests must exist in the OBR (or OBRs) that are passed to the tool. The second instance specifies the OBR containing  the bundles that are needed for Galasa to work (for example, Galasa Managers, required dependencies, and the Galasa framework).
- `--class` specifies which test class to run. The string is in the format of `<osgi-bundle-id>/<fully-qualified-java-class>`. 

3. The `SimBankIVT` test class runs, and the terminal displays its progress through to completion - you will see a terminal message similar to `INFO dev.galasa.boot.Launcher.launch - Boot complete` when the tests have finished.
4. View the results of the test runs in your terminal. You can also view results in the `run.log` file in the result archive store (RAS). 3270 terminal interactions can be viewed in the `artifacts` directory in the RAS. Find out more in the [Viewing test results locally](/docs/cli-command-reference/viewing-test-results-cli) documentation. 

To run other SimBank tests, for example `BasicAccountCreditTest`, replace the test class name in the `--class` parameter. For example: 

On Mac or Unix:

```
galasactl runs submit local --log - \
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr \
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.29.0/obr \
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.BasicAccountCreditTest 
```

On Windows (Powershell):

```
galasactl runs submit local --log - `
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr `
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.29.0/obr `
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.BasicAccountCreditTest
```


## Next steps

Explore the SimBankIVT test and the other SimBank tests in the [Exploring the supplied SimBank tests](exploring-simbank-tests) sections. Follow the flow of logic in these classes and understand more about the Java that is used to create them, including how to use Galasa annotations and review documented test methods.