---
path: "/docs/running-simbank-tests-cli"
title: "Running the SimBank tests using the CLI"
---

You can explore Galasa further with Galasa Simbank. Galasa Simbank is a simulated bank application that showcases Galasa's functionality within an application. Galasa SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) which logs on to SimBank  - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as `BasicAccountCreditTest.java` in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

The following sections explain how to run the `SimBankIVT` test class by using the CLI. Make sure that you have installed the Galasa CLI tool and Java version 11 JDK, and set the JAVA_HOME environment variable, as described in the _Installing the Galasa CLI_ documentation. 

## Running the SimBank IVT test class by using the CLI

The SimBank tests are held in the <a href="https://github.com/galasa-dev/simplatform" target="_blank"> Galasa simplatform repository</a> in GitHub. To start running the tests you need to clone the repository, if you have not already done so. To find out how to clone the cli repository, follow the instruction in the `Launching SimBank` section in the [Exploring Galasa SimBank using the CLI]() documentation.

After cloning the repository, complete the following steps to run the SimBankIVT test that is provided with Galasa. The following example uses SimBank OBR version `0.25.0` and Galasa uber OBR version `0.30.0`.

You can find the version of the `dev.galasa.simbank.obr` that you are using by looking in the `pom.xml` file in the `dev.galasa.simbank.obr` folder. The `dev.galasa.uber.obr` is the OBR that contains all the bundles that are needed for Galasa to work (including the Managers, any required dependencies, the framework, etc). The version of the `dev.galasa.uber.obr` depends on which version of Galasa you have installed.


1. Open a terminal, navigate to your `simplatform` directory and run the `./build-locally.sh` script to build the code in both the simbank-tests and the simplaform-application directories.
2. In another terminal run the `./run-locally.sh --server` script to start the simbank server inside a inside a local JVM. In a few seconds, the Eclipse Console window responds with a series of initialization messages, which on Windows looks like:
```
2019-10-21 14:24:35 INFO dev.galasa.simplatform.main.Simplatform main Starting Simplatform ...
2019-10-21 14:24:35 INFO dev.galasa.simplatform.db.Database setDerbyHome Setting Derby home to C:\Users\<username>\AppData\Local\Temp\galasaSimplatform1440125512154994774
2019-10-21 14:24:36 INFO dev.galasa.simplatform.saf.SecurityAuthorizationFacility <init> Creating SAF service
2019-10-21 14:24:36 INFO dev.galasa.simplatform.application.Bank accountExists Checking if account: 123456789 exists
2019-10-21 14:24:36 INFO dev.galasa.simplatform.application.Bank accountExists Account doesn't exist
2019-10-21 14:24:36 INFO dev.galasa.simplatform.application.Bank openAccount Creating account: 123456789
2019-10-21 14:24:36 INFO dev.galasa.simplatform.application.Bank accountExists Checking if account: 987654321 exists
2019-10-21 14:24:36 INFO dev.galasa.simplatform.application.Bank accountExists Account doesn't exist
2019-10-21 14:24:36 INFO dev.galasa.simplatform.application.Bank openAccount Creating account: 987654321
2019-10-21 14:24:36 INFO dev.galasa.simplatform.saf.SecurityAuthorizationFacility addUser Added user: IBMUSER
2019-10-21 14:24:36 INFO dev.galasa.simplatform.main.Simplatform main Loading services...
2019-10-21 14:24:36 INFO dev.galasa.simplatform.listener.Listener <init> Loading service: dev.galasa.simplatform.listener.WebServiceListener listening on port: 2080
2019-10-21 14:24:36 INFO dev.galasa.simplatform.listener.Listener <init> Loading service: dev.galasa.simplatform.listener.TelnetServiceListener listening on port: 2023
2019-10-21 14:24:36 INFO dev.galasa.simplatform.main.Simplatform main ... services loaded
2019-10-21 14:24:36 INFO dev.galasa.simplatform.main.Simplatform main Starting Derby Network server....
2019-10-21 14:24:37 INFO dev.galasa.simplatform.main.Simplatform main ... Derby Network server started on port 2027
2019-10-21 14:24:37 INFO dev.galasa.simplatform.main.Simplatform main ... Simplatform started
```
If you are a Mac or Linux user, the messages will be almost identical.

3. In the terminal in which you ran the `./build-locally.sh` script, run the following command to run the SimBankIVT test:
On Mac or Unix:
```
galasactl runs submit local --log - \
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr \
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.30.0/obr \
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.SimBankIVT 
```
On Windows (Powershell):
```
galasactl runs submit local --log - `
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr `
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.30.0/obr `
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.SimBankIVT
```
where:

- `--log` specifies that debugging information is directed somewhere, and the `-` means that it is sent to the console (stderr).
- `--obr`  The `--obr` parameter specifies the Maven co-ordinates of the OBR jar file, in the format `mvn:groupId/artifactId/version/classifier`. The first instance specifies the OBR where the  CLI tool can find an OBR which refers to the bundle where the tests are stored. When running locally, all tests must exist in the OBR (or OBRs) that are passed to the tool. The second instance specifies the OBR containing  the bundles that are needed for Galasa to work (for example, Galasa Managers, required dependencies, and the Galasa framework).
- `--class` specifies which test class to run. The string is in the format of `<osgi-bundle-id>/<fully-qualified-java-class>`. 
4. The `SimBankIVT` test class runs, and the terminal displays its progress through to completion, with an Exit code of `0`.
5. View the results of the test runs in your terminal. You can also view results in the `run.log` file in the result archive store (RAS). 3270 terminal interactions can be viewed in the `artifacts` directory in the RAS. Find out more in the [Viewing test results locally](/docs/cli-command-reference/viewing-test-results-cli) documentation. 

To run other SimBank tests, for example `BasicAccountCreditTest`, replace the test class name in the `--class` parameter. For example: 

On Mac or Unix:

```
galasactl runs submit local --log - \
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr \
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.30.0/obr \
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.BasicAccountCreditTest 
```

On Windows (Powershell):

```
galasactl runs submit local --log - `
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr `
--obr mvn:dev.galasa/dev.galasa.uber.obr/0.30.0/obr `
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.BasicAccountCreditTest
```



## Next steps

Explore the SimBankIVT test and the other SimBank tests in the [Exploring the supplied SimBank tests](exploring-simbank-tests) sections. Follow the flow of logic in these classes and understand more about the Java that is used to create them, including how to use Galasa annotations and review documented test methods.