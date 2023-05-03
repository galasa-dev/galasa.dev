---
path: "/docs/cli-command-reference/cli-runs-get"
title: "Viewing test run status"
---


Use the test run name to query test run details by using the following command:

```
galasactl runs get --runname <NameOfTestRun> --bootstrap <BootstrapURL>
``` 

where:
- `--runname` is the name of the test run 
- `--bootstrap` is the URL of the ecosystem's bootstrap properties


Results are returned on the terminal in the following example format:

```
galasactl runs get --runname U456 
RunName Status   Result ShortTestName
U456    Finished Passed MyTestName
```








