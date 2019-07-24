---
path: "/about/automation"
title: The benefits of test automation with Galasa"
---

### What is the benefit of test automation?
<p>The pressure to release quality software as quickly as possible has never been greater. As a result, the traditional 
waterfall approach is falling out of favour. Automated testing is key to adopting an agile approach to development. If you aren’t running automated tests, you end up falling into waterfall mode, and cannot deliver changes quickly and reliably. </p>

### Why automate with Galasa?
<p>Automated testing and agile delivery are traditionally seen as being available only in Cloud environments, but with the introduction of Galasa, you can be agile in a z/OS environment as well. Automated Testing on z/OS is not a myth, we have developed the tools to get us there and you can now build on our experience. </p> 

<b>Benefits of Galasa</b>
- A great fit for automating a wide set of test disciplines such as functional and system level tests. However, its biggest benefit is that it can be used to create integration level tests.
- Provides the capability to functionally test a range of interfaces from traditional 3270 through to web browser and Selenium-based tests.  
- Integrates with open source test tooling such as Selenium and JMeter to allow tests that use these tools to integrate and be executed and reported alongside your other tests.
- Integrates with z/OS enabling any test to aggregate information from a range of sources to verify the result of a test case.

<b>Targetted testing without limitations</b>
<p>Testing an endpoint, whether it be a 3270 terminal, a REST API or a web service is a simple operation and there are plenty of tools 
that enable you to accomplish this task.  However, there are  limitations to some of these tools:</p>

-	Most of the tools need to be manually operated and so limit their effectiveness in a CI/CD pipeline
-	The tools cannot contextually bind to either a provisioned, or pre-existing environment in an intelligent manner.
-	The tests cannot utilise a mix of technologies.  For example, let’s say you need to examine a CICS or a z/OS resource to validate that 
the response from the REST endpoint you are testing is correct.  How can the test get this information without the tester having to
understand how to access this information?

<p>Galasa makes it simple for a test to access, drive and interrogate a range of z/OS, distributed and open source tools and integrate them 
together within the same test class. </p>

```Tests written for Galasa can be run both locally on your computer or in automation and be triggered from a CI/CD pipeline```

```Galasa provides a test catalog that is dynamically built from your tests, this means that your CI pipeline can always execute the most up-to-date version of the tests.```




