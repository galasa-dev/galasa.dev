---
path: "/docs/cli-command-reference/cli-runs-get"
title: "Viewing test run status"
---


You can query the status of a test run using the test run name by running the following command:

```
galasactl runs get --runname <NameOfTestRun> --bootstrap <BootstrapURL>
``` 

where:
- `--runname` is the name of the test run that you want to query and 
- `--bootstrap` is the bootstrap URL of the Galasa ecosystem in which the test ran


Results are returned on the terminal in the following example format:

```
galasactl runs get --runname U456 
RunName Status   Result ShortTestName
U456    Finished Passed MyTestName
```








