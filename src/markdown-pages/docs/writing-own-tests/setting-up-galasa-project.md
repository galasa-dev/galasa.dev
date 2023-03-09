---
path: "/docs/writing-own-tests/setting-up-galasa-project"
title: "Setting up a Galasa project"
---

In this section, you will learn how to set up an Eclipse project structure to accommodate your own independent tests. In time, we plan to develop a Maven archetype (a kind of template project) that will reduce this manual burden. But that is for a future release.

## A bit about Maven

<a href="http://maven.apache.org" target="_blank">Maven</a> is an Open Source build automation tool, initially created in 2003 and part of the Apache Software Foundation. You do not explicitly need to install it - usually, it comes with your Eclipse distribution as the _.m2e_ plugin. If, for some reason, it isn't part of your Eclipse distribution, the Galasa Eclipse plugin downloads and installs it silently during its own installation and configuration. In extremely rare situations, this might not happen - just drop a message in our <a href="https://galasa.slack.com" target="_blank"> Galasa Slack</a> workspace if you sense this is the case, and we'll help you out. (<a href="https://join.slack.com/t/galasa/shared_invite/zt-ele2ic8x-VepEO1o13t4Jtb3ZuM4RUA" target="_blank">Register to join</a> first if you're not yet a member). In any case, if you have run any of the SimBank tests, you are already past this hurdle.

If you have already installed Maven as part of some other software project, no action is needed.

Maven is _opinionated_, which means that you need to comply with its expectations about how a project and its directories should be organised. When you create a Maven project in Eclipse, you should use the generated structure, or if you are importing a project, the provided structure.

The most visible practical evidence that a project is a Maven project is its pervasive use of `pom.xml` (Project Object Model) files. These XML files contain the magic that allows Maven to manage your project dependencies and build orchestration. You will see that a large part of setting up your Galasa project is to configure these properly.

## Before you start

First, you need to ensure that you have installed the Galasa Eclipse plug-in and can run one or more of the tests in an example project. Don't rush this - it is recommended that you familiarise yourself with all of the Galasa examples before creating your own project. But as a minimum, if you can run <a href="/docs/running-simbank-tests/simbank-IVT" target="_blank">The SimBank IVT</a> test, you are all set.

## A little plan

It is convenient to use Eclipse's sub-project feature, so that a full (parent) Galasa project includes several sub-projects, which can also be known as _modules_, some of which are mandatory and some optional.

We are going to build a hierarchy of projects, where the parent project contains:

- A Managers sub-project, allowing you to extend the provided range of Managers. In practice, if you have no intention of writing a Manager, you can omit this - it is included in the sample project for completeness.
- An OBR (OSGi Bundle Repository) sub-project, which is mandatory. Galasa uses the OBR to locate your test project(s) and reason about their interdependencies.
- One or more test sub-projects, that as the name implies, contain the tests themselves. The sample project will contain just one test project.

The parent project establishes all the dependencies for the sub-projects/modules. It builds all the modules in the order of the dependencies - it builds the Manager module before the test projects that use it.

For simplicity, it is assumed that you will only have one version of a test in production at any one time. However, by establishing different versions of your tests, you can have test streams with different versions of the same test project. For the purposes of the forthcoming example, the version of all projects is set to `0.1.0-SNAPSHOT`. The `SNAPSHOT` element forces Galasa to run with the absolute latest copy of your built test project.

## Setting up the filesystem

This setup is designed as an example of how to create a project structure that might ultimately be deployed to a Maven repository so that your Galasa automation system can find everything it needs to run.

In a temporary directory - and you can do this with whatever tools you choose, no need to use Eclipse - create the following file structure:

```
────com.example.tests.parent
    │   pom.xml
    ├───com.example.tests.atests
    │   │   pom.xml
    │   └───src
    │       └───main
    │           ├───java
    │           │   │   MostBasicTest.java
    │           └───resources
    ├───com.example.tests.manager
    │   │   pom.xml
    │   └───src
    │       └───main
    │           ├───java
    │           └───resources
    └───com.example.tests.obr
        │   pom.xml
```

The names of the root folders are not part of Maven's opinionated stance (they were just chosen for this exercise - but there is a conventional pattern to follow), however, the names of the lower level folders (`src`, `main`, `java` and so on) most certainly are.

As well as a hierarchy of directories, there are five files to be placed at specific locations:

1. `pom.xml` in `com.example.tests.parent`
1. `MostBasicTest.java` in `com.example.tests.parent/com.example.tests.atests/src/main/java`
1. `pom.xml` in `com.example.tests.parent/com.example.tests.atests`
1. `pom.xml` in `com.example.tests.parent/com.example.tests.manager`
1. `pom.xml` in `com.example.tests.parent/com.example.tests.obr`

Of course, the four `pom.xml` files all have different contents!

Set up the files in their designated directories as follows:

<details>
<summary><code>com.example.tests.parent/pom.xml</code></summary>

Read the commentary for an explanation of the key elements.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.example.tests</groupId>
	<artifactId>com.example.tests.parent</artifactId>
	<version>0.1.0-SNAPSHOT</version>
	<packaging>pom</packaging>

    <modules>
    	<module>com.example.tests.manager</module>
    	<module>com.example.tests.atests</module>
    	<module>com.example.tests.obr</module>
    </modules>

    <distributionManagement>
    	<repository>
    		<id>tests.repo</id>
    		<url>${galasa.tests.repo}</url>
    	</repository>
    	<snapshotRepository>
    		<id>tests.repo</id>
    		<url>${galasa.tests.repo}</url>
    	</snapshotRepository>
    </distributionManagement>

    <properties>
    	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    	<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    	<java.version>11</java.version>
    	<maven.compiler.source>11</maven.compiler.source>
    	<maven.compiler.target>11</maven.compiler.target>
    	<maven.build.timestamp.format>yyyyMMddHHmm</maven.build.timestamp.format>
    	<unpackBundle>true</unpackBundle>
    </properties>

    <dependencyManagement>
    	<dependencies>
    		<dependency>
    			<groupId>dev.galasa</groupId>
    			<artifactId>galasa-bom</artifactId>
    			<version>0.25.0</version>
    			<type>pom</type>
    			<scope>import</scope>
    		</dependency>
    	</dependencies>
    </dependencyManagement>

    <dependencies>
    	<dependency>
    		<groupId>dev.galasa</groupId>
    		<artifactId>dev.galasa</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>dev.galasa</groupId>
    		<artifactId>dev.galasa.core.manager</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>dev.galasa</groupId>
    		<artifactId>dev.galasa.zos.manager</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>dev.galasa</groupId>
    		<artifactId>dev.galasa.zos3270.manager</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>dev.galasa</groupId>
    		<artifactId>dev.galasa.http.manager</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>dev.galasa</groupId>
    		<artifactId>dev.galasa.artifact.manager</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>commons-logging</groupId>
    		<artifactId>commons-logging</artifactId>
    		<scope>provided</scope>
    	</dependency>
    	<dependency>
    		<groupId>org.assertj</groupId>
    		<artifactId>assertj-core</artifactId>
    		<scope>provided</scope>
    	</dependency>
    </dependencies>

    <build>
    	<plugins>
    		<plugin>
    			<groupId>org.apache.felix</groupId>
    			<artifactId>maven-bundle-plugin</artifactId>
    			<version>4.1.0</version>
    			<extensions>true</extensions>
    		</plugin>
    		<plugin>
    			<groupId>dev.galasa</groupId>
    			<artifactId>galasa-maven-plugin</artifactId>
    			<extensions>true</extensions>
    			<version>0.15.0</version>
    			<executions>
    				<execution>
    					<id>build-testcatalog</id>
    					<phase>package</phase>
    					<goals>
    						<goal>bundletestcat</goal>
    					</goals>
    				</execution>
    			</executions>
    		</plugin>
    	</plugins>
    </build>

</project>
```

Some comments:

- The `<project>` and `<modelVersion>` elements are standard prologues to a `pom.xml` file.
- The `<groupId>` is used to group related Maven projects in a Maven repository. It is recommended (but not enforced) that all projects in a test stream share the same `groupId`.
- The `<artifactId>` must be unique for each Maven project under a `groupId`. To prevent confusion, you should make it unique across `groupId`s. The `groupId` and `artifactId` can nominally be anything you choose, but if you were to ever consider publishing the project on Maven Central, you would have to ensure that they were unique across Maven Central. Because of this, and to avoid future name collisions, it is conventional to use (reversed) company domain names, which leads to patterns like `com.example.tests.parent`.
- The `<version>` in this project is set to `0.1.0-SNAPSHOT` so that Galasa knows it needs to look for the latest copy every time it runs a test in automation. For local test running, it will check for the latest copy the first time a test is run in a day. It is unlikely that you will need to update the version unless you are specifically interested in maintaining multiple versions of the same test project.
- `<packaging>` indicates what type of Maven project this is - in this case, a `pom` project.
- `<modules>` details what sub-modules (sub-projects) are contained within this parent project. Usually, when the parent project is built, so are the sub-modules.
- `<distributionManagement>` controls where Maven deploys the project when built. A variable is used so that the same project can be built and deployed to different test stream repositories.
- The `<properties>` element specifies properties such as file encoding and Java version numbers. Its `<unpackBundle>` sub-element is required if you are including custom Managers within the project structure.
- `<dependencyManagement>` establishes the versions of dependencies in all of the sub-modules. A BOM project is provided by the Galasa team that includes the versions of all of the released Managers. Set the version of Galasa you wish to run against - in this case 0.25.0 - and all the Manager versions are imported.
- `<dependencies>` list all the Managers you wish to make available for your tests and custom Manager if present. You could include `<dependencies>` in each of the sub-modules, but it is easier to maintain the list here.
- `<plugins>` identify the Maven plugins to be used during the build process. The `maven-bundle-plugin` builds OSGi bundles (the Manager and test projects), indicated by `<packaging>bundle</packaging>`. The `galasa-maven-plugin` is used in two ways - to build a test catalog for each bundle project and to build the `<packaging>galasa-obr</packaging>` project.

</details>
<details>
<summary>
<code>com.example.tests.parent/</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;com.example.tests.atests/src/main/java/MostBasicTest.java</code>
</summary>

A minimal java test.

```java
import static org.assertj.core.api.Assertions.assertThat;
import dev.galasa.Test;

@Test
public class MostBasicTest {
	@Test
	public void helloWorldTest() {
		assertThat("Deep integration testing").contains("Deep");
	}
}
```

If you have followed through on any of the provided SimBank tests, you will have no problem understanding what's going on in this example!

</details>

<details>
<summary>
<code>com.example.tests.parent/com.example.tests.atests/pom.xml</code>
</summary>

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example.tests</groupId>
        <artifactId>com.example.tests.parent</artifactId>
        <version>0.1.0-SNAPSHOT</version>
    </parent>

    <artifactId>com.example.tests.atests</artifactId>
    <packaging>bundle</packaging>

    <dependencies>
        <dependency>
            <groupId>com.example.tests</groupId>
            <artifactId>com.example.tests.manager</artifactId>
            <version>0.1.0-SNAPSHOT</version>
        <scope>provided</scope>
        </dependency>
    </dependencies>
</project>
```

- Pointing to the `<parent>` means that its dependencies and properties are reused in this project.
- `<packaging>` is an OSGi bundle.
- As a dependency cannot be included in the parent for a custom Manager, if present, it needs to be included here. Maven will ensure that the Manager is built before the test projects.

</details>

<details>
<summary>
<code>com.example.tests.parent/com.example.tests.manager/pom.xml</code>
</summary>

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>com.example.tests</groupId>
		<artifactId>com.example.tests.parent</artifactId>
		<version>0.1.0-SNAPSHOT</version>
	</parent>
	<artifactId>com.example.tests.manager</artifactId>
	<packaging>bundle</packaging>
	<dependencies>
		<dependency>
			<groupId>dev.galasa</groupId>
			<artifactId>dev.galasa</artifactId>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>dev.galasa</groupId>
			<artifactId>dev.galasa.framework</artifactId>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.osgi</groupId>
			<artifactId>org.osgi.service.component.annotations</artifactId>
		</dependency>
	</dependencies>
</project>
```

- The `<parent>` element signifies that all the properties and dependencies found in the parent `pom.xml` file are to be used for this project - avoiding duplication and allowing changes to ripple through all sub-projects.
- `<groupId>` and `<version>` have not been provided - they will ripple down from the parent.
- `<packaging>` is `bundle` so an OSGi bundle is built instead of a simple JAR.
- Extra `<dependencies>` are included that are not relevant to the test projects. These are the `framework` and OSGi annotations, which are needed if/when developing Managers.

</details>

<details>
<summary>
<code>com.example.tests.parent/com.example.tests.obr/pom.xml</code>
</summary>

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example.tests</groupId>
        <artifactId>com.example.tests.parent</artifactId>
        <version>0.1.0-SNAPSHOT</version>
    </parent>
    <artifactId>com.example.tests.obr</artifactId>
    <packaging>galasa-obr</packaging>
    <dependencies>
        <dependency>
            <groupId>com.example.tests</groupId>
            <artifactId>com.example.tests.manager</artifactId>
            <version>0.1.0-SNAPSHOT</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>com.example.tests</groupId>
            <artifactId>com.example.tests.atests</artifactId>
            <version>0.1.0-SNAPSHOT</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
</project>
```

- `<packaging>` is set to `galasa-obr` which causes the Galasa Maven plugin to build this project.
- Any custom Manager and test projects need to be included so that an OBR and test catalog is built after examination of the contents of these projects.

</details>

## Importing the prepared directory into Eclipse

Launch Eclipse and choose _File > Import..._

In the _Select_ dialog, expand _Maven_, choose _Existing Maven Projects_ and click _Next_.

Navigate to your root project directory - _com.example.tests.parent_ in this case - and follow the remaining prompts to complete the import. If you see a warning or error dialog, opt to resolve the error later.

When viewed in the _Package Explorer_ your set of projects should resemble (your project won't yet have those _target_ folders - they indicate that the project has been built at least once):

![Project and sub-projects](./project-and-subproject.png)

To build the project with Java version 11, choose _Run > Run Configurations_ from the main menu. Create a Maven build from the _Main_ tab of the _Create, manage, and run configurations_ dialog and wait for the build process to complete.

From _Run > Run Configurations_, click _Galasa_ (not Galasa SimBank) and configure a new run configuration (call it MostBasicTest). Specify `com.example.tests.atests` for the project, and `MostBasicTest` for the test class. Press _Apply_ and then _Run_. The new run configuration executes and a familiar set of Galasa messages appears in the Eclipse console as the test runs to successful completion.
