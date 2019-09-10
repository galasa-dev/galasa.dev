---
path: "/about"
title: "About Galasa"
---

We’ve been doing some research into the way in which mainframe applications outside of IBM are developed, tested and delivered. As part of this research, we gained insights into the testing process and the problems faced by the teams responsible for validating the quality of  application code changes. 

We found several common problems across organizations and we believe Galasa is the key to solving them. 

## Unreliable automated test systems 
Over 90% of organizations have little or no automated testing. If automated test systems were used, they were often cited as unreliable and there was difficulty in booking test slots.

Galasa minimizes conflict between teams for test environments. Running the test framework in Docker and Kubernetes adds scalability and resilience. Multiple tests can be run in parallel without the need for individual virtual machines for each test instance. Running each test in its own logically isolated environment adds reliability. 

## Lack of awareness between teams
Teams are not always aware of the tests another group is running, resulting in tests being duplicated or missed, and there is a lack of clarity around the level of regression testing that is undertaken.

With Galasa you can store related tests within a shared test catalog, from which tests can be automatically selected to run for any given change set. You can create automated regression test suites for new software versions and run a specified set of tests for automated baselining of a new environment installation, such as a hardware migration. 

## Too much manual intervention 
Running and re-running manual tests is laborious, time consuming and not exactly the best use of a tester's skills or time. 

Use Galasa to automatically schedule and run these repetitive, manual tests and use the time saved to free up testers to spend their time designing test cases that are more likely to find important defects.

## Unreliable test data 
Test data is often in a state of flux, resulting in the breaking of existing tests and difficulty in snapshotting and rolling back data.

Galasa enables you to provision your own test data from scratch or find valid test data within an existing data lake. Test data is locked within the Galasa framework whilst in use, so that it cannot be corrupted by other test runs.

You can integrate Galasa tests with your existing test tooling, allowing you to share data between tools within the same test. 

## Difficult diagnostics
Test artifacts are stored in lots of different repositories, making it time-consuming and difficult to locate the right information to help you root out the cause of a failure.

Galasa automatically stores all test artifacts in a single, shared, central repository, making debugging quicker and easier. You can also run tests locally on your laptop with breakpoints, so you can step through each line of test code and examine the content of variables to find bugs fast. 

## Time-consuming tests 
Manual tests can contain a lot of repetitive, complex code which means they take too long to write and are hard to understand and maintain.

Galasa make tests quicker to write and easier to maintain by moving the boilerplate code out of the tests and into Managers. Simply call the Managers you need from within your test code to access the methods and functions that are provided by each Manager during the test run.

## Inconsistent communication 
Test results are stored in spreadsheets and are manually approved by product owners before the change is promoted. This makes it difficult to understand the tests that have been run, and the manual intervention required as part of the sign-off process can delay delivery.

Galasa's dashboard integrates all your test results in one place, making reporting, reviewing, and sign-off between test phases easy and consistent.

## Summary
Unreliable test data, manual testing and a manual approval process all add up to a development cycle that can’t be sped up without loss of confidence. Application changes take many months to reach production, and emergency fixes are promoted with only a sub-set of suitable tests exercised.

Test automation with Galasa is key to delivering changes to your core applications quickly and successfully, helping you to delight your customers, fast. 

Galasa tests are not limited to testing mainframe-specific applications, so can be used to consolidate all application-based integration testing.





