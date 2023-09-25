---
path: "/docs/initialising-home-folder"
title: "Initialising your local environment"
---

To start using Galasa tools, or running Galasa tests, you need to set up some basic file structures and files in your home folder. These files include a default bootstrap file, and some local properties files. For more information about these files and what they are used for, see the [About the properties files](#about) section. 

The following section shows you how to initialise your Galasa home folder by using the Galasa command line interface tool (Galasa CLI) that is provided with Galasa. Once your home folder is initialised, you can start running Galasa tests on your local JVM. 

You can view the full list of options (flags) that are available with the `galasactl local init` command in the [Galasa cli repository](https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_local_init.md).



## Setting the Galasa home folder

Galasa comes with a home folder, that is set to `~/.galasa` by default. The home folder is a writable folder that is used by default to store test results and artifacts which are created when tests are run using local JVMs.

This value can be overridden using the `GALASA_HOME` environment variable. Setting this variable means that you can control where files are created, where Galasa retrieves settings from, and where local test run results and artifacts are stored. This is useful if you need isolation between multiple Galasa local test environments, if you want to share your configuration and test run results with others, or if your `~/.galasa` folder is low on disk space.

For example, to set the `GALASA_HOME` environment variable to a folder called _mygalasatests_ in a directory called _temp_, use the following command:

On Mac or Unix:

``` 
export GALASA_HOME=/temp/mygalasatests
```

On Windows: 

``` 
set GALASA_HOME=C:\temp\mygalasatests
```

You can override the value of the `GALASA_HOME` environment variable on a call-by-call basis by using the `--galasahome` command-line option.

If you change the `GALASA_HOME` variable to a non-existent or non-initialised folder path, you can create the folder and re-initialise the folder path by running the `galasactl local init` command.


## Initialising the Galasa home folder

To initialise your Galasa home folder in your home directory along with the properties files, use the following command:

```
galasactl local init
```


This one-time command is run once per user and helps you to quickly create the folder and files that you need. If you already have a Galasa home folder set up, the folder and files are not created. 

The command creates the following file structure, with default contents in each of the properties files:

```
${HOME}/.galasa
├── bootstrap.properties
├── cps.properties
├── credentials.properties
├── dss.properties
├── overrides.properties
```

You can validate the set up by locating your user home directory and confirming that it contains a `.galasa` folder. On Windows, the user home directory resembles: ```C:\Users\<username>```, on MacOS it will be ```/Users/<username>``` and on Linux ```/home/<username>```. Note that any file or folder beginning with a `.` is a hidden folder, so you might need to change the settings on your file browser user interface to show hidden files.

## <a name="about"></a>About the properties files

The following table explains a bit more about the purpose of the properties files that are created: 

| Name |  Description  |
| :---- | :-------- | 
| bootstrap.properties  | The bootstrap contains the information that Galasa needs to bring up a framework in the environment to connect to the Galasa Ecosystem. If you are running a test on your local machine, the bootstrap file is blank as it does not need to refer to the ecosystem. |
| cps.properties | The configuration property store (CPS) defines object properties, topologies, system configurations, and definitions which instruct the way in which a Galasa test runs. For example, properties for endpoints, ports and timeouts. When running in an ecosystem, all Galasa tests will use the same CPS configuration, unless any overrides are passed at submission. It is the CPS and the configurational properties that enable tests to run against multiple environments, without changing the code inside the test. You can extract a test property value from the CPS file for use in a test by using the `@TestProperty` annotation that is provided by the Core Manager.| 
| credentials.properties | It is likely that a test will need to pass credentials to the application being tested. For example, as HTTP credentials or as username and password values entered onto a 3270 screen. Rather than hard code the credentials inside a test class, you can store the values in the credentials.properties file when the test is run locally. The ability to get credentials from a credentials store means that you do not need to hard code these values inside a test, enabling the test to be run in different environments without changing a single line of code. You can extract credentials to use in your test by using the `getCredentials` method that is provided by the Core Manager. |
| dss.properties  | The dynamic status store (DSS) provides status information about the ecosystem and the tests that are running. The DSS is used by the resource manager and engine controller to ensure the limits that are set in the CPS configuration are not exceeded. DSS property values change dynamically as tests are run, showing the resources that are currently being used, shared or locked by a test, so that workloads can be limited to avoid throttling. When running tests locally (inside Eclipse or using the CLI), all tests use the local file as the DSS. | 
| overrides.properties | Specifying overrides is useful if you want to run a set of tests against a particular configuration without changing the test code. For example, you might have multiple versions of software that you need to test. How can you do that without changing the test code? The answer is to use override properties. If you are running tests locally, you can set overrides properties by editing your Overrides Properties file.  | 



## Setting the Galasa bootstrap 

The bootstrap is a simple properties file that contains the information that Galasa needs to bring up a framework to connect to an ecosystem. If you are running a test remotely in a Galasa Ecosystem, or if you are running a test locally but using a shared configuration that is hosted by the Galasa Ecosystem, the Galasa bootstrap is set to the URL of the Galasa Ecosystem in which you want to run your test or in which the shared configuration is stored. The bootstrap is blank only when a test is run locally, without using shared configuration. For more information about the modes in which you can run a Galasa test, see the [Running a Galasa test](/docs/writing-own-tests/running-test-modes) documentation. 

If you are planning to only run tests locally, with everything running on the local machine, you do not need to set the Galasa bootstrap. Otherwise, you can set the bootstrap either by using the `--bootstrap` option on the CLI command or by setting the `GALASA_BOOTSTRAP` environment variable. If both are provided, the `--bootstrap` option takes precedence.

You can set environment variables on a terminal by using the `export` (if you are on Mac or Linux) or `set` (if you are on Windows) command. For example, to set `GALASA_BOOTSTRAP` to `http://my-bootstrap-url`, use the following command:

On Mac or Unix:

``` 
export GALASA_BOOTSTRAP=http://my-bootstrap-url
```

On Windows: 

``` 
set GALASA_BOOTSTRAP=http://my-bootstrap-url
```


## Initialising the settings.xml file
 
The `settings.xml` file enables you to set configurations for Maven to use during test runs. For example, you can set local and remote repository locations, credentials for private repositories, and Maven profile settings. 

If you have Maven installed, and have run a Maven command, an `/.m2` folder, containing a folder called `repositories`, should exist in your home directory. Running the `galasa local init` command then automatically creates a `settings.xml` file in this `/.m2` folder, and populates the file with basic configuration settings.


## Next steps

You can now start [creating a project using the CLI](/docs/writing-own-tests/setting-up-galasa-project) to accommodate your own independent tests in your local storage.



