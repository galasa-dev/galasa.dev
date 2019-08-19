---
path: "/docs/getting-started/installing-galasa"
title: "Installing Galasa"
---
# Installing Galasa
Galasa installations can vary in complexity depending on the context in which it is used. Invariably though, all first-time installations begin with the Eclipse IDE and the download and integration of the Galasa plug-in from a known update site. For some, this will be sufficient for their needs - others will later want to enhance their test capabilities and exploit Galasa's ability to integrate with CI/CD pipelines, necessitating the subsequent installation of a Kubernetes environment. Other similar but more complex scenarios are also possible, and may be required if your situation demands it.

This section describes the most common initial installation scenario - using Eclipse to install the Galasa plug-in on your local machine. Refer to the Reference section for information about alternative enhancements and options.

## Prerequisites

### Java
Galasa tests and managers are written in Java - you will need to install a Java JDK 8 or later to use it.

### Eclipse
If you do not already have an Eclipse installation, you can download and install a version of Eclipse appropriate for your machine by following the instructions [here](https://www.eclipse.org/downloads/packages/installer). Choose a package that supports your required level of Java development - *Eclipse IDE for Java Developers* or *Eclipse IDE for Java EE Developers*. If you are unsure, then the *Eclipse IDE for Java Developers* should be fine, and you can always add any missing plug-ins if and when you discover you need them. 

### A 3270 terminal emulator
Galasa is packaged with Simframe, a simulated version of a mainframe application that helps you to avoid problems when you later come to connect to a real mainframe to run your tests. If you ultimately intend to use Galasa to execute mainframe test suites, you will need a 3270 terminal emulator to enable you to connect with and explore Simframe before running Galasa's provided suite of automated tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.

## Installing the Galasa plug-in
1. Launch Eclipse. If present, close any initial welcome screen.
1. Choose *Help > Install New Software* from the main menu.
1. Paste http://cicscit.hursley.ibm.com/galasa/resources/eclipse into the *Work with:* field.
1. Tick the *Galasa* box and its children in the main panel, so that *Galasa* and *Galasa Core* are ticked.
1. Follow the prompts to download and install the Galasa plug-in. You will be asked to accept the terms of the license agreement and restart Eclipse to complete the installation. You may also be asked to acknowledge and agree that you are installing unsigned content.
1. After Eclipse has restarted, you can verify that the plug-in is now available by observing the presence of a new *Galasa* option on the main menu between *Run* and *Window*. If you choose *Run > Run Configurations* from the main menu, you will also observe two new entries: *Galasa* and *Galasa Simframe* as available options in the left-hand panel of the popup window.







