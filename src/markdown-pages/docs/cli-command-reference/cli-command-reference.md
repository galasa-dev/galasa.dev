---
path: "/docs/cli-command-reference/cli-command-reference"
title: "Getting started using the Galasa CLI"
---

Use the Galasa command line interface (Galasa CLI) to help you complete tasks, for example, submitting and monitoring Galasa test runs. You can use the same set of Galasa CLI commands to run a given task, regardless of the technology that you are using. 

Galasa CLI commands start with `galasactl`. If you are using Windows, you must specify `galasactl.exe` on your PATH variable to use the command. You can view the full list of Galasa CLI commands in the [Galasa cli repository](https://github.com/galasa-dev/cli/tree/main/docs/generated).

## Getting started 

To use the Galasa CLI commands you must reference the Galasa bootstrap file or URL. You can do this either by setting the `--bootstrap` flag or the `GALASA_BOOTSTRAP`environment variable.

You can [access the code](https://github.com/galasa-dev/cli) and [download the CLI tool](https://github.com/galasa-dev/cli/releases) from the _cli_ repository in GitHub. To build the cli tools locally, use the `./build-locally.sh --help` script for instructions.

The following versions of the Galasa CLI tool are available to download for different operating systems:

| Operating system  |  Download  |
| :---- | :-------- | 
| MacOSX  | galasactl-darwin-amd64 |
| MacOSX  | galasactl-darwin-arm64 |
| Linux amd64 | galasactl-linux-amd64 | 
| zLinux  | galasactl-linux-s390x | 
| Windows | galasactl-windows-amd64.exe | 


## Getting help

Use the following command to get more information about the command and command options, including default values.


```
galasactl -h, --help 
```

Remember to specify `galasactl.exe` on your PATH variable if you are using Windows.

## Syntax

You can find the galasactl syntax, including parameter descriptions, in the [galasactl documentation](https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl.md) in the cli repository in GitHub. 

## Errors

You can view a list of error messages that can be output by the galasactl tool in the [galasactl error documentation](https://github.com/galasa-dev/cli/blob/main/docs/generated/errors-list.md) in the cli repository in GitHub. 

## Known limitations

Go programs can sometimes struggle to resolve DNS names, especially when a working over a virtual private network (VPN). In such situations, you might notice that a bootstrap file cannot be found with galasactl, but can be found by a desktop browser, or curl command. In such situations you can manually add the host detail to the `/etc/hosts` file, to avoid DNS being involved in the resolution mechanism.




