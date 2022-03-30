---
path: "/docs//ecosystem/automating-tests"
title: "Converting local tests to run in automation"
---

After writing a test to run locally on your machine, start to realise the power of Galasa by running that test in automation inside the Galasa Ecosystem. 

To run a test in automation inside the ecosystem, you need to complete the following high level tasks: 

1. Convert the local test into a OSGi bundle-wrapped project
2. Deploy the test artifacts to a Maven repository
3. Set up a new test stream
4. Run the test headlessly from Eclipse

Use this documentation to guide you through the process. After completing the following steps, you will have successfully run a test in automation. These instructions are based on  information that is contained within [GitHub](https://github.com/Jimbo4794/galasa-samples/blob/master/README.md).

## Overview

This documentation uses a [sample test](https://github.com/Jimbo4794/galasa-samples/tree/Sample-1-1-start) that is provided with Galasa. The sample test connects a 3270 emulator to a system and checks for an expected string in the system of record. Run the sample test locally and then make the changes required to run that same test in automation.    


### Convert the local test into an OSGi bundle-wrapped project

When running a test locally, the Eclipse plug-in wrappers and runs the test in its raw format, and automatically creates a OSGi Bundle Repository(OBR) which enables Galasa to run any artifacts that are contained within the workspace. 

To run the sample test locally, you must complete the following steps:

1. Edit the  ```cps.properties``` and ```credential.properties``` files so that the test can run on your machine.
2. Run a Maven install by right-clicking the parent *project* in Project Explorer and choosing _Run As > Maven install_ and create the run configuration by choosing _Run > Run Configurations_ from the main menu. 

 
### Deploy the test artifacts to a Maven repository

Use this section to understand how to create a Galasa project, parent project, tests project and OBR project. These artifacts can then be deployed to a Maven repository as a sample project.

Hosting the test code and OBR's in a central location ensures that the test engines have access to all the resoures that are required to run the test.

Complete the following steps to push the OBR that was created in the first task, along with the .jar files that contain the test material, to a Maven repository.

*Note:* If you are using the following example as a template, you must replace ```<XXX>``` with the appropriate value for your system. 
    

1. Set up the credential structure, for example: 
```
secure.credentials.TESTCREDS.username=<XXX>
secure.credentials.TESTCREDS.password=<XXX>
```
2. Define a default cluster for Galasa to use. The format is a comma seperated list.
```
zos.cluster.DEFAULT.images=MYTESTIMAGE
```
3. Define the image called _MYTESTIMAGE_, for example:
``` 
zos.image.MYTESTIMAGE.ipv4.hostname=<XXX>
zos.image.MYTESTIMAGE.telnet.port=<XXX>
zos.image.MYTESTIMAGE.telnet.tls=false
zos.image.MYTESTIMAGE.credentials=TESTCREDS
zos.image.MYTESTIMAGE.max.slots=2
zos.tag.MYTESTIMAGE.clusterid=DEFAULT
```

Convert the sample project to the structure that is required to run in automation
https://github.com/Jimbo4794/galasa-samples/tree/Sample-1-2-obr-project by completing the following subtasks.

### Create a Galasa project

path: "/docs/running-simbank-tests"
title: "Running the supplied SimBank tests"

1. Create a parent Maven project to wrapper the test-related artifacts by choosing _File > Other > Maven Project_ from the Eclipse main menu. 
2. Create a new project inside the parent project to generate the OBR by right clicking on the parent project and choosing _New > Other > Maven Module_.

The easiest way to restructure the project is to re-name the original project to the parent and then edit the pom file. 

Use the following example to understand how the structure should look:

```
+-- dev.galasa.examples.tests.parent
    |   +-- dev.galasa.examples.tests
    |       +-- src
    |       +-- pom.xml
    |   +-- dev.galasa.examples.obr
    |       +-- pom.xml
    |   +-- pom.xml
```

```
├───dev.galasa.examples.tests.parent
 │ │ pom.xml
 │ ├───dev.galasa.examples.obr
    │ │ pom.xml
    │ └───dev.galasa.examples.tests
    │ │ pom.xml
    │ └───src
 ```

### Create a parent project
    
1. From the Eclipse Menu choose  _File > Other > Maven Project_.
The parent project pom.xml file of looks like ./dev.galasa.genapp.tests.parent/pom.xml. Note that the packaging should be pom. Modify the groupId, artifactId, version, name and modules as per the project. Modify the dependencies based on the Galasa managers required for the test cases. Add bundletestcat goal as shown in the sample pom.xml.

Select Maven Project and provide the requested details to create the project.

### Create a tests project:

1. From the Eclipse Package Explorer view right-click on the parent project and choose _New > Other > Maven Module_.

The tests project pom.xml files looks like ./dev.galasa.genapp.tests.parent/dev.galasa.genapp.tests/pom.xml. The packaging should be bundle.

2. Select Maven Module and provide the requested details to create the project.

### Create an OBR project:

From the Eclipse Package Explorer view, right-click on the parent project and choose _New > Other > Maven Module_.

The OBR project pom.xml files looks like ./dev.galasa.genapp.tests.parent/dev.galasa.genapp.obr/pom.xml. The packaging should be galasa-obr. Add dependency to artifactId of tests project created above.

Note: OBR project pom file may have errors saying that it is not covered by the lifecycle.

Note that <packaging> is change to pom. This tells Maven to create no output, as this is a container for submodules. Child projects can utilise all the dependancies and properties from this parent.

Modules can be added to the parent pom, and if using Eclipse we can use:

Let's create two modules; ```dev.galasa.examples.tests``` and ```dev.galasa.exaples.obr```:
and move the ```SampleTests.java``` class to the new ```dev.galasa.examples.tests``` module. The pom for this module contains a refernce to the parent project, the artifact information and a packaging of type <packaging>bundle</packaging> as before:

Remove the _src_ dir and projects from the OBR project, as they are not required. The packaging type for this project is a custom one provided with Galasa that is called <packaging>galasa-obr</packaging>. This pom should reference the project containing the test code so that the code can be added to the OBR:

This pom may have errors saying that it is not covered by the lifecycle.

Edit the build phase of our parent POM to enable the Galasa style bundles to be generated. The _buildtestcat_ goal of the plug-in automatically generates the artifact that forms the test catalog. When projects are built, a _testcatalog.json_ appears in the build output. In the example code in the sample repository, the target dir is shown in the OBR project where you can see an example of the OBR and the test catalog.

Running a Maven install on the project builds the artifacts and has a structure similar to the following example:

### Deploy the sample project to a Maven repository

https://github.com/Jimbo4794/galasa-samples/tree/Sample-1-3-deploying

Deploy test artifacts to a Maven repository

To run a test in automation, the test engines need access to the test material. This is achieved by offering the test material as Maven artifacts, stored in a Maven repository. If you are using the Docker Operator to bring up an ecosystem, a Nexus repository is also instantiated, which can be used to store the artifacts. However, you can use any Maven repositories to which you have access.

1. Define to Maven where the artifacts are to be deployed. Our example uses a local Nexus repository that can be brought up locally on a workstation. 
2. Create or add to the ```settings.xml`` that is used by Maven. 
An example ```settings.xml``` is included in the repository, which can be used as a template. In the example, a _SNAPSHOT_ and _Release_ repository are configured. You might choose to configure these repositories if you have a development and a release stream of your test material. The following definitions are included in the file:

- A server called _example_. Credentials can be passed to the server for ease, but more secure solutions are offered by Maven.

- A profile called _example_. The profile is used to define the _SNAPSHOT_ and _Release_ repositories as well as properties that are used in a Maven deploy setup, allowing repository locations to be changed easily. 

The following information can be used to deploy artifacts to a Maven repository. You can add a deploy location to a project by adding the definition to the parent project, which can then be used by the children projects. In the parent POM, add the following:

```parent POM```

The <id>example</id> refers to the server, and the <url>${example.*.repo}</url> refers to the properties setup in the profile.

2. Set up a Maven run in a similar way to the following example command:  

```
mvn -P example clean deploy
```
If you are using Eclipse, you can setup a run configuration using the following command:

```
eclipse maven deploy
```
After running the command, the following output is returned: ```success```.

All the artifacts are now available on the the local repository (http://127.0.0.1:8081/#browse/browse:maven). 

nexus

### Set up a new test stream

Now that the test artifacts, OBR and test catalog are hosted in a central location, you are almost ready to start running in automation. The last step is to set up a test stream. 

You can view an example test stream that is provided with Galasa to run the Galasa SimBank tests. If you are using the Docker Operator, you can view this example test stream by using the ```submit``` command to open the test automation submit view. 

This view shows the available test streams and packages. If you are using the Docker Operator, you can see the ```simbank stream``` example. From here, you can select a test to run headlessly in the Galasa Ecosystem. 

To add a test to the menu, complete the following steps: 

1. Deploy the test catalog ```testcatalog.json``` that was generated in the build by editing the  ```settings.xml``` file that was created in the previous step. Add a stream name ```galasa.test.stream``` and the location of the cosystem bootstrap properties ```galasa.bootstrap```. 
2. Edit the deploy job by adding a new goal to the run configuration. The goal ```dev.galasa:galasa-maven-plugin:deploytestcat``` adds the generated test catalog to the API server.
3. Run the deploy. The new catalog is available at ```http://<XXX>:8080/testcatalog``` where ```<XXX>``` is your hostname. In this example, it is ```http://127.0.0.1:8080/testcatalog```.

     
View the contents of the test catalog by going to ```http://<XXX>:8080/testcatalog/<streamName>```. In this example, the URL is ```http://127.0.0.1:8080/testcatalog/example```.

You now have a live catalog of tests.

4. Add the following properties to the CPS so that Galasa knows where to find the test catalog and test material:

- A comma-seperated list of all the different test streams - ```framework.test.streams``` 
- A URL of the Maven repository that contains the test material - ```framework.test.stream.<streamName>.repo```
- The specific OBR version to use - ```framework.test.stream.<streamName>.obr```
- The location of the test catalog on the API server - ```framework.test.stream.<streamName>.location```
- A basic description for the stream that will appear in the Eclipse plug-in - ```framework.test.stream.<streamName>.description```

You can add these properties to the CPS file by installing the etcdctl CLI tool on your local machine and setting the following environment variables:

```
ETCDCTL_API=3
ETCDCTL_ENDPOINTS=<XXX>
```
where ```<XXX>``` is the hostname of the etcd cluster that is used to host the CPS.

Alternatively, to avoid installing new software, use Docker commands to interact with the container that hosts the CPS by running the following command:

```docker exec -it galasa_cps /bin/sh```

This command starts a session with the container that is hosting the CPS, which has etcdctl installed and configured.

4. Add properties to the CPS by using the  ```etcdctl put <key> <value>``` command. This command defines the test stream and the location of all the test artifacts to Galasa. You can run the command in a shell script if you are running the command frequently.
```
etcdctl put framework.test.streams SIMBANK,EXAMPLE
etcdctl put framework.test.stream.EXAMPLE.repo http://<XXX>:8081/repository/maven
etcdctl put framework.test.stream.EXAMPLE.obr mvn:dev.galasa/dev.galasa.examples.obr/0.0.1-SNAPSHOT/obr
etcdctl put framework.test.stream.EXAMPLE.location http://<XXX>:8080/testcatalog/example
etcdctl put framework.test.stream.EXAMPLE.description "Example Test Stream"
```
Note that ```framework.test.streams``` is a comma seperated list. If etcdctl ```get framework.test.streams``` returns a stream, for example, ```SIMBANK```, this must be added in addition to the new stream.
5. Define the properties that are required for the test run, as shown in the CPS and CREDS files in step one of this sample. The following set of properties are required to run the sample test in our example. Again, these commands must be run inside the session inside the CPS container.
```
etcdctl put zos.cluster.DEFAULT.images MYTESTIMAGE
etcdctl put zos.image.MYTESTIMAGE.ipv4.hostname <XXX>
etcdctl put zos.image.MYTESTIMAGE.telnet.port <XXX>
etcdctl put zos.image.MYTESTIMAGE.telnet.tls false
etcdctl put zos.image.MYTESTIMAGE.credentials <XXX>
etcdctl put zos.image.MYTESTIMAGE.max.slots 2
etcdctl put zos.tag.MYTESTIMAGE.clusterid DEFAULT
etcdctl put secure.credentials.plex2.username <XXX>
etcdctl put secure.credentials.plex2.password <XXX>
```
Go to the _Submit tests to automation_ window in Eclipse to view the new ```stream``` test stream.
Inside this stream you can access the new test. Use the _Next_ window to request TRACE output, or pass additional or overriding properties to the test. For this example, just click _Finish_. If you have the _Galasa Runs_ view open (the Galasa logo on the main bar), you can see that the status is ```running```.
Once the test is complete, view the new run in the _Galasa Results_ view. Double click the run to check it is passed. 
You have just run a test in automation!

     

https://github.com/Jimbo4794/galasa-samples/tree/Sample-1-4-test-streams

     

    ## Running in automation


        Jenkins and Automation - How to call and run our tests in automation


        https://github.com/Jimbo4794/galasa-samples/tree/Sample-1-5-jenkins

     

    Now you have run test headlessly within the ecosystem, how do you submit tests from an automated pipeline, for example, Jenkins job? Where the submissions is just a REST call, Galasa supports a Jenkins plugin to make this easier. If you are using the Docker operator, then a Jenkins server that has this plugin installed is already available:

     

    1. Create a new pipeline job on=n the Jenkines server:


    2. Create a pipeline script inside this job. You can use the example script in the repository branch:


    3. Define the tests that you want to run in the script. Note that this is an array, so you can pass as many tests as you like. 


    4. Define the stream from which you want to run the tests. This approach enables different test streams to be defined for the same test material that might in different release states, for example, Best so far and Production. The poll time is the frequency with which Jenkins requests an update on submitted tests, as Galasa is testing as a service and is running off the Jenkins node. The last array enables you to pass any override properties to the tests being run.


    5. Save the configurations and run the job. 

     

    You can now view the test results from the _Automation Runs_ tab in the Eclipse plugin. Note that both of the Runs appear as U*. To define the runs differently, you can set properties in the CPS. For example, the following command prefixes any Jenkins run jobs with a _J_: ```framework.request.type.JENKINS.prefix=J```

    


     

