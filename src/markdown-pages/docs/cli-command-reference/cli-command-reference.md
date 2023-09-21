---
path: "/docs/cli-command-reference/cli-command-reference"
title: "Getting started using the Galasa CLI"
---


If you are installing Galasa for using in the command-line, you can use the Galasa command line interface tool (Galasa CLI) to interact with Galasa to complete tasks, for example, submitting and monitoring Galasa test runs. You can use the same set of Galasa CLI commands to run a given task, regardless of the technology that you are using. 


## About Galasa CLI commands

Galasa CLI commands start with `galasactl`. Example commands are provided for running on Mac or Unix, and Windows Powershell. The Windows Powershell uses the backtick (`) for line continuation characters. If you are using Windows command-shell, the line continuation character is the caret (^). 

You can view the Galasa CLI command syntax, including parameter descriptions, in the <a href=https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl.md target="_blank"> cli repository</a> in GitHub.


## Known limitations

Go programs can sometimes struggle to resolve DNS names, especially when a working over a virtual private network (VPN). In such situations, you might notice that a bootstrap file cannot be found with galasactl, but can be found by a desktop browser, or curl command. In such situations you can manually add the host detail to the `/etc/hosts` file, to avoid DNS being involved in the resolution mechanism.


## Getting help

Once you have installed the Galasa CLI, you can use the following command to get more information about the command and command options, including default values.

```
galasactl --help
```

Use the following options to send logging information to a file. Any folder that is referrenced must exist. Existing files are overwritten. Specify `-` to log to `stderr`. The default is no logging.

```
galasactl --log <logFilePath>  
```  

## Errors

You can view a list of error messages that can be output by the galasactl tool in the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/errors-list.md" target="_blank"> Galasa cli repository</a> in GitHub.



## Next steps

To install Galasa for using in the command line, follow the instructions in [Downloading and installing the Galasa CLI](/docs/cli-command-reference/installing-cli-tool).

