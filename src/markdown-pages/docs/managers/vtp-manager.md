---
path: "/docs/managers/vtp-manager"
title: "VTP Manager"
---

**Release**
  
## Overview
  
Create an automated test in Galasa and use the VTP Manager to record the interactions between the test and your CICS programs. Play back the recorded file by using IBM Z Virtual Test Platform (VTP). Playing back the recording in VTP means that you can test a change to your application code without running the test inside CICS. Run the recorded tests as part of your regression testing strategy before and after code changes to detect any anomalies. 

The VTP Manager can configure VTP by using CICS transactions to start and stop recording on a CICS region. After all recordings are complete, the VTP recording is exported as a flat file to the specificed location.  
  
## Prerequisites
  
To use the VTP Manager, VTP recording must be enabled and the test class must contain @CicsTsRegion annotations. A high-level qualifier (HLQ) must be defined in order to play back the recording. 
  
To enable VTP recording, set ```vtp.recording.enable``` to _true_ in the CPS properties file.

If VTP recording is enabled but no CICS TS fields are contained in the test class, the following message is returned _VTP Recording enabled but test class contains no CICS TS fields - recording will not be attempted_.
  
  
## CPS properties
  
The following properties are used to configure the VTP Manager.
  
<details>
<summary>VTP Playback HLQ CPS Property</summary>

| Property: | VTP Playback HLQ CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | vtp.playback.hlq |
| Description: | The HLQ that is used to create VTP recording files |
| Required:  | Yes |
| Default value: | None |
| Valid values: | VTP.RECORDINGS |
| Examples: | <code>vtp.playback.hlq=VTP.RECORDINGS<br> </code> |

</details>
 
<details>
<summary>VTP CICS Transactions CPS Property</summary>

| Property: | VTP CICS Transactions CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | vtp.cics.[instanceid].transactions |
| Description: | A list of transactions to record in this CICS region |
| Required:  | No |
| Default value: | None |
| Valid values: | trx1,trx2 |
| Examples: | <code>vtp.cics.PRIMARY.transactions=TSQT,TSQD<br> </code> |

</details>

<details>
<summary>VTP CICS Transactions CPS Property</summary>

| Property: | VTP CICS Transactions CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | vtp.cics.[instanceid].transactions |
| Description: | A list of transactions to record in this CICS region |
| Required:  | No |
| Default value: | None |
| Valid values: | trx1,trx2 |
| Examples: | <code>vtp.cics.PRIMARY.transactions=TSQT,TSQD<br> </code> |

</details>

<details>
<summary>VTP CICS Transactions CPS Property</summary>

| Property: | Enable VTP Recording CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | vtp.recording.enable |
| Description: | Should the VTP Manager be activated for this run |
| Required:  | No |
| Default value: | false |
| Valid values: | true, false |
| Examples: | <code>vtp.recording.enable=true<br> </code> |

</details>

