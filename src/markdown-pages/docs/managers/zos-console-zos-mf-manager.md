---
path: "/docs/managers/zos-console-zos-mf-manager"
title: "z/OS Console z/OS MF Manager"
---

**BETA**

[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>

# <a name="overview"></a>Overview
This Manager is the internal implementation of the z/OS Console Manager using zOS/MF. The z/OS MF Console Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS console function and pulls in the z/OS MF Console Manager to provide the implementation of the interface. If your test needs to request a z/OS console instance, issue a console command or retrieve the console command, you can call the z/OS Manager in your test code and the z/OS Manager will call the z/OS MF Console Manager to provide the implementation via the z/OS console function. Multiple z/OS console images can be requested by a test. <p> 

## <a name="dependencies"></a>Including the Manager in a test

To use the z/OS Console z/OS MF Manager in a test you must import the _@ZosImage_ and _@ZosConsole_ annotations into the test, as shown in the following example: 

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;
@ZosConsole(imageTag="A")
public IZosConsole zosConsoleA;
```


You also need to add the Manager dependency into the pom.xml file if you are using Maven, or into the build.gradle file if you are using Gradle. 

If you are using Maven, add the following dependencies into the _pom.xml_ in the _dependencies_ section:

```
<dependency>
    <groupId>dev.galasa</groupId>
    <artifactId>dev.galasa.zosconsole.zosmf.manager</artifactId>
</dependency>
```

If you are using Gradle, add the following dependencies into ```build.gradle``` in the _dependencies_ closure:

```
dependencies {
    compileOnly 'dev.galasa:dev.galasa.zosconsole.zosmf.manager'
}
```

# <a name="configuring"></a>Configuring 
The following are properties used to configure the z/OS Console MF Manager.

## <a name="cps"></a>Configuration Properties

<details>
<summary>Extra bundle required to implement the z/OS Console Manager</summary>

| Property: | Extra bundle required to implement the z/OS Console Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.console.manager |
| Description: | The name of the Bundle that implements the z/OS Console Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosconsole.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.console.manager=dev.galasa.common.zosconsole.zosmf.manager</code><br> |

</details>
<details>
<summary>Restrict z/OS console processing to the zOSMF server on the specified image</summary>

| Property: | Restrict z/OS console processing to the zOSMF server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosconsole.console.[imageid].restrict.to.image |
| Description: | Use only the zOSMF server running on the image associated with the z/OS Console |
| Required:  | No |
| Default value: | False |
| Valid values: | $validValues |
| Examples: | <code>zosconsole.console.restrict.to.image=true</code><br> <code>zosconsole.console.SYSA.restrict.to.image=true</code> |

</details>

# <a name="annotations"></a>Annotations provided by the Manager

| Annotation: | z/OS Console |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosConsole |
| Description: | The <code>@ZosConsole</code> annotation requests the z/OS Manager to provide a z/OS Console instance associated with a z/OS image.  The test can request multiple z/OS Console instances, with the default being associated with the <b>primary</b> z/OS image.<br> |
| Attribute: `imageTag` |  The tag of the z/OS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosConsole(imageTag="A")<br> public IZosConsole zosConsoleA;<br></code> |
| Notes: | The <code>IZosConsole</code> interface has two methods, {@link IZosConsole#issueCommand(String)} and {@link IZosConsole#issueCommand(String, String)} to issue a command to the z/OS console and returns a <code>IZosConsoleCommand</code> instance.<br><br> See <a href="https://javadoc.galasa.dev/dev/galasa/zosconsole/ZosConsole.html" target="_blank">ZosConsole</a>, <a href="https://javadoc.galasa.dev/dev/galasa/zosconsole/IZosConsole.html" target="_blank">IZosConsole</a> and <a href="https://javadoc.galasa.dev/dev/galasa/zosconsole/IZosConsoleCommand.html" target="_blank">IZosConsoleCommand</a> to find out more. |

# <a name="codesnippets"></a>Code snippets and examples

<details><summary>Request a z/OS Console instance</summary>

The following snippet shows the code that is required to request a z/OS Console instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosBatch(imageTag="A")
public IZosConsole zosConsole;
```

The code creates a z/OS Console instance associated with the z/OS Image allocated in the *zosImageA* field.
</details>

<details><summary>Issue a z/OS Console command and retrieve the immediate response</summary>

Issue a z/OS Console command and retrieve the immediate console command response:

```
String command = "D A,L";
IZosConsoleCommand consoleCommand = zosConsole.issueCommand(command);
String immediateResponse = consoleCommand.getResponse();

```
</details>


<details><summary>Issue a zOS Console command and retrieve the delayed response</summary>

Issue a z/OS Console command and retrieve the delayed console command response:

```
String command = "D A,L";
IZosConsoleCommand consoleCommand = zosConsole.issueCommand(command);
String delayedResponse = consoleCommand.requestResponse();

```
</details>