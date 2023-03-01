---
path: "/docs/cli-command-reference/cli-runs-submit-local"
title: "The runs submit local command"
---

The `runs submit local` command submits tests to run within the local JVM, rather than dynamically deploying the tests to a remotely deployed Galasa ecosystem. 

Runnning tests locally should only be used during test development to verify that the test is behaving as expected. 
Local runs do not benefit from the features that are provided when running tests within a Galasa Ecosystem. For example, resources are not cleaned-up in the event of a failure and scaling capabilities are limited by workstation resources. 

## Working with the `runs submit local` command

To use the `runs submit local` command, the `$JAVA_HOME` variable must be set to reference the JVM in which you want the test to run, as the local java run-time environment is used to launch the test locally. The level of Java must match the supported level of the Galasa version that is being launched. Use the `galasactl --version` command to find the galasactl tool version.

Use the following command to run a test in the local JVM:

```
galasactl runs submit local --log - \
          --obr mvn:dev.galasa.example.banking/dev.galasa.example.banking.obr/0.0.1-SNAPSHOT/obr
          --class dev.galasa.example.banking.account/dev.galasa.example.banking.account.TestAccount
```

where:

- `--log` specifies that debugging information is directed somewhere, and the `-` means that it is sent to the console (stderr).
- `--obr` specifies where the  CLI tool can find an OBR which refers to the bundle where the tests are stored. When running locally, all tests must exist in the OBR (or OBRs) that are passed to the tool. The `--obr` parameter specifies the Maven co-ordinates of the obr jar file, in the format `mvn:groupId/artifactId/version/classifier`.
- `--class` specifies which test class to run. The string is in the format of `<osgi-bundle-id>/<fully-qualified-java-class>`. All test methods within the class are run. Use multiple flags to test multiple classes.
- `--throttle` specifies the number of test runs that can be submitted in parallel. A value of `1` means that all tests run sequentially. A higher throttle value means that local tests run in parallel.


## Stopping a running test

Use `Ctrl-C` to interrupt the `galasactl` tool. The tools stops immediately, ending all test activity. Note that this might leave the system under test with resources that are not cleaned-up.





