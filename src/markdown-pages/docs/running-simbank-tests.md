---
path: "/docs/running-simbank-tests"
title: "Running the supplied SimBank tests"
---

Galasa SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) which logs on to SimBank  - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as `BasicAccountCreditTest.java` in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

All of these example tests become available when you set up a Galasa example project within Eclipse. For more information, see the _Creating an example Galasa project_ documentation. 

