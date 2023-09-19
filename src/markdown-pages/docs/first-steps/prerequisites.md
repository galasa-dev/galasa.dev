---
path: "/docs/prerequisites"
title: "Galasa Prerequisites"
---

This section takes you through the software prerequisites required before installing Galasa. The prerequisites vary, depending on the version of Galasa that you download and the option you use to install it. 

For information about the download and install options available, see the [Introduction](../../about_Galasa.md) documentation.

### Java JDK

Required. Galasa tests and Managers are written in Java - you will need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later.

### Maven 

Maven is required if you want to use Maven rather than Gradle to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests.

<a href="http://maven.apache.org" target="_blank">Maven</a> is an Open Source build automation tool, initially created in 2003 and part of the Apache Software Foundation. If you are using Eclipse, you do not explicitly need to install it because the Galasa plugin downloads and installs it silently during its own installation and configuration. If you have already installed Maven as part of some other software project, no action is needed.

### Galasa command line tool (Galasa CLI)

Required if you want to use the Galasa CLI to interact with Galasa. You can [download the CLI tool](https://github.com/galasa-dev/cli/releases) from the _cli_ repository in GitHub. 

The following versions of the Galasa CLI tool are available to download for different operating systems and machine architectures:

| Operating system  |  Download  |
| :---- | :-------- | 
| MacOSX  | galasactl-darwin-x86_64 |
| MacOSX  | galasactl-darwin-arm64 |
| Linux 64-bit x86 | galasactl-linux-x86_64 | 
| Linux arm64 | galasactl-linux-arm64 | 
| zLinux  | galasactl-linux-s390x | 
| Windows | galasactl-windows-x86_64.exe | 

*Note:* You can find out the architecture of your machine by typing the command `uname -m` into your Mac or Linux terminal.

### Eclipse 

If you are planning to install and use Galasa with Eclipse, you need to have an Eclipse installation on your machine. If you do not already have an Eclipse installation, you can <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">download</a> a version of Eclipse appropriate for your machine. Choose a package that supports your required level of Java development - _Eclipse IDE for Java Developers_ or _Eclipse IDE for Java EE Developers_. If you are unsure, then the _Eclipse IDE for Java Developers_ should be fine, and you can always add plug-ins if and when you discover you need them.

The following table shows the current compatibility between Eclipse and Galasa versions: 


| Eclipse level |  Compatible Galasa version  |
| :---- | :-------- | 
| 2023-03  | 0.27.0 and later |
| 2022-09 | 0.27.0 and later | 
| 2022-06 | 0.26.0, 0.25.0 |

<b>Note:</b> We currently support Java version 11 to version 16 JDK. We do not currently support Java 17 or later. If your Eclipse version comes with Java 17 or later, ensure that the JRE environment refers to a Java 11 runtime in your Eclipse launch configuration. 

You can tell Eclipse about an installed runtime by going to _Settings_>_Java_>_Installed JREs_ from the Eclipse menu, and adding the Java 11 runtime to the list of installed JREs. You can set this runtime as default so that Eclipse launches tests with a Java 11 runtime. 

### Gradle

Gradle is required if you are installing the zipped distribution of Galasa, or if you want to use Gradle rather than Maven to build Galasa projects (hierarchical file structures that provide the ability to store and run Galasa tests).

<a href="https://docs.gradle.org" target="_blank">Gradle</a> is an Open Source build automation tool, initially created in 2008. If you have already installed Gradle as part of some other software project, no action is needed.

The following table shows the current compatibility between Gradle and Galasa versions: 


| Gradle release |  Compatible Galasa version  |
| :---- | :-------- | 
| 6.8.x  | All |
| 6.9.x  | All |
| 7.x.x | All | 


### Docker (Required if using the Docker image)

If you want to deploy the Docker image that is provided in the zip file, you will need to have Docker installed. 

### A 3270 terminal emulator (Optional) 

Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.


Once you have installed the relevant software, you are ready to install Galasa.


## Installing 

To install the Galasa plug-in using the command line, follow the instructions in [Getting started using the Galasa CLI](/docs/cli-command-reference/cli-command-reference). 

To install the Galasa plug-in from the external update site, follow the instructions in [Installing the Galasa plug-in](/docs/getting-started/installing-online). 

To install the Galasa plug-in using the zipped distribution, follow the instructions in [Installing the Galasa plug-in offline](/docs/getting-started/installing-offline). 


## Next steps 

You can then start exploring Galasa Simbank; a component distributed with Galasa that you can start playing with to help you to learn about the Galasa basics. 

