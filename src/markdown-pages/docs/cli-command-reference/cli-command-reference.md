---
path: "/docs/cli-command-reference/cli-command-reference"
title: "Getting started using the Galasa CLI"
---


If you are installing Galasa for using in the command-line, you can use the Galasa command line interface tool (Galasa CLI) to interact with Galasa to complete tasks, for example, submitting and monitoring Galasa test runs. You can use the same set of Galasa CLI commands to run a given task, regardless of the technology that you are using. 

Read on to understand more about the prerequisites that you need to install so that you can start using the Galasa CLI.


## Prerequisites

| Software |  Description  |
| :---- | :-------- | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. |
| Maven or Gradle  | You must install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. All Galasa versions are compatible with Gradle releases 6.8.x and later. |
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 




## Next steps

To install Galasa for using in the command line, follow the instructions in the [Installing the Galasa CLI](/docs/cli-command-reference/installing-cli-tool) documentation.

