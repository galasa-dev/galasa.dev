---
path: "/about/history"
title: "A brief history of Cirillo"
---
### The Problem 
So, how did Cirillo come into being? Cirillo started life as JAT (Java Automation Tool) - an internal IBM tool which was (and still is) extensively used for regression testing within IBM z/OS teams. The tooling was created in response to requests from the CICS test team for a tool that would free them up from spending so much of their time on the repetitive, manual testing they needed to run each time a change was delivered. These tests were complex and took a long time to set up and run, increasing the risk of introducing human-error into the process. Application changes could take many months to reach production as it wasn't possible to speed up the development cycle without a loss of confidence in the quality of a deliverable.

### The Solution
<p>To solve these problems, JAT was created. JAT was inspired by JUnit but it is not a unit test tool; it is aimed at functional and integration testing. JAT is written in Java, due to the language's run-anywhere capability and huge number of utility libraries. As the tests are written in Java, you can use your favourite IDE and debug the test interactively on your workstation. However, you certainly don't need to be an expert in Java to use the tool. You do need to have some knowledge of Java syntax, but the Java used in test case creation is a more procedural based flavour of Java, rather than an object-oriented one. Additionally, lots of code is available in the samples and examples that are provided as part of Cirillo and the writing of tests has been made as simple as possible, so that there is no language barrier to entry.</p> 
<p>The JAT Framework provides services to record all aspects of a test run, so if a test fails at 2am you have access to logs, screenshots and data to help diagnose the cause of the failure. The system is highly scalable - able to run hundreds of tests in parallel on automation servers - with the primary purpose of regression testing.</p> 

### The Result
After JAT was rolled out across CICS, the team automated their key manual tests, including running batch jobs, and provisioning and de-provisioning test environments. The team found they were able to work much more efficiently, focusing on complex, edge test cases to root out critical defects, and could adapt quickly to testing new and changes features. Scalable and reliable regression tests are run as part of their DevOps pipeline and the mainframe development cycle for changes has decreased from 24 to 3 months without any loss of confidence in the quality of a production deployment. In fact, JAT was so successful, that it was adopted by other teams within IBM, including Db2.

### The Future
IBM are now releasing an open-source version of JAT - called Cirillo - so that others can benefit from this tooling. We’d love you to get involved with the project, and create a collaborative community where we can share great ideas and build new, cool features together.
