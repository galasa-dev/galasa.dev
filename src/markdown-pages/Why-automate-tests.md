---
path: "/learn/why-automate"
title: "Why automate tests?"
---
The pressure to release quality software as quickly as possible has never been greater. To meet this demand, organizations are adopting, or looking to adopt, agile development techniques such as continuous integration and continuous delivery (CI and CD). The traditional waterfall approach is falling out of favour. Automated testing is key to being able to adopt an agile approach to development. If you aren’t running automated tests, you end up falling into waterfall mode, and cannot deliver changes quickly and reliably. 

Automated testing and agile delivery are traditionally seen as being available only in Cloud environments, but with the introduction of Galasa, you can be agile in a z/OS environment as well. Automated Testing on z/OS is not a myth, we have developed the tools to get us there and you can now build on our experience.    

### What makes a manual test a good candidate for automation?

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

### What makes a good Galasa test?

Simplify your automated tests by creating them as small, logical units of work, rather than large, complex tests which are difficult to understand and debug. Each test should test on aspect of the product and only that area. 

Each test method should be stand alone; you don't want your test method to rely on other test methods succeeding or failing. Using this approach means that if a test method fails, the error is isolated to that method and other methods aren't affected.

### Examples

Once you know which tests or parts of a test you want to automate, you can select the manager(s) you need. A table with the manager’s that are available with the current release is here. For example, if you want to automate a test to run a batch job by using JCL, you need to call the z/OS Batch Manager from within your test code. 

Here’s an example of a manual test written in COBOL that’s been converted into an automated Galasa test written in Java. You can find lots more sample tests that you can use to get you up and running here.

### Writing your own manager
If a suitable manager is not currently available with Galasa, check which managers are planned for future releases, or raise a request for one. Alternatively, you can write your own manager. If you’re writing your own manager, here are some helpful guidelines to get you started …
