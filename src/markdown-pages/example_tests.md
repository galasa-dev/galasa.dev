---
path: "/docs/introduction/examples"
title: "Galasa test examples"
---

Once you know which tests or parts of a test you want to automate, you can select the [Manager(s)](../../reference/managers) you need. For example, if you want to automate a test to run a batch job by using JCL, you need to call the z/OS Batch Manager from within your test code.

Here’s an example of a manual test script that a tester might have performed manully that’s been converted into an automated Galasa test. You can find lots more sample tests that you can use to get you up and running _here_.

## Writing your own Manager
If a suitable Manager is not currently available as part of Galasa, check which Managers are planned for future releases, or raise a request for one to be developed. Alternatively, you can write your own Manager and even share it with the community. If you’re writing your own Manager, here are some helpful guidelines to get you started …

  * Each Manager should focus on integrating Galasa with a single tool, product or capability.
  * Decide whether the Manager needs to provision itself, or any ancillary data, into the test environment.
  * Decide how the Manager advertises its capabilities to a test class. Most Managers inject a test object into the test class to provide the test with a way to interact with the capabilities of that Manager.  For an example see link ...
  * Look at the Manager lifecycle to understand how your Manager should link into the Galasa Manager lifecycle.  This will help you to understand how Galasa connects Managers into test code and the methods that will be called during the provisioning, execution and de-provisioning of a test.
