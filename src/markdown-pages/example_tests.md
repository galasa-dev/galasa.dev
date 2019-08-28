---
path: "/docs/introduction/examples"
title: "Galasa test examples"
---

<p>Once you know which tests or parts of a test you want to automate, you can select the Manager(s) you need. A table with the ![Manager’s
that are available with the current release is here](../reference/managers/Reference---Managers.md). For example, if you want to automate a test to run a batch job by using JCL, you need
to call the z/OS Batch Manager from within your test code. </p>

<p>Here’s an example of a manual test script that a tester might have performed manully that’s been converted into an automated Galasa test. You can find
lots more sample tests that you can use to get you up and running _here_.</p>

## Writing your own Manager
If a suitable Manager is not currently available with Galasa, check which Managers are planned for future releases, or raise a request for one to be developed. Alternatively, you can write your own Manager and even share it with the community. If you’re writing your own Manager, here are some helpful guidelines to get you started …

  * Each manager should focus on integrating Galasa with a single tool, product or capability.
  * You should decide if the manager needs to provision itself or any ancillary data into the test environment.
  * How should a manager advertise it's capabilities to a test class, most managers will inject a test object into the test class that provides the test with a way to interact with it's capabilities.  For an example see link ...
  * Take a look at the manager lifecycle to understand how your manager should link into the Galasa manager lifecycle.  This will help you to understand how Galasa connects managers into test code and the methods that will be called during the provisioning, execution and de-provisioning of a test.
