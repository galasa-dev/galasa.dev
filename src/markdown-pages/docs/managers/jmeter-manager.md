---
path: "/docs/managers/jmeter-manager"
title: "JMeter Manager"
---

**ALPHA - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This manager enables the tester to perform his own JMeter tests through the Galasa Framework. The manager will provide a container from the Docker Manager that is able to execute JMeter scripts. (JMX files) The test does not need to worry how this container is provided and how it is kept up, the test has access to all the JMeter generated files inside the container. <br><br> The container for this execution is fully provided by the Docker Manager and is also properly shutdown once the tests come to an end. By using a containerised environment for JMeter the test has access to a certain standard of scalability and uniformity. <br><br>  The logfiles and generated CSV files can be accessed after the JMeter tests are performed and the container becomes available for interaction. The manager allows as many JMeter sessions as you have available Docker container slots on your machine.

## Limitations
The JMeter manager is not able for the JMeter tests to be run remotely away from the Galasa framework on a targethost.




## Code snippets

Use the following code snippets to help you get started with the JMeter Manager.
 
### Create a JMeter session

The following snippet shows the minimum code that is required to request a Docker Container in a Galasa test:

```
@JMeterSession(jmxPath="test.jmx")
public IJMeterSession session;
```

This code will provision a container for you that comes installed with all the necessary JMeter binaries to perform a fully-fledged JMX-test. Within your test you will need to provide a JMX-file of your choosing to your test. The test-file is able to be provisioned through the use of the Artifact Manager and to point the Bundleresources with the specific inputstream at you JMX-file. 

The specific container with jmeter will be provisioned by the DockerManager and will be discarded when your tests end. 

The next snippet shows the possible addition you can make to the JMeterSession by adding a personal properties-file to the test. You can achieve this by again using the Artifactmanager and pointing it at your personal properties-file.

```
@JMeterSession(jmxPath="test.jmx", propPath="jmeter.properties")
public IJMeterSession session;
```


There is no limit in Galasa on how many JMeter sessions can be used within a single test. The only limit is the number of Containers that can be started in the Galasa Ecosystem. This limit is set by the Galasa Administrator and is typically set to the maximum number of containers that can be supported by the Docker Server or Swarm.  If there are not enough slots available for an automated run, the run is put back on the queue in *waiting* state to retry. **Local test runs fail if there are not enough container slots available.**

### Setting your actual JMX-file in the session with artifact manager


```
    IBundleResources bundleResources = artifactManager.getBundleResources(getClass());
    InputStream jmxStream = bundleResources.retrieveFile("/test.jmx");
    session2.setJmxFile(jmxStream);
```

### Setting your actual properties-file in the session with artifact manager

This will kill of the session by simply sending a kill-signal towards the JMeter container and removing it from the running sessions.

```
    IBundleResources bundleResources = artifactManager.getBundleResources(getClass());
    InputStream propStream = bundleResources.retrieveFile("/jmeter.properties");
    session.applyProperties(propStream);
```

### Starting up the JMeter session

You are able to attach a specific timeout to the session or use the *default timeout of 60 seconds* towards the JMeter session. This command will only be succesfully executed if you have set your JMX-file properly using the `session.setJmxFile(inputStream)`-method. *Timeout is in milli-seconds.*

```
    session.startJmeter();
    ...
     session.startJmeter(60000);
```


### Obtaining the JMX-file from the JMeter-execution as a String

The following snippet allows the tester to access the used JMX file in the JMeter session.

```
session.getJmxFile();
```

### Obtaining the Logfile from the JMeter-execution as a String

The following snippet allows the tester to access the execution logFile that is created upon execution of the JMX-file inside the container.

```
session.getLogFile();
```

### Obtaining the console output as a String

The following snippet allows the tester to see the console output of the JMeter container. In most cases there will be no output towards the console except when the JMX-file itself is corrupt or wrongly written. Otherwise if a correctly written JMX-file endures errors during execution this will be represented in the log files or the JTL-file.

```
session.getConsoleOutput();
```

### Obtaining any specific generated file from the JMeter-execution as a String

The following snippet allows the tester to access the execution any file that is created upon execution of the JMX-file inside the container. In this example you can retrieve the JTL-file as a String containing the actual execution results made ready for a CSV (the name of this JTL-file has the same prefix as your JMX-file).

```
session.getListenerFile("test.jtl")
```


### Obtaining a basic form of making sure your JMX-file executed correctly

The following snippet allows the tester to make sure his test actually got performed to a basic degree. Further analysis can be done personally by the tester by retrieving the logs  and/ or JTL-files. The boolean will return true if the JMX-file has performed its funciton properly, otherwise it would return false.

```
session.statusTest();
```

### Killing of the session

This will kill of the session by simply sending a kill-signal towards the JMeter container and removing it from the running sessions.

```
session.stopTest();
```


