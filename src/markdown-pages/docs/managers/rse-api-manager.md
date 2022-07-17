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
| Description: | The <code>@Rseapi</code> annotation requests the RSE API Manager to provide a RSE API server instance associated with a z/OS image.  The test can request multiple RSE API instances, with the default being associated with the <b>primary</b> zOS image. |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Rseapi(imageTag="A")<br> public IRseapi rseapiA;<br></code> |
| Notes: | The <code>IRseapi</code> interface has a number of methods to issue requests to the RSE API REST API. See <a href="https://javadoc.galasa.dev/dev/galasa/zosrseapi/Rseapi.html" target="_blank">Rseapi</a> and <a href="https://javadoc.galasa.dev/dev/galasa/zosrseapi/IRseapi.html" target="_blank">IRseapi</a> to find out more. |

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
| Examples: | <code>rseapi.server.https=true</code><br> <code>rseapi.server.RSESYSA.https=true</code> |

</details>
 
<details>
<summary>RSE API Image Servers</summary>

| Property: | RSE API Image Servers |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.image.IMAGEID.servers |
| Description: | The RSE API servers for use with z/OS Image, the RSE API do not need to be running the actual z/OS Image |
| Required:  | No |
| Default value: | None |
| Valid values: | Comma separated RSE API server IDs |
| Examples: | <code>rseapi.image.MV2C.servers=RSESYSA,RSESYSB</code><br> |

</details>
 
<details>
<summary>RSE API Server retry request</summary>

| Property: | RSE API Server retry request |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[SERVERID].request.retry |
| Description: | The number of times to retry when RSE API request fails |
| Required:  | No |
| Default value: | 3 |
| Valid values: | numerical value > 0 |
| Examples: | <code>rseapi.server.request.retry=5</code><br> <code>rseapi.server.RSESYSA.request.retry=5</code> |

</details>
 
<details>
<summary>RSE API Server Credentials</summary>

| Property: | RSE API Server Credentials |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[SERVERID].credentials |
| Description: | The z/OS credentials to use when accessing the RSE API server |
| Required:  | No |
| Default value: | None, however the RSE API Manager will use the default z/OS image credentials |
| Valid values: | Valid credential ID |
| Examples: | <code>rseapi.server.RSESYSA.credentials=ZOS</code><br> |

</details>
 
<details>
<summary>RSE API Server Image</summary>

| Property: | RSE API Server Image |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.SERVERID.image |
| Description: | The z/OS image ID this RSE API server lives on |
| Required:  | No |
| Default value: | The SERVERID value is used as the z/OS image ID |
| Valid values: | z/OS image IDs |
| Examples: | <code>rseapi.server.RSESYSA.image=SYSA</code><br> |

</details>
 
<details>
<summary>RSE API Server port</summary>

| Property: | RSE API Server port |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.server.[serverid].port |
| Description: | The port number of the RSE API server |
| Required:  | no |
| Default value: | 6800 |
| Valid values: | $validValues |
| Examples: | <code>rseapi.server.port=6800</code><br> <code>rseapi.server.RSESYSA.port=6800</code> |

</details>
 
<details>
<summary>RSE API Sysplex Servers</summary>

| Property: | RSE API Sysplex Servers |
| --------------------------------------- | :------------------------------------- |
| Name: | rseapi.sysplex.[SYSPLEXID].default.servers |
| Description: | The RSE API servers active on the supplied sysplex |
| Required:  | No |
| Default value: | None |
| Valid values: | Comma separated RSE API server IDs |
| Examples: | <code>rseapi.sysplex.default.servers=RSASYSA,RSASYSB</code><br> <code>rseapi.sysplex.PLEXA.default.servers=RSASYSA,RSASYSB</code> |

</details>
