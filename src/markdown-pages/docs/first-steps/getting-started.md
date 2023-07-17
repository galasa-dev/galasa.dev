---
path: "/docs/getting-started"
title: "Getting started using Eclipse"
---
This section takes you through the options available for installing the Galasa Eclipse plug-in and a quick tour of its capabilities on a local machine.

## Installing options
You can install Galasa either from a downloadable zip file (zipped distribution) or directly from an external update site. 

The zipped distribution allows users who do not have access to Maven Central, Eclipse Marketplace and Docker Hub from their company network to use Galasa. Users without restricted internet access who want to use open-source Galasa, can install the Galasa Eclipse plug-in directly from the external update site.

As IP addresses and ports of test machines are stored within the cps.properties file on a users system, we recommend that hard drive encryption is turned on in the operating system where possible.

## Compatibilities

The following table shows the current compatibility between Eclipse and Galasa versions: 


| Eclipse level |  Compatible Galasa version  |
| :---- | :-------- | 
| 2023-03  | 0.27.0 and later |
| 2022-09 | 0.27.0 and later | 
| 2022-06 | 0.26.0, 0.25.0 |

<b>Note:</b> We currently support Java version 11 to version 16 JDK. We do not currently support Java 17 or later. If your Eclipse version comes with Java 17 or later, ensure that the JRE environment refers to a Java 11 runtime in your Eclipse launch configuration. 

You can tell Eclipse about an installed runtime by going to _Settings_>_Java_>_Installed JREs_ from the Eclipse menu, and adding the Java 11 runtime to the list of installed JREs. You can set this runtime as default so that Eclipse launches tests with a Java 11 runtime. 

## Installing 

To install the Galasa plug-in from the external update site, follow the instructions in [Installing the Galasa plug-in](/docs/getting-started/installing-online). 

To install the Galasa plug-in using the zipped distribution, follow the instructions in [Installing the Galasa plug-in offline](/docs/getting-started/installing-offline). 


## Next steps 

You can then start [exploring Galasa Simbank](/docs/getting-started/simbank); a component distributed with Galasa that you can start playing with to help you to learn about the Galasa basics. 

