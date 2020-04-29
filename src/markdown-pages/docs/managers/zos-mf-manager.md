---
path: "/docs/managers/zos-mf-manager"
title: "zOS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager provides Galasa tests with access to a z/OS MF server.


## Annotations

The following annotations are available with the z/OS MF Manager
<details>
<summary>z/OS MF</summary>

| Annotation: | z/OS MF |
| --------------------------------------- | :------------------------------------- |
| Name: | @Zosmf |
| Description: | The <code>@Zosmf</code> annotation requests the z/OSMF Manager to provide a z/OSMF instance associated with a z/OS image.  The test can request multiple z/OSMF instances, with the default being associated with the <b>primary</b> z/OS image. |
| Attribute: `imageTag` |  The tag of the z/OS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Zosmf(imageTag="A")<br> public IZosmf zosmfA;<br></code> |
| Notes: | The <code>IZosmf</code> interface has a number of methods to issue requests to the z/OS MF REST API. See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosmf/Zosmf.html" target="_blank">Zosmf</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosmf/IZosmf.html" target="_blank">IZosmf</a> to find out more. |

</details>




## Configuration Properties

The following are properties used to configure the z/OS MF Manager.
 
<details>
<summary>z/OSMF Server port is https</summary>

| Property: | z/OSMF Server port is https |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | Use https (SSL) for z OS MF server |
| Required:  | No |
| Default value: | True |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.https=true</code><br> <code>zosmf.server.SYSA.https=true</code> |

</details>
 
<details>
<summary>z/OS MF Server retry request</summary>

| Property: | z/OS MF Server retry request |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | The number of times to retry when z/OS MF request fails |
| Required:  | No |
| Default value: | 3 |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.request.retry=5</code><br> <code>zosmf.server.SYSA.request.retry=5</code> |

</details>
 
<details>
<summary>zOSMF Server hostname</summary>

| Property: | z/OS MF Server hostname |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | The hostname z/OS MF server |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.hostname=zosmfserver.ibm.com</code><br> <code>zosmf.server.SYSA.hostname=zosmfserver.ibm.com</code> |

</details>
 
<details>
<summary>zOSMF Server images</summary>

| Property: | z/OS MF Server images |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[clusterid].images |
| Description: | The z/OS MF server images active on the supplied cluster |
| Required:  | No |
| Default value: | True |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.images=SYSA,SYSB</code><br> <code>zosmf.server.PLEXA.images=SYSA,SYSB</code> |

</details>
 
<details>
<summary>z/OS MF Server port</summary>

| Property: | z/OS MF Server port |
| --------------------------------------- | :------------------------------------- |
| Name: | zosmf.server.[imageid].https |
| Description: | The hostname z/OS MF server |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosmf.server.port=443</code><br> <code>zosmf.server.SYSA.port=443</code> |

</details>
