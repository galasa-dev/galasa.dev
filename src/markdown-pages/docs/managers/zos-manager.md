---
path: "/docs/managers/zos-manager"
title: "zOS Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager provides Galasa tests with access to a z/OS image.<br><br> You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zos/package-summary.html">Javadoc documentation for the Manager here</a>. <br><br>


## Annotations

The following annotations are available with the z/OS Manager
<details>
<summary>z/OS Batch</summary>

| Annotation: | z/OS Batch |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosBatch |
| Description: | The <code>@ZosBatch</code> annotation requests the z/OS Manager to provide a z/OS Batch instance associated with a z/OS image.  The test can request multiple z/OS Batch instances, with the default being associated with the <b>primary</b> zOS image.<br> At test end, the Manager stores the job output with the test results archive and removes jobs from the JES queue. |
| Attribute: `imageTag` |  The <code>imageTag</code> is used to identify the z/OS image. |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosBatch(imageTag="A")<br> public IZosBatch zosBatchA;<br></code> |
| Notes: | The <code>IZosBatch</code> interface has a single method, {@link IZosBatch#submitJob(String, IZosBatchJobname)} to submit a JCL  as a <code>String</code> and returns a <code>IZosBatchJob</code> instance.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosbatch/ZosBatch.html" target="_blank">ZosBatch</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosbatch/IZosBatch.html" target="_blank">IZosBatch</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosbatch/IZosBatchJob.html" target="_blank">IZosBatchJob</a> to find out more. |

</details>

<details>
<summary>z/OS Console</summary>

| Annotation: | z/OS Console |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosConsole |
| Description: | The <code>@ZosConsole</code> annotation requests the z/OS Manager to provide a z/OS Console instance associated with a z/OS image.  The test can request multiple z/OS Console instances, with the default being associated with the <b>primary</b> z/OS image.<br> |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosConsole(imageTag="A")<br> public IZosConsole zosConsoleA;<br></code> |
| Notes: | The <code>IZosConsole</code> interface has two methods, {@link IZosConsole#issueCommand(String)} and {@link IZosConsole#issueCommand(String, String)} to issue a command to the z/OS console and returns a <code>IZosConsoleCommand</code> instance.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosconsole/ZosConsole.html" target="_blank">ZosConsole</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosconsole/IZosConsole.html" target="_blank">IZosConsole</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosconsole/IZosConsoleCommand.html" target="_blank">IZosConsoleCommand</a> to find out more. |

</details>

<details>
<summary>z/OS File</summary>

| Annotation: | z/OS File |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosFileHandler |
| Description: | The <code>@ZosFileHandler</code> annotation requests the z/OS Manager to provide a handler instance to manage data sets and UNIX files on a z/OS image.  A single z/OS File Handler instance can manage multiple z/OS data sets and UNIX files on multiple z/OS images.<br> Files are deleted at method end unless created with the object's *createRetain()* method where it is deleted at test end.<br> |
| Syntax: | <code>@ZosFileHandler<br> public IZosFileHandler zosFileHandler;<br></code> |
| Notes: | The <code>IZosFileHandler</code> interface has three methods supplying file name and z/OS image:<br> {@link IZosFileHandler#newDataset(String, dev.galasa.zos.IZosImage)}<br>  {@link IZosFileHandler#newVSAMDataset(String, dev.galasa.zos.IZosImage)}<br> {@link IZosFileHandler#newUNIXFile(String, dev.galasa.zos.IZosImage)}<br> returning an object representing the type of file requested. This can be an existing file or can be created via a method on the file object.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosfile/ZosFileHandler.html" target="_blank">ZosFileHandler</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosfile/IZosFileHandler.html" target="_blank">IZosFileHandler</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosfile/IZosDataset.html" target="_blank">IZosDataset</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosfile/IZosVSAMDataset.html" target="_blank">IZosVSAMDataset</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosfile/IZosUNIXFile.html" target="_blank">IZosUNIXFile</a> to find out more. |

</details>

<details>
<summary>z/OS TSO</summary>

| Annotation: | z/OS TSO |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosTSO |
| Description: | The <code>@ZosTSO</code> annotation requests the z/OS Manager to provide a z/OS TSO instance associated with a z/OS image.  The test can request multiple z/OS TSO instances, with the default being associated with the <b>primary</b> z/OS image.<br> |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosTSO(imageTag="A")<br> public IZosTSO zosTSOA;<br></code> |
| Notes: | The <code>IZosTSO</code> interface provides the method {@link IZosTSO#issueCommand(String)} to issue a command to z/OS TSO and returns a <code>IZosTSOCommand</code> instance.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zostso/ZosTSO.html" target="_blank">ZosTSO</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zostso/IZosTSO.html" target="_blank">IZosTSO</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zostso/IZosTSOCommand.html" target="_blank">IZosTSOCommand</a> to find out more. |

</details>

<details>
<summary>z/OS UNIX</summary>

| Annotation: | z/OS UNIX |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosUNIX |
| Description: | The <code>@ZosUNIX</code> annotation requests the z/OS Manager to provide a z/OS UNIX instance associated with a z/OS image.  The test can request multiple z/OS UNIX instances, with the default being associated with the <b>primary</b> z/OS image.<br> |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosUNIX(imageTag="A")<br> public IZosUNIX zosUNIXA;<br></code> |
| Notes: | The <code>IZosUNIX</code> interface provides the method {@link IZosUNIX#issueCommand(String)} to issue a command to z/OS UNIX and returns a <code>IZosUNIXCommand</code> instance.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosunix/ZosUNIX.html" target="_blank">ZosUNIX</a>, <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosunix/IZosUNIX.html" target="_blank">IZosUNIX</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosunix/IZosUNIXCommand.html" target="_blank">IZosUNIXCommand</a> to find out more. |

</details>



## Code snippets

Use the following code snippets to help you get started with the z/OS Manager.
 
<details><summary>Request a z/OS TSO Command instance

The following snippet shows the code that is required to request a z/OS TSO Command instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosTSO(imageTag="A")
public IZosTSO tso;
```

The code creates a zOS TSO Command instance associated with the z/OS Image allocated in the *zosImageA* field.
</details>

<details><summary>Issue a z/OS TSO Command and retrieve the immediate response

Issue the z/OS TSO `TIME` Command and retrieve the response:

```
String tsoCommandString = "TIME";
IZosTSOCommand tsoCommand = tso.issueCommand(tsoCommandString);
String tsoResponse = tsoCommand.getResponse();
```

The String `response`  contains the value of the TSO TIME command, e.g. 

```
IKJ56650I TIME-04:17:14 PM. CPU-00:00:00 SERVICE-290 SESSION-00:00:00 APRIL 15,2020
```
</details>
 
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


<details><summary>Issue a z/OS Console command and retrieve the delayed response</summary>

Issue a z/OS Console command and retrieve the delayed console command response:

```
String command = "D A,L";
IZosConsoleCommand consoleCommand = zosConsole.issueCommand(command);
String delayedResponse = consoleCommand.requestResponse();

```
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

<details><summary>Submit a zOS Batch Job</summary>

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
 
<details><summary>Request a z/OS File Handler instance</summary>

The following snippet shows the code that is required to request a z/OS File Handler instance in a Galasa test:

```
@ZosFileHandler
public IZosFileHandler zosFileHandler;
```
</details>

<details><summary>Read the content of an existing sequential data set</summary>

Create a new *IZosDataset* object representing an existing sequential data set. If the data set exists, retrieve the content in text mode:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.EXISTING.DATASET.SEQ", zosImageA);
if (dataSet.exists()) {
    String dataSet.retrieveAsText();
    ...
}
```
</details>


<details><summary>Read the content of an existing partitioned data set member</summary>

Create a new *IZosDataset* object representing an existing partitioned data set (PDS). If the PDS exists, check if the member exists and retrieve it's content in text mode:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.EXISTING.DATASET.SEQ, zosImageA);
    String memberName = "MEMBER1";
    if (dataSet.exists() && dataSet.memberExists(memberName)) {
        String content = dataSet.memberRetrieveAsText(memberName);
        ...
    }
```
</details>


<details><summary>Create a new sequential data set</summary>

Create a new *IZosDataset* object representing a new sequential data set. If the data set does not exist, allocate the data set with attributes to the equivalent of the following JCL:

```
//NEWDS    DD DSN=GALASA.NEW.DATASET.SEQ,DISP=(NEW,CATLG),
//            DSORG=PS,RECFM=FB,LRECL=80,BLKSIZE=32720,
//            UNIT=SYSDA,SPACE=(TRK,(1,1))
```
Finally, content is written to the data set in text mode:


```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.NEW.DATASET.SEQ", zosImageA);
    if (!dataSet.exists()) {
        dataSet.setDatasetOrganization(DatasetOrganization.SEQUENTIAL);
        dataSet.setRecordFormat(RecordFormat.FIXED_BLOCKED);
        dataSet.setRecordlength(80);
        dataSet.setBlockSize(32720);
        dataSet.setUnit("SYSDA");
        dataSet.setSpace(SpaceUnit.TRACKS, 1, 1);
        dataSet.create();
    }
    List<String> records = new ArrayList<>();
    records.add("RECORD 1");
    records.add("RECORD 2");
    records.add("RECORD 3");
    dataSet.storeText(String.join("\n", records));
```
</details>

<details><summary>Create a new partitioned data set member</summary>

Create a new *IZosDataset* object representing a new partitioned data (PDS) set member. If the data set does not exist, allocate the PDS with attributes to the equivalent of the following JCL:

```
//NEWPDS   DD DSN=GALASA.NEW.DATASET.PDS,DISP=(NEW,CATLG),
//            DSORG=PS,RECFM=FB,LRECL=80,BLKSIZE=32720,
//            UNIT=SYSDA,SPACE=(TRK,(1,1,15))
```
Finally, content is written to a member in the PDS in text mode:


```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.NEW.DATASET.PDS", zosImageA);
if (!dataSet.exists()) {
    dataSet.setDatasetOrganization(DatasetOrganization.SEQUENTIAL);
    dataSet.setRecordFormat(RecordFormat.FIXED_BLOCKED);
    dataSet.setRecordlength(80);
    dataSet.setBlockSize(32720);
    dataSet.setUnit("SYSDA");
    dataSet.setSpace(SpaceUnit.TRACKS, 1, 1);
    dataSet.setDirectoryBlocks(15);
    dataSet.create();
}
String memberName = "MEMBER1";
List<String> records = new ArrayList<>();
    records.add("RECORD 1");
    records.add("RECORD 2");
    records.add("RECORD 3");
    dataSet.memberStoreText(memberName, String.join("\n", records));
}
```
To create a PDS/E, i.e. the JCL equivalent of

```
DSNTYPE=LIBRARY
```
use

```
dataSet.setDatasetType(DSType.PDSE);
```
instead of setting the number of directory blocks.
</details>

<details><summary>Create a new VSAM KSDS</summary>

Create a new *IZosVSAMDataset* object representing a new VSAM KSDS data set. If the data set is allocated with a minimum set of attributes:

```
IZosVSAMDataset vsamDataSet = zosFileHandler.newVSAMDataset("ROBERTD.GALASA.TEST.DS.ANOTHER.KSDS", zosImageA);
vsamDataSet.setSpace(VSAMSpaceUnit.CYLINDERS, 1, 1);
vsamDataSet.setRecordSize(50, 101);
vsamDataSet.create();
```
</details>

<details><summary>Read a zOS UNIX File</summary>

*To be completed...*
</details>
 
<details><summary>Request a z/OS UNIX Command instance

The following snippet shows the code that is required to request a z/OS UNIX Command instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosUNIX(imageTag="A")
public IZosUNIX unix;
```

The code creates a z/OS UNIX Command instance associated with the z/OS Image allocated in the *zosImageA* field.
</details>

<details><summary>Issue a z/OS UNIX Command and retrieve the immediate response

Issue the z/OS UNIX `date` Command and retrieve the response:

```
String unixCommandString = "date";
IZosUNIXCommand unixCommand = unix.issueCommand(unixCommandString);
String unixResponse = unixCommand.getResponse();
```

The String `response`  contains the value of the UNIX TIME command, e.g. 

```
Wed Apr 15 16:17:14 BST 2020
```
</details>

## Configuration Properties

The following are properties used to configure the z/OS Manager.
 
<details>
<summary>Extra bundle to required to implement the z/OS Batch Manager</summary>

| Property: | Extra bundle to required to implement the z/OS Batch Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.batch.manager |
| Description: | The name of the Bundle that implements the z/OS Batch Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosbatch.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.batch.manager=dev.galasa.common.zosbatch.zosmf.manager</code><br> |

</details>
 
<details>
<summary>The z/OS Cluster ID</summary>

| Property: | The zOS Cluster ID |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.tag.[tag].clusterid |
| Description: | The z/OS Cluster ID for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.tag.[tag].clusterid=plex1</code><br> |

</details>
 
<details>
<summary>The images for a z/OS Cluster</summary>

| Property: | The images for a z/OS Cluster |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.cluster.[clusterId].images |
| Description: | The z/OS Images for the specifies Cluster |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.cluster.[clusterId].images=SYSA,SYSB,SYSC</code><br> |

</details>
 
<details>
<summary>Extra bundle to required to implement the z/OS Console Manager</summary>

| Property: | Extra bundle to required to implement the z/OS Console Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.console.manager |
| Description: | The name of the Bundle that implements the z/OS Console Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosconsole.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.console.manager=dev.galasa.common.zosconsole.zosmf.manager</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment z/OS Image Cluster ID</summary>

| Property: | Developer Supplied Environment z/OS Image Cluster ID |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.dse.tag.[tag].clusterid |
| Description: | The Cluster ID for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.dse.tag.[tag].clusterid=PLEXA</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment z/OS Image</summary>

| Property: | Developer Supplied Environment z/OS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.dse.tag.[tag].imageid |
| Description: | The image ID of the Developer Supplied Environment for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.dse.tag.[tag].imageid=SYSA</code><br> |

</details>
 
<details>
<summary>Extra bundle to required to implement the z/OS File Manager</summary>

| Property: | Extra bundle to required to implement the z/OS File Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.file.manager |
| Description: | The name of the Bundle that implements the zOS File Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosfile.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.file.manager=dev.galasa.common.zosfile.zosmf.manager</code><br> |

</details>
 
<details>
<summary>IP Host ID of the z/OS Image</summary>

| Property: | IP Host ID of the z/OS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.image.[tag].iphostidr |
| Description: | The IP Host ID of the z/OS Image for the supplied tag.<br>  If CPS property zos.image.[tag].iphostid exists, then that is returned, otherwise the z/OS Image ID is returned |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.image.[tag].iphostidr=sysa.ibm.com</code><br> |

</details>
 
<details>
<summary>The z/OS Image</summary>

| Property: | The z/OS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.dse.tag.[tag].imageid |
| Description: | The image ID for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.dse.tag.[tag].imageid=SYSA</code><br> |

</details>
 
<details>
<summary>Maximum slots for z/OS Image</summary>

| Property: | Maximum slots for zOS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.image.[tag].max.slots |
| Description: | The maximum slots available on a z/OS Image for the specified tag |
| Required:  | No |
| Default value: | 2 |
| Valid values: | $validValues |
| Examples: | <code>zos.image.[tag].max.slots=2</code><br> |

</details>
 
<details>
<summary>The run data set HLQ for the z/OS Image</summary>

| Property: | The run data set HLQ for the z/OS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.run.[image].dataset.hlq |
| Description: | The data set HLQ(s) for temporary data sets created on z/OS Image.<br>  If CPS property zos.run.[image].dataset.hlq exists, then that is returned |
| Required:  | No |
| Default value: | runuser.GALASA |
| Valid values: | $validValues |
| Examples: | <code>zos.run.[image].dataset.hlq=USERID.GALASA</code><br> |

</details>
 
<details>
<summary>Extra bundle to required to implement the z/OS TSO Command Manager</summary>

| Property: | Extra bundle to required to implement the z/OS TSO Command Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.tso.manager |
| Description: | The name of the Bundle that implements the zOS TSO Command Manager |
| Required:  | No |
| Default value: | dev.galasa.zostso.ssh.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.tso.manager=dev.galasa.zostso.ssh.manager</code> |

</details>
 
<details>
<summary>Extra bundle to required to implement the z/OS UNIX Command Manager</summary>

| Property: | Extra bundle to required to implement the z/OS UNIX Command Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.unix.manager |
| Description: | The name of the Bundle that implements the z/OS UNIX Command Manager |
| Required:  | No |
| Default value: | dev.galasa.zosunix.ssh.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.unix.manager=dev.galasa.zosunix.ssh.manager</code> |

</details>
