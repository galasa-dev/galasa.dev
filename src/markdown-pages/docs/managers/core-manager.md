---
path: "/docs/managers/core-manager"
title: "Core Manager"
---

This Manager is at Release level. You can view the <a href="https://javadoc.galasa.dev/dev/galasa/github/package-summary.html">Javadoc documentation for the Manager here</a>.<br>


[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>


# <a name="overview"></a>Overview

The Core Manager provides tests with access to some of the core features within the Galasa Framework. The Core Manager is always initialised and included in a test run and contributes the <code>Logger</code>, <code>StoredArtifactRoot</code> and <code>TestProperty</code> annotations. <br><br> The <code>Logger</code> annotation is provided by the Core Manager to create the log which is then automatically stored in the Result Archive Store (RAS) by the Galasa framework.  <br><br> The <code>StoredArtifactRoot</code> annotation lets your test write specific output to the RAS. Whilst the Galasa framework automatically sends test output to be stored in the RAS, this annotation enables you to write code to send output specific to your application to be stored.  <br><br> The Core Manager uses methods including <code>getCredentials</code>, <code>getRunName</code> and <code>ConfidentialText</code> credentials. <code>getCredentials</code> lets you retrieve a user id and password from a file to use in your test and <code>ConfidentialText</code> ensures that the password value is masked. The ability to get credentials from a file means that you do not need to hard code these values in your test and that the test can be run in different environments without the need to change a single line of code.  <br><br> You can view the <a href="https://javadoc.galasa.dev/dev/galasa/core/manager/package-summary.html">Javadoc documentation for this Manager here</a>. <br><br>


## <a name="dependencies"></a>Including the Manager in a test

To use the Core Manager in a test you must import the _@CoreManager_ annotation into the test, as shown in the following example: 

```
@CoreManager
public ICoreManager coreManager;
```

You also need to add the Manager dependency into the pom.xml file if you are using Maven, or into the build.gradle file if you are using Gradle. 

If you are using Maven, add the following dependencies into the _pom.xml_ in the _dependencies_ section:

```
<dependency>
<groupId>dev.galasa</groupId>
<artifactId>dev.galasa.core.manager</artifactId>
</dependency>
```

If you are using Gradle, add the following dependencies into ```build.gradle``` in the _dependencies_ closure:

```
dependencies {
compileOnly 'dev.galasa:dev.galasa.core.manager'
}
```


Finally, use the annotation that is provided by the Manager in the test. The annotation calls the Manager at runtime. In this example, the provided annotation is _@CoreManager_. 


# <a name="configuring"></a>Configuring 

The following are properties used to configure the Core Manager:

## <a name="cps"></a>Configuration Properties

<details>
<summary>Resource String Pattern CPS Property</summary>

| Property: | Resource String Pattern CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | core.resource.string.[length].pattern |
| Description: | Sets the patterns of resources strings for a length of string.  The patterns are from the Galasa ResourcePoolingService which uses a homegrown syntax.  |
| Required:  | No |
| Default value: | {A-Z} for each byte for the specified length |
| Valid values: | For each character can be a constant or a random choice from a literal, eg {A-Z results in a single character between A and Z inclusive. {0-9} or {a-zA-Z0-9} are options. DFH{A-Z}{0-1}{0-9}{0-9}{0-9}, results in DFHA1789 for example, the 4th character can only be 0 or 1. 
| Examples: | <code>core.resource.string.8.length={A-Z}{A-Z}{A-Z}{A-Z}{A-Z}{A-Z}{A-Z}{A-Z}<br> </code> |

</details>

# <a name="annotations"></a>Annotations provided by the Manager

The following annotations are provided by the Core Manager:

<details>
<summary>Logger</summary>

| Name: | Logger |
| --------------------------------------- | :------------------------------------- |
| Name: | @Logger |
| Description: | Creates the log which is then automatically stored in the Result Archive Store (RAS) by the Galasa framework. |
| Syntax:  | logger.info ("message");|

</details>

<details>
<summary>Stored Artifact Root</summary>

| Name: | StoredArtifactRoot |
| --------------------------------------- | :------------------------------------- |
| Name: | @StoredArtifactRoot |
| Description: | Lets your test write specific output to the RAS. |
| Syntax:  | artifactRoot.resolve(folder).resolve(file);|

</details>

<details>
<summary>Test Property</summary>

| Name: | TestProperty |
| --------------------------------------- | :------------------------------------- |
| Name: | @TestProperty |
| Description: |  |
| Syntax:  | |

</details>



# <a name="codesnippets"></a>Code snippets and examples

<details><summary>Extract credentials from a file</summary>

You can extract credentials by using the `getCredentials` method. The Core Manager uses the `getCredentials` method to retrieve a user id and password from a file to use in your test.

```
import dev.galasa.ICredentials;
import dev.galasa.ICredentialsUsernamePassword;
...
@Test
...
ICredentialsUsernamePassword credentials = (ICredentialsUsernamePassword) \
coreManger.getCredentials("APP");
credentials.getPassword();
credentials.getUsername();
```
</details>

<details><summary>Mask the value of an extracted password</summary>

To mask the password, for example to prevent it from being displayed in recorded screens, use the Core Manager `registerConfidentialText` method.

```
coreManager.registerConfidentialText("SYS1", "IBMUSER password");
```
</details>

<details><summary>Store an XML request in the test results archive</summary>

```
Path requestPath = artifactRoot.resolve(folder).resolve(file).;
Files.write(requestPath, content.getBytes(), new SetContentType(ResultArchiveStoreContentType.TEXT),
    StandardOpenOption.CREATE);
```
</details>
