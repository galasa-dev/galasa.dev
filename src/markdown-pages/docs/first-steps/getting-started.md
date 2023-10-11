---
path: "/docs/getting-started"
title: "Getting started using Eclipse"
---

Before development of the Galasa command line tool (Galasa CLI), Eclipse was the main focus for getting started with using Galasa and exploring Simbank and it continues to provide an alternative UI experience to the equivalent command line option.


If you are planning to install and use Galasa with Eclipse, you need to have an Eclipse installation on your machine. If you do not already have an Eclipse installation, you can <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">download</a> a version of Eclipse appropriate for your machine. Choose a package that supports your required level of Java development - _Eclipse IDE for Java Developers_ or _Eclipse IDE for Java EE Developers_. If you are unsure, then the _Eclipse IDE for Java Developers_ should be fine, and you can always add plug-ins if and when you discover you need them.

The following table shows the current compatibility between Eclipse and Galasa versions: 


| Eclipse level |  Compatible Galasa version  |
| :---- | :-------- | 
| 2023-03  | 0.27.0 and later |
| 2022-09 | 0.27.0 and later | 
| 2022-06 | 0.26.0, 0.25.0 |

<b>Note:</b> We currently support Java version 11 to version 16 JDK. We do not currently support Java 17 or later. If your Eclipse version comes with Java 17 or later, ensure that the JRE environment refers to a Java 11 runtime in your Eclipse launch configuration. 

You can tell Eclipse about an installed runtime by going to _Settings_>_Java_>_Installed JREs_ from the Eclipse menu, and adding the Java 11 runtime to the list of installed JREs. You can set this runtime as default so that Eclipse launches tests with a Java 11 runtime. 


## Downloading and Installing 

You can download Galasa either from a downloadable zip file (zipped distribution) or directly from an external update site. For more information about these options, see the [Installing options](../../docs) documentation. 

To install the Galasa plug-in from the external update site, follow the instructions in [Installing the Galasa plug-in](/docs/getting-started/installing-online). 

To install the Galasa plug-in using the zipped distribution, follow the instructions in [Installing the Galasa plug-in offline](/docs/getting-started/installing-offline). 


## Next steps 

You can then start [exploring Galasa Simbank](/docs/getting-started/simbank); a component distributed with Galasa that you can start playing with to help you to learn about the Galasa basics. 

