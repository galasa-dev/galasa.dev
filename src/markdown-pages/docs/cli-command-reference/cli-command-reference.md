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

After downloading the binary, re-name it to `galasactl` (for Mac or Unix) or `galasactl.exe` (for Windows) and put it on your PATH.

## Getting started 

Galasa CLI commands start with `galasactl`. Example commands are provided for running on Mac or Unix, and Windows Powershell. The Windows Powershell uses the backtick (`) for line continuation characters. If you are using Windows command-shell, the line continuation character is the caret (^). 

You can view the Galasa CLI command syntax, including parameter descriptions, in the [Galasa cli repository](https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl.md).


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

You can view a list of error messages that can be output by the galasactl tool in the [galasactl error documentation](https://github.com/galasa-dev/cli/blob/main/docs/generated/errors-list.md) in the cli repository in GitHub. 






