---
path: "/docs/managers/zos-console-oeconsol-manager"
title: "zOS Console oeconsol Manager"
---

**ALPHA**

## Overview
This Manager is the internal implementation of the z/OS Console Manager using <b>oeconsol</b>. The <b>oeconsol</b> z/OS Console Manager is used in conjunction  with the z/OS UNIX Command Manager. The z/OS Manager provides the interface for the z/OS console function and pulls in the <b>oeconsol</b> Console Manager  to provide the implementation of the interface. If your test needs to request a z/OS console instance, issue a console command or retrieve the console  command, you can call the z/OS Manager in your test code and the z/OS Manager will call the <b>oeconsol</b> Console Manager to provide the implementation  via the z/OS console function. Multiple z/OS console images can be requested by a test. <p> See the <a href="/docs/managers/zos-manager">zOS Manager</a> for details of the z/OS Console Annotations. <p> This implementation is less rich than the zOS/MF implementation due to the restricted functionallity of <b>oeconsol</b>: <p> <ul>   <li><b>oeconsol</b> does not directly support console name.     <br>Console name can be used to avoid clashes with other consoles that the user has open, e.g. in another Galsa test, in a TSO or SDSF session.         When supplying console name via <code>IZosConsole#issueCommand(String command, String consoleName)</code> the Manager attempts to obtain credentials         from the CPS, i.e. <code>secure.credentials.[consoleName].username</code>. The credentials are used to logon to z/OS UNIX and execute <b>oeconsol</b> with the supplied command.   </li>   <li><b>oeconsol</b> does not support retrieving delayed responses.     <br>A <code>ZosConsoleException</code> is will be thrown when the <code>IZosConsoleCommand#requestResponse()</code> method is called.   </li> </ul>    <p> See <a href="https://github.com/IBM/IBM-Z-zOS/tree/master/zOS-Tools-and-Toys/oeconsol">oeconsol</a> for documentation and download. <br><br> You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zosconsole/oeconsol/manager/package-summary.html" target="_blank" rel="noopener noreferrer"> Javadoc documentation for this Manager here</a>. <br><br> 





## Configuration Properties

The following are properties used to configure the zOS Console oeconsol Manager.
 
<details>
<summary>The oeconsol path</summary>

| Property: | The oeconsol path |
| --------------------------------------- | :------------------------------------- |
| Name: | zosconsole.oeconsole.[imageid].command.path |
| Description: | The path to the oeconsol command |
| Required:  | No |
| Default value: | oeconsol |
| Valid values: | $validValues |
| Examples: | <code>zosconsole.oeconsole.command.path=oeconsol</code><br> <code>zosconsole.MFSYSA.oeconsol.command.path=/tools/oeconsol</code> |

</details>
