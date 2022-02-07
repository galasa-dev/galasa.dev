---
path: "/docs/managers/vtp-manager"
title: "VTP Manager"
---

**Release**
  
## Overview
  
Create an automated test in Galasa and use the VTP Manager to record the interactions between the test and your CICS programs. Play back the recorded file by using VTP. Playing back the recording in VTP means that you can test a change to your application code without running the test inside CICS. Run the recorded tests as part of your regression testing strategy before and after code changes to detect any anomalies. 

The VTP Manager can configure VTP by using either the VTP APIs or CICS transactions to start and stop recording on a CICS region. After all recordings are complete, the VTP recording is exported as a flat file to the specificed location.  
  
## Prerequisites
  
To use the VTP Manager, VTP recording must be enabled, the test must be a Galasa Java test, the CICS TS Manager must be listed in the ```FindAnnotation``` field and the test class must contain CICS TS fields with recordable CICS regions. A high-level qualifier (HLQ) must be defined in order to play back the recording. 
  
To enable VTP recording, set ```VtpEnable``` to _true_ in the CPS properties file.

If VTP recording is enabled but no CICS TS fields are contained in the test class, the following message is returned _VTP Recording enabled but test class contains no CICS TS fields - recording will not be attempted_.
  
  
## Code snippets
  
Use the following code snippets to help you get started with the VTP Manager.
  
<details><summary>Checking the VTP Manager prerequisites</summary>
  
The following snippet shows the code that is required to check that the VTP Manager prerequisites are in place:
  
```
@Override
	public void provisionGenerate() throws ManagerException, ResourceUnavailableException {
		List<AnnotatedField> foundAnnotatedFields = findAnnotatedFields(CicstsManagerField.class);
		for (AnnotatedField annotatedField : foundAnnotatedFields) {
			Field field = annotatedField.getField();
			if (field.getType() == ICicsRegion.class) {
				CicsRegion annotation = field.getAnnotation(CicsRegion.class);
				String tag = annotation.cicsTag();
				ICicsTerminal terminal = cicsManager.generateCicsTerminal(tag);
				ICicsRegion region = cicsManager.locateCicsRegion(tag);
				RecordingData rd = new RecordingData();
				rd.setRecordingTerminal(terminal);
				recordingRegions.put(region, rd);
			}
		}
		if (recordingRegions.size() == 0) {
			logger.info("VTP Recording enabled but test class contains no CICS TS fields - recording will not be attempted");
			skipRecordings = true;
		}
		this.runID = getFramework().getTestRunName();
	}
```
</details>
 
<details><summary>Starting a recording</summary>
  
The following snippet shows the minimum code that is required to start a recording in a Galasa test:
  
```
		if(isTestMethod(galasaMethod)) {
			startRecording();
		}
```
</details>
  
<details><summary>Stopping a recording</summary>
  
The following snippet shows the minimum code that is required to stop a recording in a Galasa test:
  
```
		if(isTestMethod(galasaMethod)) {
			stopRecording();
		}
```
</details>