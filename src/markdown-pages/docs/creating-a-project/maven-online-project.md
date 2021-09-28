---
path: "/docs/creating-project-Galasa/creating-project-Maven"
title: "Creating an example project using Maven"
---

If you are using the Galasa plug-in from the external update site, complete the following steps to create a Galasa project by using Maven. 

Note that there are some variations in the Eclipse interface, depending on the version of Eclipse that you are using.

<b>NOTE:</b> Normally m2e (the Eclipse Maven plug-in) automatically compiles the test bundles and produces the necessary manifest and OSGi files. However, there appears to be an anomaly in m2e in the 2019 versions of Eclipse which we are investigating. If the bundles fail to build correctly, you can force the Maven build by right-clicking the _project_ and selecting _Run As > Maven Install_. We will resolve this issue in a future release.

1. Ensure that Eclipse is running.
2. Choose _File > New > Example_, select _SimBank example Maven projects_ and click _Next_.
3. Confirm your _New project_ prefix as `dev.galasa.simbank` and press _Finish_. In your _Package Explorer_ (if it's not visible, choose _Window > Show View > Package Explorer_), two new entries appear:  
```  
dev.galasa.simbank.manager  
dev.galasa.simbank.tests  
```  
4. Right-click on `dev.galasa.simbank.manager` and choose _Run As > Maven install_ - wait a few moments for the Maven build and then right-click on `dev.galasa.simbank.tests` and do the same. Note that the order in which you do this is significant - first `dev.galasa.simbank.manager` and then `dev.galasa.simbank.tests`. This is because the SimBank tests have a dependency on the SimBank Manager.
5. Expand `dev.galasa.simbank.tests` and then expand `src/main/java`. 
6. Explore the `dev.galasa.simbanks.tests` package. You'll see the group of tests provided with SimBank:

![SimBank tests](./provided-tests.png)

Explore these tests by selecting from the left-hand menu - if you are new to Galasa, [The SimBank IVT](/docs/running-simbank-tests/simbank-IVT) is the best place to start.
