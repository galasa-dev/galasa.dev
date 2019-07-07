---
path: "/learn/what-and-why"
title: "What is Voras and why do I need it?"
---
***WIP***
Testing an endpoint, whether it be a 3270 terminal, a REST API or a web service is a simple operation and there are plenty of tools that enable you to accomplish this task.  However, there are  limitations to some of these tools:

-	Most of these tools need to be manually operated and so limit their effectiveness in a CI/CD pipeline
-	The tools cannot contextually bind to either a provisioned, or pre-existing environment in an intelligent manner.
-	The tests cannot utilise a mix of technologies.  For example, let’s say you need to examine a CICS or a z/OS resource to validate that the response from the REST endpoint you are testing is correct.  How can the test get this information without the tester having to understand how to access this information?

Voras makes it simple for a test to access, drive and interrogate a range of z/OS, distributed and open source tools and integrate them together within the same test class. 

-	Tests written for Voras can be run both locally on your computer or in automation and be triggered from a CI/CD pipeline
-	Voras provides a test catalog that is dynamically built from your tests, this means that your CI pipeline can always execute the most up-to-date version of the tests.
-	Voras achieves these goals by using its Managers, which provide this capability to both the test class and to other Managers within the Voras Framework.

Voras is a great fit for automating a wide set of test disciplines such as functional and system level tests.  However, its biggest benefit is that it can be used to create integration level tests.
Voras provides the capability to functionally test a range of interfaces from traditional 3270 through to web browser and Selenium-based tests.  
Voras integrates with open source test tooling such as Selenium and JMeter to allow tests that use these tools to integrate and be executed and reported alongside your other tests.
Voras integrates with z/OS enabling any test to aggregate information from a range of sources to verify the result of a test case.

