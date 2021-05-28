---
path: "/docs/running-simbank-tests"
title: "Running the supplied SimBank tests"
---

Galasa SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) logs on to SimBank and examines an account - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as `BasicAccountCreditTest.java` in an improved test design - `ProvisionedAccountCreditTests.java`.
- A test that exercises the z/OS Batch Manager by simulating the submission of a JCL job to add a number of accounts to the SimBank system - `BatchAccountsOpenTest.java`.

All of these example tests become available when you set up a Galasa example project within Eclipse.

## Creating an example Galasa project using Maven

<b>NOTE:</b> Normally m2e (the Eclipse Maven plug-in) automatically compiles the test bundles and produces the necessary manifest and OSGi files. However, there appears to be an anomaly in m2e in the 2019 versions of Eclipse which we are investigating. If the bundles fail to build correctly, you can force the Maven build by right-clicking the _project_ and selecting _Run As > Maven Install_. We will resolve this issue in a future release.

1. Ensure that Eclipse is running.
2. Choose _File > New > Example_, select _SimBank example projects_ and press _Next_.
3. Confirm your _New project_ prefix (it's OK to leave it as `dev.galasa.simbank`) and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), two new entries appear:  
```  
dev.galasa.simbank.manager  
dev.galasa.simbank.tests  
```  
4. Right-click on `dev.galasa.simbank.manager` and choose _Run As > Maven install_ - wait a few moments for the dependencies to load and then right-click on `dev.galasa.simbank.tests` and do the same. Note that the order in which you do this is significant - first `dev.galasa.simbank.manager` and then `dev.galasa.simbank.tests`.  
5. Expand `dev.galasa.simbank.tests` (assuming you haven't changed your project name) and then `src.main.java` - and finally, explore the `dev.galasa.simbanks.tests` package. You'll see the group of tests provided with SimBank:

![SimBank tests](./provided-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, _The SimBank IVT_ is the best place to start.


## Creating an example Galasa project using Gradle

1. Ensure that Eclipse is running.
2. Choose _File > New > Example_, select _SimBank example Gradle projects_ and press _Next_.
3. Confirm your _New project_ prefix (it's OK to leave it as `dev.galasa.simbank`) and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), two new entries appear:  
```  
dev.galasa.simbank.manager  
dev.galasa.simbank.tests  
```  
4. Add a ```pluginManagement``` section, at the top of the `settings.gradle` file in `dev.galasa.simbank.parent` so that the Gradle build can search the Maven directory for any required plug-ins. Specify the Maven repository as the location of the unzipped Maven directory. For example:
```
pluginManagement {
    repositories {
        maven {
            url = "file:///home/username/galasa-isolated-mvp/maven"
        }
    }
}
```
5. Modify the `build.gradle` file in `dev.galasa.simbank.manager` so that the project can locate any dependencies that are required for building Galasa. In the repositories closure, replace `mavenCentral()` with the location of the unzipped Maven directory. For example:
```
pluginManagement {
    repositories {
        maven {
            url = "file:///home/username/galasa-isolated-mvp/maven"
        }
    }
}
```
6. Modify the `build.gradle` file in `dev.galasa.simbank.tests` by making the same repository change as you did to the `build.gradle` in `dev.galasa.simbank.manager`. In addition, modify the Selenium Manager dependency in the file to remove packages that are not required. Change the dependency from:
```
implementation'dev.galasa:dev.galasa.selenium.manager:0.+'
```
to:
```
implementation('dev.galasa:dev.galasa.selenium.manager:0.+'){
    exclude group: 'com.squareup.okio', module: 'okio'
    exclude group: 'com.squareup.okhttp3', module: 'okhttp'
    exclude group: 'net.bytebuddy', module: 'byte-buddy'
    exclude group: 'org.apache.commons', module: 'commons-exec'
    exclude group: 'com.google.guava', module: 'guava'
}
```
7. In Project Explorer, right-click on `dev.galasa.simbank.parent` and select _Gradle > Refresh Gradle Project_
8. Navigate to *Run > Run Configurations*
9. In the *Create, manage and run configurations* dialog, right-click *Gradle Project* and choose *New Configuration*.
10. Give the new configuration a meaningful name and add the Gradle task(s) ```clean build```.
11. Click *Workspace*, select `dev.galasa.simbank.parent` and click `OK`.
12. Click `Apply` then `Run`.
13. Expand `dev.galasa.simbank.tests` (assuming you haven't changed your project name) and then `src.main.java` - and finally, explore the `dev.galasa.simbanks.tests` package. You'll see the group of tests provided with SimBank:

![SimBank tests](./provided-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, _The SimBank IVT_ is the best place to start.

