---
path: "/docs/cli-command-reference/cli-command-reference"
title: "Getting started using the Galasa CLI"
---

Use the Galasa command line interface (Galasa CLI) to help you complete tasks, for example, submitting and monitoring Galasa test runs. You can use the same set of Galasa CLI commands to run a given task, regardless of the technology that you are using. 


## Getting started 

Complete the following steps to start running the Galasa CLI tool:

On Mac or Unix:

1. Find out the architecture of your machine by typing the command `uname -m` into your terminal.
2. Download the appropriate binary of the [Galasa CLI tool](https://github.com/galasa-dev/cli/releases) for your machine architecture from the _cli_ repository in GitHub and re-name it to `galasactl`.
3. Add `galasactl` to your PATH to enable the tool to be called from the command line without having to specify the path to the directory in which it is stored. For example, ```export PATH=${PATH}:/my/folder/containing/galasactl```.
4. Set execute permission on the binary by running the `chmod +x galasactl` command in the directory containing `galasactl`.
5. Set permission to open the CLI tool by running the `spctl --add galasactl` command in the directory containing `galasactl`. You are prompted by a security panel asking you to log in to show that you are issuing the command.

You are now able to run Galasa CLI commands from the command line. 


On Windows (Powershell)

1. Download the binary and re-name it to `galasactl`.
2. Add `galasactl` to your PATH to enable the tool to be called from the command line without having to specify the path to the directory in which it is stored. 
3. Open `cmd.exe` and type `start galasactl.exe` in the directory containing `galasactl`.

You are now able to run Galasa CLI commands from the command line. 


*Note:* It is useful to put `galasactl` in your PATH to enable the Galasa CLI tool to be called from any directory. If you are using a Mac, you can find `PATH`, and the directories stored within it, by entering the command `echo $PATH | tr ":" "\n"` in your terminal. If you are using Windows, type the command `C:\> echo %PATH%`. You can then either add the binary into a directory that is already in your PATH, or add a new directory containing the tool to your PATH.



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








