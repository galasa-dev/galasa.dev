---
path: "/docs/ecosystem/ecosystem-cli"
title: "Using the Galasa CLI"
---

Complete tasks - for example submitting and monitoring Galasa test runs in your ecosystem - by using the Galasa command line interface (Galasa CLI) tool. You can use the same set of CLI commands, regardless of the technology that you are using to run your pipeline. 

[Access the code](https://github.com/galasa-dev/cli) and [download the CLI tool](https://github.com/galasa-dev/cli/releases) from the _cli_ repository in GitHub. The following four versions of the Galasa CLI tool are available to download for different operating systems:

- galasactl-darwin-amd64
- galasactl-linux-amd64
- galasactl-linux-s390x
- galasactl-windows-amd64.exe

## Getting started 

To use the Galasa CLI commands you must reference the Galasa bootstrap file or URL. You can do this either by setting the `--bootstrap` flag or the `GALASA_BOOTSTRAP`environment variable.

The following table provides a summary of current commands, along with a brief description. 

Command |   | Description    |
| :---- | :-------- |
| **[runs prepare](/docs/ecosystem/ecosystem-cli-runs-prepare)**<br>  | Build a portfolio of tests from single or multiple test streams. The portfolio can then be run by using the runs submit command. |
| **[runs submit](/docs/ecosystem/ecosystem-cli-runs-submit)**<br>  | Submit and monitor tests in the Galasa Ecosystem. Tests can be input either from a portfolio or directly from a test package.|

For more detailed information about using these commands, visit the relevant command page.

