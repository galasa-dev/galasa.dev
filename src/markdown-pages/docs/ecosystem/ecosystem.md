---
path: "/docs/ecosystem"
title: "The Galasa Ecosystem"
---

SimBank showcases how the Galasa framework can run inside a locally hosted JVM. Local runs use their own Galasa property files to act as configurational services, making it easy to instantiate and run tests. 

However, there are limitations to taking a local-only approach:

- Configuration settings and test results cannot be shared across teams
- Tests cannot be run headlessly, meaning you need to keep the workstation active
- Scaling capabilities are limited by workstation resources
- Monitoring and Management features are not available, for example, the test catalog, test streams and dashboarding capabilities   


To realise the full power of Galasa, you need to create a Galasa ecosystem.  Running testing within a Galasa ecosystem provides significant benefits:

### Benefits of using the Galasa ecosystem

- <b>Sharing tests across an enterprise</b><br>
When run inside the ecosystem, the Galasa framework enables horizontal scaling and the ability to run large numbers of tests in parallel, meaning that you can complete more testing in a shorter time frame. Data can be locked whilst in use, preventing cross contamination with other running tests. The ability to run tests at scale is one of the key features that differentiates Galasa from other test frameworks. 

- <b>Re-usability</b><br> 
 Galasa configurations are maintained in a single location (the configuration property store) and can be shared across the organization for use by other tests.  Setting these properties centrally establishes a single source of truth and means that testers do not need to configure these properties each time they write a new test. With Galasa, one person completes the configurations that are used across test runs. Test run results, run logs and artifacts are stored in one location and so are easily shared across teams.
 
 - <b>Testing as a service</b><br> 
 With an established Galasa ecosystem you can run your testing as a service; regression tests, application tests, system verification tests and time-consuming adhoc tests can be run on demand using Galasa as part of your DevOps pipeline and in a cloud environment. Workload is directed away from the Jenkins node and is run in its own scalable environment. This prevents the diversion of computational resources away from other jobs that are running within the pipeline. 

- <b>Automated test runs</b><br> 
The Galasa test catalog can be used as part of the ecosystem to run automated testing away from your workstation without the need for local test material. It provides the ability to store related tests within a shared test catalog, and to automatically select tests to run for any given change set. Automated regression test suites can be created for new software versions, so you can run a specified set of tests for automated baselining of a new environment installation, such as a hardware migration. 


