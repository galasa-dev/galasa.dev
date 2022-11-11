---
path: "/docs/managers"
title: "Managers"
---

You can find the links to the Javadoc API documentation for all the Galasa Managers on the <a href="https://javadoc.galasa.dev/" target="_blank"> overview page</a>.<br>

You can view the <a href="https://github.com/galasa-dev/managers/tree/main/galasa-managers-parent" target="_blank"> installation verification tests (IVTs)</a> for the Managers in GitHub.<br>

## Managers provided with the current Galasa distribution

### Key

Each Manager is tagged with one of the follow readiness indicators:
- ![alpha](../../images/alpha.svg) This Manager is being actively developed. It is subject to change and has not been extensively tested.<br/>
- ![beta](../../images/beta.svg) This Manager is almost ready. It has been tested and the TPI is stable, but there may be minor changes to come.<br/>
- ![release](../../images/release.svg) This Manager is feature complete, has passed all tests and is deemed release grade.

## Future Managers

| Name                                  | Description                                                                                                                          |
| ------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **AIX Manager**                       | Provisions AIX server configuration properties, and helps drive provisioning by other Managers such as the OpenStack Manager.        |
| **Artifactory Manager**               | Provides the ability to retrieve artifacts from Artifactory servers.                                                                 |
| **CICS z/OS PT Provisioning Manager** | Provisions CICS TS servers for the CICS TS Manager.                                                                                  |
| **GitHub Manager**                    | Enables tests to retrieve artifacts from GitHub and enables test results to be influenced by the status of issues.                   |
| **GitLab Manager**                    | Enables tests to retrieve artifacts from GitLab and enables test results to be influenced by the status of issues.                   |
| **IMS DB Manager**                    | Provisions and configures IMS DB subsystems.                                                                                         |
| **IMS TM Manager**                    | Provisions and configures IMS TM subsystems.                                                                                         |
| **ISPF Manager**                      | Provides a wrapper for the z/OS 3270 Manager to run ISPF sessions.                                                                   |
| **Liberty Manager**                   | Provisions and configures Liberty servers.                                                                                           |
| **MongoDB Manager**                   | Provisions and configures MongoDB databases via Docker containers.                                                                   |
| **Nexus Manager**                     | Provides the ability to retrieve artifacts from Nexus servers.                                                                       |
| **OpenLDAP Manager**                  | Provides and configures OpenLDAP servers via Docker containers.                                                                      |
| **RTC Manager**                       | Enables tests to retrieve artifacts from RTC, and allows test results to be influenced by the status of defects.                     |
| **TSO Manager**                       | Provides a wrapper for the z/OS 3270 Manager to run TSO sessions.                                                                    |
| **UrbanCode Manager**                 | Provisions and configures UrbanCode servers.                                                                                         |
| **WAS Manager**                       | Provisions and configures Websphere Application Servers.                                                                             |
| **Windows Manager**                   | Provides Windows server configuration properties, driving provisioning by other Managers such as the OpenStack Manager.              |
| **WSIM Manager**                      | Provisions and configures Workload Simulator servers.                                                                                |
| **z/Linux Manager**                   | Provides z/Linux server configuration properties, and drives provisioning by other Managers such as the z/VM Manager.                |
| **z/OS Connect Manager**              | Provides configuration information for z/OS Connect instances, and provisions z/OS Connect instances.                                |
| **z/OS DB2 Manager**                  | Providing configuration information to DB2 instances, this Manager also provisions DB2 instances and schemas.                        |
| **z/OS MQ Manager**                   | Provisions and configures z/OS MQ subsystems.                                                                                        |
| **z/OS Security Manager**             | Creates and maintains userids and profiles in RACF.                                                                                  |
| **z/VM Manager**                      | Provisions and configures z/VM userids, mainly for provisioning z/OS and z/Linux systems.                                            |
| **ZOWE Manager**                      | Provides configuration information for and provisions ZOWE instances.                                                                |
