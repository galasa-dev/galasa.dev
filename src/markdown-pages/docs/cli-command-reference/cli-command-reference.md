---
path: "/docs/cli-command-reference/cli-command-reference"
title: "Getting started using the Galasa CLI"
---

Use the Galasa command line interface (Galasa CLI) to help you complete tasks, for example, submitting and monitoring Galasa test runs. You can use the same set of Galasa CLI commands to run a given task, regardless of the technology that you are using. 

## Installing the CLI tool

You can [download the CLI tool](https://github.com/galasa-dev/cli/releases) from the _cli_ repository in GitHub. 

The following versions of the Galasa CLI tool are available to download for different operating systems:

| Operating system  |  Download  |
| :---- | :-------- | 
| MacOSX  | galasactl-darwin-amd64 |
| MacOSX  | galasactl-darwin-arm64 |
| Linux amd64 | galasactl-linux-amd64 | 
| zLinux  | galasactl-linux-s390x | 
| Windows | galasactl-windows-amd64.exe | 

If you are using a Mac operating system, you can check which download you need by opening the Apple menu and choosing `About this Mac`. Click `More Info`, then scroll down and click the `System Report` button.
Check the `Processor Name` on the Hardware Overview panel. If your Mac has a M1 or M2 chip, a Processor Name is not listed; instead, a Model Number and Chip is displayed. If you are using a Mac with an M1 or M2 chip, choose the `galasactl-darwin-arm64` download. If you are using an Intel processor, choose the `galasactl-darwin-amd64` download. Alternatively, you can type the command `uname -m` into your terminal. If a value `arm64` is returned, download `galasactl-darwin-arm64`. If a value `x86_64` is returned, download `galasactl-darwin-amd64`.


## Getting started 

After downloading the binary, re-name it to `galasactl`. If you are using a Mac and get an error that is similar to the following example: `"galasactl" cannot be opened because it is from an unidentified developer`, click `OK`, go to `Privacy & Security` in your System Settings, and click `Open Anyway`. Alternatively, control-click the downloaded icon, choose `Open` from the pop-up menu and then click `Open`. If you are using Windows, you need to open `cmd.exe` and type `start galasactl.exe` in the same directory in which you downloaded the tool.

It is useful to put the Galasa CLI tool that you downloaded on your PATH, so that you can call the tool from the command line without having to provide the path to where it is located. If you are using a Mac, you can find `PATH`, and the directories stored within it, by entering the command `echo $PATH | tr ":" "\n"` in your terminal. If you are using Windows, type the command `C:\> echo %PATH%`. To make the Galasa CLI tool available anywhere, either add that binary into a directory that is in your PATH, or add a new directory that contains the tool to your PATH.

If you are using a Mac or Unix, remember to run the `chmod +x galasactl` command in the directory containing the `galasactl` binary that you downloaded in order to set execute permission to enable you to run the Galasa CLI tool.

## About Galasa CLI commands

Galasa CLI commands start with `galasactl`. Example commands are provided for running on Mac or Unix, and Windows Powershell. The Windows Powershell uses the backtick (`) for line continuation characters. If you are using Windows command-shell, the line continuation character is the caret (^). 

You can view the Galasa CLI command syntax, including parameter descriptions, in the <a href=https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl.md target="_blank"> cli repository</a> in GitHub.


## Known limitations

Go programs can sometimes struggle to resolve DNS names, especially when a working over a virtual private network (VPN). In such situations, you might notice that a bootstrap file cannot be found with galasactl, but can be found by a desktop browser, or curl command. In such situations you can manually add the host detail to the `/etc/hosts` file, to avoid DNS being involved in the resolution mechanism.


## Getting help

Use the following command to get more information about the command and command options, including default values.

```
galasactl --help
```

Use the following options to send logging information to a file. Any folder that is referrenced must exist. Existing files are overwritten. Specify `-` to log to `stderr`. The default is no logging.

```
galasactl --log <logFilePath>  
```  

## Errors

You can view a list of error messages that can be output by the galasactl tool in the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/errors-list.md" target="_blank"> Galasa cli repository</a> in GitHub.








