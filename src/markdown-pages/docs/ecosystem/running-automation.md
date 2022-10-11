---
path: "/docs/ecosystem/automating"
title: "Setting up a Galasa project by using Eclipse"
---

Use the following information to help you to understand how to package a test so that it runs in automation. 

To package a test to run in automation inside the Galasa Ecosystem, you need to complete the following high-level tasks:

1. Create and configure a parent project
2. Build Maven bundles from the parent project
3. Add a test sub-project and tests to the parent project
4. Add an OBR sub-project to the parent project


## Structuring a parent project

You can structure your parent project in a number of ways, depending on how you want to manage your test corpus. The structure of the project project is shaped by the way in which you use your OBR. 

An OBR is a collection of all the packages that make up a test selection. Galasa uses the OBR to locate your test project(s) and reason about their interdependencies. You can have an OBR per set of tests, or you can have an OBR for the whole test corpus, or you can set up an OBR per test or per test stream.

In our example, the OBR is set up as a module within the test parent. The example shows how to create a parent project, add a test sub-project and OBR sub-project as modules of that parent, and how to edit the associated _pom.xml_ files so that the parent project and sub-projects (modules) are packaged correctly. 

## Creating a parent project

The parent project establishes all the dependencies for the sub-projects/modules. It builds all the modules in the order of the dependencies - it builds the Manager module before the test projects that use it.

The structure of the parent project in this example will look similar to the following example structure:  

``` 
────com.example.company.mytests.parent 
    │   pom.xml 
    ├───com.example.company.mytests.group1 
    │   │   pom.xml 
    │   └───src 
    │       └───main 
    │           ├───java 
    │           │   │  sampletest.java 
    │           └───resources 
    └─── com.example.company.mytests.obr 
        │   pom.xml 
``` 

Within the parent project is a test bundle, `com.example.company.mytests.group1` that contains a test class, `sampletest.java`. The parent project also contains an OBR module which creates a OBR that describes the test bundle within the parent project. The parent _pom.xml_ stores the build mechanisms for the parent project and any child projects (modules) will inherit these build mechanisms. 



The following example is based on the naming convention ```com.example.company``` and uses the _SimBankIVT_ test code as the example test class. 
 

Complete the following steps to create a parent project:

1. Launch Eclipse and choose _File > New > Project_. A _New Project_ dialog appears.
1. Expand the _Maven_ folder, select _Maven Project_ and click _Next_. A _New Maven Project_ dialog appears.
1. Check the _Create a simple project (skip archetype selection)_ box and click _Next_.
1. In the ```Artifact``` section in the _Group Id_ field, enter _com.example.company_.
1. In the _Artifact Id_ field enter _com.example.company.mytests.parent_.
1. In the _Version_ field, enter _0.0.1-SNAPSHOT_ which forces Galasa to run with the latest copy of your built test project.
1. From the _Packaging_ dropdown list, select _pom_. Setting the value to _pom_ tells Maven that this is a parent project. 
1. Click _Finish_.

You have successfully created a parent project!

### Editing the pom.xml of the parent project

You now need to edit the pom.xml of the parent project and add in dependencies, any Managers that your test requires to run, and build information. Use the following example to help you to understand how to edit the pom.xml and read the commentary for an explanation of the key elements.

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.example.company</groupId>
  <artifactId>com.example.company.mytests.parent</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>pom</packaging>

  <name>com.example.company.mytests.parent</name>

  <dependencyManagement>
    <dependencies>
        <dependency>
	      <groupId>dev.galasa</groupId>
		  <artifactId>galasa-bom</artifactId>
		  <version>0.24.0</version>
		  <type>pom</type>
		  <scope>import</scope>
	    </dependency>
      </dependencies>
	</dependencyManagement>
	<dependencies>
	  <dependency>
		<groupId>dev.galasa</groupId>
		<artifactId>dev.galasa.framework</artifactId>
	  </dependency>
	  <dependency>
		<groupId>dev.galasa</groupId>
		<artifactId>dev.galasa</artifactId>
	  </dependency>
	  <dependency>
		<groupId>dev.galasa</groupId>
		<artifactId>dev.galasa.core.manager</artifactId>
	  </dependency>
      <dependency>
		<groupId>dev.galasa</groupId>
		<artifactId>dev.galasa.http.manager</artifactId>
	  </dependency>
	  <dependency>
		<groupId>dev.galasa</groupId>
		<artifactId>dev.galasa.artifact.manager</artifactId>
	  </dependency>
	  <dependency>
		<groupId>dev.galasa</groupId>
		<artifactId>dev.galasa.zos.manager</artifactId>
	  </dependency>
	  <dependency>
	    <groupId>dev.galasa</groupId>
		<artifactId>dev.galasa.zos3270.manager</artifactId>
		</dependency>
	  <dependency>
		<groupId>org.assertj</groupId>
		<artifactId>assertj-core</artifactId>
	  </dependency>
	</dependencies>
	<build>
		<pluginManagement>
		  <plugins>
			<plugin>
			  <groupId>org.apache.felix</groupId>
			  <artifactId>maven-bundle-plugin</artifactId>
			  <version>4.1.0</version>
			</plugin>
			<plugin>
			  <groupId>org.apache.maven.plugins</groupId>
			  <artifactId>maven-plugin-plugin</artifactId>
			  <version>3.6.0</version>
			</plugin>
			<plugin>
			  <groupId>dev.galasa</groupId>
			  <artifactId>galasa-maven-plugin</artifactId>
			  <version>0.20.0</version>
		    </plugin>
		  </plugins>
		</pluginManagement>
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

- In the _dependencies_ section, note that no Manager version numbers are specified. All Manager version numbers are taken from the _galasa-bom_ (bill of materials) that is specified. In this case, the _galasa-bom_ version is _0.24.0_.

- _plugins_ identify the Maven plugins to be used during the build process. The _maven-bundle-plugin_ builds OSGi bundles (the Manager and test projects), indicated by the `<packaging>` value of _bundle_. The _galasa-maven-plugin_ is used in two ways - to build a test catalog for each bundle project and to build the `<packaging>galasa-obr</packaging>` project. 
</details>

## Building Maven bundles from the parent project

Complete the following steps to create Maven bundles to deploy to your repository:
1. Save the changes that you made to the _pom.xml_ of the parent project.
1. Right-click _com.example.company.mytests.parent_ and choose _Run As > Maven Install_.

A _BUILD SUCCESS_ message is displayed in the _Console_ tab. 

At this point, the parent project is empty so you need to add sub-projects as Maven modules so that the parent project contains:

- A test sub-project, containing one or more tests. In this example, the sample project will contain just one test project.
- An OBR (OSGi Bundle Repository) sub-project, which Galasa uses to locate the test project and any interdependencies.


## Adding a test sub-project to the parent project

Add a test sub-project by adding a Maven module to the parent project:

1. Right-click the parent project _com.example.company.mytests.parent_ and choose _New > Project > Maven Module_.
1. Click _Next_.
1. Check the _Create a simple project (skip archetype selection)_ box and add the module name. In this example the module name is _com.example.company.mytests.group1_.
1. Click _Finish_.

You have successfully added a test sub-project to your parent project!

### Editing the pom.xml of the test sub-project


1. Add packaging information into the _pom.xml_ after the _artifactId_ information:
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.example.company</groupId>
    <artifactId>com.example.company.mytests.parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>com.example.company.mytests.group1</artifactId>
  <packaging>bundle</packaging>
</project>
```
1. Save your changes.

With most of the dependencies and build definitions placed in the parent pom, the individual poms for the test bundle and OBR are relatively simple. In this example, the pom of the test module simply defines the packaging type as _bundle_ and declares that it is a child module of the parent project. 

You now have a project that is ready to have a test added to it. In this example, we are adding the ```SimBankIVT``` test to the project, but you can use your own test. 

### Adding a test to the test sub-project

You can add a test to a test sub-project by adding a new package. 
1. Right-click on the _src/main/java_ folder under ```com.example.company.mytests.group1```.
1. Choose _New > Package_ and click _Finish_. An empty package is created into which you can add a test class. 
1. Right-click the empty package that you just created and choose _New > Class_. Enter a name for the test. In this example the test name is ```SimBankIVT```. 
1. Click _Finish_.
1. Copy the test into your test class and save the changes.

## Adding an OBR sub-project to the parent project 

Add an OBR sub-project by adding a Maven module to the parent project:

1. Right-click the parent project _com.example.company.mytests.parent_ and choose _New > Project > Maven Module_.
1. Click _Next_.
1. Check the _Create a simple project (skip archetype selection)_ box and add the module name. In this example the module name is _com.example.company.mytests.obr_.
1. Click _Next_.
1. Click _Finish_.


### Editing the pom.xml of the OBR sub-project

1. Edit the _pom.xml_ of the OBR module so that the _packaging_ type is set to _galasa-obr_.
1. Add a dependency on the test case so that the test case is built inside the OBR by creating a new section in the _pom.xml_ that is similar to the following example: 
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.example.company</groupId>
    <artifactId>com.example.company.mytests.parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <groupId>com.example.company.mytests.obr</groupId>
  <artifactId>com.example.company.mytests.obr</artifactId>
  <packaging>galasa-obr</packaging>
  
  <dependencies>
    <dependency>
      <groupId>com.example.company</groupId>
      <artifactId>com.example.company.mytests.group1</artifactId>
      <scope>compile</scope>
      <version>0.0.1-SNAPSHOT</version>
    </dependency>
  </dependencies>
</project
```
The important things to note are that the packaging type is set to _galasa-obr_, and that the test bundle is expressed as a dependency. This should also be true of any other test dependencies, otherwise at runtime there will be unsatisfied requirement errors.
1. Check that the ```groupId``` and ```artifactId``` values are correct for your configuration and that ```scope``` is set to ```compile```. Save your changes.
1. Right-click the parent project and choose _Run As > Maven Install_.

A _BUILD SUCCESS_ message is displayed in the _Console_ tab. 

The test jar and OBR are now built and installed in your local Maven repository (`~/.m2/repository`). 

### Next steps

The next step is to deploy the artifacts that you have created to a remote Maven repository. See the [Deploying a test to a Maven repository](/docs/ecosystem/deploying-tests) documentation for more information on how to do this. 


