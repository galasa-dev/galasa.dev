---
path: "/docs/cli-command-reference/cli-runs-submit-local"
title: "Running tests locally using the command line"
---

The `galasactl runs submit local` command submits tests to run within the local JVM, rather than dynamically deploying the tests to a remotely deployed Galasa Ecosystem. 

Running tests locally should only be used during test development to verify that the test is behaving as expected. 
Local runs do not benefit from the features that are provided when running tests within a Galasa Ecosystem. For example, resources are not cleaned-up in the event of a failure and scaling capabilities are limited by workstation resources. 


## Working with the `runs submit local` command

To use the `galasactl runs submit local` command, the `JAVA_HOME` environment variable must be set to reference the JVM in which you want the test to run, as described in the [CLI prerequisites](/docs/cli-command-reference/cli-prereqs) documentation. This is because the local java run-time environment is used to launch the test locally. To check that `JAVA_HOME` is set correctly, the tool checks that `$JAVA_HOME/bin/java` exists in Unix or Mac, and `%JAVA_HOME%\bin\java.exe` exists on Windows.

The level of Java must match the supported level of the Galasa version that is being launched. Use the `galasactl --version` command to find the galasactl tool version. We currently support Java version 11 to version 16 JDK. _Note:_ We do not currently support Java 17 or later.


Use the following command to run a test in the local JVM.

On Mac or Unix:

```
galasactl runs submit local --log - \
--obr mvn:dev.galasa.example.banking/dev.galasa.example.banking.obr/0.0.1-SNAPSHOT/obr \
--class dev.galasa.example.banking.account/dev.galasa.example.banking.account.TestAccount
```

On Windows (Powershell):

```
galasactl runs submit local --log - `
--obr mvn:dev.galasa.example.banking/dev.galasa.example.banking.obr/0.0.1-SNAPSHOT/obr `
--class dev.galasa.example.banking.account/dev.galasa.example.banking.account.TestAccount
```

where:

- `--log` specifies that debugging information is directed somewhere, and the `-` means that it is sent to the console (stderr).
- `--obr` specifies where the  CLI tool can find an OBR which refers to the bundle where the tests are stored. When running locally, all tests must exist in the OBR (or OBRs) that are passed to the tool. The `--obr` parameter specifies the Maven co-ordinates of the obr jar file, in the format `mvn:groupId/artifactId/version/classifier`.
- `--class` specifies which test class to run. The string is in the format of `<osgi-bundle-id>/<fully-qualified-java-class>`. All test methods within the class are run. Use multiple flags to test multiple classes.

You can view the full list of options that are available with the `galasactl runs submit local` command in the 
<a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_runs_submit_local.md" target="_blank">Galasa cli repository</a>.


## Stopping a running test

Use `Ctrl-C` to stop the Galasa CLI, ending all test activity. Note that this might leave the system under test with resources that are not cleaned-up.

## Troubleshooting

If you have problems running the command, check that you have installed the correct version of Java installed and that you have set your JAVA_HOME environment variable, as described in the [CLI prerequisites](cli-prereqs) documentation. Make sure you have added the Galasa CLI to your PATH and that you have [initialised your local environment](../../docs/initialising-home-folder) by running the `galasactl local init` command. Ensure that you have created and built the example project, as described in the [Creating a Galasa project using the command line](../writing-own-tests/setting-up-galasa-project) documentation. 


## Next steps

Once you have run a test, read the [Debugging a test locally](cli-runs-local-debug) documentation to find out how to connect your Galasa test with a Java debugger on a specified port, and configure your IDE to connect to that same port so that you can run your test locally in debug mode. 

