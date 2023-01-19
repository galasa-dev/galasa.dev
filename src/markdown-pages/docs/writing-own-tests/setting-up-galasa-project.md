---
path: "/docs/writing-own-tests/setting-up-galasa-project"
title: "Setting up a Galasa project"
---

You can quickly and easily create a project structure to accommodate your own independent tests in your local storage by using the command-line tool that is provided with Galasa. 

You can pass parameters to the tool, enabling you to choose your own names and naming conventions. Artifacts are created on disk and can later be built, tested and deployed to a Galasa Ecosystem. Generated artifacts can be embellished and refactored to form the basis of future Galasa tests.

## A bit about Maven

<a href="http://maven.apache.org" target="_blank">Maven</a> is an Open Source build automation tool, initially created in 2003 and part of the Apache Software Foundation. You do not explicitly need to install it, the Galasa plugin downloads and installs it silently during its own installation and configuration. In extremely rare situations, this might not happen - just drop a message in our <a href="https://galasa.slack.com" target="_blank"> Galasa Slack</a> workspace if you sense this is the case, and we'll help you out. (<a href="https://join.slack.com/t/galasa/shared_invite/zt-ele2ic8x-VepEO1o13t4Jtb3ZuM4RUA" target="_blank">Register to join</a> first if you're not yet a member). In any case, if you have run any of the SimBank tests, you are already past this hurdle.

If you have already installed Maven as part of some other software project, no action is needed.

Maven is _opinionated_, which means that you need to comply with its expectations about how a project and its directories should be organised. When you create a Maven project in Eclipse, you should use the generated structure, or if you are importing a project, the provided structure.

The most visible practical evidence that a project is a Maven project is its pervasive use of `pom.xml` (Project Object Model) files. These XML files contain the magic that allows Maven to manage your project dependencies and build orchestration. You will see that a large part of setting up your Galasa project is to configure these properly.

## Before you start

First, check that you can run one or more of the tests in an example project. Don't rush this - it is recommended that you familiarise yourself with all of the Galasa examples before creating your own project. But as a minimum, if you can run <a href="/docs/running-simbank-tests/simbank-IVT" target="_blank">The SimBank IVT</a> test, you are all set.

## A little plan

A full (parent) Galasa project includes several sub-projects, which can also be known as _modules_, some of which are mandatory and some optional. A parent project contains:

- A Managers sub-project, allowing you to extend the provided range of Managers. In practice, if you have no intention of writing a Manager, you can omit this.
- An OBR (OSGi Bundle Repository) sub-project, which is mandatory. Galasa uses the OBR to locate your test project(s) and reason about their interdependencies.
- One or more test sub-projects, that as the name implies, contain the tests themselves. 

The parent project establishes all the dependencies for the sub-projects/modules. It builds all the modules in the order of the dependencies - it builds the Manager module before the test projects that use it.

For simplicity, it is assumed that you will only have one version of a test in production at any one time. However, by establishing different versions of your tests, you can have test streams with different versions of the same test project. For the purposes of the forthcoming example, the version of all projects is set to `0.1.0-SNAPSHOT`. The `SNAPSHOT` element forces Galasa to run with the absolute latest copy of your built test project.


## Setting up the filesystem

In the following example we are going to use the command-line tool to build a hierarchy of projects, where the parent project `dev.galasa.example.banking` contains two test sub-projects or modules called `dev.galasa.example.banking.payee` and `dev.galasa.example.banking.account` and a mandatory OBR sub-project called `dev.galasa.example.banking.obr`.

This setup is designed as an example of how to create a project structure that might ultimately be deployed to a Maven repository, so that your Galasa automation system can find everything it needs to run.

The following example syntax assumes a banking application is being tested. The banking application contains functionality dealing with `payee` and `account` object types, both of which can be manipulated.

```
galasactl project create \
--package dev.galasa.example.banking \
--features payee,account \
--force \
--log
```

where 
```--package``` is the name of a java package. This parameter is mandatory. You can use the example to help you to understand how you might create unique names for your java test packages. Sections can reflect your company, organisation, the application under test, or any other name-spacing of your choice. The value chosen influences the names of the folders, OSGi bundles, Maven coordinates, and the eventual java package name in which example tests are created. The name must be all lower-case letters and numbers (`a-z`, `0-9`), with `.` (period) character separators, and no part of the name can clash with a Java language reserved word.
```--features``` is a comma-separated list of one or more features of the application that you are going to test. This parameter is optional, defaulting to ‘test’. The entries in this list influence the names of some folders, OSGi bundles, Maven coordinates and java class names of the generated example tests. In the example provided, the banking application under test might have a `payee` section and an `account` section which need testing. Creating subcomponents of your test suite to test these features or components of the application creates a naming structure in which your tests can be organised. These names must be lower-case letters and numbers (`a-z`, `0-9`), with no `.` (period) or special characters, and must not clash with a Java language reserved word.
```--force``` is an optional flag. If the flag is missing, then any file that the tool tries to create which already exists causes a failure, and the original file is preserved. If this flag is used, then such files are silently over-written. Use this option carefully to avoid some of your files being over-written, resulting in the loss of some of your data.


## Understanding the generated artifacts

Running the galasactl `project create` command creates a number of files in a standard folder structure:

```
────dev.galasa.example.banking
    ├───dev.galasa.example.banking.account
    │   └─── pom.xml
    │   └───src
    │       └───main
    │           ├───java
	│			│ 	└───dev
	│			│		└───galasa
	│			│			└───example
	│			│				└───banking
    │           │ 					└───account
	│			│						└───TestAccount.java
	│			│						└───TestAccountExtended.java
	│			│  
    │           └───resources
	│				└───textfiles
	│					└───sampleText.txt	
	│───dev.galasa.example.banking.obr
    │   └─── pom.xml
    ├───dev.galasa.example.banking.payee
    │	└─── pom.xml
    │   └───src
    │       └───main
    │           ├───java
	│			│	└───dev
	│			│		└───galasa
	│			│			└───example
	│			│				└───banking
	│			│					└───TestPayee.java
	│			│					└───TestPayeeExtended.java
    │           └───resources
	│				└───textfiles
	│					└───sampleText.txt
    └─── pom.xml
```


The names of the root folders are not part of Maven's opinionated stance (they were just chosen for this exercise - but there is a conventional pattern to follow), however, the names of the lower level folders (`src`, `main`, `java` and so on) most certainly are.

As well as a hierarchy of directories, there are four `pom.xml` files placed at specific locations:

1. `pom.xml` in `dev.galasa.example.banking`
1. `pom.xml` in `dev.galasa.example.banking.account`
1. `pom.xml` in `dev.galasa.example.banking.obr`
1. `pom.xml` in `dev.galasa.example.banking.payee`

Of course, the four `pom.xml` files all have different contents!

## About the parent project

The top level folder, which is called `dev.galasa.example.banking` in this example, is the parent project. The parent project is a convenient container in which to hold all of the generated files. The <a href="https://github.com/galasa-dev/cli/blob/main/pkg/cmd/templates/projectCreate/parent-project/pom.xml" target="_blank">pom.xml</a> in the parent project is used to build all the other generated files.

Within the folder structure there are three generated OSGi bundle projects:

- The payee bundle project, `dev.galasa.example.banking.payee`, containing Galasa tests `TestPayee.java` and `TestPayeeExtended.java`, both of which relate to testing the payee feature.

- The account test bundle project, `dev.galasa.example.banking.account`, containing Galasa tests `TestAccount.java` and `TestAccountExtended.java`, both of which relate to testing the account feature.

- An OSGi Bundle Repository (OBR)[https://felix.apache.org/documentation/subprojects/apache-felix-osgi-bundle-repository.html] which holds metadata listing the tests that are available in the Galasa test projects.


## About the test projects

Within each of the Galasa test projects `payee` and `account` you can see the following files and folders:

- pom.xml (for use by the Maven build tool)

- A `src` tree holding source code

- Two java files in each `feature` test project

- A text resource file in each `feature` test project, which is read and used by the tests at run-time.


## About the tests

The `TestAccount.java` and the `TestPayee.java` source files show how a Core Manager can be injected into your test class before any test methods being used. 

The `TestAccountExtended.java` and the `TestPayeeExtended.java` source files show:

- How to obtain the `run-id` identifier by which an instance of running the test can be known. This can be useful for naming artifacts, logging or otherwise.

- How to read a text file resource which is embedded within the test OSGi bundle. This can be useful for getting data files for use in the testing of the application.

- How logging can be performed to help debug issues in the test code itself.

- How a file that is created by the test run can be captured together with other test results for later viewing.

You can find the templates that generate these Java files in the Galasa cli repository. <a href="https://github.com/galasa-dev/cli/tree/main/pkg/cmd/templates/projectCreate/parent-project/test-project/src/main/java" target="_blank">galasa-dev/cli repository</a>


## Building the example projects by using Maven

Complete the following steps to build the example projects:

1. On the command line, navigate into the top level parent folder. In our example the  command is ```cd dev.galasa.example.banking```.
1. Invoke Maven to build the OSGi bundles by running the ```mvn clean install``` command.

The built artifacts are typically placed in the ```~/.m2/repository``` folder.

Note: The tool currently does not generate build files for use with Gradle. 


## Some additional notes on the key elements of pom.xml files


### The parent pom.xml file elements

- The `<project>` and `<modelVersion>` elements are standard prologues to a `pom.xml` file.
- The `<groupId>` is used to group related Maven projects in a Maven repository. It is recommended (but not enforced) that all projects in a test stream share the same `groupId`.
- The `<artifactId>` must be unique for each Maven project under a `groupId`. To prevent confusion, you should make it unique across `groupId`s. The `groupId` and `artifactId` can nominally be anything you choose, but if you were to ever consider publishing the project on Maven Central, you would have to ensure that they were unique across Maven Central. Because of this, and to avoid future name collisions, it is conventional to use (reversed) company domain names, which leads to patterns like `dev.galasa.example.banking`.
- The `<version>` in this project is set to `0.1.0-SNAPSHOT` so that Galasa knows it needs to look for the latest copy every time it runs a test in automation. For local test running, it will check for the latest copy the first time a test is run in a day. It is unlikely that you will need to update the version unless you are specifically interested in maintaining multiple versions of the same test project.
- `<packaging>` indicates what type of Maven project this is - in this case, a `pom` project.
- `<modules>` details what sub-modules (sub-projects) are contained within this parent project. Usually, when the parent project is built, so are the sub-modules.
- `<distributionManagement>` controls where Maven deploys the project when built. A variable is used so that the same project can be built and deployed to different test stream repositories.
- The `<properties>` element specifies properties such as file encoding and Java version numbers. Its `<unpackBundle>` sub-element is required if you are including custom Managers within the project structure.
- `<dependencyManagement>` establishes the versions of dependencies in all of the sub-modules. A BOM project is provided by the Galasa team that includes the versions of all of the released Managers. Set the version of Galasa you wish to run against, for example 0.20.0, and all the Manager versions are imported.
- `<dependencies>` list all the Managers you wish to make available for your tests and custom Manager if present. You could include `<dependencies>` in each of the sub-modules, but it is easier to maintain the list here.
- `<plugins>` identify the Maven plugins to be used during the build process. The `maven-bundle-plugin` builds OSGi bundles (the Manager and test projects), indicated by `<packaging>bundle</packaging>`. The `galasa-maven-plugin` is used in two ways - to build a test catalog for each bundle project and to build the `<packaging>galasa-obr</packaging>` project.

### The test project pom.xml file elements

- The <parent> element signifies that all the properties and dependencies found in the parent pom.xml file are to be used for this project - avoiding duplication and allowing changes to ripple through all sub-projects.
- The <packaging> element is set to `bundle` so an OSGi bundle is built instead of a simple JAR.


### The test pom.xml file elements

- The <packaging> element is set to `galasa-obr` which causes the Galasa Maven plugin to build this project.
