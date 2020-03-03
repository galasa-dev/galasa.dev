---
path: "/docs/managers/elasticlog-manager"
title: "ElasticLog Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested. It is available for Galasa administrators to utilise to experiment with Elastic/Kibana dashboards**

## Overview
This Manager exports test results to an elastic search endpoint, where the data can be visualized on a Kibana dashboard.  Other Managers can contribute to the information that is exported to Elastic. <br><br> As an absolute minimum, the CPS properties <code>elasticlog.endpoint.address</code> and <code>elasticlog.endpoint.index</code>  must be provided. By default, this manager will only log automated tests, to enable logging from locally run tests,  <code>elasticlog.local.run.log</code> must be set to true. The bundle must also be loaded by the framework but using  <code>framework.extra.bundles=dev.galasa.elasticlog.manager</code> in bootstrap.properties. <br><br> This Manager provides two ElasticSearch indexes; one of all test data, and one of the latest run for each test case and each  test environment.

## Limitations
The Manager logs the following test information:<br> <br> - testCase<br> - runId<br> - startTimestamp<br> - endTimestamp<br> - requestor<br> - result<br> - testTooling<br> - testType<br> - testingEnvironment<br> - productRelease<br> - buildLevel<br> - customBuild<br> - testingAreas<br> - tags<br> <br> <br> If additional testing information is required, please raise a GitHub issue.


## Configuration Properties

The following are properties used to configure the ElasticLog Manager.
 
| Property: | ElasticLog Endpoint Address CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | elastic.endpoint.address |
| Description: | Provides an address to send elastic requests to |
| Required:  | Yes |
| Default value: | https://yoursitehere.com/elasticendpoint |
| Valid values: | Any valid URI string |
| Examples: | <code>elastic.endpoint.address=https://yoursitehere.com/elasticendpoint</code> |

 
| Property: | ElasticLog Endpoint Index CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | elastic.endpoint.index |
| Description: | Provides the index in elasticsearch to which requests are directed |
| Required:  | Yes |
| Default value: | galasa |
| Valid values: | Any lowercase, single-word string |
| Examples: | <code>elastic.endpoint.index=galasa</code> |

If the index does not exist, the index is created and is mapped to the Galasa run.</br> If the index exists, it must be mapped to the relevant Galasa run.

 
| Property: | ElasticLog Endpoint Local Run CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | elastic.local.run.log |
| Description: | Activates the ElasticLog Manager for local runs |
| Required:  | Yes |
| Default value: | false |
| Valid values: | true, false |
| Examples: | <code>elastic.local.run.log=true</code> |

ElasticLog Manager will not run automatically for a local run. <br> By setting this property to true, the manager will activate locally.

