---
path: "/docs/cli-command-reference/installing-cli-tool"
title: "Installing the Galasa CLI"
---

This section provides details about prerequisite software requirements and information about how to download and install the Galasa command line interface tool (Galasa CLI) on your local machine. 


## Prerequisites

| Software |  Description  |
| :---- | :-------- | 
| Java JDK  | Required. Galasa tests and Managers are written in Java - you need to install a Java version 11 JDK or later to use it. _Note:_ We do not currently support Java 17 or later. |
| Maven or Gradle  | You must install either Maven or Gradle in order to build Galasa projects. Galasa projects are hierarchical file structures that provide the ability to store and run Galasa tests. All Galasa versions are compatible with Gradle 6.x releases. |
| 3270 emulator | Optional. Although you do not need a 3270 emulator to run a Galasa test (even if it tests a 3270 application) you can use one to explore Galasa Simbank, a simulated version of an application that helps you get acquainted with Galasa before connecting to a real mainframe to run your own tests. There are many such emulators available but IBM's Personal Communications (PCOMM) is frequently used, as is IBM's Host on Demand software, which includes support for Windows, Linux and MacOS.| 


## Downloading the Galasa CLI

To install Galasa for using in the command-line you first need to download the binary file for the Galasa CLI from the Galasa cli respository in GitHub. 

The following versions of the Galasa CLI are available to download for different operating systems and machine architectures:

| Operating system  |  Download  |
| :---- | :-------- | 
| MacOSX  | galasactl-darwin-x86_64 |
| MacOSX  | galasactl-darwin-arm64 |
| Linux 64-bit x86 | galasactl-linux-x86_64 | 
| Linux arm64 | galasactl-linux-arm64 | 
| zLinux  | galasactl-linux-s390x | 
| Windows | galasactl-windows-x86_64.exe | 


## Installing the Galasa CLI

Complete the following steps to install Galasa for using the command line:

On Mac or Unix:

1. Find out the architecture of your machine by typing the command `uname -m` into your terminal.
2. Download the appropriate binary of the Galasa CLI for your machine architecture from the [Galasa cli repository](https://github.com/galasa-dev/cli/releases) in GitHub and re-name it to `galasactl`.
3. Add Galasa CLI to your PATH to enable you to run CLI commands from anywhere on your file system without having to specify the absolute path. To set the path permanently, you need add the Galasa CLI path to your shell's initialization file. For example, if you downloaded the galasactl executable to a folder called `~/tools` in your home directory, you need to add `~/tools` to the list of directories that your shell searches through when you enter a command. You can do this by adding the line ```export PATH=$PATH:$HOME/tools``` to your shell’s initialization file (for example `~/.bashrc` or `~/.zshrc`). 
4. Set execute permission on the binary by running the `chmod +x galasactl` command in the directory containing `galasactl`.
5. If you are using a Mac, you can set permission to open the Galasa CLI tool by running the `spctl --add galasactl` command in the directory containing `galasactl`. You are prompted by a security panel asking you to log in to show that you are issuing the command.

You can now run the Galasa CLI too from any directory in your file system without having to specify the absolute path.


On Windows (Powershell)

1. Download the binary and re-name it to `galasactl`.
2. Add `galasactl` to your PATH to enable the tool to be called from the command line without having to specify the path to the directory in which it is stored. For example, save the galasactl executable to a folder called `~/tools` in your `C:` directory and run the `setx PATH "C:\tools;%PATH%"` command to add it to your PATH.
3. Open `cmd.exe` and type `start galasactl.exe` in the directory containing `galasactl`.

You can now run the Galasa CLI too from any directory in your file system without having to specify the absolute path.

## Installing Java 

Install a Java version 11 JDK or later. We do not currently support Java 17 or later. The following example uses Homebrew to install Java version 11 on a MacOS.

1. Install Java version 11 JDK using HomeBrew by running the following command in your terminal:
```
brew install openjdk@11
```
2. Set the JAVA_HOME environment variable to reference the JVM in which you want the test to run. To avoid setting this on every terminal, add the following information to your shell’s initialization file:
```
export JAVA_HOME=/path/to/your/jdk/Contents/Home
```
where `/path/to/your/jdk` is you JDK path. 
You can find your JDK path by running the `which java` command in your terminal. 



## Installing Maven

Install Maven 3.8 or later. The following example uses Homebrew:

1. Run the following command to install Maven:
```
brew update
brew install maven
```
2. Add the follwing information to your `~/.m2/settings.xml` file:
```
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <pluginGroups>
        <pluginGroup>dev.galasa</pluginGroup>
    </pluginGroups>
     
    <profiles>
        <profile>
            <id>galasa</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>maven.central</id>
                    <url>https://repo.maven.apache.org/maven2/</url>
                </repository>
                <!-- To use the bleeding edge version of galasa, use the development obr
                <repository>
                    <id>galasa.repo</id>
                    <url>https://development.galasa.dev/main/maven-repo/obr</url> 
                </repository>
                -->
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>maven.central</id>
                    <url>https://repo.maven.apache.org/maven2/</url>
                </pluginRepository>
                <!-- To use the bleeding edge version of galasa, use the development obr
                <pluginRepository>
                    <id>galasa.repo</id>    
                    <url>https://development.galasa.dev/main/maven-repo/obr</url> 
                </pluginRepository>
                -->
             </pluginRepositories>
         </profile>
     </profiles>
</settings>
```
This information tells Maven where to find some custom Maven plug-in tools that are used by the build.


## Installing Gradle

1. Install <a href="https://gradle.org/install/" target="_blank"> Gradle</a> version 6.x. *Note:* Gradle version 7.x is not currently supported.
2. Put Gradle on your PATH by adding the following information to your shell’s initialization file:
```
export PATH="/opt/homebrew/opt/gradle@6/bin:$PATH"
gradle --version | grep "Gradle" | cut -f2 -d' '
```

## Next steps

Read the [Initialising your local environment](/docs/initialising-home-folder) documentation to help you to set up some basic file structures and files in your home folder so that you can start using Galasa.







