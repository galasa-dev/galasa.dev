---
path: "/docs/managers/zos-console-zos-mf-manager"
title: "zOS Console zOS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the zOS Console Manager using zOS/MF. <p> See the <a href="../zos-manager">zOS Manager</a> for details of the z/OS Console Annotations.





## Configuration Properties

The following are properties used to configure the zOS Console zOS MF Manager.
 
<details>
<summary>Restrict zOS console processing to the zOSMF server on the specified image</summary>

| Property: | Restrict zOS console processing to the zOSMF server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosconsole.console.[imageid].restrict.to.image |
| Description: | Use only the zOSMF server running on the image associated with the zOS Console |
| Required:  | No |
| Default value: | False |
| Valid values: | $validValues |
| Examples: | <code>zosconsole.console.restrict.to.image=true</code><br> <code>zosconsole.console.SYSA.restrict.to.image=true</code> |

</details>
