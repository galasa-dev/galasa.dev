---
path: "/about/history"
title: "A brief history of Galasa"
---

## The Problem
Galasa started life as JAT (Java Automated Testing) - an internal IBM tool which was (and still is) extensively used for integration testing within IBM z/OS teams. It was created to help eliminate repetitive manual and semi-automated testing every time a change to the CICS product code was delivered. These tests could be complex and take a long time to set up and run, increasing the risk of introducing human-error into the process. It was also difficult to identify the cause of failures, as diagnostics were stored in different repositories, including logs on z/OS, test script error output on laptops, and program compilation output on z/OS. Changes to the product could take many weeks to reach a beta level of CICS as it wasn't possible to accelerate the development cycle without a loss of confidence in the quality of the deliverable.


## The Solution
To solve these problems, JAT was created. JAT was inspired by JUnit but with a focus on functional and integration testing, and not on unit testing. JAT is written in Java - in part because of Java's run-anywhere capability, huge number of utility libraries and its extensive ecosystem. However, the team fountd that Java expertise is not essential to use it. Some knowledge of Java syntax proved useful, but the style of Java used to write tests is more procedural than object orientated, making writing tests easier. Samples and examples provided as part of JAT could be used and this help to further reduce any language barrier to entry.

Developing a test was made much easier and quicker as test code could be run by pressing a single button, and all the test output was available in a single place which made diagnosing coding errors much quicker. Automated scheduling of test runs enabled the continuous testing of new code in a timely and cost-effective manner.

All aspects of a test run were automatically recorded and stored in a single repository, so if a test failed at, say, 2am, simplifying access to logs, screenshots and data made it quicker and easier to diagnose the problem. The system proved highly scalable, allowing large number of tests to be run in parallel against many releases of CICS, enabling JAT to deliver on its primary purpose of integration testing and ensuring the quality of CICS.

## The Result
After JAT was rolled out across CICS,  the team fully automated their integration tests, including creating test data, running batch jobs, invoking restful interfaces, interacting with 3270 terminals, and provisioning and de-provisioning test environments. Manual intervention was eliminated and they found they were able to work much more efficiently, giving the team more time to focus on complex edge test cases to root out hard-to-find defects and the bandwidth to adapt quickly when testing new changes and features. Continuous, scalable and reliable integration tests running as part of the DevOps pipeline helped to reduce the delivery of a new CICS feature from 18 to 3 months without any loss of confidence in quality. In fact, JAT was so successful, that it was adopted by other teams across IBM. 



## The Research
We’ve been engaged in research to better understand how mainframe applications outside of IBM are developed, tested and delivered. As part of this research, we  gained insight into the testing process and the teams who are responsible for validating the quality of the application code changes. 

We found several common problems being faced by these teams, including: 

-  Unreliable test data
    
    The data is often in a state of flux, resulting in the breaking of existing tests and difficulty in snapshotting and rolling back data.

-  Unreliable automated testing systems
    
    If automated testing systems are used, they are often unreliable, or build on unreliable test data.

- A lack of awareness between development and test teams

    Teams are not always aware of the tests another group is running, resulting in tests being duplicated, or missed entirely and there is a lack of clarity around what level of regression testing, if any, is undertaken.

- Too much manual approval and promotion

    Test results are stored in spreadsheets and must be manually approved by product owners before the change is promoted. This makes it difficult to gain awareness of the tests that are run, and the manual process takes time and requires too much intervention.

- A long development cycle.

    Unreliable test data, manual testing and a manual approval process all add up to a development cycle that can’t be sped up without loss of confidence. Application changes take many months to reach production, and emergency fixes are promoted with only a sub-set of suitable tests exercised.
 
As a result of these findings, we realised that the JAT framework could be valuable to organizations outside of IBM, especially as we learned that most application testing on the mainframe is manual today. So, we are releasing an open-source version of JAT - called Galasa -  to help other teams resolve these common problems and to benefit from the capabilities offered by the Galasa framework. 

## The Future

We hope Galasa will be of interest to anyone who is involved in ensuring the quality of application code through testing at any phase in the application lifecycle:  application architects, developers, testers, test architects, test team leads, system programmers, release managers, and CI/CD and DevOps pipeline engineers. 

We’d love you to get involved with the project, and help us establish a collaborative community where we can share great ideas and build new, cool Galasa features together.
