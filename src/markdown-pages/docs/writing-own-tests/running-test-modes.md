---
path: "/docs/writing-own-tests/running-test-modes"
title: "Modes of running a test"
---

Use the following information to understand the concepts behind running Galasa tests in one of the following modes: 

- Locally, with everything running on the local machine
- Locally, but using a shared configuration that is hosted by a Galasa Ecosystem
- Remotely, by submitting the test to run in a Galasa Ecosystem 


## Running a test locally

![running in local mode:](running-local.svg)

When you run a test locally, without using shared configuration, everything runs on your local machine. The Galasa bootstrap file is blank and makes no reference to an ecosystem. The Galasa framework is launched within the JVM on the local machine and the local file system holds all the configuration that is used by the test. The test runs in the local JVM and all test results and artifacts are stored on the local disk. 

You can run a test in this mode by using the following command:

```
galasactl runs submit --local … <more options are needed>
```

or by using the Eclipse plugin, in which case the test is hosted within the Eclipse JVM.


## Running a test locally but using shared configuration

![running in local mode with shared configuration:](running-hybrid.svg)

When you run a test locally, but using shared configuration, the Galasa bootstrap file refers to the Galasa Ecosystem that you want to use. The Galasa framework is launched within the JVM on the local machine, but the framework consults the remote ecosystem to read configuration data. This is the key difference between running a test locally without using shared configuration. The test still runs in the local JVM and all test results and artifacts are stored on the local disk. 

You can run a test in this mode by setting up your bootstrap to refer to the ecosystem that you want to use and running the following command:

```
galasactl runs submit --local 
```

or by using the Eclipse plugin, in which case the test is hosted within the Eclipse JVM.


## Running a test remotely in a Galasa Ecosystem


![running remotely:](running-remote.svg)

When you run a test remotely, the Galasa bootstrap file refers to the Galasa Ecosystem that you want to use, and the test is run on the specified remote ecosystem.  The configuration for the test is also held within that ecosystem, and Galasa starts up on the container in which the test code is running. The test results and artifacts are stored in a database within the ecosystem and authorised users on client machines are able to view the test results. 

The Galasa framework is launched within the JVM on the local machine, but the framework consults the remote ecosystem to read configuration data. This is the key difference between running a test locally without using shared configuration. The test still runs in the local JVM and all test results and artifacts are stored on the local disk. 

You can run a test in this mode by setting up your bootstrap file to refer to the ecosystem that you want to use and running the following command to schedule a test to run in the ecosystem:

```
galasactl runs submit
```


### Running a test locally is useful in the following scenarios:


- Developing tests, and running those tests against a non-production environment.

- Running ad-hoc tests against a development or non-production target system.

- Running many tests in series against a target system which can withstand the load that is placed on it.

- Running tests against a target system which is dynamically provisioned, used exclusively by the tests, and de-provisioned afterwards.

- Running tests within a JVM that will not be interrupted, or halted mid-flow, causing a build-up of allocated resources in the system under test.

- When there is time to find and share test run logs and artifacts with bug investigators, whenever a test fails and finds a bug.


### Running a test remotely is useful in the following scenarios: 

- Tests running in parallel need to contend for limited resources, so the resources need to be managed between tests. For example, ports, slots of processing capability, files, and sessions.

- Running tests in parallel so the overall elapsed time is as small as it can be.

- Running many tests where reports of the results need gathering from a single point. For example, test results need reporting or exporting to another report-generating system.

- Clean-up of resources in the system under test is an important requirement.

- Bug investigations can proceed by inspecting test results and artifacts independently.


