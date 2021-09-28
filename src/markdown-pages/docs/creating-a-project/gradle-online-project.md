---
path: "/docs/creating-project-Galasa/creating-project-online-Gradle"
title: "Creating an example project using Gradle"
---

If you are using the Galasa plug-in from the external update site, complete the following steps to create a Galasa project using Gradle. If you are using the Galasa zipped distribution, following the steps in the  [Creating a Galasa project using Gradle with the zipped distribution](/docs/creating-project-Galasa/creating-project-offline-Gradle) documentation. 

Note that there are some variations in the Eclipse interface, depending on the version of Eclipse that you are using.

## Creating an example Galasa project using Gradle

1. Ensure that Eclipse is running.
1. Depending on your operating system, choose either _Window > Preferences_ or _Eclipse > Preferences_, check that you are using the correct version of Gradle.
1. Choose _File > New > Example_, select _SimBank example Gradle projects_ and click _Next_.
1. Confirm your _New project_ prefix as `dev.galasa.simbank` and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), three new entries appear:  
``` 
dev.galasa.simbank.manager   
dev.galasa.simbank.parent
dev.galasa.simbank.tests  
```  
1. In Project Explorer, right-click on `dev.galasa.simbank.parent` and select _Gradle > Refresh Gradle Project_. A _BUILD SUCCESSFUL_ message is displayed in the _Console_ tab when the project is refreshed successfully.<br>
Note: If you get an error connecting to the Gradle build, go to _Window > Preferences > Gradle_,  check the _Local installation directory_ box, browse to the folder in which you installed Gradle and click _OK_ and _Apply and Close_.
1. Navigate to *Run > Run Configurations*. The *Create, manage and run configurations* dialog box appears. 
1. Depending on version of Eclipse that you are using, either right-click *Gradle Project* or *Gradle Task* and choose *New Configuration*. 
1. Provide a meaningful name and set up your Gradle Task to run a clean build. 
1. In _Working Directory_, click *Workspace*, select `dev.galasa.simbank.parent` and click `OK`.
1. Click _Apply_ then _Run_. A _BUILD SUCCESSFUL_ message is displayed in the _Console_ tab.
1. Expand `dev.galasa.simbank.tests` and then expand `src/main/java`.
1. Explore the `dev.galasa.simbank.tests` package. You'll see the group of tests provided with SimBank:

![SimBank tests](./gradle-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, [The SimBank IVT](/docs/running-simbank-tests/simbank-IVT) is the best place to start.
