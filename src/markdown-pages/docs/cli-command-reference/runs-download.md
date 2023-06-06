---
path: "/docs/cli-command-reference/ecosystem-cli-runs-download"
title: "Downloading test run artifacts"
---

You can download test artifacts, results and run logs for a test run from the RAS and store them in a directory by using the `runs download` command. Use this output to gather information about a test, help debug and diagnose test failure, and make comparisons between test run results.

You can view the full list of options that are available with the `runs download` command in the 
<a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_runs_download.md#galasactl-runs-download" target="_blank">Galasa cli repository</a>.

## Working with the `runs download` command

Downloaded artifacts are stored in a directory that is created within the working directory from where the command is run. The name of the created directory corresponds to the test run name that was provided. 

In the following example, the test run is called _C1234_. All artifacts for test run `C1234` are downloaded to a directory named `C1234` in the current working directory by using the following command:

```
galasactl runs download --name C1234
```

If a run directory named `C1234` already exists, artifacts stored within the directory can be overwritten by using the `--force` flag:

```
galasactl runs download --name C1234 –-force
```

Use the `--force` flag carefully to avoid files being over-written, resulting in the loss of data.

