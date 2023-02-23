---
path: "/docs/initialising-home-folder"
title: "Initialising your local environment by using the CLI"
---

To start using Galasa tools, or running Galasa tests, you need to set up some basic file structures and files in your home folder, so that you have a default bootstrap file, and local properties files which can be extended in future by user activities. The following documentation shows you how to use the CLI tool to initialise your Galasa home folder and environment. and to understand the purpose of the files that are created.

## Initialising the Galasa home folder

To initialise your Galasa home folder in your home directory along with the properties files, use the following command:

```
galasactl local init [flags]
```

This one-time command helps you to get the folder and files set up quickly and is run once per user. If you already have a Galasa home folder set up, the folder and files are not created. 

The command creates the following file structure, with default contents in each of the files:

```
${HOME}/.galasa
├── bootstrap.properties
├── cps.properties
├── credentials.properties
├── dss.properties
├── overrides.properties
```

You can validate the set up by locating your user home directory and confirming that it contains a .galasa folder. On Windows, the user home directory resembles: ```C:\Users\<username>```, on MacOS it will be ```/Users/<username>``` and on Linux ```/home/<username>```. Note that any file or folder beginning with a `.` is a hidden folder, so you might need to change the settings on your operating system to show hidden files.


You are now ready to start running Galasa tests on your local JVM.

## About the properties files

The following table explains a bit more about the purpose of the properties files that are created: 

| Name |  Description  |
| :---- | :-------- | 
| bootstrap.properties  | The bootstrap contains the information that Galasa needs to bring up a framework in the environment to connect to the Galasa Ecosystem. If you are running a test on your local machine, the bootstrap file is blank as it does not need to refer to the ecosystem. |
| cps.properties | The configuration property store (CPS) defines object properties, topologies, system configurations, and definitions which instruct the way in which a Galasa test runs. For example, properties for endpoints, ports and timeouts. When running in an ecosystem, all Galasa tests will use the same CPS configuration, unless any overrides are passed at submission. It is the CPS and the configurational properties that enable tests to run against multiple environments, without changing the code inside the test. | 
| credentials.properties | It is likely that a test will need to pass credentials to the application being tested. For example, as HTTP credentials or as username and password values entered onto a 3270 screen. Rather than hard code the credentials inside a test class, you can store the values in the credentials.properties file when the test is run locally. The ability to get credentials from a credentials store means that you do not need to hard code these values inside a test, enabling the test to be run in different environments without changing a single line of code. |
| dss.properties  | The dynamic status store (DSS) provides status information about the ecosystem and the tests that are running. The DSS is used by the resource manager and engine controller to ensure the limits that are set in the CPS configuration are not exceeded. DSS property values change dynamically as tests are run, showing the resources that are currently being used, shared or locked by a test, so that workloads can be limited to avoid throttling. When running in automation, the DSS is shared by every instance of the framework. | 
| overrides.properties | Specifying overrides is useful if you want to run a set of tests against a particular configuration without changing the test code. For example, you might have multiple versions of software that you need to test. How can you do that without changing the test code? The answer is to use override properties. If you are running tests locally, you can set overrides properties by editing your Overrides Properties file. If you are running tests in an ecosystem, you can use the --override parameter in the Galasa CLI. Note that overrides in the portfolio take precedence over the overrides on the runs submit command. This is so that you can set general overrides on the submit, but have specific class overrides in the portfolio. | 


## Getting help

Use the following options to get more information about the command and command options, including default values.

```
-h, --help   help for init
```

Use the following options to send logging information to a file. Any folder that is referrenced must exist. Existing files are overwritten. Specify `-` to log to `stderr`. The defaults is no logging.

```
-l, --log string   
```  