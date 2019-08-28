---
path: "/docs/getting-started/simframe-tests"
title: "Running tests against Simframe"
---
Simframe is accompanied by a set of proving tests that start with a basic Installation Verification Test (IVT). To follow all of these examples, ensure that Eclipse is running and that you have launched the Simframe server as described [here](/docs/getting-started/simframe).

## Loading and running the Simframe installation verification tests (IVT)
1. Choose *File > New > Example*, select *Simframe example projects* and press *Next*.
1. Confirm your *New project* prefix (it's OK to leave it as `dev.galasa.simframe`) and press *Finish*. In your *Package Explorer* (if it's not visible, choose *Window > Show View > Package Explorer*), two new entries appear:
```
dev.galasa.simframe.manager
dev.galasa.simframe.tests 
```
1. Choose *Run > Run Configurations* and look for and select *Galasa Simframe* in the left pane.
1. Right-click *Galasa Simframe* and choose *New Configuration*, give it a name and press *Apply* then *Run*. The Simframe server starts, just as it did when you initially installed the Galasa plug-in.
1. Expand *dev.galasa.simframe.tests > src/main/java > galasa.test* in your *Package Explorer* and select *SimframeBankIVT.java*.
1. Choose *Run > Run Configurations* and look for and select *Galasa* in the left pane this time (not Galasa Simframe).
1. Right-click *Galasa* and choose *New Configuration*.
1. In the dialog, choose *Browse* to locate your project - `dev.galasa.simframe.tests`, then press *Search* to locate your test class, *SimframeBankIVT*.
1. Un-tick the *Include ~/.galasa/override.properties* box when back in the main *Run Configurations* dialog.
1. Press *Apply* then *Run* 
1. The *SimframeBankIVT* tests run, and the Eclipse console displays their progress through to completion.