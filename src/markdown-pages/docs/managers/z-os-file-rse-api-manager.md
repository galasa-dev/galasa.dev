---
path: "/docs/managers/z-os-file-rse-api-manager"
title: "z/OS File RSE API Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This Manager is an internal implementation of the zOS File Manager using RSE API. The RSE API File Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS file function and pulls in the RSE API File Manager to provide the implementation of the interface. If your  test needs to instantiate a UNIX file, dataset, or VSAM data set, write and retrieve content from it,  or configure and manipulate it then you can call the z/OS Manager in your test code and the z/OS Manager will call the RSE API File Manager to provide the implementation via the z/OS file function.  <p> The zOS File RSE API Manager is enabled by setting the CPS property:<br> <code>zos.bundle.extra.file.manager=dev.galasa.zosfile.rseapi.manager</code>  <p> See the <a href="/docs/managers/zos-manager">zOS Manager</a> for details of the z/OS File Annotations.





