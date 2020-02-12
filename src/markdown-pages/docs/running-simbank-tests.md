---
path: "/docs/running-simbank-tests"
title: "Running the supplied SimBank tests"
---
SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) logs on to SimBank and examines an account - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as above in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

All of these example tests become available when you set up a Galasa example project within Eclipse.

## Creating an example Galasa project

<b>NOTE:</b> Normally m2e (the Eclipse Maven plug-in) automatically compiles the test bundles and produces the necessary manifest and OSGi files. However, there appears to be an anomaly in m2e in the 2019 versions of Eclipse which we are investigating.   If the bundles fail to build correctly, you can force the Maven build by right-clicking the *project* and selecting *Run As > Maven Install*.  We will resolve this issue for 0.5.0.

1. Ensure that Eclipse is running.
1. Choose *File > New > Example*, select *SimBank example projects* and press *Next*.
1. Confirm your *New project* prefix (it's OK to leave it as `dev.galasa.simbank`) and press *Finish*. In your *Package Explorer* (if it's not visible, choose *Window > Show View > Package Explorer*), two new entries appear:
```
dev.galasa.simbank.manager
dev.galasa.simbank.tests 
```
1. Right-click on `dev.galasa.simbank.manager` and choose *Run As > Maven install* - wait a few moments for the dependencies to load and then right-click on `dev.galasa.simbank.tests` and do the same. Note that the order in which you do this is significant - first `dev.galasa.simbank.manager` and then `dev.galasa.simbank.tests`.
1. Expand `dev.galasa.simbank.tests` (assuming you haven't changed your project name) and then `src.main.java` - and finally, explore the `dev.galasa.simbanks.tests` package. You'll see the group of tests provided with SimBank:

![SimBank tests](./provided-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, *The SimBank IVT* is the best place to start.