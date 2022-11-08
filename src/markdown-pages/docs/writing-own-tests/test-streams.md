---
path: "/docs/writing-own-tests/test-streams"
title: "Test streams"
---

Galasa's ecosystem organises tests into _streams_. Test streams give you more options when it comes to organising your test projects, how often they are built and where they are deployed.

You can have as few or as many test streams as you wish.

# About test streams

A stream is a group of tests that you wish to run in automation represented by a single OBR (OSGi Bundle Repository) and its equivalent test catalog. Galasa uses an OBR to locate your tests in a Maven repository, along with all of the Managers that a test project requires. A test catalog is generated directly from the test source, is always up to date, and is what you would use in Eclipse or specify in the [Galasa CLI](/docs/cli-command-reference/cli-command-reference) to select tests to run in automation.

There are many ways to organise test streams:

- <b>Single test stream</b>: A single test stream can contain all of your tests. This system is of most use when you are learning about Galasa and experimenting with the automation system. At some point, it is much more beneficial for you to move to a dual stream setup.
- <b>Dual test streams</b>: Often, you will need to run a _production_ test stream and a _best so far_ test stream. The production stream is used by the CI/CD pipeline to test the application, while the best so far stream will include tests under development that you wish to observe under automation.

  The source code for tests in dual streams is usually from the same SCM (Source Code Management) area - in git terms, this would mean the same repository but in different branches. The best so far stream contains all of the production stream tests plus new or modified tests. When you are happy that a test has reached a good level of quality, you can promote it to the production stream and make it available to the CI/CD pipeline. Usually, you would organise things so that you have a Maven build per stream.

- <b>Many streams</b>: You might organise your streams so that you have one per team, or dual test streams per team. If you have lots of tests per application area, having a stream per area is also possible.

Build time and frequency usually dictates how streams are structured. If you are building your test projects frequently, and those build times are long, you might wish to split the test projects into streams. Alternatively, you could stick with a single stream, but split the projects into separate builds that all kick off the build of the test stream OBR when complete.

## Setting up a test stream

If you are using the Docker Operator, you can view an example test stream from within Eclipse by selecting the _Galasa > Submit tests to automation_ option from the Eclipse menu.

This view shows the available test streams and packages. If you are using the Docker Operator you can see the SimBank example. From here, you can select a test to run headlessly in the Galasa Ecosystem.

To add a test to the menu, complete the following steps:

1. Deploy the test catalog ```testcatalog.json``` that was generated in the build by editing the  ```settings.xml``` file. Add a stream name ```galasa.test.stream``` and the location of the cosystem bootstrap properties ```galasa.bootstrap```.
```
<profiles>
    <profile>
        <id>example</id>
        <properties>
            <example.release.repo>http://127.0.0.1:8081/repository/maven</example.release.repo>
            <example.snapshot.repo>http://127.0.0.1:8081/repository/maven</example.snapshot.repo>
            <galasa.test.stream>example</galasa.test.stream>
            <galasa.bootstrap>http://127.0.0.1:8081/bootstrap</galasa.bootstrap>
        </properties>
        <repositories>
            <repository>
                <id>example.release.repo</id>
                <url>http://127.0.0.1:8081/repository/maven</url>
                <releases>
                    <enabled>true</enabled>
                    <updatePolicy>always</updatePolicy>
```
2. Edit the deploy job by adding a new goal to the run configuration. From the Eclipse main menu choose _Run > Run Configurations_ and add a new goal ```devgalasa:galasa-maven-plugin:deploytestcat```. This goal adds the generated test catalog to the API server.
3. Run the deploy again. The new catalog is available at ```http://<XXX>:8080/testcatalog```, where ```<XXX>``` is your hostname. In this example, the catalog is available at ```http://127.0.0.1:8080/testcatalog```.
   
Alternatively, view the contents of the test catalog by going to ```http://<XXX>:8080/testcatalog/<streamName>```. In this example, the URL is ```http://127.0.0.1:8080/testcatalog/example```.

You now have a live catalog of tests!
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
5. Add properties to the CPS by using the  ```etcdctl put <key> <value>``` command. This command defines the test stream and the location of all the test artifacts to Galasa. You can run the command in a shell script if you are running the command frequently.
```
etcdctl put framework.test.streams SIMBANK,EXAMPLE
etcdctl put framework.test.stream.EXAMPLE.repo http://<XXX>:8081/repository/maven
etcdctl put framework.test.stream.EXAMPLE.obr mvn:dev.galasa/dev.galasa.examples.obr/0.0.1-SNAPSHOT/obr
etcdctl put framework.test.stream.EXAMPLE.location http://<XXX>:8080/testcatalog/example
etcdctl put framework.test.stream.EXAMPLE.description "Example Test Stream"
```
Note that ```framework.test.streams``` is a comma seperated list. If etcdctl ```get framework.test.streams``` returns a stream already, in this example ```SIMBANK``` is returned, then this stream must be added in addition to the new stream.
6. Define the properties that are required for the test run, as shown in the CPS and CREDS files in step one of this sample. The following set of properties are required to run the sample test in our example. Again, these commands must be run inside the session inside the CPS container.
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
7. Navigate to the _Submit tests to automation_ window in Eclipse to view the newly added test stream.
Inside this stream you can access the new test. Use the _Next_ window to request TRACE output, or pass additional or overriding properties to the test. For this example, just click _Finish_. 
Once the test is complete, view the new run in the _Galasa Results_ view. Double click the run to check it is passed.

You have just run a test in automation!

