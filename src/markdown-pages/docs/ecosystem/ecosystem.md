---
path: "/docs/ecosystem"
title: "The Galasa Ecosystem"
---

To realise the full power of Galasa, you need to run your tests inside a Galasa ecosystem. The ecosystem enables you to run automated testing away from your workstation. 


Running tests within a local JVM is a useful technique, but there are distinct limitations of this approach. This section aims to explain situations where using the local JVM technique is viable, and where tests need to run using a Galasa ecosystem.

Running tests locally on a JVM is useful during the development of a test. You can change, test, check and improve the test code in short, repeatable cycles to make rapid improvements.  

The same local-JVM technique is also useful when running tests in automation, perhaps as part of a CI/CD pipeline to test code that is just deployed. For example, from within a Jenkins, Tekton or GithHub actions pipeline. You can also use the technique when running tests as a cron job or scheduled batch job, but ensure tht you can store results, logs and dynamic resource configurations in a location that is accessible outside of those automated systems.


The SimBank tests showcase how the Galasa framework can run inside a locally hosted JVM. Local runs use their own Galasa property files to act as configurational services, making it easy to instantiate and run tests. 

However, there are limitations to taking a local-only approach:

- Configuration settings, test results and test artifacts are stored locally, so cannot be shared across teams and systems

Management of configurations in multiple places where tests are run can cause problems when tests are run locally.
Changing configuration parameters and keeping them in-sync across multiple systems adds to the overheads of maintaining test infrastructure. Storing shared configuration data in the Galasa ecosystem establishes a single source of truth in one place and also means that testers do not need to know about or configure these properties each time they write a new test.

Running tests locally also presents a challenge when you want to share the results of tests with others, or have others debug problems that the tests find. Using the Galasa ecosystem means tht you can grant others access to test runs and enable run artifacts to be inspected independently.

Another problem faced in large-scale use of the local JVM method of test invocation is how to gather test results from disparate machines or environments, so that the test results can be combined and form test reports for system health monitoring. This is something that running tests within a Galasa ecosystem handles well, as the results of each test are stored centrally.


- Scaling capabilities are limited by workstation resources

If you are able to dynamically provision a system to target with tests, then running tests from a local JVM can work very well, as the system under test may have fewer resource constraints, and could be used exclusively by the tests, then de-provisioned. 

However, if you want to run many tests in parallel, you cannot do so reliably from a single system using the local-JVM method on one user account. Any contention to name test runs uniquely, or other stateful changes in the test framework might clash, over-write each other, fail or produce unexpected results. Running multiple tests in series can avoid some of these issues but running in large number of tests in this way can take a long time.
Scaling out to use this technique on multiple machines might help, with tests running sequentially from each 

To reliably run many tests in parallel, deploy your tests to the Galasa ecosystem, letting the ecosystem manage the test runs, and the Galasa Manager components manage any shared or constrained resources.


- Monitoring and Management features are not available, for example, test streams and the test catalog and dashboarding capabilities  

When you run your tests in the Galasa ecosystem, resources are cleaned up during abnormal test exit conditions. When a local-JVM test is interrupted, at the point of interruption the test might have allocated the exclusive use of resources within the system under test. If the test is stopped prematurely, the Manager code that handles the clean-up of the allocated resources might not run, so the resources may not be cleaned up. Over time this can result in performance degradation of the system under test.



### Benefits of using the Galasa Ecosystem

The Galasa ecosystem is a cloud native application which exposes a sequence of microservices that are used to manage the set of running tests. Running tests inside the ecosystem provides a number of benefits:

- <b>Sharing tests across an enterprise</b><br>
When tests run inside the ecosystem, the Galasa framework provides the ability to scale horizontally to run large numbers of tests in parallel - enabling more testing to complete in a shorter timeframe. The ability to run tests at scale is one of the key features that differentiates Galasa from other test frameworks. Data is locked whilst in use, preventing cross contamination with other running tests. 

- <b>Re-usability</b><br> 
 With Galasa, one person can complete the configurations for use across all test runs. Galasa configurations are maintained in a single location - the Configuration Property Store (CPS) and so can be shared across an organization for use by other tests.  Setting these properties centrally establishes a single source of truth and means that testers do not need to know about or configure these properties each time they write a new test. Test run results, run logs and artifacts are also stored in one central location, again enabling sharing across teams.
 
 - <b>Testing as a service</b><br> 
 With an established Galasa ecosystem you can run your testing as a service; regression tests, application tests, system verification tests and time-consuming adhoc tests can be run on demand by using Galasa as part of your DevOps pipeline and in a cloud environment. Workload is directed away from the CI pipeline and is run in its own dedicated environment, preventing computational resources from being diverted away from other jobs that are running within the pipeline. 

- <b>Automated test runs</b><br> 
The Galasa test catalog can be used as part of the ecosystem to run automated testing away from a workstation without the need for local test material. The catalog can be configured to store related tests within a shared test catalog, enabling tests to be automatically selected to run for any given change set. The test catalog uses the latest version of test cases, so you know the tests that you're running are up-to-date.


