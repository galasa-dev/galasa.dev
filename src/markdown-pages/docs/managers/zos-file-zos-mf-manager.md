---
path: "/docs/managers/zos-file-zos-mf-manager"
title: "z/OS File z/OS MF Manager"
---

**BETA**

[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>

# <a name="overview"></a>Overview
This Manager is the internal implementation of the z/OS File Manager using z/OS MF. The z/OS MF File Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS file function and pulls in the z/OS MF File Manager to provide the implementation of the interface. If your test needs to instantiate a UNIX file, dataset, or VSAM data set, write and retrieve content from it, or configure and manipulate it then you can call the z/OS Manager in your test code and the z/OS Manager will call the z/OS MF File Manager to provide the implementation via the z/OS file function.

## <a name="dependencies"></a>Including the Manager in a test

To use the z/OS File z/OS MF Manager in a test you must import the _@ZosFileHandler_ annotation into the test, as shown in the following example: 

```
@ZosFileHandler
public IZosFileHandler zosFileHandler;
```

You also need to add the Manager dependency into the pom.xml file if you are using Maven, or into the build.gradle file if you are using Gradle. 

If you are using Maven, add the following dependencies into the _pom.xml_ in the _dependencies_ section:

```
<dependency>
    <groupId>dev.galasa</groupId>
    <artifactId>dev.galasa.zosfile.zosmf.manager</artifactId>
</dependency>
```

If you are using Gradle, add the following dependencies into ```build.gradle``` in the _dependencies_ closure:

```
dependencies {
    compileOnly 'dev.galasa:dev.galasa.zosfile.zosmf.manager'
}
```

# <a name="configuring"></a>Configuring 
The following are properties used to configure the z/OS Console MF Manager.

## <a name="cps"></a>Configuration Properties

<details>
<summary>Extra bundle required to implement the z/OS File Manager</summary>

| Property: | Extra bundle required to implement the z/OS File Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | zos.bundle.extra.file.manager |
| Description: | The name of the Bundle that implements the z/OS File Manager |
| Required:  | No |
| Default value: | dev.galasa.common.zosfile.zosmf.manager |
| Valid values: | $validValues |
| Examples: | <code>zos.bundle.extra.file.manager=dev.galasa.common.zosfile.zosmf.manager</code><br> |

</details>


<details>
<summary>z/OS File the maximum number of items from a UNIX directory list</summary>

| Property: | z/OS File the maximum number of items from a UNIX directory list |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.unix.[imageid].directory.list.max.items |
| Description: | The maximum number of items the server (e.g. zOSMF, RSE API, etc) returns when listing the content of a UNIX directory |
| Required:  | No |
| Default value: | 1000 |
| Valid values: | $validValues |
| Examples: | <code>zosfile.unix.[imageid].directory.list.max.items=1000</code><br> |

</details>
 
<details>
<summary>z/OS File restrict processing to the server on the specified image</summary>

| Property: | z/OS File restrict processing to the server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.file.[imageid].restrict.to.image |
| Description: | Use only the server (e.g. zOSMF, RSE API, etc) running on the image associated with the z/OS data set or file |
| Required:  | No |
| Default value: | False |
| Valid values: | $validValues |
| Examples: | <code>zosfile.file.restrict.to.image=true</code><br> <cods>zosfile.file.SYSA.restrict.to.image=true</code> |

</details>

<details>
<summary>z/OS File UNIX permission bits to be used in creating the file or directory</summary>

| Property: | z/OS File UNIX permission bits to be used in creating the file or directory |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.[imageid].unix.file.permission |
| Description: | The UNIX file or directory permission bits to be used in creating the file or directory |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosfile.unix.file.permission=rwxrwx---</code><br> <code>zosfile.SYSA.unix.file.permission=rwxrwxrrx</code> |

</details>

# <a name="annotations"></a>Annotations provided by the Manager

| Annotation: | z/OS File |
| --------------------------------------- | :------------------------------------- |
| Name: | @ZosFileHandler |
| Description: | The <code>@ZosFileHandler</code> annotation requests the z/OS Manager to provide a handler instance to manage data sets and UNIX files on a z/OS image.  A single z/OS File Handler instance can manage multiple z/OS data sets and UNIX files on multiple z/OS images.<br> |
| Syntax: | <code>@ZosFileHandler<br> public IZosFileHandler zosFileHandler;<br></code> |
| Notes: | The <code>IZosFileHandler</code> interface has three methods supplying file name and z/OS image:<br> {@link IZosFileHandler#newDataset(String, dev.galasa.zos.IZosImage)}<br>  {@link IZosFileHandler#newVSAMDataset(String, dev.galasa.zos.IZosImage)}<br> {@link IZosFileHandler#newUNIXFile(String, dev.galasa.zos.IZosImage)}<br> returning an object representing the type of file requested. This can be an existing file or can be created via a method on the file object.<br><br> See <a href="https://javadoc.galasa.dev/dev/galasa/zosfile/ZosFileHandler.html" target="_blank">ZosFileHandler</a>, <a href="https://javadoc.galasa.dev/dev/galasa/zosfile/IZosFileHandler.html" target="_blank">IZosFileHandler</a>, <a href="https://javadoc.galasa.dev/dev/galasa/zosfile/IZosDataset.html" target="_blank">IZosDataset</a>, <a href="https://javadoc.galasa.dev/dev/galasa/zosfile/IZosVSAMDataset.html" target="_blank">IZosVSAMDataset</a> and <a href="https://javadoc.galasa.dev/dev/galasa/zosfile/IZosUNIXFile.html" target="_blank">IZosUNIXFile</a> to find out more. |

# <a name="codesnippets"></a>Code snippets and examples

Use the following code snippets to help you get started with the z/OS Manager.

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

<details><summary>Read the contents of a z/OS UNIX File</summary>

Create a new *IZosDataset* object representing a UNIX file. If the file exists, retrieve the content in text mode:

```
IZosUNIXFile unixFile = zosFileHandler.newUNIXFile("/tmp/Galasa/existingFile", zosImage);
if (unixFile.exists()) {
    unixFile.setDataType(UNIXFileDataType.TEXT);
    String content = unixFile.retrieve();
}
```

</details>

<details><summary>Read the contents of a z/OS UNIX File</summary>

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

<details><summary>List the contents of a z/OS UNIX Directory</summary>

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