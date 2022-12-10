---
path: "/docs/managers/zos3270terminal-manager"
title: "Zos3270Terminal Manager"
---

This Manager is at Beta level. You can view the <a href="https://javadoc.galasa.dev/index.html?overview-summary.html">Javadoc documentation for the Manager here</a>.<br>

[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>

# <a name="overview"></a>Overview
Enables 3270 terminal interactions with back-end application programs and subsystems. Live terminal updates are displayed in Eclipse and terminal images are logged to enable swift diagnosis of failures. The Confidential Text Filtering service enables confidential information such as passwords to be replaced with a numbered shield in these generated logs. <br><br> There is an example which uses the Zos3270Terminal Manager in <a href="https://galasa.dev/docs/running-simbank-tests/simbank-IVT">the SimBank IVT</a> tutorial. <br><br> You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/package-summary.html">Javadoc documentation for this Manager here</a>. <br><br>

## <a name="dependencies"></a>Including the Manager in a test

To use the z/OS 3270 Manager in a test you must import the _@Zos3270Terminal_ annotation into the test, as shown in the following example: 

```
@Zos3270Terminal(imageTag = "PRIMARY")
public ITerminal terminal;
```

You also need to add the Manager dependency into the pom.xml file if you are using Maven, or into the build.gradle file if you are using Gradle. 

If you are using Maven, add the following dependencies into the _pom.xml_ in the _dependencies_ section:

```
<dependency>
<groupId>dev.galasa</groupId>
<artifactId>dev.galasa.zos3270.manager</artifactId>
</dependency>
```

If you are using Gradle, add the following dependencies into ```build.gradle``` in the _dependencies_ closure:

```
dependencies {
compileOnly 'dev.galasa.zos3270.manager'
}
```

# <a name="configuring"></a>Configuring 

The following properties are used to configure the z/OS 3270 Manager:

<details>
<summary>Apply Confidential Text Filtering</summary>

| Property: | ApplyConfidentialTextFiltering |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.apply.ctf |
| Description: | This property indicates that all logs and screen recordings are to be passed
through the Confidential Text Filtering services to hide text, for example, passwords |
| Required:  | Yes |
| Default value: | true |
| Valid values: | true, false|
| Examples: | <code>zos3270.apply.ctf=true</code>|

</details>

<details>
<summary>Apply Confidential Text Filtering to screen recordings</summary>

| Property: | ApplyConfidentialTextFiltering |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.extra.bundles |
| Description: | The symbolic names of any bundles that need to be loaded with the CICS TS Manager |
| Required:  | No |
| Default value: | dev.galasa.cicsts.ceci.manager,dev.galasa.cicsts.ceda.manager,dev.galasa.cicsts.cemt.manager |
| Valid values: | bundle-symbolic names in a comma separated list|
| Examples: | <code>cicsts.extra.bundles=org.example.cicsts.provisioning</code>|

</details>

<details>
<summary>Extra bundles required to implement the CICS TS Manager</summary>

| Property: | ExtraBundles |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.extra.bundles |
| Description: | The symbolic names of any bundles that need to be loaded with the CICS TS Manager |
| Required:  | No |
| Default value: | dev.galasa.cicsts.ceci.manager,dev.galasa.cicsts.ceda.manager,dev.galasa.cicsts.cemt.manager |
| Valid values: | bundle-symbolic names in a comma separated list|
| Examples: | <code>cicsts.extra.bundles=org.example.cicsts.provisioning</code>|

</details>

<details>
<summary>Live terminal URL</summary>

| Property: | LiveTerminalUrl |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.live.terminal.images |
| Description: | Defines the URL where live terminal updates are sent for displaying in Eclipse. Eclipse  sets this property in the overrides to indicate that the z/OS 3270 terminal will place the terminal images ready for live viewing in the Eclipse UI. |
| Required:  | No |
| Default value: | None. Not specifying a value or leaving the value empty indicates that there is no live recording |
| Valid values: | A valid URL |
| Examples: | <code>zos3270.live.terminal.images=https://exampleurl.com</code>|

</details>

<details>
<summary>Log console terminals</summary>

| Property: | LogConsoleTerminals |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.console.terminal.images |
| Description: | Defines whether terminal images are logged to the console/runlog |
| Required:  | No |
| Default value: | true |
| Valid values: | true, false |
| Examples: | <code>zos3270.console.terminal.images=true</code>|

</details>

<details>
<summary>Terminal Device Types </summary>

| Property: | TerminalDeviceTypes |
| --------------------------------------- | :------------------------------------- |
| Name: | zos3270.image.xxxxxx.device.types |
| Description: | Enables use of custom terminal device types |
| Required:  | No |
| Default value: | IBM-DYNAMIC, IBM-3278-2 |
| Valid values: | A valid terminal device type |
| Examples: | <code>zos3270.image.xxxxxx.device.types=IBM-DYNAMIC,IBM-3278-2</code>|

</details>


# <a name="annotations"></a>Annotations provided by the Manager

The following annotations are available with the Zos3270Terminal Manager
<details>
<summary>z/OS 3270 Terminal</summary>

| Annotation: | z/OS 3270 Terminal |
| --------------------------------------- | :------------------------------------- |
| Name: | @Zos3270Terminal |
| Description: | The <code>@Zos3270Terminal</code> annotation requests the z/OS 3270 Terminal Manager to provide a 3270 terminal associated with a z/OS image. |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. Optional. The default value is "primary".|
| Attribute: `autoConnect` |  Allows a user to choose if the terminal automatically connects in the provision start stage. Optional. The default value is true.|
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @Zos3270Terminal(imageTag="A")<br> public ITerminal zosTerminalA;<br></code> |
| Notes: | The <code>ITerminal</code> interface has a number of methods to issue commands to the 3270 client. See <a href="https://javadoc.galasa.dev/dev/galasa/zos3270/ITerminal.html" target="_blank">ITerminal</a> to find out more. |

</details>
