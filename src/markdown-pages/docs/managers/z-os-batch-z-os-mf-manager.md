---
path: "/docs/managers/z-os-batch-z-os-mf-manager"
title: "z/OS Batch z/OS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the z/OS Batch Manager using z/OS MF.


</details>

</details>

<details><summary>Configuration Properties</summary>
## Configuration Properties

The following are properties used to configure the z/OS Batch z/OS MF Manager.
 
| Property: | zOS Batch default input class |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].input.class |
| Description: | The default input class to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | A |
| Valid values: | a valid JES input class literal |
| Examples: | <code>zosbatch.default.MVSA.input.class=S</code><br> <code>zosbatch.default.input.class=A</code> |

 
| Property: | zOS Batch job execution wait timeout |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].timeout |
| Description: | The value in seconds to wait for the zOS Batch job execution to complete when submitted via zOSMF |
| Required:  | No |
| Default value: | 350 |
| Valid values: | 0 to {@link Integer#MAX_VALUE} |
| Examples: | <code>zosbatch.batchjob.MVSA.timeout=350</code><br> <code>zosbatch.batchjob.default.timeout=60</code> |

 
| Property: | zOS Batch jobname prefix |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.jobname.[imageid].prefix |
| Description: | The zOS Batch jobname prefix when submitted via zOSMF |
| Required:  | No |
| Default value: | GAL |
| Valid values: | 1-7 characters |
| Examples: | <code>zosbatch.jobname.MVSA.prefix=JOB</code><br> <code>zosbatch.jobname.default.prefix=XXX</code> |

 
| Property: | zOS Batch default input class |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].input.class |
| Description: | The default input class to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | A |
| Valid values: | a valid JES input class literal |
| Examples: | <code>zosbatch.default.MVSA.input.class=S</code><br> <code>zosbatch.default.input.class=A</code> |

 
| Property: | zOS Batch default message level |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.default.[imageid].message.level |
| Description: | The default message level to set on the job card for submitted jobs |
| Required:  | No |
| Default value: | (1,1) |
| Valid values: | a valid JES message level |
| Examples: | <code>zosbatch.default.MVSA.message.level=(1,1)</code><br> <code>zosbatch.default.message.level=(2,0)</code> |

 
| Property: | Restrict zOS batch processing to the zOSMF server on the specified image |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].restrict.to.image |
| Description: | Use only the zOSMF server running on the image associated with the zOS Batch job |
| Required:  | No |
| Default value: | false |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjob.MVSA.restrict.to.image=true</code><br> <code>zosbatch.batchjob.default.restrict.to.image=false</code> |

 
| Property: | zOS Batch job truncate JCL |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].truncate.jcl.records |
| Description: | The z/OSMF submit job will fail if supplied with JCL records greater than 80 characters. Setting this property to true will truncate any records to 80 characters and issue a warning message. |
| Required:  | No |
| Default value: | true |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjobe.MVSA.truncate.jcl.records=true</code><br> <code>zosbatch.batchjob.default.truncate.jcl.records=false</code> |

 
| Property: | zOS Batch job use SYSAFF |
| --------------------------------------- | :------------------------------------- |
| Name: | zosbatch.batchjob.[imageid].use.sysaff |
| Description: | Use the run the zOS Batch job on the specified image by specifying {@code /*JOBPARM SYSAFF=[imageid]} |
| Required:  | No |
| Default value: | true |
| Valid values: | true or false |
| Examples: | <code>zosbatch.batchjobe.MVSA.use.sysaff=true</code><br> <code>zosbatch.batchjob.default.use.sysaff=false</code> |

</details>