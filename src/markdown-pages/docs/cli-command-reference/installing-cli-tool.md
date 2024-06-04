---
path: "/docs/cli-command-reference/installing-cli-tool"
title: "Installing the Galasa CLI online"
---


This section provides details about how to download and install the binary file for the Galasa CLI from the Galasa CLI respository in GitHub to your local machine, and tells you a little bit about getting started with the Galasa CLI commands. 


## Downloading the Galasa CLI

The following versions of the Galasa CLI are available to download for different operating systems and machine architectures:

| Operating system  |  Architecture  | Download  |
| :---- | :---- | :-------- | 
| MacOSX | x86_64 | galasactl-darwin-x86_64 |
| MacOSX | arm64 | galasactl-darwin-arm64 |
| Linux | x86_64 | galasactl-linux-x86_64 | 
| Linux arm64 | arm64 | galasactl-linux-arm64 | 
| zLinux  | s390x| galasactl-linux-s390x | 
| Windows | x86_64| galasactl-windows-x86_64.exe | 


## Installing the Galasa CLI

Complete the following steps to install Galasa for using the command line:

On Mac or Unix:

1. Find out the architecture of your machine by typing the command `uname -m` into your terminal.
2. Download the appropriate binary of the Galasa CLI for your machine architecture from the <a href="https://github.com/galasa-dev/cli/releases" target="_blank"> Galasa CLI repository</a> in GitHub and re-name it to `galasactl`.
3. Add the Galasa CLI to your PATH to enable you to run CLI commands from anywhere on your file system without having to specify the absolute path. To set the path permanently, you need add the Galasa CLI path to your shell's initialization file. For example, if you downloaded the galasactl executable to a folder called `~/tools` in your home directory, you need to add `~/tools` to the list of directories that your shell searches through when you enter a command. You can do this by adding the line ```export PATH=$PATH:$HOME/tools``` to your shell’s initialization file (for example `~/.bashrc` or `~/.zshrc`). 
4. Set execute permission on the binary by running the `chmod +x galasactl` command in the directory containing `galasactl`.If you are using a Mac, you can set permission to open the Galasa CLI tool by running the `xattr -dr com.apple.quarantine galasactl` command in the directory containing `galasactl`. 

You can now run the Galasa CLI tool from any directory in your file system without having to specify the absolute path.


On Windows (Powershell):

1. Download the binary and re-name it to `galasactl`.
2. Add the `galasactl` executable to your PATH to enable the tool to be called from the command line without having to specify the path to the directory in which it is stored. You can edit the PATH variable in your System environment variables to add the path to the directory in which you downloaded the `galasactl` executable.
3. Open a command prompt and type `start galasactl.exe`.

You can now run the Galasa CLI tool from any directory in your file system without having to specify the absolute path.



## Next steps


Find out more about the Galasa CLI commands by reading the [Galasa CLI commands](cli-command-reference-about) documentation.

Move on to the [Initialising your local environment](/docs/initialising-home-folder) documentation to help you to set up some basic file structures and files in your home folder so that you can start using Galasa.







