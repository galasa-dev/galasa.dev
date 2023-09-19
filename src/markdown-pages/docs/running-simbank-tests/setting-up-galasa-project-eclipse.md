---
path: "/docs/running-simbank-tests/setting-up-galasa-project-eclipse"
title: "Creating a Galasa project using Eclipse"
---

Galasa SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) which logs on to SimBank  - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as `BasicAccountCreditTest.java` in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

All of these example tests become available when you set up a Galasa example project within Eclipse. You can set up a project by using either [Maven](#maven) or [Gradle](#gradle), unless you are using the zipped distribution of Galasa, in which case you must use Gradle.

If you are using the Galasa plug-in from the external update site and are using Maven, follow the instructions in the [_Creating an example Galasa project using Maven_](c) section.

If you are using the Galasa plug-in from the external update site and are using Gradle, follow the instructions in the [_Creating an example Galasa project using Gradle_](#headonlinegradle) section. 

If you are using the Galasa zipped distribution you must use Gradle to build your project, so follow the instructions in the [_Creating an example Galasa project using Gradle (zipped distribution)_](#headgradle) section. 

Note that there are some variations in the Eclipse interface, depending on the version of Eclipse that you are using.


## <a name="maven"></a>A bit about Maven

Maven is _opinionated_, which means that you need to comply with its expectations about how a project and its directories should be organised. When you create a Maven project, you should use the generated structure.

The most visible practical evidence that a project is a Maven project is its pervasive use of `pom.xml` (Project Object Model) files. These XML files contain the magic that allows Maven to manage your project dependencies and build orchestration. 

## <a name="gradle"></a>A bit about Gradle

The Gradle project structure looks somewhat different to the Maven structure because Gradle projects use `build.gradle`, `bnd.bnd` and `settings.gradle` files rather than `pom.xml` files. 

The `build.gradle` files declare any dependencies that the test code has, and specify the Maven co-ordinates to use when publishing to a Maven repository.  The `bnd.bnd` files define the OSGi Bundles for the test projects and any Managers in the project and the `settings.gradle` file tells Gradle where to look for the dependencies and plug-ins that are required to build the project. 

You can check the current compatibility between Gradle and Galasa versions in the table provided in the [Prerequisites](docs/prerequisites) documentation. 


## Before you start

Check that an `.m2` folder exists in your user home directory. Built artifacts are placed in the `~/.m2/repository`. On Windows, the user home directory resembles: C:\Users\<username>, on MacOS it will be /Users/<username> and on Linux /home/<username>. Note that any file or folder beginning with a `.` (period) is a hidden folder, so you might need to change the settings on your operating system to show hidden files.

## A little plan

A full (parent) Galasa project includes several sub-projects, which can also be known as _modules_, some of which are mandatory and some optional. A parent project can contain the following sub-projects:

- A Managers sub-project, allowing you to extend the provided range of Managers. In practice, if you have no intention of writing a Manager, you can omit this.
- An OBR (OSGi Bundle Repository) sub-project, which is mandatory. Galasa uses the OBR to locate your test project(s) and reason about their interdependencies.
- One or more test sub-projects, that as the name implies, contain the tests themselves. 

The parent project establishes all the dependencies for the sub-projects or modules. It builds all the modules in the order of the dependencies - it builds the Manager module before the test projects that use it.

For simplicity, it is assumed that you will only have one version of a test in production at any one time. However, by establishing different versions of your tests, you can have test streams with different versions of the same test project. For the purposes of the forthcoming example, the version of all projects is set to `0.1.0-SNAPSHOT`. 



## <a name="headmaven"></a>Creating an example Galasa project using Maven

<b>NOTE:</b> Normally m2e (the Eclipse Maven plug-in) automatically compiles the test bundles and produces the necessary manifest and OSGi files. However, there appears to be an anomaly in m2e in the 2019 versions of Eclipse which we are investigating. If the bundles fail to build correctly, you can force the Maven build by right-clicking the _project_ and selecting _Run As > Maven Install_. We will resolve this issue in a future release.

1. Ensure that Eclipse is running.
2. Choose _File > New > Example_, select _SimBank example Maven projects_ and click _Next_.
3. Confirm your _New project_ prefix as `dev.galasa.simbank` and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), two new entries appear:  
    ```  
    dev.galasa.simbank.manager  
    dev.galasa.simbank.tests  
    ```  
4. Right-click on `dev.galasa.simbank.manager` and choose _Run As > Maven install_ - wait a few moments for the Maven build and then right-click on `dev.galasa.simbank.tests` and do the same. Note that the order in which you do this is significant - first `dev.galasa.simbank.manager` and then `dev.galasa.simbank.tests`. This is because the SimBank tests have a dependency on the SimBank Manager.
5. Expand `dev.galasa.simbank.tests` and then expand `src/main/java`. 
6. Explore the `dev.galasa.simbanks.tests` package. You'll see the group of tests provided with SimBank:
    ![SimBank tests](./provided-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, [The SimBank IVT](/docs/running-simbank-tests/simbank-IVT) is the best place to start.

## <a name="headonlinegradle"></a>Creating an example Galasa project using Gradle

1. Ensure that Eclipse is running.
2. Depending on your operating system, choose either _Window > Preferences_ or _Eclipse > Preferences_, check that you are using the correct version of Gradle.
3. Choose _File > New > Example_, select _SimBank example Gradle projects_ and click _Next_.
4. Confirm your _New project_ prefix as `dev.galasa.simbank` and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), three new entries appear:  
    ``` 
    dev.galasa.simbank.manager   
    dev.galasa.simbank.parent
    dev.galasa.simbank.tests  
    ```  
5. In Project Explorer, right-click on `dev.galasa.simbank.parent` and select _Gradle > Refresh Gradle Project_. A _BUILD SUCCESSFUL_ message is displayed in the _Console_ tab when the project is refreshed successfully.<br>
    <b>Note:</b> If you get an error connecting to the Gradle build, go to _Window > Preferences > Gradle_,  check the _Local installation directory_ box, browse to the folder in which you installed Gradle and click _OK_ and _Apply and Close_.  
6. Navigate to *Run > Run Configurations*. The *Create, manage and run configurations* dialog box appears. 
7. Depending on version of Eclipse that you are using, either right-click *Gradle Project* or *Gradle Task* and choose *New Configuration*. 
8. Provide a meaningful name and set up your Gradle Task to run a clean build. 
    ![SimBank tests](./clean-build.png)
9. In _Working Directory_, click *Workspace*, select `dev.galasa.simbank.parent` and click `OK`.
10. Click _Apply_ then _Run_. A _BUILD SUCCESSFUL_ message is displayed in the _Console_ tab.
11. Expand `dev.galasa.simbank.tests` and then expand `src/main/java`.
12. Explore the `dev.galasa.simbank.tests` package. You'll see the group of tests provided with SimBank:
    ![SimBank tests](./gradle-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, [The SimBank IVT](/docs/running-simbank-tests/simbank-IVT) is the best place to start.


## <a name="headgradle"></a>Creating an example Galasa project using Gradle (zipped distribution)

1. Ensure that Eclipse is running.
2. Depending on your operating system, choose either _Window > Preferences_ or _Eclipse > Preferences_, check that you are using the correct version of Gradle, and then select `Galasa` from the left hand pane.
3. Change the _Remote Maven URI_ to the local Maven directory, for example, `file:///home/username/galasa-isolated-mvp/maven` to enable running tests to access any dependencies. <br>
    <b>Note:</b> If you are using the Docker image, set the URL to the running container, for example, `http://hostname:8080/maven`.
4. Click _Apply and Close_.
5. Choose _File > New > Example_, select _SimBank example Gradle projects_ and click _Next_.
6. Confirm your _New project_ prefix as `dev.galasa.simbank` and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), three new entries appear:  
    ``` 
    dev.galasa.simbank.manager   
    dev.galasa.simbank.parent
    dev.galasa.simbank.tests  
    ```  
7. Add a `pluginManagement` section, at the top of the `settings.gradle` file in `dev.galasa.simbank.parent` so that the Gradle build can search the Maven directory for any required plug-ins. Specify the Maven repository as the location of the unzipped Maven directory. For example:
    ```dev.galasa.simbank.parent - settings.gradle file
    pluginManagement {
        repositories {
            maven {
                url = "file:///home/username/galasa-isolated-mvp/maven"
            }
        }
    }
    ```
    <b>Note:</b> If you are using the Docker image, set the URL to the running container. For example:
    ```dev.galasa.simbank.parent - settings.gradle file
    pluginManagement {
        repositories {
            maven {
                url = "http://hostname:8080/maven"
            }
        }
    }
    ```  
8. In `dev.galasa.simbank.manager`, modify the `build.gradle` file:
    1. In the repositories closure, replace `mavenCentral()` with the location of the unzipped Maven directory so that the individual projects can locate any dependencies that they might require for building. For example:
        ```dev.galasa.simbank.manager - build.gradle file
        repositories {
            maven {
                url = "file:///home/username/galasa-isolated-mvp/maven"
            }
        }
        ```
        <b>Note:</b> If you are using the Docker image, set the URL to the running container. For example:
        ```dev.galasa.simbank.manager - build.gradle file
        repositories {
            maven {
                url = "http://hostname:8080/maven"
            }
        }
        ```
    2. Modify the dependencies closure by adding the following constraints:
        ```dev.galasa.simbank.manager - build.gradle file
        constraints {
	        implementation('commons-codec:commons-codec:1.15'){
	    	    because "Force specific version of commons-codec for security reasons"
	        }
	        implementation('org.apache.httpcomponents:httpcore:4.4.14'){
	    	    because "Force specific version of httpcore for security reasons"
	        }
        } 
        ```
9. In `dev.galasa.simbank.tests`, modify the `build.gradle` file:
    1. In the repositories closure, replace `mavenCentral()` with the location of the unzipped Maven directory. For example:
        ```dev.galasa.simbank.tests - build.gradle file
        repositories {
            maven {
                url = "file:///home/username/galasa-isolated-mvp/maven"
            }
        }
        ```
        <b>Note:</b> If you are using the Docker image, set the URL to the running container. For example:
        ```dev.galasa.simbank.tests - build.gradle file
        repositories {
            maven {
                url = "http://hostname:8080/maven"
            }
        }
        ```
    2. Modify the Selenium Manager dependency to remove packages that are not required. Change the dependency from:
        ```dev.galasa.simbank.tests - build.gradle file
        implementation'dev.galasa:dev.galasa.selenium.manager:0.+'
        ```
        to:
        ```dev.galasa.simbank.tests - build.gradle file
        implementation('dev.galasa:dev.galasa.selenium.manager:0.+'){
            exclude group: 'com.squareup.okio', module: 'okio'
            exclude group: 'com.squareup.okhttp3', module: 'okhttp'
            exclude group: 'net.bytebuddy', module: 'byte-buddy'
            exclude group: 'org.apache.commons', module: 'commons-exec'
            exclude group: 'com.google.guava', module: 'guava'
        }
        ```
    3. Modify the dependencies closure by adding the following constraints: 
        ```dev.galasa.simbank.tests - build.gradle file
        constraints {
	        implementation('commons-codec:commons-codec:1.15'){
	    	    because "Force specific version of commons-codec for security reasons"
	        }
	        implementation('org.apache.httpcomponents:httpcore:4.4.14'){
	    	    because "Force specific version of httpcore for security reasons"
	        }
        } 
        ```
10. Ensure that you save the modifications that you made to the files.
11. In Project Explorer, right-click on `dev.galasa.simbank.parent` and select _Gradle > Refresh Gradle Project_. A _BUILD SUCCESSFUL_ message is displayed in the _Console_ tab when the project is refreshed successfully.<br>
    <b>Note:</b> If you get an error connecting to the Gradle build, go to _Window > Preferences > Gradle_,  check the _Local installation directory_ box, browse to the folder in which you installed Gradle and click _OK_ and _Apply and Close_.
12. Navigate to *Run > Run Configurations*. The *Create, manage and run configurations* dialog box appears. 
13. Depending on version of Eclipse that you are using, either right-click *Gradle Project* or *Gradle Task* and choose *New Configuration*. 
14. Provide a meaningful name and set up your Gradle Task to run a clean build. 
15. In _Working Directory_, click *Workspace*, select `dev.galasa.simbank.parent` and click `OK`.
16. Click _Apply_ then _Run_. A _BUILD SUCCESSFUL_ message is displayed in the _Console_ tab.
17. Expand `dev.galasa.simbank.tests` and then expand `src/main/java`.
18. Explore the `dev.galasa.simbank.tests` package. You'll see the group of tests provided with SimBank:
    ![SimBank tests](./gradle-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, [The SimBank IVT](/docs/running-simbank-tests/simbank-IVT) is the best place to start.


## More about the parent project

The top level folder, which is called `dev.galasa.example.banking` in this example, is the parent project. The parent project is a convenient container in which to hold all of the generated files. In Maven the `pom.xml` in the parent project is used to build all the other generated files. In Gradle, the `settings.gradle` file is used.

Within the example parent project structure there are three generated OSGi bundle sub-projects:

- The payee bundle project, _dev.galasa.example.banking.payee_, which contains two Galasa tests - _TestPayee.java_ and _TestPayeeExtended.java_ - both of which relate to testing the `payee` feature.
- The account test bundle project, _dev.galasa.example.banking.account_, which contains two Galasa tests - _TestAccount.java_ and _TestAccountExtended.java_ - both of which relate to testing the `account` feature.

- An OSGi Bundle Repository <a href="https://felix.apache.org/documentation/subprojects/apache-felix-osgi-bundle-repository.html" target="_blank">(OBR)</a> which holds metadata listing the tests that are available in the Galasa test projects.


## More about the test projects

Within each of the Galasa test projects  - `payee` and `account` - you can see the following files and folders:

- A pom.xml file (for use by the Maven build tool)

- A build.gradle file (for use by the Gradle build tool)

- A bnd.bnd file (for use by the Gradle build tool)

- A `src` tree holding source code

- Two java files in each `feature` test project

- A text resource file in each `feature` test project, which is read and used by the tests at run-time.


## About the tests

The _TestAccount.java_ and the _TestPayee.java_ source files show how a Core Manager can be injected into your test class before any test methods being used. 

The _TestAccountExtended.java_ and the _TestPayeeExtended.java_ source files show:

- How to obtain the `run-id` identifier by which an instance of running the test can be known. This can be useful for naming artifacts, logging or otherwise.

- How to read a text file resource which is embedded within the test OSGi bundle. This can be useful for getting data files for use in the testing of the application.

- How logging can be performed to help debug issues in the test code itself.

- How a file that is created by the test run can be captured together with other test results for later viewing.


## Additional notes on the key elements of pom.xml files

The following sections provide a little more information about some of the elements that are found within the various pom.xml files.

### The parent pom.xml file elements

- The `<project>` and `<modelVersion>` elements are standard prologues to a `pom.xml` file.

The following extract from the generated parent pom.xml shows some of the key elements that are described:

```
<groupId>dev.galasa.example.banking</groupId>
<artifactId>dev.galasa.example.banking</artifactId>
<version>0.0.1-SNAPSHOT</version>	
<packaging>pom</packaging>
```

- The `<groupId>` is used to group related Maven projects in a Maven repository. It is recommended (but not enforced) that all projects in a [test stream](../writing-own-tests/test-streams) share the same `groupId`.
- The `<artifactId>` must be unique for each Maven project under a `groupId`. To prevent confusion, you could make it unique across `groupId`s. The `groupId` and `artifactId` can nominally be anything you choose, but if you were to ever consider publishing the project on Maven Central, you would have to ensure that they were unique across Maven Central. Because of this, and to avoid future name collisions, it is conventional to use (reversed) company domain names, which leads to patterns like `dev.galasa.example.banking`.
- The `<version>` in this project is set to `0.1.0-SNAPSHOT`. 
- `<packaging>` indicates what type of Maven project this is - in this case, a `pom` project.

The following extract from the parent pom.xml shows the module elements that are contained within the generated parent pom.xml:

```
<modules>
	<module>dev.galasa.example.banking.payee</module>
	<module>dev.galasa.example.banking.account</module>
	<module>dev.galasa.example.banking.obr</module>
</modules>
```	

- `<modules>` details what sub-modules (sub-projects) are contained within this parent project. Usually, when the parent project is built, so are the sub-modules.

Other elements that are contained within the generated parent pom.xml are listed in the following section: 

- `<distributionManagement>` controls where Maven deploys the project when built. A variable is used so that the same project can be built and deployed to different test stream repositories.
- The `<properties>` element specifies properties such as file encoding and Java version numbers. 
- `<dependencyManagement>` establishes the versions of dependencies in all of the sub-modules. A BOM project is provided by the Galasa team that includes the versions of all of the released Managers. Set the version of Galasa you wish to run against, for example 0.20.0, and all the Manager versions are imported.
- `<dependencies>` list all the Managers you wish to make available for your tests and custom Manager if present. You could include `<dependencies>` in each of the sub-modules, but it is easier to maintain the list here.
- `<plugins>` identify the Maven plugins to be used during the build process. The `maven-bundle-plugin` builds OSGi bundles (the Manager and test projects), indicated by `<packaging>bundle</packaging>`. The `galasa-maven-plugin` is used in two ways - to build a test catalog for each bundle project and to build the `<packaging>galasa-obr</packaging>` project.

### The test project pom.xml file elements

- The `<parent>` element signifies that all the properties and dependencies found in the parent pom.xml file are to be used for this project - avoiding duplication and allowing changes to ripple through all sub-projects.
- The `<packaging>` element is set to `bundle` so an OSGi bundle is built instead of a simple JAR.


## The test pom.xml file elements

 - The `<packaging>` element is set to `galasa-obr` which causes the Galasa Maven plugin to build this project.
