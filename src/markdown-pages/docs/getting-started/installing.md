---
path: "/docs/getting-started/installing"
title: "Installing Galasa and SimBank"
---

Galasa installations can vary in complexity depending on the context in which it is used. Invariably though, all first-time installations begin with the Eclipse IDE and the download and integration of the Galasa plug-in from a known update site such as the [Eclipse marketplace](https://marketplace.eclipse.org). The Galasa plug-in is accompanied by SimBank - a demonstration application - which sits on top of a very small middleware layer called SimPlatform (you may see its name in some console messages, but you will otherwise not need to interact with SimPlatform). 

Later, you are likely to want to enhance your test capabilities and exploit Galasa's ability to integrate with automated CI/CD pipelines and a Kubernetes or equivalent container orchestration environment. Other similar but more complex scenarios are also possible, and may be required if your situation demands it.

This section describes the most common initial installation scenario - using Eclipse to install the Galasa plug-in - together with SimPlatform/SimBank - on your local machine and preparing it to run an initial set of provided tests against a simulated mainframe application. 

## Prerequisites
Depending on how you use Galasa, there are several software prerequisites, some or all of which you may have already installed.

### Java
Galasa tests and Managers are written in Java - you will need to install a Java version 8 JDK (but *not* a later version) to use it.

### Eclipse
If you do not already have an Eclipse installation, you can [download and install](https://www.eclipse.org/downloads/packages/installer) a version of Eclipse appropriate for your machine. Choose a package that supports your required level of Java development - *Eclipse IDE for Java Developers* or *Eclipse IDE for Java EE Developers*. If you are unsure, then the *Eclipse IDE for Java Developers* should be fine, and you can always add any missing plug-ins if and when you discover you need them. 

If you already have a version of Eclipse installed, it should be at the version codenamed Oxygen (released in June 2017) or later.

### A 3270 terminal emulator
Galasa is packaged with SimBank, a simulated version of a mainframe application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. You will need a 3270 terminal emulator to enable you to connect with and explore SimBank before running Galasa's provided suite of automated tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.

## Installing the Galasa plug-in
1. Launch Eclipse. If present, close any initial welcome screen.
1. Choose *Help > Install New Software* from the main menu.
1. Paste http://cicscit.hursley.ibm.com/galasa/resources/eclipse/ into the *Work with:* field.
1. Tick the *Galasa* box in the main panel, ensuring that both *Galasa* and *Galasa Core* are ticked.
1. Follow the prompts to download and install the Galasa plug-in. You will be asked to accept the terms of the license agreement and restart Eclipse to complete the installation. You may also be asked to acknowledge and agree that you are installing unsigned content.
1. After Eclipse has restarted, you can verify that the plug-in is now available by observing the presence of a new *Galasa* option on the main menu between *Run* and *Window*. If you choose *Run > Run Configurations* from the main menu, you will also observe two new entries: *Galasa* and *Galasa SimBank* as available options in the left-hand panel of the popup window.

## Configuring Eclipse for Galasa
1. Check to see if you have a `.galasa` folder in your user home directory - create it if there isn't one. On Windows, the user home directory resembles: `C:\Users\<username>`, on MacOS or Linux, entering `cd ~` in a terminal takes you to your user home directory, whatever it has been configured to be.
1. Create four empty files in your .galasa folder:
```
bootstrap.properties
credentials.properties
dss.properties
overrides.properties
```
1. Create and edit a fifth file in your `.galasa` folder called `cps.properties` so that it contains:
```
#Default
zos.cluster.default.images=simbank
#simbank
zos.image.simbank.default.hostname=127.0.0.1
zos.image.simbank.ipv4.hostname=127.0.0.1
zos.image.simbank.telnet.port=2023
sim.image.simbank.web.port=2080
```
1. Create an `.m2e` folder in your user home directory (the same place as your `.galasa` folder) and inside, place a `settings.xml` file with the contents: 
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
                    <url>http://cicscit.hursley.ibm.com/galasa/resources/maven/</url>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>galasa.repo</id>
                    <url>http://cicscit.hursley.ibm.com/galasa/resources/maven/</url>
                </pluginRepository>
            </pluginRepositories>
        </profile>
    </profiles>
</settings>
```
1. Launch Eclipse.
1. Choose *Window > Preferences > Maven > User Settings*.
1. Complete the *Global Setting* field by pressing *Browse* and navigating to the `settings.xml` file you just set up. Press *Apply* and *Close* when finished.

Your local Eclipse Galasa installation is now ready for some work.