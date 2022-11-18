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
This Manager is the internal implementation of the zOS File Manager using zOS/MF. The z/OS MF File Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS file function and pulls in the z/OS MF File Manager to provide the implementation of the interface. If your test needs to instantiate a UNIX file, dataset, or VSAM data set, write and retrieve content from it, or configure and manipulate it then you can call the z/OS Manager in your test code and the z/OS Manager will call the z/OS MF File Manager to provide the implementation via the z/OS file function.

## <a name="dependencies"></a>Including the Manager in a test


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

The following snippet shows the code that is required to request a z/OS File Handler instance in a Galasa test:

```
@ZosFileHandler
public IZosFileHandler zosFileHandler;
```
