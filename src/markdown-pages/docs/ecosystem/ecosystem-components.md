---
path: "/docs/ecosystem/ecosystem-components"
title: "Configuring the Ecosystem"
---
trouble shooting on updgrade  check your eclipse preferences for Galasa,  i suspect you have 0.15.0 as the version defined, update  your eclipse plugin

## from slack 
? I am interested in using the Genapp manager with different CPS properties to run a set of tests on a single region and another set of tests on a CICSPlex. Does this manager support this? I tried adding the properties

genapp.instance.CICSPLEX.cics.applID=CICSB014
genapp.instance.CICSPLEX.json.port=1023

to the CPS but the manager in the test kept using the genapp.instance.GENAPP properties.


Mike To use another instance of genapp,  use the override property
genapp.dse.instance.name=CICSPLEX
to direct it to that instance id 

I am afraid you are getting slightly confused about the meaning of TAG and INSTANCE and how they are supposed to be used with testing.
One of the concepts of Galasa is test late binding,  this avoids the necessity of having to change your test code based on the environment you want to run against.  The above examples you have given is a prime example of what you want to avoid.  The exact same test code should run against your single cics region and your cics plex, without code modifications.
To achieve late binding we refer to the env in the Test as a TAG,   the manager knows it as a INSTANCE or similar names.
What the manager has to do is decide what INSTANCE is associated with the TAG at runtime. The manager would normally look at the run overrides and use that to dynamically associate an instance to a tag based on the application build, the lpar it is running on and many other choices, totally up to the manager.
However, some managers will allow the user to specify what INSTANCE is associated with a TAG via a dse (developer supplied environment).

So to provide an example, say you have 2 instances of the GenApp application running,   one in a CICSPLEX and one in a SINGLE cics region.   Lets call those instances CICSPLEX and SINGLE:-

genapp.instance.CICSPLEX.cics.applID=CICSB014
genapp.instance.CICSPLEX.json.port=1023
genapp.instance.SINGLE.cics.applID=CICSSING
genapp.instance.SINGLE.json.port=1234

Here we have defined the 2 separate instances to the GenApp Manager.
In the test code all we need is:-

	@BasicGenApp(imageTag = "GENAPP")
	public IBasicGenApp genapp; 

Note the TAG does not match any of the available instances.
I havent looked at the GenApp manager code, but at the moment I do not believe it has the ability to select one the available instances.
However, there is code for the tester to select which instance needs to be associated via the override cps property:-
genapp.dse.instance.name=CICSPLEX
or
genapp.dse.instance.name=SINGLE
however looking at this now, the property name is wrong and I will raise a bug to fix, as it should have the tag name in it

So, with genapp.dse.instance.name=CICSPLEX set in the overrides,  the genapp manager will associate the CICSPLEX instance with the GENAPP tag.

to run against single,  genapp.dse.instance.name=SINGLE will achieve that, without modifying the code

Hi @Michael Baylis,
I totally see the value in test late binding and decoupling the tests from the test environment information. I think the part I have a challenging time with is how I would be able to run my single region tests and my cicsplex tests in the galasa ecosystem using the same genapp manager since it seems like I cannot have genapp.dse.instance.name=CICSPLEX and genapp.dse.instance.name=SINGLE in the cps.When I run these tests locally, I understood manually changing my overrides file to have genapp.dse.instance.name=CICSPLEX when I want to run my cicsplex tests and use genapp.dse.instance.name=SINGLE when I want to run my single region tests.

you would not specify the genapp.dse.instance.name in the CPS.
You would provide the property as an override each time you run a test. you can also provide the override as part of a jenkins run. n the Eclipse Galasa launch config, you have the option to provide a *.gover file that will be used as overrides during the run. so create a cicsplex.gover file in your eclipse workspace,
create a single.gover file.  each with there specific overrides and then create a launch config for the cicsplex run and one for the single run, each pointing to the correct override file

I am thinking about the when the tests run as a suite in the galasa ecosystem in the Jenkins pipeline. I have the single region and cicsplex tests in the same suite. Could the cicsplex and single region tests run in the same test case execution/jenkins run or in the pipeline should the tests execute in separate jenkins runs, once with genapp.dse.instance.name=CICSPLEX and another time with genapp.dse.instance.name=SINGLE?

Would I supply these overrides in the envProps section of the Jenkins test run?

stage('run-single-cics-tests') {
 steps {
    step([$class: 'GalasaTestExecution', 
          tests: ['dev.galasa.genapp.tests/dev.galasa.genapp.tests.BasicHybridTest'],
          stream: 'WAZIVTP',
          pollTime: '5',
          envProps: [{"genapp.dse.instance.name":"SINGLE"}]
    ])
 }
}
stage('run-single-cicsplex-tests') {
 steps {
    step([$class: 'GalasaTestExecution', 
          tests: ['dev.galasa.genapp.tests/dev.galasa.genapp.tests.BasicHybridTest'],
          stream: 'WAZIVTP',
          pollTime: '5',
          envProps: [{"genapp.dse.instance.name":"CICSPLEX"}]
    ])
 }
}

yes says Mike
once we create the selection and run steps,   you would select the test twice with the appropriate overrides,   and the run them both in parallel

Hi @Nathan Cassata, is the property framework.dynamicstatus.store inside yours CPS set correctly? You can check by running a etcdctl get framework.dynamicstatus.store on your cps server


.................
To deploy your tests to the ecosystem,  you need to deploy the maven test bundle to the nexus repository, as well as an OBR bundle.
With those 2 bundles in the repo, the automation engines will be able to find them with a few CPS properties:-
5:16
Untitled 

framework.test.stream.simbank.description=SimBank Tests

framework.test.stream.simbank.location=http://cicsk8sm.hursley.ibm.com:30811/testcatalog/simbank

framework.test.stream.simbank.obr=mvn:dev.galasa.simbank/dev.galasa.simbank.obr/0.0.1-SNAPSHOT/obr

framework.test.stream.simbank.repo=http://cicsk8sm.hursley.ibm.com:30345/repository/maven/

framework.test.streams=simbank

5:16
so these properties describe the “simbank” test stream,  should be uppercase, but heyho
5:17
The .location is the url of the test catalog, as used by eclipse (edited) 
5:17
the .obr is the maven groupid/artifactid/version/type of the obr artifact.
5:18
the  .repo is the url of the maven repo in nexus
5:18
the “framework.test.streams” is a comma separated list of the test streams
5:19
the docker ecosystem that was deployed should have a simbank test stream already
5:19
If you understand Maven, then this should be relatively easy,  if not,  then you may need us to give you a hand to set the projects up and learn how to deploy
;;;;;;;;;;;;;;;;





In Introduction and architecture, we learned that Galasa is comprised of three major components:

-	The underlying core Galasa framework 
-	A collection of Managers
-	A test runner 

In Ecosystem architecture, we learned about the microservices that make up the Galasa Ecosystem, including the ... 

In this topic, we find out how these components and microservices interact with each other and how to configure them so that the test running locally on your machine can run in automation in the Galasa Ecosystem. 


## Setting properties in the CPS

Avoids hard coding properties in your tests , supports dynamic assignment on initialision eg defining test envt, ports (a port may be in use one time but not another). One solution is to gropu everythign u want use r to have control over is to use the cps

open up cps file in ecosytem - there is a prperties repo u can do a pr on the file if u like. cps file needs to be aviable to ecosytem to use . u have ur own cps file locally
you get a cps.properties file when you install galasa. 

alternatively ... if ur bootstrap uri is using the bootstrap from galasa ecosystem - use overrides properties file then to change items locally

u can define properties for hursely bank manager, hostname, port name properties 


## The test runner 

The Galasa test runner combines all the parts of Galasa together with your test material to run a test. The test runner can execute both locally on your laptop or in the Galasa Ecosystem.  This means that the same test can be developed, tested and debugged locally at speed and then executed by the ecosystem when required. 

For each test, the test runner brings up an instance of the Galasa framework which, alongside the test bundle, is used to run the test. The framework recognizes annotations that are used within the test code and uses this information to activate relevant Managers and can provision the resources needed by the test such as environments, test data or Docker containers. The test can then be executed with all the resources that it requires to run in place, regardless of if the test runs locally or in the ecosystem. 

## Managers

The test runner has access to Galasa Managers. Managers make Galasa adaptable, extensible and provide a way of interacting with a specific tool or operating system-specific functionality.   
The main purpose of a Manager is to reduce the amount of boilerplate code within a test and provide proven tool interaction code. This makes the test code simpler and easier to write, understand and maintain, as the focus of a test's development shifts to validating application changes, rather than marshalling environmental resources. 
Different Managers can collaborate with each other to perform a joint task, including sharing information and getting other Managers to complete tasks for them. 
For example, the Docker Manager enables containers to run on infrastructure Docker engines, making it easy to write tests that consume container-based services. The test does not need to worry about where the Docker infrastructure is, its credentials, or its capacity as this is all handled by the Manager. 
The Docker Manager can be used by other Managers as a base for their own services. For example, the JMeter Manager can run a JMeter service inside a Docker container. Using the Docker Manager in this way means that the test or administration team do not need to create dedicated JMeter resources.
The z/OS Batch Manager provides tests and Managers with the ability to submit, monitor and retrieve z/OS batch jobs. For example, code to invoke z/OS MF is not required in the test itself. Instead, this code is written inside the Batch Manager and this Manager is invoked by using the annotation @ZosBatch within the test code. There is an example walkthrough of a test that uses the Batch Manager on the Galasa website, along with a list of currently available and future Managers.

The work of the Managers is coordinated by the Galasa framework.

### Configuration Property Store

The CPS is used to define object properties, for example, the port on which a terminal connects to an application. Defining properties by using the CPS means that a tester does not need to know where the application to which they are connecting is running because this is already configured in a Manager by the system administrator. Different properties can be set in the CPS to allow a test to run against multiple environments without changing the code inside the test. 

### Dynamic Status Store

The DSS is used by Managers and the Galasa framework to ensure that limits that are set in the CPS configuration are not exceeded. DSS properties change dynamically as tests are run, to show the resources that are currently in use, shared or locked by a test, so that workloads can be limited to avoid throttling. When running in automation, the DSS is shared by every instance of the framework. 


## Framework

The Galasa framework sits on top of the Managers. The framework coordinates with the Dynamic Status Store (DSS), Configuration Property Store (CPS), Result Archive Store (RAS), API server and Managers to allow a test to seamlessly run locally or in automation, against any environment, without needing to change the test code or to understand the context of its execution.

Galasa's framework orchestrates all these component activities, and coordinates with the test runner to run tests. No code needs to be written to invoke a test – you just write the code that defines them as a set of one or more test classes and the methods within.  
The Galasa framework automatically recognizes test definitions and activates the Managers required by the test and the test runner to execute the test. It is unlikely that you would want to change the framework or test runner code during the normal range of testing activities.  

## Galasa Ecosystem

The Galasa Ecosystem is the term given to the collection of components outlined in the previous sections.  The Managers, Framework, DSS, RAS, CPS and API Server all exist within the ecosystem, allowing automation and testers to submit tests, review test results and examine test artifacts from a single endpoint.

The Galasa Ecosystem is normally packaged as a set of containers which can be deployed to an open-shift or Kubernetes based cluster which can then scale to meet your demands. We supply easy to use operators that allow this ecosystem to be deployed with a single command.
