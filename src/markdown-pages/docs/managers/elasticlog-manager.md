---
path: "/docs/managers/elasticlog-manager"
title: "ElasticLog Manager"
---

**ALPHA - This Manager has been written to provide a way of exporting test data to ElasticSearch.  It has the bare  minimum code necessary to do that.  It has not been extensively tested.  It is available for Galasa administrators to utilise to experiment with Elasic/Kabana dashboards**

## Overview
This manager is used to export test results to an elastic search endpoint, where the data can be visualised on a Kabana dashboard.  Other managers can contribute to the information being exported to Elastic. <br><br> As an absolute minimum, the CPS properties <code>elasticlog.endpoint.address</code> and <code>elasticlog.endpoint.index</code>  must be provided. By default, this manager will only log automated tests, to enable logging from locally run tests,  <code>elasticlog.local.run.log</code> must be set to true. <br><br> This Manager will provide two ElasticSearch indexes. One of all test data, and one of the latest run for each test case and each  testing environment.

## Limitations
The Manager logs the following test information:-<br> testCase<br> runId<br> startTimestamp<br> endTimestamp<br> requestor<br> result<br> testTooling<br> testType<br> testingEnvironment<br> productRelease<br> buildLevel<br> customBuild<br> testingAreas<br> tags<br> <br> If additional testing information is required, please raise an Issue.


## Annotations

The following annotations are available with the ElasticLog Manager
## Code Snippets

Use the following code snippets to help you get started with the ElasticLog Manager.
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
| Description: | Provides the index in elasticsearch requests are directed to |
| Required:  | Yes |
| Default value: | galasa |
| Valid values: | Any lowercase, single word string |
| Examples: | <code>elastic.endpoint.index=galasa</code> |

The given index will be created and mapped to the galasa run if it does not exist.</br> If the index already exists, it must have the mapping of the given galasa run.

 
| Property: | ElasticLog Endpoint Index CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | elastic.endpoint.index |
| Description: | Provides the index in elasticsearch requests are directed to |
| Required:  | Yes |
| Default value: | galasa |
| Valid values: | Any lowercase, single word string |
| Examples: | <code>elastic.endpoint.index=galasa</code> |

The given index will be created and mapped to the galasa run if it does not exist.</br> If the index already exists, it must have the mapping of the given galasa run.

