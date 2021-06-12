---
path: "/docs/getting-started/installing"
title: "Installing the Galasa plug-in"
---

You can install Galasa either from a downloadable zip file (zipped distribution) or directly from an update site. 

The Galasa zip file is available from the <a href="https://ibm.github.io/mainframe-downloads/downloads.html" target="_blank">IBM Mainframe Downloads</a> website and can be downloaded and extracted to a directory of your choice. The zip file contains three directories (Eclipse, Maven and Javadoc), an `isolated.tar` file and a `docs.jar` file. The Eclipse directory contains the Galasa plug-in, and the Maven directory contains dependencies that are required for building Galasa tests. The `.tar` file is an optional Docker image that hosts both directories. You might want to use the Docker image if you want to host Galasa on an internal server that can be accessed by other users. If you want to host Galasa on your local machine only, you do not need to use the Docker image. The `docs.jar` file enables you to run the Galasa website locally on your machine. Instructions on how to do this are available in the `readme.txt` that is provided in the Galasa zip file. 

The zipped distribution allows users who do not have access to Maven Central, Eclipse Marketplace and Docker Hub from their company network to use Galasa. 

Users without restricted internet access who want to use open-source Galasa, can install Galasa directly from the `https://p2.galasa.dev/` update site.

## Getting started

Galasa installations can vary in complexity depending on the context in which it is used. Invariably though, all first-time installations begin with the Eclipse IDE (you can download it from <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">the Eclipse website</a>) and the download and integration of the Galasa plug-in. The Galasa plug-in is accompanied by Galasa SimBank - a demonstration application - which sits on top of a very small middleware layer called SimPlatform (you may see its name in some console messages, but you will otherwise not need to interact with SimPlatform).

<!-- Later, you are likely to want to enhance your test capabilities and exploit Galasa's ability to integrate with automated CI/CD pipelines and a Kubernetes or equivalent container orchestration environment. Other similar but more complex scenarios are also possible, and may be required if your situation demands it. -->

This section describes the most common initial installation scenario - using Eclipse to install the Galasa plug-in - together with SimPlatform/SimBank - on your local machine and preparing it to run an initial set of provided tests against a simulated mainframe application.

## Prerequisites

Depending on how you use Galasa, there are several software prerequisites, some or all of which you may have already installed.

### Java

Galasa tests and Managers are written in Java - you will need to install a Java version 8 JDK or later to use it.

### Eclipse

If you do not already have an Eclipse installation, you can <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">download</a> a version of Eclipse appropriate for your machine. Choose a package that supports your required level of Java development - _Eclipse IDE for Java Developers_ or _Eclipse IDE for Java EE Developers_. If you are unsure, then the _Eclipse IDE for Java Developers_ should be fine, and you can always add any missing plug-ins if and when you discover you need them.

If you already have a version of Eclipse installed, it should be at the version codenamed Photon (released in June 2018) or later.  

### Gradle (Required for the Galasa zipped distribution)

If you are using the Galasa zipped distribution, you will need to install Gradle version 6.8.2 which is used to build the Galasa software. 

### Docker (Required if using the Docker image in the Galasa zipped distribution)

If you are using the Galasa zipped distribution and want to deploy the Docker image that is provided in the zip file, you will need to install Docker version 20.10.2. 

### (Optional) A 3270 terminal emulator

Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.

## Using the zipped distribution

If you are not using the Docker image, simply extract the contents of the zip file into a directory of your choice, and reference that directory when required during the plug-in installation process or when running the SimBank tests that are provided with Galasa.

If you are using the Docker image, complete the following steps to load and run the Docker image: 

Note: The example uses port `8080` but you can use a different port.

1. Within the directory that contains the Docker image (`isolated.tar`), run the following command:
```
sudo docker load -i isolated.tar
``` 
A confirmation message is received which is similar to the following message:
`Loaded image: docker.galasa.dev/galasa-isolated-mvp-amd64:0.16.0`
2. Run the container by using the following command:
```
sudo docker run -d -p 8080:80 <loaded image value>
```
where *loaded image value* is the value of the loaded image that is returned in step 1. In this example, the value is `docker.galasa.dev/galasa-isolated-mvp-amd64:0.16.0`.<br> After running the command, the `container ID` value is returned. 
3. Check that the logs for the container do not contain any errors by running the following command:
```
$ docker logs <container ID>
```
where *container ID* is the identifier that is returned after running the command in step 2. 

You are now ready to install the Galasa plug-in. 

## Installing the Galasa plug-in

1. Launch Eclipse. If present, close any initial welcome screen.
1. Choose _Help > Install New Software_ from the main menu.
1. Choose from the following options: 
    1. If you are using the zipped distribution, complete the following steps:
        1. Click *Add* and then Select *Local*
        1. Navigate to the directory into which the zip was extracted, select the Eclipse directory, and click *OK* <br>
        The `Location` field is populated with the filepath information, for example, `file:///home/username/galasa-isolated-mvp/eclipse/`.<br>
        Note: If you are using the Docker image, use the URL to the running container, for example, `http://localhost:8080/eclipse`
        1.  Click _Enter_       
    1. If you are not using the zipped distribution, paste `https://p2.galasa.dev/` into the _Work with_ field and click _Enter_
1. Tick the _Galasa_ box in the main panel, ensuring that _Galasa_ and all of its child elements are ticked.
1. Follow the prompts to download and install the Galasa plug-in. You will be asked to accept the terms of the license agreement and restart Eclipse to complete the installation. You may also be asked to acknowledge and agree that you are installing unsigned content.
1. After Eclipse has restarted, you can verify that the plug-in is now available by observing the presence of a new _Galasa_ option on the main menu between _Run_ and _Window_. If you choose _Run > Run Configurations_ from the main menu, you will also observe two new entries: _Galasa_ and _Galasa SimBank_ as available options in the left-hand panel of the pop-up window.

## Configuring Eclipse for Galasa

<!-- 1. If it is running, close Eclipse. -->
<!-- 1. Check to see if you have a `.galasa` folder in your user home directory - create it if there isn't one. On Windows, the user home directory resembles: `C:\Users\<username>`, on MacOS or Linux, entering `cd ~` in a terminal takes you to your user home directory, whatever it has been configured to be.
1. Create two empty files in your .galasa folder:
```
bootstrap.properties
dss.properties
``` -->

1. Choose _Galasa > Setup Galasa Workspace_ from the main Eclipse menu - this command creates some necessary configuration files. Your Eclipse console confirms its progress with some messages:

   ```
   Setting up the Galasa workspace
   Creating the ~/.galasa files
   Created the ~/.galasa directory
   Created an empty Bootstrap Properties file ~/.galasa/bootstrap.properties
   Created an empty Overrides Properties file ~/.galasa/overrides.properties
   Created an empty Credentials Properties file ~/.galasa/credentials.properties
   Created an empty CPS Properties file ~/.galasa/cps.properties
   Created an empty DSS Properties file ~/.galasa/dss.properties
   The ~/.m2 directory already exists
   Created the ~/.m2/.settings.xml example file
   Setup complete
   ```
Note: You can ignore the message `Not creating a ~/.m2/settings.xml as the Galasa remote maven uri preference is the default location of ht<span>tps://</span>repo.maven.apache.org/maven2/` if it appears in the logs.
1. Locate your user home directory and confirm it contains a `.galasa` folder. On Windows, the user home directory resembles: `C:\Users\<username>`, on MacOS it will be `/Users/<username>` and on Linux `/home/<username>`.  Note that any file or folder beginning with a `.` is a hidden folder, so you might need to change the settings on your operating system to show hidden files.
1. Edit a file called `overrides.properties` in your `.galasa` folder so that it contains:

   ```properties
   zos.dse.tag.SIMBANK.imageid=SIMBANK
   zos.dse.tag.SIMBANK.clusterid=SIMBANK

   simbank.dse.instance.name=SIMBANK
   simbank.instance.SIMBANK.zos.image=SIMBANK

   zos.image.SIMBANK.ipv4.hostname=127.0.0.1
   zos.image.SIMBANK.telnet.port=2023
   zos.image.SIMBANK.webnet.port=2080
   zos.image.SIMBANK.telnet.tls=false
   zos.image.SIMBANK.credentials=SIMBANK

   zosmf.image.SIMBANK.servers=SIMBANK
   zosmf.server.SIMBANK.image=SIMBANK
   zosmf.server.SIMBANK.port=2040
   zosmf.server.SIMBANK.https=false
   ```

   Note: When using SimBank, the `overrides.properties` file is partially populated on creation and requires editing. The reason for this is to highlight how the test connects to the SimBank instance. Otherwise, the `overrides.properties` file is created as an empty file.

1. Edit a file called `credentials.properties` in your `.galasa` folder so that it contains:

   ```properties
   secure.credentials.SIMBANK.username=IBMUSER
   secure.credentials.SIMBANK.password=SYS1
   ```

   Note: If you have previously installed Galasa, this file is already populated.
      <!-- 1. Create an `.m2` folder in your user home directory (the same place as your `.galasa` folder) and inside, place a `settings.xml` file with the contents:

```
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <pluginGroups>
        <pluginGroup>dev.galasa</pluginGroup>
    </pluginGroups>
    <profiles>
        <profile>
            <id>galasa</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>galasa.repo</id>
                    <url>https://nexus.galasa.dev/repository/master</url>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>galasa.repo</id>
                    <url>https://nexus.galasa.dev/repository/master</url>
                </pluginRepository>
            </pluginRepositories>
        </profile>
    </profiles>
</settings>
```

1. Launch Eclipse.
1. Choose _Window > Preferences_ and then _Maven > User Settings_.
1. Complete the _Global Setting_ field by pressing _Browse_ and navigating to the `settings.xml` file you just set up. Press _Apply_ and _Close_ when finished.
1. Choose _Window > Preferences > Galasa_ 
1. Choose from the following options: 
    1. If you are using the zipped distribution, change the _Remote Maven URI_ to the local maven directory, for example, ```file:///home/username/galasa-isolated-mvp/maven```
    1. If you are not using the zipped distribution of Galasa, complete the _Remote Maven URI_ field as `https://nexus.galasa.dev/repository/master`
1. Click _Apply and Close_. -->

Your local Eclipse Galasa installation is now ready for some work.
