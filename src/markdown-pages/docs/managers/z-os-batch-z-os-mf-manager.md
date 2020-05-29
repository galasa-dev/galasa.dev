---
path: "/docs/managers/z-os-batch-z-os-mf-manager"
title: "z/OS Batch z/OS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the z/OS Batch Manager using z/OS MF. The z/OS MF Batch Manager is used in conjunction with the z/OS Manager. The z/OS Manager provides the interface for the z/OS batch function and pulls in the z/OS MF Batch Manager to provide the implementation of the interface. If your test needs to submit or monitor a batch job or retrieve output from a batch job, you can call the z/OS Manager in your test code and the z/OS Manager will call the z/OS MF batch Manager to provide the implementation via the z/OS batch function.  For example, the <a href="/docs/running-simbank-tests/batch-accounts-open-test">BatchAccountsOpenTest</a> uses the z/OS Manager (which in the background, invokes z/OS MF) to add a set of accounts to the Galasa SimBank system via a z/OS batch job. <p> See the <a href="../zos-manager">zOS Manager</a> for details of the z/OS Batch annotations and code snippets.





## Configuration Properties

The following are properties used to configure the z/OS Batch z/OS MF Manager.
 
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
<summary>Restrict zOS batch processing to the zOSMF server on the specified image</summary>

| Property: | Restrict zOS batch processing to the zOSMF server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].restrict.to.image |
| Description: | Use only the zOSMF server running on the image associated with the zOS Batch job |
| Required:  | No |
| Default value: | false |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjob.MVSA.restrict.to.image=true</code><br> <code>zosbatch.batchjob.default.restrict.to.image=false</code> |

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
