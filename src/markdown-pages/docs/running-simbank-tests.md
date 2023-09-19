---
path: "/docs/running-simbank-tests"
title: "Running the supplied SimBank tests"
---

Galasa SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) which logs on to SimBank  - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as `BasicAccountCreditTest.java` in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

The following sections explain how to run the `SimBankIVT` test class by using the Galasa CLI and by using Eclipse. 

## Running the SimBank IVT test class using the Galasa CLI


## Running the SimBank IVT test class using Eclipse

1. Create your initial example projects as described in <a href="/docs/running-simbank-tests" target="_blank">Running the supplied SimBank tests</a> - a once-only activity.
1. Ensure that Eclipse is running, your example projects are open and that you have launched SimBank as described in <a href="/docs/getting-started/simbank" target="_blank">Exploring SimBank</a>.
1. Choose _Run > Run Configurations_ and look for and select _Galasa - Java_ in the left pane (not Galasa SimBank).
1. Right-click _Galasa_, choose _New Configuration_ and give it a name.
1. In the dialog, choose _Browse_ to locate your project - `dev.galasa.simbank.tests`, then press _OK_. Then press _Search_ to locate your test class, `SimBankIVT` and press _OK_.
1. Press _Apply_ then _Run_.
1. The `SimBankIVT` test class runs, and the Eclipse console displays their progress through to completion - you will see a console message like: <br/>
   `INFO dev.galasa.boot.Launcher.launch - Boot complete`
   <br/>
   when the tests have finished. You will also see a _live terminal_ window in which the interactions with the 3270 terminal are captured - you can use the attached controls to step back and forth along the sequence of screens.
1. View the results of the test runs in Eclipse. Find out more in the [Viewing test results](/docs/running-simbank-tests/viewing-test-results) documentation. 


## Next steps

Explore the SimBankIVT test and the other SimBank tests in the following sections. Follow the flow of logic in these classes and understand more about the Java that is used to create them, including how to use Galasa annotations and review documented test methods.