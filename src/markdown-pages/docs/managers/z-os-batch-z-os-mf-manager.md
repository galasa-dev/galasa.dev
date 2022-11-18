---
path: "/docs/managers/z-os-batch-z-os-mf-manager"
title: "z/OS Batch z/OS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>

# <a name="overview"></a>Overview
This Manager is an internal implementation of the z/OS Batch Manager using z/OS MF. The z/OS MF Batch Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS batch function and pulls in the z/OS MF Batch Manager to provide the implementation of the interface. If your test needs to submit or monitor a batch job or retrieve output from a batch job, you can call the z/OS Manager in your test code and the z/OS Manager will call the z/OS MF Batch Manager to provide the implementation via the z/OS batch  function. For example, the <a href="/docs/running-simbank-tests/batch-accounts-open-test">BatchAccountsOpenTest</a>  uses the z/OS Manager (which in the background, invokes z/OS MF) to add a set of accounts to the Galasa SimBank  system via a z/OS batch job.  <p> The zOS Batch z/OS MF Manager is enabled by setting the CPS property:<br> <code>zos.bundle.extra.batch.manager=dev.galasa.zosbatch.zosmf.manager</code><br>  Galasa sets this property by default. <p>

## <a name="dependencies"></a>Including the Manager in a test

You also need to add the Manager dependency into the pom.xml file if you are using Maven, or into the build.gradle file if you are using Gradle. 

If you are using Maven, add the following dependencies into the _pom.xml_ in the _dependencies_ section:

```
<dependency>
<groupId>dev.galasa</groupId>
<artifactId>dev.galasa.zosbatch.zosmf.manager</artifactId>
</dependency>
```

If you are using Gradle, add the following dependencies into ```build.gradle``` in the _dependencies_ closure:

```
dependencies {
compileOnly 'dev.galasa:dev.galasa.zosbatch.zosmf.manager'
}
```

# <a name="configuring"></a>Configuring 

The following are properties used to configure the z/OS MF Batch  Manager:

## <a name="cps"></a>Configuration Properties

<details>
<summary>Extra bundle required to implement the z/OS Batch Manager</summary>

| Property: | Extra bundle required to implement the z/OS Batch Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.batch.manager |
| Description: | The name of the Bundle that implements the z/OS Batch Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosbatch.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.batch.manager=dev.galasa.common.zosbatch.zosmf.manager</code><br> |

</details>

<details>
<summary>z/OS Batch restrict processing to the server on the specified image</summary>

| Property: | z/OS Batch restrict processing to the server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].restrict.to.image |
| Description: | Use only the server (e.g. zOSMF, RSE API, etc) running on the image associated with the z/OS Batch job |
| Required:  | No |
| Default value: | false |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjob.MVSA.restrict.to.image=true</code><br> <code>zosbatch.batchjob.default.restrict.to.image=false</code> |

</details>

<details>
<summary>z/OS Batch default input class</summary>

| Property: | z/OS Batch default input class |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].input.class |
| Description: | The default input class to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | A |
| Valid values: | a valid JES input class literal |
| Examples: | <code>zosbatch.default.MVSA.input.class=S</code><br> <code>zosbatch.default.input.class=A</code> |

</details>

<details>
<summary>z/OS Batch job execution wait timeout</summary>

| Property: | z/OS Batch job execution wait timeout |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].timeout |
| Description: | The value in seconds to wait for the z/OS Batch job execution to complete when submitted via zOSMF |
| Required:  | No |
| Default value: | 350 |
| Valid values: | 0 to {@link Integer#MAX_VALUE} |
| Examples: | <code>zosbatch.batchjob.MVSA.timeout=350</code><br> <code>zosbatch.batchjob.default.timeout=60</code> |

</details>

<details>
<summary>z/OS Batch jobname prefix</summary>

| Property: | z/OS Batch jobname prefix |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.jobname.[imageid].prefix |
| Description: | The z/OS Batch jobname prefix when submitted via zOSMF |
| Required:  | No |
| Default value: | GAL |
| Valid values: | 1-7 characters |
| Examples: | <code>zosbatch.jobname.MVSA.prefix=JOB</code><br> <code>zosbatch.jobname.default.prefix=XXX</code> |

</details>

<details>
<summary>z/OS Batch default MSGCLASS</summary>

| Property: | z/OS Batch default MSGCLASS |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].message.class |
| Description: | The default message class to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | A |
| Valid values: | a valid JES message class literal |
| Examples: | <code>zosbatch.default.MVSA.message.class=S</code><br> <code>zosbatch.default.message.class=A</code> |

</details>

<details>
<summary>z/OS Batch default message level</summary>

| Property: | z/OS Batch default message level |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].message.level |
| Description: | The default message level to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | (1,1) |
| Valid values: | a valid JES message level |
| Examples: | <code>zosbatch.default.MVSA.message.level=(1,1)</code><br> <code>zosbatch.default.message.level=(2,0)</code> |

</details>

<details>
<summary>z/OS Batch job truncate JCL</summary>

| Property: | z/OS Batch job truncate JCL |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].truncate.jcl.records |
| Description: | The z/OSMF submit job will fail if supplied with JCL records greater than 80 characters. Setting this property to true will truncate any records to 80 characters and issue a warning message. |
| Required:  | No |
| Default value: | true |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjobe.MVSA.truncate.jcl.records=true</code><br> <code>zosbatch.batchjob.default.truncate.jcl.records=false</code> |

</details>

<details>
<summary>z/OS Batch job use SYSAFF</summary>

| Property: | z/OS Batch job use SYSAFF |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].use.sysaff |
| Description: | Use the run the z/OS Batch job on the specified image by specifying {@code /*JOBPARM SYSAFF=[imageid]} |
| Required:  | No |
| Default value: | true |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjobe.MVSA.use.sysaff=true</code><br> <code>zosbatch.batchjob.default.use.sysaff=false</code> |

</details>

# <a name="annotations"></a>Annotations provided by the Manager

| Annotation: | z/OS Batch |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosBatch |
| Description: | The <code>@ZosBatch</code> annotation requests the z/OS Manager to provide a z/OS Batch instance associated with a z/OS image.  The test can request multiple z/OS Batch instances, with the default being associated with the <b>primary</b> z/OS image.<br> At test end, the Manager stores the job output with the test results archive and removes jobs from the JES queue. |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosBatch(imageTag="A")<br> public IZosBatch zosBatchA;<br></code> |
| Notes: | The <code>IZosBatch</code> interface has a single method, {@link IZosBatch#submitJob(String, IZosBatchJobname)} to submit a JCL  as a <code>String</code> and returns a <code>IZosBatchJob</code> instance.<br><br> See <a href="https://javadoc.galasa.dev/dev/galasa/zosbatch/ZosBatch.html" target="_blank">ZosBatch</a>, <a href="https://javadoc.galasa.dev/dev/galasa/zosbatch/IZosBatch.html" target="_blank">IZosBatch</a> and <a href="https://javadoc.galasa.dev/dev/galasa/zosbatch/IZosBatchJob.html" target="_blank">IZosBatchJob</a> to find out more. |


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

<details><summary>Request a z/OS Batch instance</summary>

The following snippet shows the code that is required to request a z/OS Batch instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosBatch(imageTag="A")
public IZosBatch zosBatch;
```


The code creates a z/OS Batch instance associated with the allocated with the z/OS Image allocated in the *zosImageA* field.
</details>

<details><summary>Submit a z/OS Batch Job</summary>

Submit a z/OS Batch Job using the supplied JCL and a Galasa allocated Job Name:

```
String jcl = "//STEP1    EXEC PGM=IEFBR14";
IZosBatchJob batchJob = zosBatch.submitJob(jcl, null);
```
</details>

<details><summary>Submit a z/OS Batch Job with job card parameters</summary>

Submit a z/OS Batch Job using the supplied JCL, a Galasa allocated Job Name and overidding the default input and message class:

```
String jcl = "//STEP1    EXEC PGM=IEFBR14";
ZosBatchJobcard jobcard = new ZosBatchJobcard().
                          .setInputClass("B")
                          .setMsgClass("X");
IZosBatchJob batchJob = zosBatch.submitJob(jcl, null, jobcard);
```
</details>

<details><summary>Wait for z/OS Batch Job to complete</summary>

Wait for z/OS Batch job to complete and check maximum return code:

```
if (batchJob.waitForJob() > 0) {
    logger.info("Batch job failed RETCODE=" + batchJob.getRetcode();
}
```

prints, for example:

```
Batch job failed RETCODE=CC 0020
```

or

```
Batch job failed RETCODE=ABEND S0C4
```
</details>

<details><summary>Retrieve the job output</summary>

Use the following code to retrieve the output from a z/OS Batch Job:

```
IZosBatchJobOutput jobOutput = batchJob.retrieveOutput();
List<IZosBatchJobOutputSpoolFile> spoolFiles = jobOutput.getSpoolFiles();
for (IZosBatchJobOutputSpoolFile spoolFile : spoolFiles) {
    String ddName = spoolFile.getDdname();
    String output = spoolFile.getRecords();
    ...
}

```
</details>

<details><summary>Obtain a list of active jobs</summary>

Use the following code to obtain a list of active jobs called *MYJOB1* with an owner of *USERID*:

```
List<IZosBatchJob> jobs = zosBatch.getJobs("MYJOB1", "USERID");
for (IZosBatchJob job : jobs) {
    if (job.getStatus().equals("ACTIVE")) {
        ...
    }
}

```
</details>

<details><summary>Retrieve the content of a specific spool file from an active CICS region</summary>

Use the following code to retrieve and process the output from the *MSGUSR* spool file:

```
List<IZosBatchJob> jobs = zosBatch.getJobs("CICSRGN", "CICSUSR");
for (IZosBatchJob job : jobs) {
    if (job.getStatus().equals("ACTIVE")) {
        String msgusr = cicsJob.getSpoolFile("MSGUSR");
        if (msgusr.contains("DFHAC2236")) {
            ...
        }
        break;
    }
}

```


The code retrieves a list of CICS regions named *CICSRGN* with and owner of *CICSUSR*. It then loops through until it finds the first active region. The content of the *MSGUSR* spool file is obtained and checked for the string *DFHAC2236*.

In this example, we assume there will only one spool file with the ddname of *MSGUSR*. If this were not the case, the following code could be used:

```
List<IZosBatchJob> jobs = zosBatch.getJobs("CICSRGN", "CICSUSR");
for (IZosBatchJob job : jobs) {
    List<IZosBatchJobOutputSpoolFile> spoolFiles = job.retrieveOutput().getSpoolFiles();
    for (IZosBatchJobOutputSpoolFile spoolFile : spoolFiles) {
        if (spoolFile.getDdname().equals("SYSOUT") &&
            spoolFile.getStepname().equals("STEP2")) {
            String output = spoolFile.getRecords();
            ...
        }
    }
}

```

Here, the code retrieves the content of the *SYSOUT* spool file for job step *STEP2*.
</details>


