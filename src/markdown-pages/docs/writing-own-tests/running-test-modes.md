---
path: "/docs/writing-own-tests/running-test-modes"
title: "Running a Galasa test"
---

There are three modes in which you can run a Galasa test:<br><br>
-  locally, with everything running on the local machine<br>
-  locally but using a shared configuration that is hosted by the Galasa ecosystem<br>
-  remotely, by submitting the test to run in the Galasa ecosystem<br> 


The mode in which you choose to run a test depends on what you are trying to achieve. Use the following information to understand which mode is most appropriate for a given scenario. 


## Running a test locally


When you run a test locally, without using shared configuration, everything runs on your local machine. The Galasa bootstrap file is blank and makes no reference to an ecosystem. The Galasa framework is launched within the JVM on the local machine and the local file system holds all the configuration that is used by the test. The test runs in the local JVM and all test results and artifacts are stored on the local disk. 

![running in local mode:](running-local.svg)

You can run a test in this mode by using the following <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl.md" target="_blank"> Galasa CLI</a> command:

```
galasactl runs submit local
```

or by using the Eclipse plugin, in which case the test is hosted within the Eclipse JVM.


## Running a test locally but using shared configuration

When you run a test locally, but using shared configuration, tthe Galasa bootstrap is set to the URL of the Galasa Ecosystem where the shared configuration is stored. The Galasa framework is launched within the JVM on the local machine, but the framework consults the remote ecosystem to read configuration data, but not the credentials properties as these are drawn from a local file. This is the key difference between running a test locally without using shared configuration. The test still runs in the local JVM and all test results and artifacts are stored on the local disk. 

![running in local mode with shared configuration:](run-hybrid.png)

You can run a test in this mode by setting up your bootstrap to refer to the ecosystem that you want to use and running the following command:

```
galasactl runs submit local 
```

or by using the Eclipse plugin, in which case the test is hosted within the Eclipse JVM.


### When to run a test locally

Running a test locally is useful when you are doing the following types of task:

- Developing tests, and running those tests against a non-production environment.

- Running ad-hoc tests against a development or non-production target system.

- Running many tests in series against a target system which can withstand the load that is placed on it.

- Running tests against a target system which is dynamically provisioned, used exclusively by the tests, and de-provisioned afterwards.

- Running tests within a JVM that will not be interrupted, or halted mid-flow, causing a build-up of allocated resources in the system under test.

- When there is time to find and share test run logs and artifacts with bug investigators, whenever a test fails and finds a bug.


## Running a test remotely in a Galasa Ecosystem

When you run a test remotely, the Galasa bootstrap is set to the URL of the Galasa Ecosystem in which you want to run your test. The configuration of the test is also held within that ecosystem, and Galasa starts up in a container in which the test code will run. The test results and artifacts are stored in a database within the specified ecosystem, and authorised users on client machines can view the test results. 

The Galasa framework is launched within the JVM on the local machine, but the framework consults the remote ecosystem to read configuration data. This is the key difference between running a test locally without using shared configuration. The test still runs in the local JVM and all test results and artifacts are stored on the local disk. 

![running remotely:](run-remote.svg)

You can run a test in this mode by setting up your bootstrap file to refer to the ecosystem that you want to use and running the following command to schedule a test to run in the ecosystem:

```
galasactl runs submit
```


### When to run a test remotely

Running a test remotely is useful in the following scenarios:

- Tests need to run in parallel in an environment where resources are limited and need to be managed between tests. For example, ports, slots of processing capability, files, and sessions.

- Tests need to run in parallel in the shortest timeframe. 

- Test results and reports need gathering from a single point. For example, when test results need reporting or exporting to another report-generating system.

- When the clean-up of resources in the system under test is an important requirement.

- When bug investigation can proceed by independent inspection test results and artifacts.

