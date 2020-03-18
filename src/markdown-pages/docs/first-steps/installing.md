---
path: "/docs/getting-started/installing"
title: "Installing the Galasa plug-in"
---

Galasa installations can vary in complexity depending on the context in which it is used. Invariably though, all first-time installations begin with the Eclipse IDE (you can download it from <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">the Eclipse website</a>) and the download and integration of the Galasa plug-in from a known update site. The Galasa plug-in is accompanied by SimBank - a demonstration application - which sits on top of a very small middleware layer called SimPlatform (you may see its name in some console messages, but you will otherwise not need to interact with SimPlatform). 

<!-- Later, you are likely to want to enhance your test capabilities and exploit Galasa's ability to integrate with automated CI/CD pipelines and a Kubernetes or equivalent container orchestration environment. Other similar but more complex scenarios are also possible, and may be required if your situation demands it. -->

This section describes the most common initial installation scenario - using Eclipse to install the Galasa plug-in - together with SimPlatform/SimBank - on your local machine and preparing it to run an initial set of provided tests against a simulated mainframe application. 

## Prerequisites
Depending on how you use Galasa, there are several software prerequisites, some or all of which you may have already installed.

### Java
Galasa tests and Managers are written in Java - you will need to install a Java version 8 JDK (but *not* a later version) to use it.

### Eclipse
If you do not already have an Eclipse installation, you can <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">download</a> a version of Eclipse appropriate for your machine. Choose a package that supports your required level of Java development - *Eclipse IDE for Java Developers* or *Eclipse IDE for Java EE Developers*. If you are unsure, then the *Eclipse IDE for Java Developers* should be fine, and you can always add any missing plug-ins if and when you discover you need them. 

If you already have a version of Eclipse installed, it should be at the version codenamed Oxygen (released in June 2017) or later.

### A 3270 terminal emulator
Galasa is packaged with SimBank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. You will need a 3270 terminal emulator to enable you to connect with and explore SimBank before running Galasa's provided suite of automated tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS. Note that you do not need a 3270 emulator like PCOMM to use Galasa, only to explore SimBank from the perspective of an end user.

## Installing the Galasa plug-in
1. Launch Eclipse. If present, close any initial welcome screen.
1. Choose *Help > Install New Software* from the main menu.
1. Paste `https://p2.galasa.dev/` into the *Work with* field and press *Enter*.
1. Tick the *Galasa* box in the main panel, ensuring that *Galasa* and all of its child elements are ticked.
1. Follow the prompts to download and install the Galasa plug-in. You will be asked to accept the terms of the license agreement and restart Eclipse to complete the installation. You may also be asked to acknowledge and agree that you are installing unsigned content.
1. After Eclipse has restarted, you can verify that the plug-in is now available by observing the presence of a new *Galasa* option on the main menu between *Run* and *Window*. If you choose *Run > Run Configurations* from the main menu, you will also observe two new entries: *Galasa* and *Galasa SimBank* as available options in the left-hand panel of the popup window.

## Configuring Eclipse for Galasa
<!-- 1. If it is running, close Eclipse. -->
<!-- 1. Check to see if you have a `.galasa` folder in your user home directory - create it if there isn't one. On Windows, the user home directory resembles: `C:\Users\<username>`, on MacOS or Linux, entering `cd ~` in a terminal takes you to your user home directory, whatever it has been configured to be.
1. Create two empty files in your .galasa folder:
```
bootstrap.properties
dss.properties
``` -->
1. Choose *Galasa > Setup Galasa Workspace* from the main Eclipse menu - this command creates some necessary configuration files. Your Eclipse console confirms its progress with some messages:

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
1. Locate your user home directory and confirm it contains a `.galasa` folder. On Windows, the user home directory resembles: `C:\Users\<username>`, on MacOS or Linux, entering `cd ~` in a terminal takes you to your user home directory, whatever it has been configured to be.
1. Edit a file called `overrides.properties` in your `.galasa` folder so that it contains:
    ```properties
    zos.dse.tag.simbank.imageid=SIMBANK
    zos.dse.tag.simbank.clusterid=SIMBANK

    simbank.dse.instance.name=SIMBANK
    simbank.instance.SIMBANK.zos.image=SIMBANK

    zos.image.SIMBANK.ipv4.hostname=127.0.0.1
    zos.image.SIMBANK.telnet.port=2023
    zos.image.SIMBANK.webnet.port=2080
    zos.image.SIMBANK.telnet.tls=false
    zos.image.SIMBANK.credentials=SIMBANK

    zosmf.server.SIMBANK.images=SIMBANK
    zosmf.server.SIMBANK.hostname=127.0.0.1
    zosmf.server.SIMBANK.port=2040
    zosmf.server.SIMBANK.https=false
    ```
1. Edit a file called `credentials.properties` in your `.galasa` folder so that it contains:
    ```properties
    secure.credentials.SIMBANK.username=IBMUSER
    secure.credentials.SIMBANK.password=SYS1
    ```
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
1. Choose *Window > Preferences* and then *Maven > User Settings*.
1. Complete the *Global Setting* field by pressing *Browse* and navigating to the `settings.xml` file you just set up. Press *Apply* and *Close* when finished.
1. Choose *Window > Preferences > Galasa*, complete the *Remote Maven URI* field as `https://nexus.galasa.dev/repository/master`, and click *Apply and Close*. -->

Your local Eclipse Galasa installation is now ready for some work.