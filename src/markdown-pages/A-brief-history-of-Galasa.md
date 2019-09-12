---
path: "/about/history"
title: "A brief history of Galasa"
---

## The Problem
Galasa started life as JAT (Java Automated Testing) - an internal IBM tool which was (and still is) extensively used for integration testing within IBM z/OS teams. It was created to help eliminate repetitive manual and semi-automated testing every time a change to the CICS product code was delivered. These tests could be complex and take a long time to set up and run, increasing the risk of introducing human-error into the process. It was also difficult to identify the cause of failures, as diagnostics were stored in different repositories, including logs on z/OS, test script error output on laptops, and program compilation output on z/OS. Changes to the product could take many weeks to reach a beta level of CICS as it wasn't possible to accelerate the development cycle without a loss of confidence in the quality of the deliverable.


## The Solution
To solve these problems, JAT was created. JAT was inspired by JUnit but with a focus on functional and integration testing, and not on unit testing. JAT is written in Java - in part because of Java's run-anywhere capability, huge number of utility libraries and its extensive ecosystem. However, the team fountd that Java expertise is not essential to use it. Some knowledge of Java syntax proved useful, but the style of Java used to write tests is more procedural than object orientated, making writing tests easier. Samples and examples provided as part of JAT could be used and this helped to further reduce any language barrier to entry.

Developing a test was made much easier and quicker as test code could be run at the push of a single button. Automated scheduling of test runs enabled the continuous testing of new code in a timely and cost-effective manner.

All aspects of a test run were automatically recorded and stored in a single repository, so if a test failed at, say, 2am, simplified access to logs, screenshots and data made it quick and easy to diagnose the problem. The system proved highly scalable, allowing large number of tests to be run in parallel against many releases of CICS, enabling JAT to deliver on its primary purpose of integration testing and ensuring the quality of CICS.

## The Result
After JAT was rolled out across CICS,  the team fully automated their integration tests, including creating test data, running batch jobs, invoking RESTful interfaces, interacting with 3270 terminals, and provisioning and de-provisioning test environments. Manual intervention was virtually eliminated and the team were able to work much more efficiently, giving the team more time to focus on complex edge test cases to root out hard-to-find defects, and the bandwidth to adapt quickly when testing new changes and features. Continuous, scalable and reliable integration tests running as part of the DevOps pipeline helped to reduce the delivery of a new CICS feature from 18 to 3 months without any loss of confidence in quality. In fact, JAT was so successful, that it was adopted by other teams across IBM. 

## The Future

We hope Galasa will be of interest to anyone who is involved in ensuring the quality of application code through testing at any phase in the application lifecycle:  application architects, developers, testers, test architects, test team leads, system programmers, release managers, and CI/CD and DevOps pipeline engineers. 

We’d love you to get involved with the project, and help us establish a collaborative community where we can share great ideas and build new, cool Galasa features together.
