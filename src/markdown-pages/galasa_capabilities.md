---
path: "/docs/introduction"
title: "Why choose Galasa?"
---

### Introduction
The pressure to release quality software as quickly as possible has never been greater. To meet this demand, organizations are adopting, or looking to adopt, agile development techniques such as continuous integration and continuous delivery (CI and CD). The traditional waterfall approach is falling out of favour. Automated testing is key to being able to adopt an agile approach to development. If you aren’t running automated tests, you end up falling into waterfall mode, and cannot deliver changes quickly and reliably. 

Automated testing and agile delivery are traditionally seen as being available only in Cloud environments, but with the introduction of Galasa, you can be agile in a z/OS environment as well. Automated Testing on z/OS is not a myth, we have developed the tools to get us there and you can now build on our experience.    

### Benefits
Testing an endpoint, whether it be a 3270 terminal, a REST API or a web service is a simple operation and there are plenty of tools that enable you to accomplish this task.  However, there are  limitations to some of these tools:

-	Most of these tools need to be manually operated and so limit their effectiveness in a CI/CD pipeline
-	The tools cannot contextually bind to either a provisioned, or pre-existing environment in an intelligent manner.
-	The tests cannot utilise a mix of technologies.  For example, let’s say you need to examine a CICS or a z/OS resource to validate that the response from the REST endpoint you are testing is correct.  How can the test get this information without the tester having to understand how to access this information?

Galasa makes it simple for a test to access, drive and interrogate a range of z/OS, distributed and open source tools and integrate them together within the same test class. 

-	Tests written for Galasa can be run both locally on your computer or in automation and be triggered from a CI/CD pipeline
-	Galasa provides a test catalog that is dynamically built from your tests, this means that your CI pipeline can always execute the most up-to-date version of the tests.
-	Galasa achieves these goals by using its Managers, which provide this capability to both the test class and to other Managers within the Galasa Framework.

Galasa has benefits over and above other similar tooling:

- it's a great fit for automating a wide set of test disciplines such as functional and system level tests. However, its biggest benefit is that it can be used to create integration level tests.
- it provides the capability to functionally test a range of interfaces from traditional 3270 through to web browser and Selenium-based tests.  
- it integrates with open source test tooling such as Selenium and JMeter to allow tests that use these tools to integrate and be executed and reported alongside your other tests.
- it integrates with z/OS enabling any test to aggregate information from a range of sources to verify the result of a test case.

### A good candidate for automation?

Moving from manual to automated testing, minimizes the need to code mundane, repetitive tasks within numerous test scripts. Testers' time can be freed up, providing the option to focus on more advanced testing techniques, for example ad hoc or exploratory testing, or on developing application features that are currently languishing on the backlog.

So, how do you decide which manual test to automate first? Good candidates include tests that are run frequently or that are required by many test cases. Examples might include the following types of test:

- test that are run on a regular basis, for example regression tests
- tests that connect to an existing test environment
- tests that involve environment set up and tear down 
- screen-scraping tests
- tests that take a significant amount of time to run manually
- tasks that are repetitive or that cover complex areas (these areas are often prone to human error)
- data entry tests, including test that need multiple data inputs, or large amounts of data
- tests that must be scheduled to manage throughput and provide bottlenecks for specific resources, hosts or platforms 
- mixed mode tests, for example, tests using a 3270 terminal, batch files and a web service 
- tests that are difficult to perform manually, such as concurrency or performance tests
- tests running on more than one build, or on multiple software and hardware configurations
- tests that generate consistent expected results
- tests that generate results which need to be viewed and diagnosed. For example, do you need to filter the tests that you want to view by application version.

### Architecting your Galasa tests

Some points to consider when you’re thinking about your strategy for automating your manual tests by using Galasa:

1.	Make the writing of automated tests as easy as possible. The easier a test is to write, the more likely the tests will be good ones. There are some examples of **automated tests here** that you can copy and then edit to fit your requirements.
1.	Keep the amount of boiler plate code in a test class small. This approach makes the code much easier to maintain and minimizes the amount of potentially redundant code being copied and pasted into test classes. Look at some examples of **test class code here**. 
1.	Ensure the framework is set up to gather diagnostic information on behalf of the test.  There's nothing worse than a test failing and not having the right diagnostics to work out the cause. For examples of setting up the framework, check out the **configuring documentation**.
1.	Although focusing on the golden path tests might be the first set of tests you automate, don't stop there.  Writing tests that attempt to force errors and drive error paths within your applications are likely to expose interesting bugs. In this **sample test**, the code forces an application error. 
1.	Structure your collection of tests so that it’s easy to identify the set of tests that need to run at any given phase. It might seem like overkill at the time, but when you need to run lots of tests in parallel you’ll be thankful you did it. You can find examples of tagged tests in the **sample documentation**.
1.	Don’t let tests be dependent on hard-coded information, for example endpoint, environment or file path information. Instead, extract this type of information into a variable that the Galasa framework controls. Here’s an example of **a Galasa test where the environment information has been extracted out**.
1.  Each test method should be stand alone; you don't want your test method to rely on other test methods succeeding or failing. Using this approach means that if a test method fails, the error is isolated to that method and other methods aren't affected.


### Examples

Once you know which tests or parts of a test you want to automate, you can select the manager(s) you need. A table with the manager’s that are available with the current release is here. For example, if you want to automate a test to run a batch job by using JCL, you need to call the z/OS Batch Manager from within your test code. 

Here’s an example of a manual test written in COBOL that’s been converted into an automated Galasa test written in Java. You can find lots more sample tests that you can use to get you up and running here.

