---
path: "/about/history"
title: "A brief history of Galasa"
---
### The Problem 
Galasa started life as JAT (Java Automation Tool) - an internal IBM tool which was (and still is) extensively used for regression testing within IBM z/OS teams. The tooling was created in response to requests from the CICS test team for a tool that would free them up from spending so much of their time on the repetitive, manual testing and checking that they needed to run each time a change was delivered. These tests were complex and took a long time to set up and run, increasing the risk of introducing human-error into the process. It was also difficult to identify the cause of a failure, as diagnostics were stored in different repositories. Application changes could take many months to reach production as it wasn't possible to speed up the development cycle without a loss of confidence in the quality of a deliverable.

### The Solution
<p>To solve these problems, JAT was created. JAT was inspired by JUnit but it is not a unit test tool; it is aimed at functional and integration testing. JAT was written in Java, due to the language's run-anywhere capability and huge number of utility libraries. However, Java expertise is not required to use the tool. Some knowledge of Java syntax is useful, but the Java that is used to write tests is procedural-based rather than object-oriented, to make scripting easier. Samples and examples provided as part of JAT can be utilised to further reduce any perceived language barrier to entry.</p> 
<p>JAT automatically records all aspects of a test run in a single repository, so if a test fails at 2am it is easy access to logs, screenshots and data to help diagnose the cause of the failure quickly. The system is highly scalable - capable of running hundreds of tests in parallel on automation servers - with the primary purpose of regression testing.</p> 

### The Result
After JAT was rolled out across CICS, the team automated their key manual tests, including running batch jobs, and provisioning and de-provisioning test environments. The team found they were able to work much more efficiently, focusing on complex, edge test cases to root out critical defects, and could adapt quickly to testing new and changes features. Scalable and reliable regression tests run as part of the DevOps pipeline, and the mainframe development cycle for changes has decreased from 24 to 3 months without any loss of confidence in the quality of a production deployment. In fact, JAT was so successful, that it was adopted by other teams within IBM, including Db2.

### The Future
IBM are now releasing an open-source version of JAT - called Galasa - so that others can benefit from this tooling. We’d love you to get involved with the project, and create a collaborative community where we can share great ideas and build new, cool features together.
