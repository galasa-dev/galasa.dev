---
path: "/docs/upgrading"
title: "Upgrading"
---

## Upgrading (online)

You can get the upgrade your version of Galasa by completing the following steps:

1. Download the appropriate version of the Galasa CLI for your machine architecture from the <a href="https://github.com/galasa-dev/cli/releases" target="_blank"> Galasa CLI repository</a> in GitHub.
2. Re-name the your existing `galasactl` binary so that you can re-name the Galasa binary that you just downloaded to `galasactl` to replace it. 
3. Set execute permission on the binary by running the `chmod +x galasactl` command in the directory containing `galasactl`.If you are using a Mac, you can set permission to open the Galasa CLI tool by running the `xattr -dr com.apple.quarantine galasactl` command in the directory containing `galasactl`. 

If you have already added the Galasa CLI path to your shell's initialization file, as described in the [Installing the Galasa CLI online](../docs/cli-command-reference/installing-cli-tool) topic, you should now be able to run the upgraded version of the Galasa CLI tool from any directory in your file system.


## Upgrading the Galasa zipped distribution using the command line (offline)

Download and extract the Galasa zip file to a directory of your choice and complete the steps documented in the [Installing the Galasa CLI offline](../docs/cli-command-reference/installing-offline) topic.



## Upgrading from using Eclipse to using the command line (online)

Version 0.31.0 is the last version of the Eclipse plug-in for Galasa that is produced and maintained by the Galasa Team.
You can work with later versions of Galasa by using the Galasa command line interface (CLI). The galasactl tool can do everything that the Eclipse tooling can do, and can be run from the command-line of any IDE, for example, the Eclipse terminal view. 


There is also a video about <a href="https://www.youtube.com/watch?v=lwYOwJZ4Q8Q" target="_blank">
the Galasa command line tool </a> that is available to watch on YouTube. Watch the video to learn about the software requirements you need to get started with galasactl and find out how to download and install it on your local machine. There is also a demo that takes you through the process of creating, building and running Galasa tests, and viewing the output of those test runs. <br>


To upgrade to a Galasa version that uses the CLI when your previous Galasa version was using Eclipse, complete the following steps:

1. Check that you have the software that you need installed by viewing the [CLI prerequisites](../docs/cli-command-reference/cli-prereqs) topic.
2. Complete the steps outlined in the [Installing the Galasa CLI online](../docs/cli-command-reference/installing-cli-tool) topic to download and install the correct Galasa CLI binary file for your machine architecture.
3. Check that you have an OBR project for your test code. If not, you can create a project that uses the names that you want by using the `galasactl project create` command, and copying your test code into the correct places. For more information about the `galasactl project create` command, see the [Creating a Galasa project](../docs/writing-own-tests/setting-up-galasa-project) topic.

If you encounter any difficulties, reach out for help in our <a href="https://openmainframeproject.slack.com/archives/C05TCCQDE65" target="_blank"> Galasa Slack</a> workspace in the `#galasa-users` channel.


## Upgrading existing tests

If you have a pre-built version of tests that were created against an earlier version of Galasa in your local repository, you need to rebuild those test projects and any associated Managers after ugprading, so that the pom.xml files of those tests and Managers specify the new version of Galasa.


A simple way to do this is to complete the following steps: 

1. Search your Galasa files for the version number against which the tests were created, for example *0.27.0*. A filtered list of files containing *0.27.0* is returned. 
2. Check each pom.xml file and replace that version number with the new version number, for example, *0.28.0*. 

**NOTE:** Do not update version numbers for non-Galasa dependencies or plug-ins. Only replace the version number for Galasa dependencies, where the *groupId* is set to *dev.galasa*, as per the following examples:

```
<parent>
<groupId>dev.galasa</groupId>
<artifactId>galasa-parent</artifactId>
<version>0.28.0</version>
</parent>
```

```
<dependencies>
        <dependency>
            <groupId>dev.galasa</groupId>
            <artifactId>dev.galasa</artifactId>
            <version>0.28.0</version>
            <scope>provided</scope>
        </dependency>
```
3. Check that the OBR version in the Galasa preferences references the new version of Galasa.<br><br>
    If you are using VS code, complete the following steps: <br><br>
        a. Go to  *File > Preferences > Settings* and expand the *Extensions* section.<br><br> 
        b. Select *Galasa* and check that the *Version* field is using the default value of ```main```, to automatically select the latest version. 

## Troubleshooting

If you have problems after completing the steps for upgrading, try running a clean install. 

To run a clean Maven install, run the ```mvn clean install ``` command from the command line. 

To run a clean Gradle install, run the ```gradle clean build``` command from the command line.

If you are still having issues, you can force a full rebuild by deleting your *.m2* repository and creating a new build against your test projects and Managers by running a clean install.

You can also post a question in our <a href="https://openmainframeproject.slack.com/archives/C05TCCQDE65" target="_blank"> Galasa Slack</a> workspace.