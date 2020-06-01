---
path: "/docs/managers/zos-console-zos-mf-manager"
title: "zOS Console zOS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the z/OS Console Manager using zOS/MF. The z/OS MF Console Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS console function and pulls in the z/OS MF Console Manager to provide the implementation of the interface. If your test needs to request a z/OS console instance, issue a console command or retrieve the console command, you can call the z/OS Manager in your test code and the z/OS Manager will call the z/OS MF Console Manager to provide the implementation via the z/OS console function. Multiple z/OS console images can be requested by a test. <p> See the <a href="../../zos-manager">zOS Manager</a> for details of the z/OS Console Annotations.





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
