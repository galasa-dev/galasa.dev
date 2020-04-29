---
path: "/docs/managers/zos-file-zos-mf-manager"
title: "zOS File zOS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the zOS File Manager using zOS/MF. <p> See the <a href="../zos-manager">zOS Manager</a> for details of the z/OS File Annotations.





## Configuration Properties

The following are properties used to configure the zOS File zOS MF Manager.
 
<details>
<summary>The maximum number of items from a directory list</summary>

| Property: | The maximum number of items from a directory list |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.unix.[imageid].directory.list.max.items |
| Description: | The maximum number of items zOSMF returns when listing the content of a directory |
| Required:  | No |
| Default value: | 1000 |
| Valid values: | $validValues |
| Examples: | <code>zosfile.unix.[imageid].directory.list.max.items=1000</code><br> |

</details>
 
<details>
<summary>Restrict processing to the zOSMF server on the specified image</summary>

| Property: | Restrict processing to the zOSMF server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.zosmf.[imageid].restrict.to.image |
| Description: | Use only the zOSMF server running on the image associated with the zOS data set or file |
| Required:  | No |
| Default value: | False |
| Valid values: | $validValues |
| Examples: | <code>zosfile.zosmf.restrict.to.image=true</code><br> <cods>zosfile.zosmf.SYSA.restrict.to.image=true</code> |

</details>
 
<details>
<summary>UNIX permission bits to be used in creating the file or directory</summary>

| Property: | UNIX permission bits to be used in creating the file or directory |
| --------------------------------------- | :------------------------------------- |
| Name: | zosfile.[imageid].unix.file.permission |
| Description: | The UNIX file or directory permission bits to be used in creating the file or directory |
| Required:  | No |
| Default value: | None |
| Valid values: | $validValues |
| Examples: | <code>zosfile.unix.file.permission=rwxrwx---</code><br> <code>zosfile.SYSA.unix.file.permission=rwxrwxrrx</code> |

</details>
