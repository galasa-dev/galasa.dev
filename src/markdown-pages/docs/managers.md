---
path: "/docs/managers"
title: "Managers"
---

## Managers provided with the current Galasa distribution

| Name | Description | 
| :------------------------ | :------------------------------------- | 
| **Artifact Manager**<br> ![release](../../images/release.svg)| Provides access to resources within a test bundle. It also provides templating services.|
| **Core Manager**<br> ![release](../../images/release.svg) | Provides tests with access to some of the most common features within the Galasa framework, such as the ability to retrieve credentials and the name of the test run. |
| **[Docker Manager](/docs/managers/docker-manager)**<br> ![beta](../../images/beta.svg) | Enables containers to run on infrastructure Docker engines - either for testing directly or for assisting the testing process. |
| **[ElasticLog Manager](/docs/managers/elasticlog-manager)**<br> ![alpha](../../images/alpha.svg) | Exports test results to ElasticSearch, which can be subsequently used within Kabana dashboards. |
| **[Galasa Ecosystem Manager](/docs/managers/galasa-ecosystem-manager)** <br>![alpha](../../images/alpha.svg) | Deploys an entire Galasa ecosystem to Kubernetes to enable integration testing against Galasa. |
| **HTTP Client Manager**<br> ![beta](../../images/beta.svg) | Provides a common setup of HTTP client operations for the test (or a Manager) to use. |
| **IP Network Manager**<br> ![alpha](../../images/alpha.svg) | Provides configuration information for IP-based servers. |
| **[Kubernetes Manager](/docs/managers/kubernetes-manager)**<br> ![alpha](../../images/alpha.svg) | Provisions Kubernetes namespaces for tests (or Managers) to use. |
| **Linux Manager**<br> ![alpha](../../images/alpha.svg) | Provides Linux server configuration properties. Drives provisioning by other Managers such as the OpenStack Manager. |
| **OpenStack Manager**<br> ![alpha](../../images/alpha.svg) | Provisions servers within OpenStack. This Manager currently only supports Linux and provides the servers via the Linux Manager. |
| **z/OS 3270 Manager**<br> ![alpha](../../images/alpha.svg)| Provides tests and Managers with a 3270 client.|
| **z/OS Batch Manager**<br> ![release](../../images/release.svg) | Provides tests and Managers with the ability to submit, monitor and retrieve z/OS batch jobs. See [BatchAccountsOpenTest](/docs/running-simbank-tests/batch-accounts-open-test) for a walkthrough of a test that employs this Manager. | 
| **z/OS Console Manager**<br> ![release](../../images/release.svg) | Allows tests and Managers to use z/OS console commands. |
| **z/OS File Manager**<br> ![release](../../images/release.svg) | Provides tests and Managers with the ability to transfer files to and from z/OS. Supported file types include Sequential, PDS, PDSE or KSDS. |
| **z/OS Manager**<br> ![release](../../images/release.svg) | Provides tests and Managers with configuration information about z/OS images and Sysplexes. It offers services such as APF, DUMP, SMF and Log access. |   
| **z/OS PT Manager**<br> ![release](../../images/release.svg) | Provides tests and Managers with access to z/OS PT. It is used by the Batch, File and Console Managers. | 


| Key |   | 
| :------------------------ | :------------------------------------- | 
| ![alpha](../../images/alpha.svg)| This Manager is being actively developed. It is subject to change and has not been extensively tested.|
| ![beta](../../images/beta.svg)| This Manager is feature complete but may contain known or unknown bugs.|
| ![release](../../images/release.svg)| This Manager is feature complete, has passed all tests and is deemed release grade.|


## Future Managers

| Name | Description | 
| ------------------------ | :------------------------------------- | 
| **AIX Manager** | Provisions AIX server configuration properties, and helps drive provisioning by other Managers such as the OpenStack Manager.|
| **Artifactory Manager** | Provides the ability to retrieve artifacts from Artifactory servers. |
| **CECI Manager** | Provides CECI 3270 interaction - initially supporting containers and link programs.|
| **CEMT Manager** | Provides CEMT 3270 interaction.|
| **CICS SFR Manager** | Configures Service Flow Runtime instances in CICS TS servers.|
| **CICS TS Manager** | Provides configuration information for pre-existing CICS TS servers. Drives provisioning services from other managers, e.g. z/OS PT.|
| **CICS z/OS PT Provisioning Manager** | Provisions CICS TS servers for the CICS TS Manager.|
| **GitHub Manager** | Enables tests to retrieve artifacts from GitHub and enables test results to be influenced by the status of issues.|
| **GitLab Manager** | Enables tests to retrieve artifacts from GitLab and enables test results to be influenced by the status of issues.|
| **IMS DB Manager** | Provisions and configures IMS DB subsystems.|
| **IMS TM Manager** | Provisions and configures IMS TM subsystems.|
| **ISPF Manager** | Provides a wrapper for the z/OS 3270 Manager to run ISPF sessions.|
| **JMeter Manager** | Configures and runs JMeter testing via Docker containers.|
| **Liberty Manager** | Provisions and configures Liberty servers.|
| **MongoDB Manager** | Provisions and configures MongoDB databases via Docker containers.|
| **Nexus Manager** | Provides the ability to retrieve artifacts from Nexus servers.|
| **OpenLDAP Manager** | Provides and configures OpenLDAP servers via Docker containers.|
| **RTC Manager** | Enables tests to retrieve artifacts from RTC, and allows test results to be influenced by the status of defects.|
| **Selenium Manager** | Allows tests to drive Web Browser testing using Selenium.|
| **TSO Manager** | Provides a wrapper for the z/OS 3270 Manager to run TSO sessions.|
| **UrbanCode Manager** | Provisions and configures UrbanCode servers.|
| **WAS Manager** | Provisions and configures Websphere Application Servers.|
| **Windows Manager** | Provides Windows server configuration properties, driving provisioning by other Managers such as the OpenStack Manager.|
| **WSIM Manager** | Provisions and configures Workload Simulator servers.|
| **z/Linux Manager** | Provides z/Linux server configuration properties, and drives provisioning by other Managers such as the z/VM Manager.|
| **z/OS Connect Manager** | Provides configuration information for z/OS Connect instances, and provisions z/OS Connect instances.|
| **z/OS DB2 Manager** | Providing configuration information to DB2 instances, this Manager also provisions DB2 instances and schemas.|
| **z/OS MQ Manager** | Provisions and configures z/OS MQ subsystems.|
| **z/OS Security Manager** | Creates and maintains userids and profiles in RACF.|
| **z/VM Manager** | Provisions and configures z/VM userids, mainly for provisioning z/OS and z/Linux systems.|
| **ZOWE Manager** | Provides configuration information for and provisions ZOWE instances.|
