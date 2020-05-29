---
path: "/docs/managers/zos-mf-manager"
title: "zOS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager provides Galasa tests with access to a zOS/MF server. Use the z/OS MF Manager to simplify areas of z/OS system management. The z/OS MF Manager can be called from a test or from other Managers. For example, the z/OS Manager calls the z/OS MF Manager to implement z/OS file, console and batch functions via the relevant interface.


## Annotations

The following annotations are available with the zOS MF Manager
<details>
<summary>z/OS MF</summary>

| Annotation: | z/OS MF |
| --------------------------------------- | :------------------------------------- |
| Name: | @Zosmf |
| Description: | The <code>@Zosmf</code> annotation requests the z/OSMF Manager to provide a z/OSMF instance associated with a z/OS image.  The test can request multiple z/OSMF instances, with the default being associated with the <b>primary</b> zOS image. |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Zosmf(imageTag="A")<br> public IZosmf zosmfA;<br></code> |
| Notes: | The <code>IZosmf</code> interface has a number of methods to issue requests to the zOSMF REST API. See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosmf/Zosmf.html" target="_blank">Zosmf</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosmf/IZosmf.html" target="_blank">IZosmf</a> to find out more. |

</details>




## Configuration Properties

The following are properties used to configure the zOS MF Manager.
 
<details>
<summary>zOSMF Server port is https</summary>

| Property: | zOSMF Server port is https |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | Use https (SSL) for zOSMF server |
| Required:  | No |
| Default value: | True |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.https=true</code><br> <code>zosmf.server.SYSA.https=true</code> |

</details>
 
<details>
<summary>zOSMF Server retry request</summary>

| Property: | zOSMF Server retry request |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | The number of times to retry when zOSMF request fails |
| Required:  | No |
| Default value: | 3 |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.request.retry=5</code><br> <code>zosmf.server.SYSA.request.retry=5</code> |

</details>
 
<details>
<summary>zOSMF Server hostname</summary>

| Property: | zOSMF Server hostname |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | The hostname zOSMF server |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.hostname=zosmfserver.ibm.com</code><br> <code>zosmf.server.SYSA.hostname=zosmfserver.ibm.com</code> |

</details>
 
<details>
<summary>zOSMF Server images</summary>

| Property: | zOSMF Server images |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[clusterid].images |
| Description: | The zOSMF server images active on the supplied cluster |
| Required:  | No |
| Default value: | True |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.images=SYSA,SYSB</code><br> <code>zosmf.server.PLEXA.images=SYSA,SYSB</code> |

</details>
 
<details>
<summary>zOSMF Server port</summary>

| Property: | zOSMF Server port |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | The hostname zOSMF server |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.port=443</code><br> <code>zosmf.server.SYSA.port=443</code> |

</details>
