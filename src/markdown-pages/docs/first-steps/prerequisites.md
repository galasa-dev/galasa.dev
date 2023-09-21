---
path: "/docs/prerequisites"
title: "Galasa Prerequisites"
---

This section takes you through the software prerequisites required before installing Galasa. The prerequisites vary, depending on the whether you are installing Galasa for using in the command-line, or for using in Eclipse. If you are installing Galasa for using in Eclipse, the prerequisites also vary depending on whether you are downloading Galasa directly from the external update site, or are using the zipped distribution.

For information about installing options, see the [Installing options](../../about_Galasa.md) documentation.

<br>

### Installing Galasa for using in the command-line

| Software |  Description  |
| :---- | :-------- | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. |
| Maven or [Gradle](#gradle)  | You must install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. |
| Galasa CLI tool | Required. The tool enables interactions with Galasa via the command line. See [Getting started using the Galasa CLI](/docs/cli-command-reference/cli-command-reference) for more information about installing the tool. | 
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 


Once you have installed the relevant software, you are ready to install Galasa. To install Galasa for using the command line, follow the instructions in [Getting started using the Galasa CLI](/docs/cli-command-reference/cli-command-reference). 

<br>

### Installing Galasa for using in Eclipse

| Software |  Description  |
| :---- | :-------- | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. |
| Eclipse | Required. Provides the ability to interact with and use Galasa. See the [Getting started using Eclipse](/docs/getting-started) documentation for more information about installation requirements.  | 
| Maven or [Gradle](#gradle)   | You must install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. You do not explicitly need to install Maven because the Galasa plugin downloads and installs it silently during its own installation and configuration.|
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 

Once you have installed the relevant software, you are ready to install Galasa. To install the Galasa for using in Eclipse, follow the instructions in [Installing the Galasa plug-in](/docs/getting-started/installing-online). 

<br>

### Installing Galasa for using in Eclipse (zipped distribution) 

| Software |  Description  |
| :---- | :-------- | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. |
| [Gradle](#gradle)  | Required to install the zipped distribution. You can also build Galasa projects using Gradle (or you can use Maven to build projects if you prefer). Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. |
| Eclipse | Required. Provides the ability to interact with and use Galasa. See [Getting started using Eclipse](/docs/getting-started) documentation for more information about installation requirements.  | 
| Docker  | Required if using the Docker image. If you want to deploy the Docker image that is provided in the zip file, you will need to have Docker installed.  |
| Maven  | Optional (as Gradle is required). You can use Maven rather than Gradle to build Galasa projects. You do not explicitly need to install Maven because the Galasa plugin downloads and installs it silently during its own installation and configuration. |
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 

Once you have installed the relevant software, you are ready to install Galasa. To install the zipped distribution of Galasa, follow the instructions in [Installing the Galasa plug-in offline](/docs/getting-started/installing-offline). 


### <a name="gradle"></a>Gradle

<a href="https://docs.gradle.org" target="_blank">Gradle</a> is required if you are installing the zipped distribution of Galasa, or if you want to use Gradle rather than Maven to build Galasa projects (hierarchical file structures that provide the ability to store and run Galasa tests).

The following table shows the current compatibility between Gradle and Galasa versions: 


| Gradle release |  Compatible Galasa version  |
| :---- | :-------- | 
| 6.8.x  | All |
| 6.9.x  | All |
| 7.x.x | All | 



## Next steps 

Start exploring Galasa Simbank; a component distributed with Galasa that you can start playing with to help you to learn about the Galasa basics. 

