---
path: "/docs/cli-command-reference/cli-prereqs"
title: "CLI prerequisites"
---


The following section explains more about the software prerequisites that you need to install so that you are ready to install Galasa for using in the command-line.

## Prerequisites

| Software |  Description  |
| :---- | :-------- | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. After installing, you must set the `JAVA_HOME` environment variable to your Java JDK installation path and check it set successfully by running the command `echo $JAVA_HOME` on Mac or Unix, or `echo %JAVA_HOME%` on Windows (PowerShell). The returned result shows the path to your JDK installation.|
| Maven or Gradle  | You must install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. All Galasa versions are compatible with Gradle releases 6.9.x. Remember to add Gradle to your Path. You can check by running `echo $PATH` on Mac or Unix, or `echo %PATH%` on Windows (PowerShell). |
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to [explore Galasa Simbank](../cli-command-reference/simbank-cli), a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 


## Next steps

To install Galasa for using in the command line, follow the instructions in the [Installing the Galasa CLI](/docs/cli-command-reference/installing-cli-tool) documentation.

