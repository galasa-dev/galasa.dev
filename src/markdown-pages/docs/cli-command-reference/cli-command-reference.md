---
path: "/docs/cli-command-reference/cli-command-reference"
title: "Using the Galasa CLI"
---

Use the Galasa command line interface (Galasa CLI) to help you complete tasks, for example, submitting and monitoring Galasa test runs. You can use the same set of Galasa CLI commands to run a given task, regardless of the technology that you are using to run your pipeline.

## Getting started 

To use the Galasa CLI commands you must reference the Galasa bootstrap file or URL. You can do this either by setting the `--bootstrap` flag or the `GALASA_BOOTSTRAP`environment variable.

You can [access the code](https://github.com/galasa-dev/cli) and [download the CLI tool](https://github.com/galasa-dev/cli/releases) from the _cli_ repository in GitHub. The following versions of the Galasa CLI tool are available to download for different operating systems:

| Operating system  |  Download  |
| :---- | :-------- |
| MacOSX  | galasactl-darwin-amd64 |
| Linux amd64 | galasactl-linux-amd64 | 
| zLinux  | galasactl-linux-s390x | 
| Windows | galasactl-windows-amd64.exe | 


## The CLI commands

The following section provides a summary of current commands, along with a brief description. Click the links for more detailed information and examples on how to use the commands.

<details>
<summary>Runs commands</summary>

|   |    |
| :---- | :-------- |
| **[runs prepare](/docs/cli-command-reference/ecosystem-cli-runs-prepare)**<br>  | Builds a portfolio of tests from single or multiple test streams. The portfolio can then be run by using the runs submit command. |
| **[runs submit](/docs/cli-command-reference/ecosystem-cli-runs-submit)**<br>  | Submits and monitors tests in the Galasa Ecosystem. Tests can be input either from a portfolio or directly from a test package.| 
</details>


