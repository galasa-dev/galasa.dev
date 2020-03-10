---
path: "/docs/managers/z-os-batch-z-os-mf-manager"
title: "z/OS Batch z/OS MF Manager"
---

**BETA - This Manager is feature complete but may contain known or unknown bugs.**

## Overview
This Manager is the internal implementation of the z/OS Batch Manager using z/OS MF.


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

