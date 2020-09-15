---
path: "/docs/ecosystem/architecture"
title: "Architecture"
---

The Galasa ecosystem contains all the servers and monitors that are required to run Galasa tests in an automated environment or pipeline. 

The ecosystem is made up of a collection of microservices that orchestrate the Galasa runtimes, monitor tests and resources and provide clean-up of those resources if required. It provides a store for run configurations, a central location for all test results and test artifacts, and utilizes a REST endpoint that can be called from any IDE or pipeline. 

Expand the following sections to find out more about the key components of the Galasa ecosystem:

<details>
<summary>Galasa Stores</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Configuration Property Store**                       | The configuration property store (CPS) defines object properties, system configurations, topologies and definitions which instruct the way in which a Galasa test runs. For example, the port on which a terminal connects to an application or  default timeouts. Defining properties in the CPS enables tests to run against multiple environments without changing the code inside the test.         |
| **Dynamic Data Store**               | The dynamic data store (DSS) is used by Managers and the Galasa framework to ensure that limits set in the CPS configuration are not exceeded. DSS properties change dynamically as tests are run, to show the resources that are currently in use, shared or locked by a test, so that workloads can be limited to avoid throttling. When running in automation, the DSS is shared by every instance of the framework.                                                                 |
| **Result Archive Store**                      | The result archive store (RAS) stores all elements of a test, including the run log, stored artifacts such as requests, and properties that get changed in the DSS. These elements can be used to help diagnose the cause of any failures encountered as a result of running the test, or to gather information about the test.                                                                                                      |
| **Credentials Store**                   | The credentials store is hosted in the etcd server and securely provides the credentials, for example, password, username and authentication token that are required for a test to run in automation.    |
| **Certificate Store**      |                                                                  |

</details>


<details>
<summary>Galasa Servers</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Engine controller**                       | The Engine Controller is responsible for creating Docker containers or Kubernetes pods to manage and execute individual Galasa automation test runs. The engine controller schedules a test to run only when all the requirements needed to run the test are satisfied. Otherwise, the test is placed in a queue to be run at an appropriate time.       |
| **etcd**                       | The etcd server is a highly available key-value store which hosts the Configuration Property Store (CPS), the Dynamic Status Store (DSS) and the Credentials Store (CREDs). The CPS, DSS contain information that are used by all tests and the CREDs is used only for automation runs.  The etcd server stores and maintains a single, consistent source of the truth about the status of the ecosystem at any given point in time.       |
| **CouchDB**                       | This database runs inside Docker container or Kubernetes pod and contains the Result Archive Store (RAS).        |
| **Resource Management**                       | The Resource Management service handles the cleaning up and management of resources in Galasa. For example, if a test fails or ends abnormally, the Resource Management service cleans up the resources that were associated with that test run.      |
| **Metrics Server**                       | The Metrics server indicates the health of the ecosystem, for example, providing metrics on the number of successful test runs.        |
| **Framework API Server**                       | The API server is an API mediation layer which sits between the Galasa framework and Galasa services, such as the properties services in the CPS. The API server acts as a central point from which to control the Galasa ecosystem and is used by Galasa as an endpoint for submitting tests to the ecosystem and retrieving results. The API server hosts the Bootstrap server and the Manager API server.  >      |
| **Bootstrap Server**                       | The Bootstrap server is part of the Galasa API server. The bootstrap is an endpoint that is provided by the API server to store the initial configuration that is required to instantiate a Galasa framework. When setting up the Galasa ecosystem the Eclipse IDE is updated to point to the new bootstrap which is configured to use the ecosystem.      |
| **Manager API Server**                       | A Manger to Manger type API. The API is used to host web services that can be called from the Galasa Web UI or from external services such as Jenkins.     |
| **Web UI**                       | Use the WebUI to see a dashboard overview of the current and historical health of your test automation framework. The UI is also used to run, schedule or reschedule tests, to analyse output from failed test runs, and to manage the configuration needed to customise the test framework and the tests for maximum throughput, resilience and flexibility.        |
| **LDAP authentication server (Optional)**                       | This server is planned for a future release to provide the ability to authenticate through an LDAP server.       |

</details>

<details>
<summary>Code Deployment</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Maven Repositories and OBRs**                       | For tests to run in the ecosystem they require compiled artifacts to be hosted in a Maven repository. The artifacts must be bundled as an OSGI bundle -  Galasa provides a Maven plug-in to create these bundles.       |
| **Nexus**                       | A Nexus server enables deployment of Maven artifacts to the ecosystem and can be used to host  Docker images.     |

</details>

<details>
<summary>Optional reporting servers</summary>

|                                   |                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Prometheus**                       | The Prometheus server scrapes and stores metrics from defined endpoints from the Metrics server. These metrics can be displayed in a Grafana dashboard.   |
| **Grafana**                       | A dashboard for visualizing Prometheus metrics. Data can be explored through queries and drilldown.       |
| **Elastic**                       | Provides an Elastic search instance to record the results of automated test runs.        |
| **Kabana**                       | A dashboard for visualizing Elasticsearch metrics. Data can be explored through queries and drilldown.       |

</details>
