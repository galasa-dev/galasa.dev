---
path: "/about"
title: "About Galasa"
---

Galasa is an open source deep integration test framework for teams looking to put more power into their testing practices. What makes it a *deep integration* test framework is its ability to support tests that cross system boundaries and reach into remote layers inaccessible to other test tools. 

Galasa has been architected to ensure that the routine, daily tasks of writing and executing tests are straightforward and well within the range of anyone with a little Java knowledge. The more complex parts of tests (such as provisioning) are abstracted into other system components that can be written by experts and easily distributed to the team.

If you've ever struggled to operationalize or automate the testing of complex systems, you may recognize the origins of your unrest among the some of the signs we've elicited from internal and external teams during our design process:

## Unreliable automated test systems 
Many organizations have little or no automated testing. Where such systems *are* used, they are often cited as unreliable and there is difficulty in booking test slots.

Galasa provides the capability to run reliable, repeatable tests and minimizes conflicts around the availability of test environments between teams. Running across Docker and Kubernetes adds scalability and resilience. Multiple tests can run in parallel without the need for individual virtual machines for each test instance. Running each test in its own logically isolated environment brings great reliability. 

## Lack of awareness between teams
Teams are not always aware of the tests another group is running, resulting in tests being duplicated or missed, and there is a lack of clarity around the level of regression testing that is undertaken.

With Galasa you can store related tests within a shared test catalog, from which tests can be automatically selected to run for any given change set. Automated regression test suites can be created for new software versions so you can run a specified set of tests for automated baselining of a new environment installation, such as a hardware migration. 

## Too much manual intervention 
Running and re-running manual tests is laborious, time consuming and not exactly the best use of a tester's skills or time. 

With Galasa you can automatically schedule and run these repetitive, manual tests and use the time saved to free up testers to spend their time designing test cases that are more likely to find important defects.

## Unreliable test data 
Test data is often in a state of flux, resulting in the breaking of existing tests and difficulty in snapshotting and rolling back data.

Galasa enables you to provision your own test data from scratch or find valid test data within an existing data lake. Test data is locked within the Galasa framework whilst in use, so that it cannot be corrupted by other test runs.

You can integrate Galasa tests with your existing test tooling, allowing you to share data between tools within the same test. 

## Difficult diagnostics
Test artifacts are stored in lots of different repositories, making it time-consuming and difficult to locate the right information to help you root out the cause of a failure.

Galasa will automatically store all test artifacts in a single, shared, central repository, making debugging quicker and easier. You can also run tests locally on your laptop with breakpoints, so you can step through each line of test code and examine the content of variables to find bugs fast. 

## Time-consuming tests 
Manual tests can contain a lot of repetitive, complex code which means they take too long to write and are hard to understand and maintain.

Galasa makes tests quicker to write and easier to maintain by moving the boilerplate code out of the tests. Simply import the components you need from within your test code to access the methods and functions that have been isolated and abstracted from the main body of your test code.

## Inconsistent communication 
Test results are often stored in spreadsheets and manually approved by product owners before changes are promoted. This makes it difficult to understand the tests that have been run, and the manual intervention required as part of the sign-off process can delay delivery.

Galasa's dashboard will integrate all of your test results in one place, making reporting, reviewing, and sign-off between test phases easy and consistent.

## Summary
Unreliable test data, manual testing and a manual approval process all add up to a development cycle that can’t be sped up without loss of confidence and increased risk. Application changes can take many months to reach production, and emergency fixes are promoted with only a sub-set of suitable tests exercised.

Test automation with Galasa will be key to delivering changes to your core applications quickly and successfully, helping you to delight your customers, fast. 

Galasa tests are not limited to testing mainframe-specific applications, so can be used to consolidate all application-based integration testing.





