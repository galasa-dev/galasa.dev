---
path: "/docs/ecosystem"
title: "The Galasa Ecosystem"
---

To realise the full power of Galasa, you need to run your tests inside a Galasa ecosystem.

SimBank showcases how the Galasa framework can run inside a locally hosted JVM. Local runs use their own Galasa property files to act as configurational services, making it easy to instantiate and run tests. 

However, there are limitations to taking a local-only approach:

- Configuration settings and test results cannot be shared across teams
- Tests cannot be run headlessly, so the workstation must be kept active 
- Scaling capabilities are limited by workstation resources
- Monitoring and Management features are not available, for example, test streams and the test catalog and dashboarding capabilities   


### Benefits of using the Galasa ecosystem

- <b>Sharing tests across an enterprise</b><br>
When run tests inside the ecosystem, the Galasa framework provides the ability to scale horizontally to run large numbers of tests in parallel - enabling more testing to complete in a shorter timeframe. The ability to run tests at scale is one of the key features that differentiates Galasa from other test frameworks. Data is locked whilst in use, preventing cross contamination with other running tests. 

- <b>Re-usability</b><br> 
 With Galasa, one person completes the configurations for use across all test runs. Galasa configurations are maintained in a single location - the Configuration Property Store (CPS) and so can be shared across an organization for use by other tests.  Setting these properties centrally establishes a single source of truth and means that testers do not need to know about or configure these properties each time they write a new test. Test run results, run logs and artifacts are also stored in one central location, again enabling sharing across teams.
 
 - <b>Testing as a service</b><br> 
 With an established Galasa ecosystem you can run your testing as a service; regression tests, application tests, system verification tests and time-consuming adhoc tests can be run on demand by using Galasa as part of your DevOps pipeline and in a cloud environment. Workload is directed away from the Jenkins node and is run in its own scalable environment, preventing computational resources from being diverted away from other jobs that are running within the pipeline. 

- <b>Automated test runs</b><br> 
The Galasa test catalog can be used as part of the ecosystem to run automated testing away from a workstation without the need for local test material. The catalog can be configured to store related tests within a shared test catalog, enabling tests to be automatically selected to run for any given change set. For example, automated regression test suites can be created for new software versions, so you can run a specified set of tests for automatic baselining of a new environment installation, such as a hardware migration. 


