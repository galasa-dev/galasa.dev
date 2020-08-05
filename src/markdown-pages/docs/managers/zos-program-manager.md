---
path: "/docs/managers/zos-program-manager"
title: "zOS Program Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This Manager allows Galasa tests to compile and link zOS Programs.<br><br>  The <code>@ZosProgram</code> annotation defines the program to the Galasa test. Program attributes, for example, program name, programming language and source location are specified by using the annotation  elements. <br><br> The source for the program is stored as a resource, along with the test. The z/OS Program Manager processes  each <code>@ZosProgram</code> annotation before any of the test methods are executed. The Manager  retrieves the source from the test bundle, builds and submits the relevant compile and link JCL based on  the programs attributes and CPS properties. The batch job is saved with the test run archive. The  program can be executed in the test by retrieving the library containing the load module by using  the <code>getLoadLibrary()</code> method. <br><br>  The Simbank tutorial <a href="/docs/running-simbank-tests/batch-accounts-open-test">BatchAccountsOpenTest</a>BatchAccountsOpenTest  contains an example of running a simulated z/OS program called SIMBANK by using the <code>EXEC PGM=SIMBANK</code> command. <br><br> <br><br> You can view the <a href="https://javadoc.galasa.dev/" target="_blank" rel="noopener noreferrer">Javadoc documentation for the Manager here</a>. <br><br>


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
| Attribute: `cics` |  Is a CICS program and requires the CICS translator. |
| Attribute: `loadlib` |  The load module data set name |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosProgram(imageTag="A")<br> public IZosProgram zosProgramA;<br></code> |
| Notes: | The <code>IZosProgram</code> interface has a number of methods to manage the zOS Program. See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosprogram/ZosProgram.html" target="_blank">ZosProgram</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosprogram/IZosProgram.html" target="_blank">IZosProgram</a> to find out more. |

</details>



## Code snippets

Use the following code snippets to help you get started with the zOS Program Manager.
 
<details><summary>Compile and Link a COBOL program</summary>

The following snippet shows the code that is required to compile and link a *COBOL* program called *MYPROG* in a Galasa test:

```
@ZosProgram(name = "MYPROG",
        location = "source",
        language = Language.COBOL,
        imageTag = "A")
public IZosProgram myprog;
```

The program source is stored in a file named *MYPROG.cbl* in a folder named *source* in the test bundle resources folder. 
The manager builds the JCL to compile and link the source code and submits it on the zOS Image allocated in the *zosImageA* field.
</details>

<details><summary>Run the compiled program</summary>

The following snippet shows the code required to run the compiled program in a batch job:

```
@ZosImage(imageTag = "A")
public IZosImage image;

@ZosBatch(imageTag = "A")
public IZosBatch zosBatch;

...

StringBuilder jcl = new StringBuilder();
jcl.append("//STEP1   EXEC PGM=");
jcl.append(myprog.getName());
jcl.append("\n");
jcl.append("//STEPLIB DD DSN=");
jcl.append(myprog.getLoadlib().getName());
jcl.append(",DISP=SHR\n");
jcl.append("//SYSOUT  DD SYSOUT=*");
IZosBatchJob job = zosBatch.submitJob(jcl.toString(), null);
...
```

The manager created a load library for *MYPROG* because the *@ZosProgram* annotation did not specify one. The name of the library is obtained using the *getLoadlib()* method on the field so that it can be added to the *STEPLIB* in the JCL. 
</details>

## Configuration Properties

The following are properties used to configure the zOS Program Manager.
 
<details>
<summary>zOS CICS data set Prefix</summary>

| Property: | zOS CICS data set Prefix |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.cics.[imageid].dataset.prefix |
| Description: | zOS CICS data set prefix |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.cics.MVSA.dataset.prefix=CICS</code><br> <code>zosprogram.cics.default.dataset.prefix=SYS1,CICS</code> |

</details>
 
<details>
<summary>zOS LanguageExtended Environment data set prefix</summary>

| Property: | zOS LanguageExtended Environment data set prefix |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.le.[imageid].dataset.prefix |
| Description: | zOS LanguageExtended Environment data set prefix |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.le.MVSA.dataset.prefix=CEE</code><br> <code>zosprogram.le.dataset.prefix=SYS1.LE,CEE</code> |

</details>
 
<details>
<summary>zOS Program LanguageExtended specific custom compile syslibs</summary>

| Property: | zOS Program LanguageExtended specific custom compile syslibs |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.[language].[imageid].compile.syslibs |
| Description: | zOS Program LanguageExtended data set prefix |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.cobol.MVSA.compile.syslibs=TEAM.COPYBOOK</code><br> <code>zosprogram.cobol.compile.syslibs=COMPANY.COPYBOOK,TEAM.COPYBOOK</code> |

</details>
 
<details>
<summary>zOS Program LanguageExtended data set prefix</summary>

| Property: | zOS Program LanguageExtended data set prefix |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.[language].[imageid].dataset.prefix |
| Description: | zOS Program LanguageExtended data set High Level Qualifier |
| Required:  | Yes |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.cobol.MVSA.dataset.prefix=IGY.V6R3M0</code><br> <code>zosprogram.cobol.dataset.prefix=SYS1.COBIL,IGY.V6R3M0</code> |

</details>
 
<details>
<summary>zOS Program LanguageExtended specific custom link syslibs</summary>

| Property: | zOS Program LanguageExtended specific custom link syslibs |
| --------------------------------------- | :------------------------------------- |
| Name: | zosprogram.[language].[imageid].link.syslibs |
| Description: | zOS Program LanguageExtended data set prefix |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosprogram.cobol.MVSA.link.syslibs=TEAM.LOADLIB</code><br> <code>zosprogram.cobol.link.syslibs=COMPANY.LOADLIB,TEAM.LOADLIB</code> |

</details>
