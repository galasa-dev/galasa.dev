---
path: "/releases"
title: "Highlights"
---

# Galasa Delivery

Galasa is an open source project and is delivered using a continuous delivery model. There are instructions on [getting started](https://galasa.dev/docs) on this site. 

Post a question or share your experiences with other users in our <a href="https://openmainframeproject.slack.com/archives/C05TCCQDE65" target="_blank"> Galasa Slack</a> workspace. <a href="https://openmainframeproject.slack.com/signup#/domain-signup" target="_blank"> Register to join</a> first if you're not yet a member.

We have the following available Slack channels:

- `#galasa-dev` - for developers of Galasa code or Galasa extensions 
- `#galasa-users` - for users comments, and for making announcements 
- `#galasa-tsc` - for technical steering committee discussions on longer term over-arching issues relating to Galasa 

Access the Galasa source code in [GitHub](https://github.com/galasa-dev) and open issues in the [project management repository](https://github.com/galasa-dev/projectmanagement).


## 0.36.0 - Release Highlights

- You can now create Galasa projects and build and compile Galasa test code using Gradle version 8. For more information, see the `Upgrading tests to compile using Gradle version 8` section in the [Upgrading](docs/upgrading) documentation to understand the changes you need to make.

- Log into the Galasa Ecosystem and revoke a personal access token by using the `galasactl auth tokens delete` command.

- Set terminal size within Gherkin tests (previously only available in Java tests) and use Scenario Outlines.

- Various updates to the Galasa Web UI 

- Various defect fixes

- Various documentation updates


<details>
<summary><b>0.35.0 - Release Highlights</b></summary>

- A fix to the database connector of the DB2 Manager
</details> 


<details>
<summary><b>0.34.1 - Release Highlights</b></summary>

- Retrieve a list of all active personal access tokens in the Ecosystem by using the `galasactl auth tokens get` command. Use the information to revoke an access token.

- The default size of the PVC storage allocated by the Helm chart is increased from 1GB to 30GB and automatic history compaction is now turned on by default to minimise the risk of etcd running out of space.

- The unused WebUI `/webui/worklist` endpoint and `dev.galasa.api.webui` bundle are removed from the API server to resolve reported vulnerabilities.

- Various bug fixes

- Various documentation updates
</details> 


<details>
<summary><b>0.33.0 - Release Highlights</b></summary>

- Authentication when interacting with an Ecosystem is now mandatory. You need to authenticate with an Ecosystem in order to use its API server or to use any galasactl commands that interact with an Ecosystem. 

- CouchDB is upgraded to version 3.3.3. If you upgrade your Ecosystem to Galasa version 0.33.0, CouchDB will be upgraded. Though we don't anticipate any problems with the Helm chart upgrading CouchDB in-situ, we recommend that you follow the usual safety practices of backing up your data prior to any upgrade. You can then apply the backup to the new CouchDB pod after it is created. CouchDB cannot be downgraded after upgrading.

- Maven and Gradle plugins now accept a personal access token when publishing a test catalog to the Ecosystem.

- Various bug fixes

- Various documentation enhancements, including property updates for the CICS TS and z/OS Managers, and information on updating credentials in an Ecosystem.
</details> 


<details>
<summary><b>0.32.0 - Release Highlights</b></summary>

- CLI updates: 

  • You can re-try running a test run which appears to be hanging or looping by using the `galasactl runs reset` command.

  • You can cancel a test that is hanging or looping by using the `galasactl runs cancel` command. Cancelling a test removes all entries in the DSS for that test run. All information that is stored in the RAS about the test is kept and is not removed when either the `runs reset` or `runs cancel` command is run.

  • You can run Gherkin tests locally on your machine by setting the `--gherkin` flag on the `galasactl runs submit local` command.  
  
- Updates to the Galasa authentication token and documentation updates around authentication, architecture, and logging into and out of a Galasa Ecosystem by using the `galasactl auth login` and `galasactl auth logout` commands.

- The Eclipse plug-in for Galasa is no longer supported. You can work with Galasa version 0.32.0 and later by using the Galasa command line interface (CLI).

- Various documentation enhancements.
</details> 



<details>
<summary><b>0.31.0 - Release Highlights</b></summary>

- CLI updates: 

  • You can explicitly specify the path to your local Maven repository folder when launching a test case by setting the `--localMaven` flag in the `galasactl runs local` command. This means that you can use a non-standard location for your local Maven repository if you want to, rather than having to use the default location of `{user.home}/.m2`.

  • You can create, update, apply, and delete one or more properties to an Ecosystem by specifying a checked-in resource file on the  `galasactl resources` command, making it easy to set Ecosystem configuration with a single command.
  

  • The `galasactl properties get` command supports extraction of properties resources in yaml format when the `–format yaml` flag is set on the command so you can later apply those properties with different values by using a checked-in resource file specified on the `galasactl resources` command.

  • The `galasactl namespaces get` command now returns results of available namespaces in raw format when the `–format raw` flag is set on the command. 

- When using the Galasa command line tool against a server, an error message is generated when the client and server versions are incompatible. 

- Various documentation enhancements

- A new blog post by Louisa Seers, encapsulating her experiences during her first six months as Chair of the Galasa Technical Steering Committee (TSC) and the Galasa journey to adoption by the Open Mainframe Project (OMP), is now available on the <a href="https://openmainframeproject.org/blog/galasa-my-first-6-months/" target="_blank"> Open Mainframe Project</a> website.
</details>  



<details>
<summary><b>0.30.0 - Release Highlights</b></summary>

- You can now read, update, and delete CPS properties by using the CLI, removing the need to directly access the etcd server or use the REST service. The `galasactl properties set` command makes it easy to set parameters and credentials in the Ecosystem for tests to read and use at runtime. Use the `galasactl properties get` command to read CPS properties and the `galasactl properties delete` to remove CPS properties from a namespace in the Ecosystem.
- The following REST API endpoints will be deprecated in the next release (0.31.0) as these are replaced by new endpoints delivered in this release:<br><br>
        /cps/namespace/{namespace}/property/{property}<br>
        /cps/namespace/{namespace}/prefix/{prefix}/suffix/{suffix}<br>
        /cps/namespace/{namespace}<br>
        /cps/namespace<br>
- The `--requestor` parameter is removed from the `galasactl runs submit local` and `galasactl runs submit` commands. The `--requestor` parameter is always set to the current user id, removing the ability to artifically set who is running the test. 
- Various documentation updates and enhancements.
</details>  

<details>
<summary><b>0.29.0 - Release Highlights</b></summary>

- Upgrade of 'bouncy castle' crypto libraries to remove a security vulnerability.
</details>  

<details>
<summary><b>0.28.0 - Release Highlights</b></summary>

- Updates to the `runs get` command, including the ability to filter test run results on a specified time period, and to display the returned results in a detailed or raw format
- Ability to download test run artifacts using the `runs download` command
- Ability to debug a test locally using the `runs submit local` command
- Various documentation updates and enhancements
</details>  

<details>
<summary><b>0.27.0 - Release Highlights</b></summary>

- REST API enhancements:<br><br>
       * allow queries of test run details using the run name<br><br>
       * documentation added to the https://rest.galasa.dev/ website<br><br>

- Command-line tool `galasactl` now supports:<br><br>
       * the `GALASA_HOME` environment variable, which you can set to avoid using the `{HOME}/.galasa` folder <br><br>
       * querying of test run status using the run name <br><br>
       * the `--development` flag for `galasactl project create` and `galasactl local init` to enable generated code to use pre-released code versions of Galasa libraries, in addition to the ones published on Maven central <br><br>
       * automated tests run on every build <br>
</details>       

<details>
<summary><b>0.26.0 - Release Highlights</b></summary>

-  Initialise your development environment by using the  galasactl local init command
-  Launch a test within a local JVM by using the galasactl runs submit local command
-  Create an example project by using the galasactl project create command, which now supports --maven and --gradle flags to control which build system the caller wants to use.
-  3270 images are generated in the RAS results store (experimental code for this release)
-  SnakeYAML is upgraded to v1.33. This is a Java library for parsing yaml files.
-  Documentation updates on using the CLI to:
      -	initialise your local environment
      - create a project
      - run a test locally
-	 Various doc updates and enhancements to existing content
</details>


<details>
<summary><b>0.25.0 - Release Highlights</b></summary>


-	Colour support for 3270 application streams. Tests can now validate that an application is using the correct colours and highlighting for specified field(s) and screen position.
-	Various defect fixes, including fixing broken LTS connections in Java 11, updates to 3270 modifiable fields, and updates to the REST API.
-	VTP Manager enhancements, including additional logging for problem diagnosis and increased keyboard wait times to minimise the risk of keyboard locking.
-	New features have been added to the command-line tool: <br><br>
        * A `--log <filename>` option has been added to direct log information to a file.<br>
        * The `--log -` option directs log information to the console.<br>
        * Omitting the `--log` option suppresses the log information.<br>
        * Every error is numbered. For example: `GAL1028E: Failed to unmarshal test catalog from REST reply for property 'xxx'`<br>
        * Errors appear on stderr and in the log (if logging is turned on)<br>
        * Syntax documentation is fully generated and linked to from the <a href="https://github.com/galasa-dev/cli" target="_blank"> README</a>  in the cli repository.<br>
        *	galasactl is now supported on MaxOSX on arm64 architecture machines.<br>
-	Artifact Manager is updated to remove the need to create a second resources folder. 
-	Upgrades have been made to some dependencies.
</details>


<details>
<summary><b>0.24.0 - Release Highlights</b></summary>


- The minimum Java release now required for Galasa is version 11, rather than version 8. You will need to install a Java version 11 JDK or later to run Galasa tests. _Note:_ We do not currently support Java 17 or later. 
- Various enhancements to the DB2 Manager.
- Various defect fixes. 
- Various documentation fixes and enhancements. 
</details>

<details>
<summary><b>0.23.0 - Release Highlights</b></summary>

- New Helm charts are available for deploying a basic Galasa Ecosystem into a Kubernetes Namespace. Documentation can be found in the <a href="https://github.com/galasa-dev/helm/tree/released" target="_blank"> helm repository</a> in GitHub.
</details>

<details>
<summary><b>0.22.0 - Release Highlights</b></summary>

- The z/OS 3270 Manager now supports 3 new methods ```setCursorPosition(row,col)```, ```retrieveText(row,col,length)```, and ```retrieveTextAtCursor(length)```.
- The z/OS Batch Manager has a new method ```waitForJob(Second)```.
- The z/OS File Manager now supports two new methods ```getMemberName()``` and ```clone(IZosVSAMDataset model)```.
</details>

<details>
<summary><b>0.21.0 - Release Highlights</b></summary>

- An initial basic version of the DB2 Manager is now available.  This Manager is not yet ready for Production use and will be documented soon. 
- An initial basic version of the Cloud Manager is now available. This Manager is not yet ready for Production use and will be documented soon.
- Various build dependencies have been upgraded to remove publish security vulnerabilities.
- All Galasa bundles are now upgraded to version 0.21.0 to remove historical security vulnerabilities.
- A minor defect in the 3270 Manager is fixed. This Manager now supports ```DONT TIMING_MARK```. 
- A minor defect in the CICS TS Manager is fixed, resolving the issue of terminals not starting properly.
- The usage of Random is now replaced with SecureRandom.
- Various documentation enhancements. 
</details>

<details>
<summary><b>0.20.0 - Release Highlights</b></summary>

- The Galasa VTP Manager is now in Release. You can create an automated integration test in Galasa and use the VTP Manager to transparently record the interactions between the test and your CICS programs. The recorded file can be played back by using IBM Z VTP.
- Installing the Galasa Ecosystem by using the Kubernetes Operator is updated.
- Use the ```galasactl runs``` command to select tests based on the _@Tags_ annotation by using the ```--tag``` option.
- Galasa Docker images are moving from DockerHub to _icr.io_. Images in DockerHub (release 0.19.0 and before) will be deleted when 0.21.0 is released.
- The Core Manager now provides a _@ResourceString_ annotation and _IResourceString_  interface to generate random locked strings. Further details will be available on the website once the Manager documentation is refreshed.
- Various bug fixes and enhancements.
- Various documentation updates, including z/OS Program Manager documentation.
</details>

<details>
<summary><b>0.19.0 - Release Highlights</b></summary>

- The Galasa MQ Manager is now in Alpha, providing the ability to connect a test to an existing IBM MQ queue manager, and enabling one or more messages to be written to and read from existing queues.
- Various bug fixes and enhancements.
- Various documentation updates, including MQ Manager documentation.
</details>

<details>
<summary><b>0.18.0 - Release Highlights</b></summary>

- Various bug fixes
</details>

<details>
<summary><b>0.17.0 - Release Highlights</b></summary>

-	The z/OS File Manager contains a breaking change in this release. The ```void store(String content)``` and ```String retrieve(String content)``` methods in ```IZosUNIXFile``` have been replaced with ```void storeText(String content)```, ```void storeBinary(byte[] content)```, ```String retrieveAsText()``` and ```byte[] retrieveAsBinary()``` methods. This means that binary data is transferred as ```byte[]``` rather than ```String``` and now matches ```IZosDataset``` and ```IZosVSAMDataset```. If you are using the store() or retrieve() methods, you should change these to 
```storeText()``` and ```retrieveAsText()``` methods respectively.
-	The Galasa CLI is available for submitting and monitoring Galasa test runs.
- You can reset and delete automation runs in the Eclipse _Galasa Runs_ view.
-	You can search stored artifacts through the eclipse editor.
-	Various bug fixes and enhancements.
-	Documentation updates – Galasa CLI documentation and Galasa Hub page. 
-	Various documentation enhancements.
</details>


<details>
<summary><b>0.16.0 - Release Highlights</b></summary>

- The 3270 Manager now supports different screen sizes and can respond to query partition with colour and highlight. It also supports `bind_image` and `sysreq renegotiation`. 
- A range of Managers now have IVT tests associated with them. The IVTs help with testing the Managers themselves and also provide examples of how the Managers can be used.   
- Selenium Manager has been updated to squash some null pointer exception causing bugs. 
- Galasa tests can now be built with either Maven or Gradle. A set of Gradle example tests for SimBank is available. 
- Various bug fixes.
- Documentation - updates to installing the Galasa plug-in, running the SimBank tests and viewing the test results.
</details>

<details>
<summary><b>0.15.0 - Release Highlights</b></summary>

- Galasa now runs in any Java release from version 8 onwards.
- The Galasa Eclipse plug-in now supports all levels of Eclipse from Photon onwards. 
- Docker and Kubernetes provisioning implementations are available for the Selenium Manager. Additionally, a Selenium Grid can be used from Galasa. Local drivers are used in the same way as previous releases (with edited CPS configurations). 
- The *Find* dialog box is now available in the **Run Log** view of the Eclipse Editor.
- The ```IManager.youAreRequired()``` method signature has a new field. If you have a Custom Manager, you must recompile your Manager with this modification for it to run in release 0.15.0.
- The ```AbstractManager.addDependentManager()``` method signature has a new field. If you have a Custom Manager, you must recompile your Manager with this modification for it to run in release 0.15.0.
- The Core Manager is always loaded for every test run.
- The Docker Manager now supports exposed ports.
- Increased test coverage delivered via IVTs and Integration testing
- Basic Java and Windows Managers have been added. These Managers will initially be used internally for testing Galasa itself. 
- Various bug fixes
- Our internal Galasa build has moved to Gradle. No user impact is expected, but if you do find any problems whilst you’re using Galasa, you can raise an issue in the project management repository or post a question in our Galasa Slack workspace.
- The Maven Bundle Plugin that is used in the Galasa builds is now set to version ```5.1.1``` for Java compatibility.
- The GPG key to sign Maven artifacts is set to  ```5AB3E02B```
- Galasa is available for distribution as a zip file, which contains the Eclipse plugin, and necessary Maven artifacts and Docker images for local running. This allows customers who do not have access to Maven Central, Eclipse Marketplace or Docker Hub from their company network to use Galasa.
- Documentation updates - Installing the Galasa Ecosystem on Kubernetes documentation plus various documentation enhancements.
</details>

<details>
<summary><b>0.14.0 - Release Highlights</b></summary>

- <a href="https://github.com/galasa-dev/managers/tree/main/galasa-managers-parent/galasa-managers-zos-parent/dev.galasa.zosconsole.oeconsol.manager" target="_blank"> z/OS Console oeconsol Manager</a> is now in Alpha, providing an implementation of the z/OS Console by using the z/OS UNIX oeconsol command. 
- Enhanced Docker functionality, including volumes and custom start up configurations
- CPS restore from file functionality. Use the ```--restorecps``` command-line parameter when initialising the framework to trigger the restore CPS functionality.  Specify the file to restore from by using ```-f``` or ```--file```  in the KVP format  ```(<property>=<value>)```, with one new property per line.
- ```@ContinueOnTestFailure``` annotation. Use the annotation in the test class or switch the same functionality on globally by using the CPS property ```framework.continue.on.test.failure=true```.
- Documentation enhancements, including updates on Managers and writing test cases
</details>

<details>
<summary><b>0.13.0 - Release Highlights</b></summary>

- CEDA Manager is now in Alpha, providing CEDA 3270 interaction
- CEMT Manager is now in Alpha, providing CEMT 3270 interaction 
- Changes to the following CPS properties for z/OS MF:
```
zosmf.server.SERVERID.image=IMAGEID
zosmf.server.SERVERID.https=true
zosmf.server.SERVERID.port=443
zosmf.server.SERVERID.request.retry=3
zosmf.server.SERVERID.credentials=ZOS
zosmf.sysplex.PLEXID.default.servers=SERVERID,SERVERID
zosmf.image.IMAGEID.servers=SERVERID,SERVERID
```
If you have zOS/MF servers on each z/OS image, the following properties are the minimum that are required:
```
zos.image.MV2D.ipv4.hostname=mv2d.example.com
zosmf.server.port=9999
```
These settings assume a zOS/MF server on MV2D and the port overridden from `443` to `9999` for all zOS/MF servers. 
- Various bug fixes
- Documentation enhancements, including updates to About and Ecosystem documentation
</details>

<details>
<summary><b>0.12.0 - Release Highlights</b></summary>

- z/OS Manager support for RSE - provides tests and Managers with access to RSE functions, and implementations of z/OS Batch and File Manager by using the RSE API.
- CPS Backup feature - enables CPS properties to be output to a plain-text file. Use ```--backupcps``` as a command-line option when running the *galasa-boot* jar alongside the file option ```-f``` or ```--file``` to specify an output file for the properties.
- Various bug fixes
- Updated documentation for RSA, Linux and Open Stack Managers
</details>

<details>
<summary><b>0.11.0 - Release Highlights</b></summary>

- Galasa Kubernetes operator is now in Alpha. The Kubernetes operator creates and maintains Galasa ecosystems by using Kubernetes, enabling Galasa tests to run in an automated environment or pipeline. See the [ReadMe](https://github.com/galasa-dev/galasa-kubernetes-operator) for more information.  
- z/OS 3270 improvements and fixes, including support for NEGTSECURE ports and for z/VM (TN3270)
- Various bug fixes
- Documentation updates - Galasa Ecosystem - overview, architecture and Docker operator installation guide, documentation improvements
</details>

<details>
<summary><b>0.10.0 - Release Highlights</b></summary>

- z/OS Program Manager is now in Alpha
- Docker Operator is now in Alpha. The Docker Operator creates Galasa ecosystems in Docker, enabling Galasa tests to run in an automated environment or pipeline. See the [ReadMe](https://github.com/galasa-dev/galasa-docker-operator) for more information.  
- Various bug fixes
- Documentation updates - upgrading and z/OS Program Manager
</details>

<details>
<summary><b>0.9.0 - Release Highlights</b></summary>

- CECI Manager is now in Release
- HTTP Client Manager is now in Release
- Updates to the Visual Studio Code Galasa extension, including full support for local runs - search for _Galasa_ in the extensions marketplace and check the ReadMe for prerequisites (essentially, Java 8 JDK, and _only_ Java 8 JDK, plus a version of Maven that supports Java 8)
- Documentation updates - z/OS 3270 Manager and IP Network Manager
- Landing page improvements
</details>

<details>
<summary><b>0.8.0 - Release Highlights</b></summary>

- NEW Improvements in Artifact Manager make streaming text content a single-step process
- NEW alpha version of a Visual Studio Code Galasa extension - search for _Galasa_ in the extensions marketplace and check the ReadMe for prerequisites (essentially, Java 8 JDK, and _only_ Java 8 JDK, plus a version of Maven that supports Java 8)
- 3270 Manager bug fixes and updates
- Message lines in the run log are now shorter
- Documentation updates - HTTP Client Manager and the z/OS family of Managers
</details>

<details>
<summary><b>0.7.0 - Release Highlights</b></summary>

- NEW TSO Command SSH Manager (alpha) - securely issue TSO commands
- NEW UNIX Command SSH Manager (alpha) - securely issue UNIX commands
- CECI manager is now in Beta
- JMeter manager is now in Beta
- CICS CECI manager is now in Beta
- Plus other enhancements and bug fixes
  </details>

<details>
<summary><b>0.6.0 - Release Highlights</b></summary>
<b>Release date - 2020-04-01</b>

- <b>Selenium Manager (alpha)</b> - enabling a test to run Selenium WebDrivers in order to drive Web Browsers during the test.
- <b>JMeter Manager (alpha)</b> - enabling a JMeter session to run inside a Docker Container.
- <b>Documentation update</b> - how to start writing your own independent Galasa tests.
  </details>

<details>
<summary><b>0.5.0 - Release Highlights</b></summary>
<b>Release date - 2020-03-09</b>

- <b>z/OS Batch Manager (beta)</b> - enabling tests and Managers to submit, monitor and retrieve z/OS batch jobs.
- <b>CICS CECI Manager (alpha)</b> - providing CECI 3270 interaction - initially supporting containers and link programs.
- <b>Ecosystem Manager (alpha)</b> - enabling deployment of an entire Galasa Ecosystem to Kubernetes to enable integration testing against Galasa.
- <b>Docker Manager (release) </b> - enabling containers to run on infrastructure Docker engines - either for testing directly or for assisting the testing process.
- <b>Documentation update</b> - how to start writing your own Simbank tests.
- <b>Documentation update</b> - new SimBank z/OS Batch Manager tutorial available.
  </details>

<details>
<summary><b>0.4.0 - Release Highlights</b></summary>
<b>Release date - 2020-02-12</b>

- <b>Docker Manager (beta)</b> - enabling the provisioning of Docker Containers for tests to use.
- <b>Kubernetes Manager (alpha)</b> - enabling the provisioning of Kubernetes Namespaces.
- <b> Galasa Ecosystem Manager (alpha)</b> - enabling the provisioning of the entire Galasa Ecosystem in Kubernetes so you can run an integration devops pipeline.
- <b> Elastic Logger Manager (alpha)</b> - enabling test results to be exported to Elastic Search.
- <b> Shared Environment (alpha) - enabling Managers to create a testing environment for multiple tests to use.
- <b>Documentation update</b> - Manager reference pages are available.
  </details>

<details>
<summary><b>0.3.0 - Release Highlights</b></summary>
<b>Release date - 2019-12-04</b>

- <b>Launch of website</b> - providing alpha documentation and installing guide.
- <b>Galasa:Simbank</b> - implementing a sample banking application against which you can configure and run a set of provided tests.
- <b>z/OS Manager (beta)</b> - providing tests and Managers with configuration information about z/OS images and Sysplexes.
  </details>
