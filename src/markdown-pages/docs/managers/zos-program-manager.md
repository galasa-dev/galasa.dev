---
path: "/docs/managers/zos-program-manager"
title: "zOS Program Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This Manager allows Galasa tests to compile and program bind zOS Programs.


## Annotations

The following annotations are available with the zOS Program Manager
<details>
<summary>z/OS Program</summary>

| Annotation: | z/OS Program |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosProgram |
| Description: | The <code>@ZosProgram</code> annotation requests the z/OS Program Manager to Compile and Bind a program on a z/OS image.  The test can request multiple z/OS Program instances |
| Attribute: `name` |  The program name (without file extension) |
| Attribute: `language` |  The  programming language. See <a href="https://javadoc-snapshot.galasa.dev/ZosProgram/Language.html" target="_blank">ZosProgram.Language</a> |
| Attribute: `loadlib` |  The load module data set name |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosProgram(imageTag="A")<br> public IZosProgram zosProgramA;<br></code> |
| Notes: | The <code>IZosProgram</code> interface has a number of methods to manage the zOS Program. See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosprogram/ZosProgram.html" target="_blank">ZosProgram</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosprogram/IZosProgram.html" target="_blank">IZosProgram</a> to find out more. |

</details>




