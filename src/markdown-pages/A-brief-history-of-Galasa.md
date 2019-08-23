---
path: "/about/history"
title: "A brief history of Galasa"
---
### The Problem
Galasa started life as JAT (Java Automated Testing) - an internal IBM tool which was (and still is) extensively used for regression testing within IBM z/OS teams. It was created to help eliminate repetitive manual and semi-automated testing every time a change to the CICS product code was delivered. These tests could be complex and take a long time to set up and run, increasing the risk of introducing human-error into the process. It was also difficult to identify the cause of failures, as diagnostics were stored in different repositories, including logs on zOS, test script error output on laptops, and program compilation output on z/OS. Changes to the product could take many weeks to reach a beta level of CICS as it wasn't possible to accelerate the development cycle without a loss of confidence in the quality of the deliverable.



### The Solution
<p>To solve these problems, JAT was created. JAT was inspired by JUnit but with a focus on functional and integration testing, and not on unit testing. JAT is written in Java - in part because of Java's run-anywhere capability, huge number of utility libraries and its extensive ecosystem. However, the team found that Java expertise is not essential to use it. Some knowledge of Java syntax proved useful, but the style of Java used to write tests is more procedural than object orientated, making writing tests easier. Provided samples and examples were utilised to further reduce any language barrier to entry.</p>

<p>Developing a test was made much easier and quicker partly because running the test code was a single button, and all the test output was available in a single place so that diagnosing coding errors was much quicker. This enabled use to continually and cheaply check new code as it was written.</p>

<p>All aspects of a test run were automatically recorded and stored in a single repository so if a test failed at, say, 2am, simplifying access to logs, screenshots and data made it quicker and easier to diagnose the problem. The system proved highly scalable, allowing large number of tests to be run in parallel against many releases of CICS, enabling JAT to deliver on its primary purpose of regression testing and ensuring the quality of CICS.
</p>

### The Result
After JAT was rolled out across CICS,  the team fully automated their regression tests, including running batch jobs, invoking restful interfaces, interacting with 3270 terminals, provisioning and de-provisioning both data and test environments. Manual intervention was eliminated and they found they were able to work much more efficiently, giving them more time to focus on complex edge test cases to root out other defects, adapting quickly to testing new changes and features. Continuous, scalable and reliable regression tests running as part of the DevOps pipeline helped to reduce the delivery of a new CICS feature from 18 to 3 months without any loss of confidence in quality. In fact, JAT was so successful, that it was adopted by other teams across IBM.

## The Future
IBM are now releasing an open-source version of JAT - called Galasa - so that others can benefit from this framework. We’d love you to get involved with the project, and help us establish a collaborative community where we can share great ideas and build new, cool Galasa features together.
