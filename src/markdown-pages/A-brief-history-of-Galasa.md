---
path: "/about/history"
title: "A brief history of Galasa"
---
### The Problem
Galasa started life as JAT (JUnit Automated Testing) - an internal IBM tool which was (and still is) extensively used for regression testing within IBM z/OS teams. It was created to help eliminate repetitive manual testing by the CICS test team every time a change was delivered. These tests could be complex and take a long time to set up and run, increasing the risk of introducing human-error into the process. It was also difficult to identify the cause of failures, as diagnostics were stored in different repositories. Application changes could take many weeks to reach a beta level of CICS as it wasn't possible to accelerate the development cycle without a loss of confidence in the quality of the deliverable.

### The Solution
<p>To solve these problems, JAT was created. JAT was inspired by JUnit but with a focus on functional and integration testing, rather than unit testing. JAT is written in Java - in part because of Java's run-anywhere capability, huge number of utility libraries and its extensive ecosystem. However, the team found that Java expertise is not required to use it. Some knowledge of Java syntax proved useful, but the style of Java used to write tests is more procedural than object orientated, making writing tests easier. Provided samples and examples were utilised to further reduce any language barrier to entry.</p>
<p>All aspects of a test run were automatically recorded and stored in a single repository so if a test failed at 2am, simplifying access to logs, screenshots and data made it quicker and easier to diagnose the problem. The system proved highly scalable, allowing large number of tests to be run in parallel against many releases of CICS, enabling JAT to deliver on its primary purpose of regression testing and ensuring the quality of CICS.
</p>

### The Result
After JAT was rolled out across CICS, the team were able to fully automate their key tests, including running batch jobs, invoking restful interfaces, interacting with 3270 terminals, provisioning and de-provisioning both data and test environments. They found they were able to work much more efficiently, focusing on complex, edge test cases to root out critical defects, adapting quickly to testing new changes and features. Scalable and reliable regression tests running as part of the DevOps pipeline reduced the release lifecycle by 6 months and enabled the deployment of new function into production within 3 months without any loss of confidence in quality. In fact, JAT was so successful, that it was adopted by other teams within IBM, including Db2.

### The Future
IBM are now releasing an open-source version of JAT - called Galasa - so that others can benefit from this tooling. We’d love you to get involved with the project, and help us establish a collaborative community where we can share great ideas and build new, cool Galasa features together.
