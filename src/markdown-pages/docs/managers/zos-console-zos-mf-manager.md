---
path: "/docs/managers/zos-console-zos-mf-manager"
title: "zOS Console zOS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the z/OS Console Manager using zOS/MF. <p> See the <a href="../zos-manager">z/OS Manager</a> for details of the z/OS Console annotations.





## Configuration Properties

The following are properties used to configure the z/OS Console z/OS MF Manager.
 
<details>
<summary>Restrict z/OS console processing to the z/OS MF server on the specified image</summary>

| Property: | Restrict zOS console processing to the z/OSMF server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosconsole.console.[imageid].restrict.to.image |
| Description: | Use only the z/OSMF server running on the image associated with the z/OS Console |
| Required:  | No |
| Default value: | False |
| Valid values: | $validValues |
| Examples: | <code>zosconsole.console.restrict.to.image=true</code><br> <code>zosconsole.console.SYSA.restrict.to.image=true</code> |

</details>
