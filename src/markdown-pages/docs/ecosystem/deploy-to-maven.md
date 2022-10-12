---
path: "/docs/ecosystem/deploy-to-maven"
title: "Deploying a test to a Maven repository"
---

To run a test in automation, the test engines need access to the test material. This is achieved by offering the test material as Maven artifacts, stored in a Maven repository. If you are using the Docker Operator to bring up an ecosystem, a Nexus repository is also instantiated, which can be used to store the artifacts. However, you can use any Maven repositories to which you have access.

###  Define to Maven where the artifacts are to be deployed.
This example uses a local Nexus repository that can be brought up locally on a workstation.
Complete the following steps to define where you want to deploy the artifacts:
1. Create or edit the ```settings.xml``` that is used by Maven. The default path of ```settings.xml``` is ```~/.m2```.
    1. Update the details of the Nexus server for _id_, _username_, and _password_.
    1. Update the Nexus repository URL in the release repo and snapshot repo under the _properties_, _repositories_ and _pluginRepositories_ sections. The release repo and snapshot repo variables are used in parent pom.xml for defining distribution management.
Use the following example to help you to understand the changes that need to be made:
```
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <pluginGroups>
        <pluginGroup>com.example.company</pluginGroup>
    </pluginGroups>
    <servers>
        <server>
            <id>example</id>
            <username>admin</username>
            <password>examplecompanyadmin</password>
        </server>
    </servers>
    <profiles>
        <profile>
            <id>example</id>
            <properties>
                <example.release.repo>http://localhost:8081/repository/maven</example.release.repo>
                <example.snapshot.repo>http://localhost:8081/repository/maven</example.snapshot.repo>
                <galasa.test.stream>example</galasa.test.stream>
                <galasa.bootstrap>http://localhost:8080/bootstrap</galasa.bootstrap>
            </properties>
            <repositories>
                <repository>
                    <id>example.release.repo</id>
                    <url>http://localhost:8081/repository/maven</url>
                    <releases>
                       <enabled>true</enabled>
                       <updatePolicy>always</updatePolicy>
                       <checksumPolicy>warn</checksumPolicy>
                    </releases>
                    <snapshots>
                       <enabled>false</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>example.snapshot.repo</id>
                    <url>http://localhost:8081/repository/maven</url>
                    <releases>
                       <enabled>false</enabled>
                    </releases>
                    <snapshots>
                       <enabled>true</enabled>
                       <updatePolicy>always</updatePolicy>
                       <checksumPolicy>warn</checksumPolicy>
                    </snapshots>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>example.release.repo</id>
                    <url>http://localhost:8081/repository/maven</url>
                    <releases>
                       <enabled>true</enabled>
                       <updatePolicy>always</updatePolicy>
                       <checksumPolicy>warn</checksumPolicy>
                    </releases>
                    <snapshots>
                       <enabled>false</enabled>
                    </snapshots>
                </pluginRepository>
                <pluginRepository>
                    <id>example.snapshot.repo</id>
                    <url>http://localhost:8081/repository/maven</url>
                    <releases>
                       <enabled>false</enabled>
                       <updatePolicy>always</updatePolicy>
                       <checksumPolicy>warn</checksumPolicy>
                    </releases>
                    <snapshots>
                       <updatePolicy>always</updatePolicy>
                       <checksumPolicy>warn</checksumPolicy>
                       <enabled>true</enabled>
                    </snapshots>
                </pluginRepository>
            </pluginRepositories>
        </profile>
    </profiles>
</settings>
```
In the example, a snapshot and release repository are configured. You might choose to configure these repositories if you have a development and a release stream of your test material. The following definitions are included in the file:
- A server called _example_. Credentials can be passed to the server for ease, but more secure solutions are offered by Maven.
- A profile called _example_. The profile is used to define the snapshot and release repositories as well as properties that are used in a Maven deploy setup, allowing repository locations to be changed easily in a single place.
The information is used to deploy artifacts to a Maven repository.
1. Add the deploy location to your project by adding the definition to the parent project in the pom.xml:
```
<distributionManagement>
    <repository>
        <id>example</id>
        <url>${example.release.repo}</url>
    </repository>
    <snapshotRepository>
        <id>example</id>
        <url>${example.snapshot.repo}</url>
    </snapshotRepository>
</distributionManagement>
```
The <id>example</id> refers to the server, and the <url>${example.*.repo}</url> refers to the properties that are setup in the profile.
1. Save the changes that you made to the pom.xml of the parent project.
1. Right-click _com.example.company.mytests.parent_ and choose _Run As > Maven Install_.
A _BUILD SUCCESS_ message is displayed in the _Console_ tab.
All the artifacts are now available on the the local repository (http://127.0.0.1:8081/#browse/browse:maven).
### Next steps
Set up a new test stream. For more information view the documentation.  