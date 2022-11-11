---
path: "/docs/managers/zos3270terminal-manager"
title: "Zos3270Terminal Manager"
---

**Alpha**

## Overview
Enables 3270 terminal interactions with back-end application programs and subsystems. Live terminal updates are displayed in Eclipse and terminal images are logged to enable swift diagnosis of failures. The Confidential Text Filtering service enables confidential information such as passwords to be replaced with a numbered shield in these generated logs. <br><br> There is an example which uses the Zos3270Terminal Manager in <a href="https://galasa.dev/docs/running-simbank-tests/simbank-IVT">the SimBank IVT</a> tutorial. <br><br> You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/package-summary.html">Javadoc documentation for this Manager here</a>. <br><br>

## Annotations

The following annotations are available with the Zos3270Terminal Manager
<details>
<summary>z/OS 3270 Terminal</summary>

| Annotation: | z/OS 3270 Terminal |
| --------------------------------------- | :------------------------------------- |
| Name: | @Zos3270Terminal |
| Description: | The <code>@Zos3270Terminal</code> annotation requests the z/OS 3270 Terminal Manager to provide a 3270 terminal associated with a z/OS image. |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Zos3270Terminal(imageTag="A")<br> public ITerminal zosTerminalA;<br></code> |
| Notes: | The <code>ITerminal</code> interface has a number of methods to issue commands to the 3270 client. See <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/ITerminal.html" target="_blank">ITerminal</a> to find out more. |

</details>
