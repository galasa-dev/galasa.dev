---
path: "/docs/managers/zos-manager"
title: "zOS Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager provides tests and Managers with access to and configuration information about z/OS images and Sysplexes. It offers services such as APF, DUMP, SMF and Log access. <br><br> Additionally, the z/OS Manager provides tests with interfaces to the following z/OS functions which are implemented by other Managers: <br><br> - <code>z/OS Batch</code> which enables tests and Managers to submit, monitor and retrieve the output of z/OS batch jobs. See <a href="/docs/running-simbank-tests/batch-accounts-open-test">BatchAccountsOpenTest</a> for a walkthrough of a test that employs this Manager.<br><br> - <code>z/OS Console</code> which allows tests and Managers to issue and retrieve the responses from z/OS console commands.<br><br> - <code>z/OS File</code> which provides tests and Managers with the ability to manage and transfer files to and from z/OS. Supported file types include Sequential, PDS, PDSE, KSDS, ESDS or RRDS and zOS UNIX files.<br><br> - <code>z/OS TSO Command</code> which enables tests and Managers to issue and retrieve the responses from z/OS TSO commands. <br><br> - <code>z/OS UNIX Command</code> which enables tests and Managers to issue and retrieve the responses from z/OS UNIX commands.<br><br> <br><br> You can view the <a href="https://javadoc.galasa.dev/dev/galasa/zos/package-summary.html">Javadoc documentation for the Manager here</a>. <br><br>


## Annotations

The following annotations are available with the zOS Manager
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
<summary>z/OS TSO Command</summary>

| Annotation: | z/OS TSO Command |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosTSOCommand |
| Description: | The <code>@ZosTSOCommand</code> annotation requests the z/OS Manager to provide a z/OS TSO Command instance associated with a z/OS image.  The test can request multiple z/OS TSO Command instances, with the default being associated with the <b>primary</b> z/OS image.<br> |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosTSOCommand(imageTag="A")<br> public IZosTSOCpmmand zosTSOA;<br></code> |
| Notes: | The <code>IZosTSOCommand</code> interface provides the methods {@link IZosTSOCommand#issueCommand(String)} and {@link IZosTSOCommand#issueCommand(String, long)} to issue a command to z/OS TSO Command and returns a <code>String</code>.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zostsocommand/IZosTSOCommand.html" target="_blank">IZosTSOCommand</a> to find out more. |

</details>

<details>
<summary>z/OS UNIX Command</summary>

| Annotation: | z/OS UNIX Command |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosUNIXCommand |
| Description: | The <code>@ZosUNIXCommand</code> annotation requests the z/OS Manager to provide a z/OS UNIX instance associated with a z/OS image.  The test can request multiple z/OS UNIX Command instances, with the default being associated with the <b>primary</b> z/OS image.<br> |
| Attribute: `imageTag` |  The tag of the zOS Image this variable is to be populated with |
| Syntax: | @ZosImage(imageTag="A")<br> public IZosImage zosImageA;<br> @ZosUNIXCommand(imageTag="A")<br> public IZosUNIXCommand zosUNIXCommandA;<br></code> |
| Notes: | The <code>IZosUNIXCommand</code> interface provides the methods {@link IZosUNIXCommand#issueCommand(String)} and {@link IZosUNIXCommand#issueCommand(String, long)} to issue a command to z/OS UNIX and returns a <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosunixcommand/String.html" target="_blank">String</a> response.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/zosunixcommand/IZosUNIXCommand.html" target="_blank">IZosUNIXCommand</a> to find out more. |

</details>



## Code snippets

Use the following code snippets to help you get started with the zOS Manager.
 
<details><summary>Request a zOS TSO Command instance</summary>

The following snippet shows the code that is required to request a zOS TSO Command instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosTSOCommand(imageTag="A")
public IZosTSOCommand tsoCommand;
```

The code creates a zOS TSO Command instance associated with the zOS Image allocated in the *zosImageA* field.
</details>

<details><summary>Issue a zOS TSO Command and retrieve the immediate response</summary>

Issue the zOS TSO `TIME` Command and retrieve the response:

```
String tsoCommandString = "TIME";
String tsoResponse = tsoCommand.issueCommand(tsoCommandString);
```

The String `tsoResponse`  contains the output of the TSO TIME command, e.g. 

```
IKJ56650I TIME-12:01:00 PM. CPU-00:00:00 SERVICE-290 SESSION-00:00:00 APRIL 1,2020
```
</details>
 
<details><summary>Request a zOS UNIX Command instance</summary>

The following snippet shows the code that is required to request a zOS UNIX Command instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosUNIXCommand(imageTag="A")
public IZosUNIXCommand unixCommand;
```

The code creates a zOS UNIX Command instance associated with the zOS Image allocated in the *zosImageA* field.
</details>

<details><summary>Issue a zOS UNIX Command and retrieve response</summary>

Issue the zOS UNIX `date` Command and retrieve the response:

```
String unixCommandString = "date";
String unixResponse = unixCommand.issueCommand(unixCommandString);
```

The String `unixResponse`  contains the output of the UNIX TIME command, e.g. 

```
Wed Apr 1 12:01:00 BST 2020
```
</details>
 
<details><summary>Request a zOS Console instance</summary>

The following snippet shows the code that is required to request a zOS Console instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosBatch(imageTag="A")
public IZosConsole zosConsole;
```

The code creates a zOS Console instance associated with the zOS Image allocated in the *zosImageA* field.
</details>

<details><summary>Issue a zOS Console command and retrieve the immediate response</summary>

Issue a zOS Console command and retrieve the immediate console command response:

```
String command = "D A,L";
IZosConsoleCommand consoleCommand = zosConsole.issueCommand(command);
String immediateResponse = consoleCommand.getResponse();

```
</details>


<details><summary>Issue a zOS Console command and retrieve the delayed response</summary>

Issue a zOS Console command and retrieve the delayed console command response:

```
String command = "D A,L";
IZosConsoleCommand consoleCommand = zosConsole.issueCommand(command);
String delayedResponse = consoleCommand.requestResponse();

```
</details>
 
<details><summary>Request a zOS Batch instance</summary>

The following snippet shows the code that is required to request a zOS Batch instance in a Galasa test:

```
@ZosImage(imageTag="A")
public IZosImage zosImageA;

@ZosBatch(imageTag="A")
public IZosBatch zosBatch;
```


The code creates a zOS Batch instance associated with the allocated with the zOS Image allocated in the *zosImageA* field.
</details>

<details><summary>Submit a zOS Batch Job</summary>

Submit a zOS Batch Job using the supplied JCL and a Galasa allocated Job Name:

```
String jcl = "//STEP1    EXEC PGM=IEFBR14";
IZosBatchJob batchJob = zosBatch.submitJob(jcl, null);
```
</details>


<details><summary>Submit a zOS Batch Job with job card parameters</summary>

Submit a zOS Batch Job using the supplied JCL, a Galasa allocated Job Name and overidding the default input and message class:

```
String jcl = "//STEP1    EXEC PGM=IEFBR14";
ZosBatchJobcard jobcard = new ZosBatchJobcard().
                          .setInputClass("B")
                          .setMsgClass("X");
IZosBatchJob batchJob = zosBatch.submitJob(jcl, null, jobcard);
```
</details>

<details><summary>Wait for zOS Batch Job to complete</summary>

Wait for zOS Batch job to complete and check maximum return code:

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

Use the following code to retrieve the output from a zOS Batch Job:

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
 
<details><summary>Request a zOS File Handler instance</summary>

The following snippet shows the code that is required to request a zOS File Handler instance in a Galasa test:

```
@ZosFileHandler
public IZosFileHandler zosFileHandler;
```
</details>

<details><summary>Read the content of an existing sequential data set</summary>

Create a new *IZosDataset* object representing an existing sequential data set. If the data set exists, retrieve the content in text mode:

```
@ZosImage(imageTag="A")
public IZosImage zosImage;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.EXISTING.DATASET.SEQ", zosImage);
if (dataSet.exists()) {
    String content = dataSet.retrieveAsText();
    ...
}
```
</details>


<details><summary>Read the content of an existing partitioned data set member</summary>

Create a new *IZosDataset* object representing an existing partitioned data set (PDS). If the PDS exists, check if the member exists and retrieve it's content in text mode:

```
@ZosImage(imageTag="A")
public IZosImage zosImage;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.EXISTING.DATASET.SEQ, zosImage);
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
public IZosImage zosImage;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.NEW.DATASET.SEQ", zosImage);
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
public IZosImage zosImage;

@ZosFileHandler
public IZosFileHandler zosFileHandler;
...
IZosDataset dataSet = zosFileHandler.newDataset("GALASA.NEW.DATASET.PDS", zosImage);
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
dataSet.setDatasetType(DSType.LIBRARY);
```
instead of setting the number of directory blocks.
</details>

<details><summary>Create a new VSAM KSDS</summary>

Create a new *IZosVSAMDataset* object representing a new VSAM KSDS data set. If the data set is allocated with a minimum set of attributes:

```
IZosVSAMDataset vsamDataSet = zosFileHandler.newVSAMDataset("ROBERTD.GALASA.TEST.DS.ANOTHER.KSDS", zosImage);
vsamDataSet.setSpace(VSAMSpaceUnit.CYLINDERS, 1, 1);
vsamDataSet.setRecordSize(50, 101);
vsamDataSet.create();
```
</details>

<details><summary>Read the contents of a zOS UNIX File</summary>

Create a new *IZosDataset* object representing a UNIX file. If the file exists, retrieve the content in text mode:

```
IZosUNIXFile unixFile = zosFileHandler.newUNIXFile("/tmp/Galasa/existingFile", zosImage);
if (unixFile.exists()) {
    unixFile.setDataType(UNIXFileDataType.TEXT);
    String content = unixFile.retrieve();
}
```

</details>

<details><summary>Read the contents of a zOS UNIX File</summary>

Create a new *IZosDataset* object representing a new UNIX file. If UNIX file does not exist, create it. Write to the file in binary mode:

```
IZosUNIXFile unixFile = zosFileHandler.newUNIXFile("/tmp/Galasa/newFile", zosImage);
if (!unixFile.exists()) {
    unixFile.create();
}
List<String> properties = new ArrayList<>();
properties.add("dev.galasa.property1=value1");
properties.add("dev.galasa.property2=value2");
properties.add("dev.galasa.property3=value3");
unixFile.setDataType(UNIXFileDataType.BINARY);
unixFile.store(String.join("\n", properties));
```

</details>

<details><summary>List the contents of a zOS UNIX Directory</summary>

Create a new *IZosDataset* object representing a new UNIX directory. If UNIX directory exists, list its contents:

```
IZosUNIXFile unixDirectory = zosFileHandler.newUNIXFile("/tmp/Galasa/", zosImage);
if (unixDirectory.exists())
{
    Map<String, String> dir = unixDirectory.directoryListRecursive();
    for (Map.Entry<String, String> entry : dir.entrySet()) {
        logger.info(String.format("%2$-9s: %1$s", entry.getKey(), entry.getValue()));
   }
}
```

Example output:

```
directory: /tmp/Galasa/dira
file     : /tmp/Galasa/dira/file1
file     : /tmp/Galasa/dira/file2
file     : /tmp/Galasa/existingFile
file     : /tmp/Galasa/newFile
```

</details>

## Configuration Properties

The following are properties used to configure the zOS Manager.
 
<details>
<summary>Extra bundle to required to implement the zOS Batch Manager</summary>

| Property: | Extra bundle to required to implement the zOS Batch Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.batch.manager |
| Description: | The name of the Bundle that implements the zOS Batch Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosbatch.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.batch.manager=dev.galasa.common.zosbatch.zosmf.manager</code><br> |

</details>
 
<details>
<summary>The zOS Cluster ID</summary>

| Property: | The zOS Cluster ID |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.tag.[tag].clusterid |
| Description: | The zOS Cluster ID for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.tag.[tag].clusterid=plex1</code><br> |

</details>
 
<details>
<summary>The images for a zOS Cluster</summary>

| Property: | The images for a zOS Cluster |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.cluster.[clusterId].images |
| Description: | The zOS Images for the specifies Cluster |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.cluster.[clusterId].images=SYSA,SYSB,SYSC</code><br> |

</details>
 
<details>
<summary>Extra bundle to required to implement the zOS Console Manager</summary>

| Property: | Extra bundle to required to implement the zOS Console Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.console.manager |
| Description: | The name of the Bundle that implements the zOS Console Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosconsole.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.console.manager=dev.galasa.common.zosconsole.zosmf.manager</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment zOS Image Cluster ID</summary>

| Property: | Developer Supplied Environment zOS Image Cluster ID |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.dse.tag.[tag].clusterid |
| Description: | The Cluster ID for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.dse.tag.[tag].clusterid=PLEXA</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment zOS Image</summary>

| Property: | Developer Supplied Environment zOS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.dse.tag.[tag].imageid |
| Description: | The image ID of the Developer Supplied Environment for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.dse.tag.[tag].imageid=SYSA</code><br> |

</details>
 
<details>
<summary>Extra bundle to required to implement the zOS File Manager</summary>

| Property: | Extra bundle to required to implement the zOS File Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.file.manager |
| Description: | The name of the Bundle that implements the zOS File Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosfile.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.file.manager=dev.galasa.common.zosfile.zosmf.manager</code><br> |

</details>
 
<details>
<summary>IP Host ID of the zOS Image</summary>

| Property: | IP Host ID of the zOS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.image.[tag].iphostid |
| Description: | The IP Host ID of the zOS Image for the supplied tag.<br>  If CPS property zos.image.[tag].iphostid exists, then that is returned, otherwise the zOS Image ID is returned |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.image.[tag].iphostid=sysa.ibm.com</code><br> |

</details>
 
<details>
<summary>The zOS Image</summary>

| Property: | The zOS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.dse.tag.[tag].imageid |
| Description: | The image ID for the specified tag |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zos.dse.tag.[tag].imageid=SYSA</code><br> |

</details>
 
<details>
<summary>Maximum slots for zOS Image</summary>

| Property: | Maximum slots for zOS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.image.[tag].max.slots |
| Description: | The maximum slots available on a zOS Image for the specified tag |
| Required:  | No |
| Default value: | 2 |
| Valid values: | $validValues |
| Examples: | <code>zos.image.[tag].max.slots=2</code><br> |

</details>
 
<details>
<summary>The run data set HLQ for the zOS Image</summary>

| Property: | The run data set HLQ for the zOS Image |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.run.[image].dataset.hlq |
| Description: | The data set HLQ(s) for temporary data sets created on zOS Image.<br>  If CPS property zos.run.[image].dataset.hlq exists, then that is returned |
| Required:  | No |
| Default value: | runuser.GALASA |
| Valid values: | $validValues |
| Examples: | <code>zos.run.[image].dataset.hlq=USERID.GALASA</code><br> |

</details>
 
<details>
<summary>Extra bundle to required to implement the zOS TSO Command Manager</summary>

| Property: | Extra bundle to required to implement the zOS TSO Command Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.tsocommand.manager |
| Description: | The name of the Bundle that implements the zOS TSO Command Manager |
| Required:  | No |
| Default value: | dev.galasa.zostsocommand.ssh.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.tsocommand.manager=dev.galasa.zostsocommand.ssh.manager</code> |

</details>
 
<details>
<summary>Extra bundle to required to implement the zOS UNIX Command Manager</summary>

| Property: | Extra bundle to required to implement the zOS UNIX Command Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.unixcomand.manager |
| Description: | The name of the Bundle that implements the zOS UNIX Command Manager |
| Required:  | No |
| Default value: | dev.galasa.zosunixcommand.ssh.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.unix.manager=dev.galasa.zosunixcommand.ssh.manager</code> |

</details>
 
<details>
<summary>zOS Batch restrict processing to the server on the specified image</summary>

| Property: | zOS Batch restrict processing to the server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].restrict.to.image |
| Description: | Use only the server (e.g. zOSMF, RSE API, etc) running on the image associated with the zOS Batch job |
| Required:  | No |
| Default value: | false |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjob.MVSA.restrict.to.image=true</code><br> <code>zosbatch.batchjob.default.restrict.to.image=false</code> |

</details>
 
<details>
<summary>zOS Batch default input class</summary>

| Property: | zOS Batch default input class |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].input.class |
| Description: | The default input class to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | A |
| Valid values: | a valid JES input class literal |
| Examples: | <code>zosbatch.default.MVSA.input.class=S</code><br> <code>zosbatch.default.input.class=A</code> |

</details>
 
<details>
<summary>zOS Batch job execution wait timeout</summary>

| Property: | zOS Batch job execution wait timeout |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].timeout |
| Description: | The value in seconds to wait for the zOS Batch job execution to complete when submitted via zOSMF |
| Required:  | No |
| Default value: | 350 |
| Valid values: | 0 to {@link Integer#MAX_VALUE} |
| Examples: | <code>zosbatch.batchjob.MVSA.timeout=350</code><br> <code>zosbatch.batchjob.default.timeout=60</code> |

</details>
 
<details>
<summary>zOS Batch jobname prefix</summary>

| Property: | zOS Batch jobname prefix |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.jobname.[imageid].prefix |
| Description: | The zOS Batch jobname prefix when submitted via zOSMF |
| Required:  | No |
| Default value: | GAL |
| Valid values: | 1-7 characters |
| Examples: | <code>zosbatch.jobname.MVSA.prefix=JOB</code><br> <code>zosbatch.jobname.default.prefix=XXX</code> |

</details>
 
<details>
<summary>zOS Batch default MSGCLASS</summary>

| Property: | zOS Batch default MSGCLASS |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].message.class |
| Description: | The default message class to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | A |
| Valid values: | a valid JES message class literal |
| Examples: | <code>zosbatch.default.MVSA.message.class=S</code><br> <code>zosbatch.default.message.class=A</code> |

</details>
 
<details>
<summary>zOS Batch default message level</summary>

| Property: | zOS Batch default message level |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].message.level |
| Description: | The default message level to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | (1,1) |
| Valid values: | a valid JES message level |
| Examples: | <code>zosbatch.default.MVSA.message.level=(1,1)</code><br> <code>zosbatch.default.message.level=(2,0)</code> |

</details>
 
<details>
<summary>zOS Batch job truncate JCL</summary>

| Property: | zOS Batch job truncate JCL |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].truncate.jcl.records |
| Description: | The z/OSMF submit job will fail if supplied with JCL records greater than 80 characters. Setting this property to true will truncate any records to 80 characters and issue a warning message. |
| Required:  | No |
| Default value: | true |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjobe.MVSA.truncate.jcl.records=true</code><br> <code>zosbatch.batchjob.default.truncate.jcl.records=false</code> |

</details>
 
<details>
<summary>zOS Batch job use SYSAFF</summary>

| Property: | zOS Batch job use SYSAFF |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].use.sysaff |
| Description: | Use the run the zOS Batch job on the specified image by specifying {@code /*JOBPARM SYSAFF=[imageid]} |
| Required:  | No |
| Default value: | true |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjobe.MVSA.use.sysaff=true</code><br> <code>zosbatch.batchjob.default.use.sysaff=false</code> |

</details>
 
<details>
<summary>zOS File the maximum number of items from a UNIX directory list</summary>

| Property: | zOS File the maximum number of items from a UNIX directory list |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.unix.[imageid].directory.list.max.items |
| Description: | The maximum number of items the server (e.g. zOSMF, RSE API, etc) returns when listing the content of a UNIX directory |
| Required:  | No |
| Default value: | 1000 |
| Valid values: | $validValues |
| Examples: | <code>zosfile.unix.[imageid].directory.list.max.items=1000</code><br> |

</details>
 
<details>
<summary>zOS File restrict processing to the server on the specified image</summary>

| Property: | zOS File restrict processing to the server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.file.[imageid].restrict.to.image |
| Description: | Use only the server (e.g. zOSMF, RSE API, etc) running on the image associated with the zOS data set or file |
| Required:  | No |
| Default value: | False |
| Valid values: | $validValues |
| Examples: | <code>zosfile.file.restrict.to.image=true</code><br> <cods>zosfile.file.SYSA.restrict.to.image=true</code> |

</details>
 
<details>
<summary>zOS File UNIX permission bits to be used in creating the file or directory</summary>

| Property: | zOS File UNIX permission bits to be used in creating the file or directory |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.[imageid].unix.file.permission |
| Description: | The UNIX file or directory permission bits to be used in creating the file or directory |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosfile.unix.file.permission=rwxrwx---</code><br> <code>zosfile.SYSA.unix.file.permission=rwxrwxrrx</code> |

</details>
