---
path: "/docs/managers/zos-program-manager"
title: "zOS Program Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This Manager allows Galasa tests to compile and link zOS Programs.


## Annotations

The following annotations are available with the zOS Program Manager
<details>
<summary>z/OS Program</summary>

| Annotation: | z/OS Program |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosProgram |
| Description: | The <code>@ZosProgram</code> annotation requests the z/OS Program Manager to Compile and Bind a program on a z/OS image.  The test can request multiple z/OS Program instances |
| Attribute: `name` |  The program name |
| Attribute: `location` |  Path to the location of the program source in the Galasa test bundle. This can be either the full path including the file name or the directory containing the source with the name specified in the name attribute with the extension specified in the language attribute.  |
| Attribute: `language` |  The programming language. See <a href="https://javadoc-snapshot.galasa.dev/ZosProgram/Language.html" target="_blank">ZosProgram.Language</a> |
| Attribute: `isCics` |  Is a CICS program. |
| Attribute: `loadlib` |  The load module data set name |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosProgram(imageTag="A")<br> public IZosProgram zosProgramA;<br></code> |
| Notes: | The <code>IZosProgram</code> interface has a number of methods to manage the zOS Program. See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosprogram/ZosProgram.html" target="_blank">ZosProgram</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosprogram/IZosProgram.html" target="_blank">IZosProgram</a> to find out more. |

</details>




## Configuration Properties

The following are properties used to configure the zOS Program Manager.
 
<details>
<summary>zOS CICS data set HLQ</summary>

| Property: | zOS CICS data set HLQ |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.cics.[imageid].dataset.hlq |
| Description: | zOS CICS data set High Level Qualifier |
| Required:  | No |
| Default value: | COBOL: CICS |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.cics.MVSA.dataset.hlq=CICS</code><br> <code>zosprogram.cics.default.dataset.hlq=SYS1,CICS</code> |

</details>
 
<details>
<summary>zOS Language Environment data set HLQ</summary>

| Property: | zOS Language Environment data set HLQ |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.le.[imageid].dataset.hlq |
| Description: | zOS Language Environment data set High Level Qualifier |
| Required:  | No |
| Default value: | CEE |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.le.MVSA.dataset.hlq=CEE</code><br> <code>zosprogram.le.dataset.hlq=SYS1.LE,CEE</code> |

</details>
 
<details>
<summary>zOS Program Language data set HLQ</summary>

| Property: | zOS Program Language data set HLQ |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.[language].[imageid].dataset.hlq |
| Description: | zOS Program Language data set High Level Qualifier |
| Required:  | No |
| Default value: | COBOL: IGY.V6R3M0 |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.cobol.MVSA.dataset.hlq=IGY.V6R3M0</code><br> <code>zosprogram.cobol.dataset.hlq=SYS1.COBIL,IGY.V6R3M0</code> |

</details>
