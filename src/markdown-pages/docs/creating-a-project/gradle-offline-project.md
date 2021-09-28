---
path: "/docs/creating-project-Galasa/creating-project-offline-Gradle"
title: "Creating an example project using Gradle with the zipped distribution"
---

If you are using the Galasa zipped distribution, complete the following steps to create a Galasa project  using Gradle. If you are using the Galasa plug-in from the external update site, follow the steps in the [Creating a Galasa project using Gradle](/docs/creating-project-Galasa/creating-project-online-Gradle)documentation. 

Note that there are some variations in the Eclipse interface, depending on the version of Eclipse that you are using.

## Creating an example Galasa project using Gradle (zipped distribution)

1. Ensure that Eclipse is running.
1. Depending on your operating system, choose either _Window > Preferences_ or _Eclipse > Preferences_, check that you are using the correct version of Gradle, and then select `Galasa` from the left hand pane.
1. Change the _Remote Maven URI_ to the local Maven directory, for example, `file:///home/username/galasa-isolated-mvp/maven` to enable running tests to access any dependencies. <br>
Note: If you are using the Docker image, set the URL to the running container, for example, `http://hostname:8080/maven`.
1. Click _Apply and Close_.
1. Choose _File > New > Example_, select _SimBank example Gradle projects_ and click _Next_.
1. Confirm your _New project_ prefix as `dev.galasa.simbank` and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), three new entries appear:  
``` 
dev.galasa.simbank.manager   
dev.galasa.simbank.parent
dev.galasa.simbank.tests  
```  
1. Add a `pluginManagement` section, at the top of the `settings.gradle` file in `dev.galasa.simbank.parent` so that the Gradle build can search the Maven directory for any required plug-ins. Specify the Maven repository as the location of the unzipped Maven directory. For example:
```dev.galasa.simbank.parent - settings.gradle file
pluginManagement {
        repositories {
            maven {
                url = "file:///home/username/galasa-isolated-mvp/maven"
            }
        }
}
```
Note: If you are using the Docker image, set the URL to the running container. For example:
```dev.galasa.simbank.parent - settings.gradle file
pluginManagement {
        repositories {
            maven {
                url = "http://hostname:8080/maven"
            }
        }
}
```  
1. In `dev.galasa.simbank.manager`, modify the `build.gradle` file:
    1. In the repositories closure, replace `mavenCentral()` with the location of the unzipped Maven directory so that the individual projects can locate any dependencies that they might require for building. For example:
    ```dev.galasa.simbank.manager - build.gradle file
    repositories {
            maven {
                url = "file:///home/username/galasa-isolated-mvp/maven"
            }
    }
    ```
    Note: If you are using the Docker image, set the URL to the running container. For example:
    ```dev.galasa.simbank.manager - build.gradle file
    repositories {
            maven {
                url = "http://hostname:8080/maven"
            }
    }
    ```
    1. Modify the dependencies closure by adding the following constraints:
    ```dev.galasa.simbank.manager - build.gradle file
    constraints {
	    implementation('commons-codec:commons-codec:1.15'){
	    	because "Force specific version of commons-codec for security reasons"
	    }
	    implementation('org.apache.httpcomponents:httpcore:4.4.14'){
	    	because "Force specific version of httpcore for security reasons"
	    }
    } 
    ```
1. In `dev.galasa.simbank.tests`, modify the `build.gradle` file:
    1. In the repositories closure, replace `mavenCentral()` with the location of the unzipped Maven directory. For example:
    ```dev.galasa.simbank.tests - build.gradle file
    repositories {
            maven {
                url = "file:///home/username/galasa-isolated-mvp/maven"
            }
    }
    ```
    Note: If you are using the Docker image, set the URL to the running container. For example:
    ```dev.galasa.simbank.tests - build.gradle file
    repositories {
            maven {
                url = "http://hostname:8080/maven"
            }
    }
    ```
    1. Modify the Selenium Manager dependency to remove packages that are not required. Change the dependency from:
    ```dev.galasa.simbank.tests - build.gradle file
    implementation'dev.galasa:dev.galasa.selenium.manager:0.+'
    ```
    to:
    ```dev.galasa.simbank.tests - build.gradle file
    implementation('dev.galasa:dev.galasa.selenium.manager:0.+'){
            exclude group: 'com.squareup.okio', module: 'okio'
            exclude group: 'com.squareup.okhttp3', module: 'okhttp'
            exclude group: 'net.bytebuddy', module: 'byte-buddy'
            exclude group: 'org.apache.commons', module: 'commons-exec'
            exclude group: 'com.google.guava', module: 'guava'
    }
    ```
    1. Modify the dependencies closure by adding the following constraints: 
    ```dev.galasa.simbank.tests - build.gradle file
    constraints {
	        implementation('commons-codec:commons-codec:1.15'){
	    	    because "Force specific version of commons-codec for security reasons"
	    }
	        implementation('org.apache.httpcomponents:httpcore:4.4.14'){
	    	    because "Force specific version of httpcore for security reasons"
	    }
    } 
    ```
1. Ensure that you save the modifications that you made to the files.
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
