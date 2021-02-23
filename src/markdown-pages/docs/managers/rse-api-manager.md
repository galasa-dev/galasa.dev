---
path: "/docs/managers/rse-api-manager"
title: "RSE API Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This Manager provides Galasa tests with access to a RSE API server.


## Annotations

The following annotations are available with the RSE API Manager
<details>
<summary>RSE API</summary>

| Annotation: | RSE API |
| --------------------------------------- | :------------------------------------- |
| Name: | @Rseapi |
| Description: | The <code>@Rseapi</code> annotation requests the z/OSMF Manager to provide a z/OSMF instance associated with a z/OS image.  The test can request multiple z/OSMF instances, with the default being associated with the <b>primary</b> zOS image. |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Rseapi(imageTag="A")<br> public IRseapi rseapiA;<br></code> |
| Notes: | The <code>IRseapi</code> interface has a number of methods to issue requests to the RSE API REST API. See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosrseapi/Rseapi.html" target="_blank">Rseapi</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosrseapi/IRseapi.html" target="_blank">IRseapi</a> to find out more. |

</details>




## Configuration Properties

The following are properties used to configure the RSE API Manager.
 
<details>
<summary>RSE API Server port is https</summary>

| Property: | RSE API Server port is https |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[imageid].https |
| Description: | Use https (SSL) for RSE API server |
| Required:  | No |
| Default value: | True |
| Valid values: | $validValues |
| Examples: | <code>rseapi.server.https=true</code><br> <code>rseapi.server.SYSA.https=true</code> |

</details>
 
<details>
<summary>RSE API Server retry request</summary>

| Property: | RSE API Server retry request |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[imageid].https |
| Description: | The number of times to retry when RSE API request fails |
| Required:  | No |
| Default value: | 3 |
| Valid values: | $validValues |
| Examples: | <code>rseapi.server.request.retry=5</code><br> <code>rseapi.server.SYSA.request.retry=5</code> |

</details>
 
<details>
<summary>RSE API Server hostname</summary>

| Property: | RSE API Server hostname |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[imageid].https |
| Description: | The hostname RSE API server |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>rseapi.server.hostname=rseapiserver.ibm.com</code><br> <code>rseapi.server.SYSA.hostname=rseapiserver.ibm.com</code> |

</details>
 
<details>
<summary>RSE API Server images</summary>

| Property: | RSE API Server images |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[clusterid].images |
| Description: | The RSE API server images active on the supplied cluster |
| Required:  | No |
| Default value: | True |
| Valid values: | $validValues |
| Examples: | <code>rseapi.server.images=SYSA,SYSB</code><br> <code>rseapi.server.PLEXA.images=SYSA,SYSB</code> |

</details>
 
<details>
<summary>RSE API Server port</summary>

| Property: | RSE API Server port |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[imageid].https |
| Description: | The hostname RSE API server |
| Required:  | Yes |
| Default value: | 6800 |
| Valid values: | $validValues |
| Examples: | <code>rseapi.server.port=6800</code><br> <code>rseapi.server.SYSA.port=6800</code> |

</details>
