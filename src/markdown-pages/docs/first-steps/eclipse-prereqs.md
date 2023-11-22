---
path: "/docs/getting-started/eclipse-prereqs"
title: "Eclipse prerequisites"
---


Depending on how you use Galasa, there are several software prerequisites, some or all of which you may have already installed. 

If you are planning to install and use Galasa with Eclipse, you need to have an Eclipse installation on your machine. If you do not already have an Eclipse installation, you can <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">download</a> a version of Eclipse appropriate for your machine. Choose a package that supports your required level of Java development - _Eclipse IDE for Java Developers_ or _Eclipse IDE for Java EE Developers_. If you are unsure, then the _Eclipse IDE for Java Developers_ should be fine, and you can always add plug-ins if and when you discover you need them.

The following table shows the current compatibility between Eclipse and Galasa versions: 


| Eclipse level |  Compatible Galasa version  |
| :---- | :-------- | 
| 2023-03  | 0.27.0 and later |
| 2022-09 | 0.27.0 and later | 
| 2022-06 | 0.26.0, 0.25.0 |

<b>Note:</b> We currently support Java version 11 to version 16 JDK. We do not currently support Java 17 or later. If your Eclipse version comes with Java 17 or later, ensure that the JRE environment refers to a Java 11 runtime in your Eclipse launch configuration. 

You can tell Eclipse about an installed runtime by going to _Settings_>_Java_>_Installed JREs_ from the Eclipse menu, and adding the Java 11 runtime to the list of installed JREs. You can set this runtime as default so that Eclipse launches tests with a Java 11 runtime. 

## Prerequisites


| Software |  Description  |
| :---- | :-------- | 
| Eclipse | Required. If you are installing Galasa by using Eclipse, begin with the Eclipse IDE (you can download it from <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">the Eclipse website</a>) and the download and integration of the Galasa plug-in. Check the current compatibility between Eclipse and Galasa versions in the table provided at the start of this topic. | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. |
| Gradle  | Required to install the zipped distribution. If you are not installing the zipped distribution, you can choose to install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. All Galasa versions are compatible with Gradle releases 6.9.x.|
| Maven  | You must install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. You do not explicitly need to install Maven because the Galasa plugin downloads and installs it silently during its own installation and configuration. |
| Docker  | Required if using the Docker image. If you want to deploy the Docker image that is provided in the zip file, you will need to have Docker installed.  |
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 


## Next steps

You can download Galasa for using in Eclipse either from a downloadable zip file (zipped distribution) or directly from an external update site. For more information about these options, see the [Installing options](../../docs) documentation. 

To install the Galasa plug-in from the external update site, follow the instructions in [Installing the Galasa plug-in](/docs/getting-started/installing-online). 

To install the Galasa plug-in using the zipped distribution, follow the instructions in [Installing the Galasa plug-in offline](/docs/getting-started/installing-offline). 