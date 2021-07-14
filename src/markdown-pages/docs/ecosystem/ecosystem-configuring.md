---
path: "/docs/ecosystem/ecosystem-configuring"
title: "Configuring the Ecosystem"
---

The Galasa framework enables late binding of the test material to the system under test. Late binding allows the same test to run against multiple environments without needing to change the test itself.

setup a test stream for your tests to run in for the ecosystem, you may find this example useful: https://github.com/Jimbo4794/galasa-samples/tree/Sample-1-1-start

How can I store credentials in the CPS in the ecosystem?
You can use a docker exec command to bring up a session inside the CPS container. You can then use etcdctl put key value to set properties.
If you do a etcdctl get --prefix=true "" you can see all properties, or a etcdctl get --prefix=true "secure"  to see the sample ones that have been loaded in as examples

Hi @James Davies, So far I am able to deploy the artifacts to Nexus.   What should be the overrides URI to be put in Window ==> Preferences ==> Galasa in Eclipse

You can leave that as the local file. The idea being that you can have a team wide set of properties stored in your ecosystem, but you have the option to override them from a local file if needd

HI @James Davies, I am able to run the "Submit tests to automation" from Eclipse in Galasa Ecosystem.  I can see the run in Galasa Results view.  The results says passed in the Galasa results as shown in the screenshot below. When I am trying to open the stored artifacts I am getting the following error.  Am I missing some settings in Eclipse or Ecosystem?  Please advise.
Fetch of stored artifact failed
java.io.IOException: Unable to retrieve artifact
	at dev.galasa.ras.couchdb.internal.CouchdbRasFileSystemProvider.newByteChannel(CouchdbRasFileSystemProvider.java:110)
	at java.nio.file.Files.newByteChannel(Unknown Source)
	at java.nio.file.Files.newByteChannel(Unknown Source)
	at java.nio.file.Files.readAllBytes(Unknown Source)
	at dev.galasa.eclipse.ui.run.storedartifacts.FetchStoredArtifactJob.run(FetchStoredArtifactJob.java:38)
	at org.eclipse.core.internal.jobs.Worker.run(Worker.java:63)
Caused by: dev.galasa.ras.couchdb.internal.CouchdbRasException: Not found - /framework/cps_record.properties
	at dev.galasa.ras.couchdb.internal.CouchdbRasStore.retrieveArtifact(CouchdbRasStore.java:680)
	at dev.galasa.ras.couchdb.internal.CouchdbRasFileSystemProvider.newByteChannel(CouchdbRasFileSystemProvider.java:108)
	... 5 more
image.png 

 in order to be able to use the console manager or the batch manager, need to have zosmf running on the system otherwise will not work, 

 The bit that is most different is finding annotations in the source, which is now a lot nicer (once you understand it) 