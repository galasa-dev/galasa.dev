---
path: "/docs/ecosystem"
title: "The Galasa Ecosystem"
---

SimBank showcases how the Galasa framework can run inside a locally hosted JVM. Local runs create their own Galasa property files to act as configurational services, making it easy to instantiate and run tests. 

To run automated testing away from your workstation, you need to set up a Galasa ecosystem.  Running testing within this ecosystem provides significant benefits:

### Benefits of using the Galasa ecosystem

- <b> Scalability</b><br>
When run inside the ecosystem, the Galasa framework enables horizontal scaling and the ability to run large numbers of tests in parallel, meaning that you can complete more testing in a shorter time frame. The ability to run tests at scale is one of the key features that differentiates Galasa from other test frameworks. 

- <b>Re-usability</b><br> 
 Galasa configurations are maintained in a single location (the configuration property store) and can be shared across the organization for use by other tests.  Setting these properties centrally establishes a single source of truth and means that testers do not need to configure these properties each time they write a new test. With Galasa, one person completes the configurations that are used across test runs. Test run results, run logs and artifacts are also stored in one location and are easily shared across teams.
 
 - <b>Testing as a service</b><br> 
 With an established Galasa ecosystem you can run your testing as a service; regression tests, application tests, system verification tests and time-consuming adhoc tests can be run on demand using Galasa as part of your DevOps pipeline and in a cloud environment. Data can be locked whilst in use, preventing cross contamination with other running tests. 

- <b>Automated test runs</b><br> 
The Galasa test catalog can be used as part of the ecosystem to run automated testing away from your workstation without the need for local test material. It provides the ability to store related tests within a shared test catalog, and to automatically select tests to run for any given change set. Automated regression test suites can be created for new software versions, so you can run a specified set of tests for automated baselining of a new environment installation, such as a hardware migration. 


### What makes up the Galasa ecosystem? 

The Galasa Ecosystem contains all the servers and monitors that are required to run Galasa tests in an automated environment or pipeline. 

The ecosystem is made up of a collection of microservices that orchestrate the Galasa runtimes, monitor tests and resources and provide clean-up of those resources if required. It provides a store for run configurations, a central location for all test results and test artifacts, and utilizes a REST endpoint that can be called from any IDE or pipeline. 

Expand the following sections to find out more about the key components of the Galasa ecosystem:

<details>
<summary>Galasa Stores</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Configuration Property Store**                       | The configuration property store (CPS) defines object properties, system configurations, topologies and definitions which instruct the way in which a Galasa test runs. For example, the port on which a terminal connects to an application or  default timeouts. Defining properties in the CPS enables tests to run against multiple environments without changing the code inside the test.         |
| **Dynamic Data Store**               | The dynamic data store (DSS) is used by Managers and the Galasa framework to ensure that limits set in the CPS configuration are not exceeded. DSS properties change dynamically as tests are run, to show the resources that are currently in use, shared or locked by a test, so that workloads can be limited to avoid throttling. When running in automation, the DSS is shared by every instance of the framework.                                                                 |
| **Result Archive Store**                      | The result archive store (RAS) stores all elements of a test, including the run log, stored artifacts such as requests, and properties that get changed in the DSS. These elements can be used to help diagnose the cause of any failures encountered as a result of running the test, or to gather information about the test.                                                                                                      |
| **Credentials Store**                   | tbc |
| **Certificate Store** | tbc                                                                                  |

</details>


<details>
<summary>Galasa Servers</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Engine controller**                       | The Engine Controller is responsible for spinning up docker containers to execute individual Galasa automation runs.        |
| **etcd**                       | Contains the Configuration Property Store (CPS), the Dynamic Status Store (DSS) and the Credentials Store (CREDs). The CPS, DSS are for use with by all users, the CREDs are for automation runs only.        |
| **couchdb**                       | Contains the Result Archive Store (RAS) which contains the full record of an automated run.        |
| **Resource Monitor**                       | The Resource Monitor service handles the cleaning up and management of resources in Galasa.        |
| **Metrics Server**                       | A metrics server to indicate the health of the ecosystem to a Prometheus server. A Prometheus server scrapes and stores metrics from defined endpoints.       |
| **Bootstrap Server**                       | The Galasa API server which includes the bootstrap       |
| **Framework API Server**                       | The API server is an API mediation layer which sits between the Galasa framework and Galasa services, such as the properties services in the CPS. The API server acts as a central point from which to control the Galasa ecosystem.        |
| **Manager API Server**                       | A Manger to Manger type API. The API is used for web services that can be called from the Galasa web UI or from external services like Jenkins. Visual Studio Code will use a lot of the Core APIs to communicate with the Galasa ecosystem, whilst Eclipse will use the SPI as we can load the framework into Eclipse.        |
| **Web UI**                       | tbc        |
| **LDAP authentication server (Optional)**                       | tbc        |

</details>

<details>
<summary>Code Deployment</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Maven Repositories and OBRs**                       | tbc        |
| **Nexus**                       | A Nexus server to provide an easy entry for deploying Maven artifacts to the ecosystem.        |

</details>

<details>
<summary>Optional reporting servers</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Prometheus**                       | A Prometheus server to record the health metrics of the ecosystem       |
| **Grafana**                       | A dashboard for the Prometheus metrics       |
| **Elastic**                       | Provides an Elastic search instance to record the results of automated test runs        |
| **Kabana**                       | A dashboard for the Elastic search database        |

</details>
