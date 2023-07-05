---
path: "/docs/cli-command-reference/cli-runs-get"
title: "Viewing test run results"
---

You can specify a number of options on the `galasactl runs get` command to query test run results on particular details, and to display the output of those queries in different formats. 

You can view the full command syntax in the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_runs_get.md" target="_blank">Galasa cli repository</a>.

###  Options for querying and viewing test run results

Use the tables provided to view the options for filtering test results, and for choosing the format in which you want those results displayed.

<b>Table 1:</b> The following table shows the options that you can set on the `galasactl runs get` command to query test run data on specific details:

| Name |  Description  |
| :---- | :-------- | 
| `--name`  | Use the `--name` option to query the status of a particular test run.  |
| `--requestor`| Use the `--requestor` option to view results of test runs that were submitted to the ecosystem by a specified user. The default is the current user name that is specified in the access token.|
| `--age`| Use the `--age` option to specify a time period in which the tests ran. The _age_ option is specified in the format _FROM:TO_. Units of time can be specified in weeks _w_, days _d_, or hours _h_. The _FROM_ part is mandatory. The _TO_ part is optional, with a default set to `0`, which indicates the current time. The _FROM_ value specifies how far back in time the query is applied. The _FROM_ value must therefore always be a larger value than the _TO_ value. If the `--name` option is specified, the `--age` parameter is not used. |
| `--result`  | Use the [`--result` option](#result) to filter test run results based on test run status. You can select more than one status by using a comma-separated list. |

<b>Table 2:</b> The following table shows the options that you can set on the `galasactl runs get` command to display test run results in different formats:

| Name |  Description  |
| :---- | :-------- | 
| `--format summary` | The default format is _summary_. The _summary_ format is useful if you just need to know the high-level status and result of a test.  | 
| `--format details` | The _details_ format is useful when you need to see all the details of a test run, including method information.  | 
| `--format raw` | The _raw_ format output is useful if you are writing scripts to report on multiple test runs programmatically. The output from `galasactl runs get` is returned in a form that makes it easy for scripting to digest the individual pieces of data available. | 



## <a name="result"></a>More about the `--result` option

You might want to filter the test results that are returned based on status. For example, you might choose to return only failed tests, so that you can quickly check if you need to investigate an issue. 

The _galasactl runs get_ command now supports the `--result` option, so that test runs which completed with a specified status are returned. Runs which completed with a status that is not specified are not displayed.

The `--result`  option accepts a comma-separated list of values. The following values are supported:

_Passed_ <br>
_Failed_<br>
_EnvFailed_<br>
_PassedWithDefects_<br>
_FailedWithDefects_<br>
_Unknown_<br>

The parameters are accepted regardless of whether they are entered in upper or lower-case.

## Examples

Use the following sections to view some example command options and generated output. Note that the `--format summary` and `--format details` options return a total count of results returned, along with a breakdown of the number that are returned with a particular result, for example, _Passed_, _Failed_, _PassedWithDefects_. 

### View tests results in summary format

This is the default format. Use this format to get a quick, high-level update on the status of a test run or runs. Returned information includes details about time the test was submitted, run name, status, result, and test name. This format is especially useful if a query returns a large number of results. 

The following example command returns test status in a summary format for tests that were requested by the user name _bobsmith_, and that ran between two weeks ago and one week ago:

On Mac or Unix:

 ```
 galasactl runs get --bootstrap http://example.com:30960/boostrap \ 
 --requestor bobsmith --age 2w:1w
 ``` 

On Windows (Powershell):

 ```
 galasactl runs get --bootstrap http://example.com:30960/boostrap ` 
 --requestor bobsmith --age 2w:1w
 ``` 

 where:

 - `--bootstrap` is the URL of the ecosystem's bootstrap properties
 - `--requestor` is the name of the user who requested the test run
 - `--age` is the period of time in which the tests ran


Results are returned on the terminal in the following example format:

```
$galasactl runs get --bootstrap http://example.com:30960/boostrap \ 
--requestor bobsmith --age 2w:1w --format summary

submitted-time      name status   result test-name
2023-05-04 10:55:29 U456 Finished Passed MyTestName1
2023-05-05 10:45:29 U856 Finished Passed MyTestName2
2023-05-06 11:55:29 U859 Finished Passed MyTestName3
2023-05-07 10:55:23 U956 Finished Passed MyTestName4
2023-05-07 10:56:29 U976 Finished Passed MyTestName5
2023-05-07 10:57:20 U996 Finished Passed MyTestName6

Total:6 Passed:6 
```

### View tests results in details format

Use this format to drill down to get more details on a particular test run. The returned information includes details about the bundle and a link to the run log URL, which can be viewed in a browser. Viewing the run log in this way makes it easier to diagnose why a test failed. A table of methods is also displayed, including details about the status and result of each test method. 

The following example command returns test status in a details format:

On Mac or Unix:

```
$galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap \
--format details 
``` 

On Windows (Powershell):
```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap `
--format details 
``` 

where:
- `--name` is the name of the test run 
- `--bootstrap` is the URL of the ecosystem's bootstrap properties
- `--format` is the format in which you want the results to display


Results are returned on the terminal in the following example format:

```
$galasactl runs get --name U456 --format details
name           : U456
status         : Finished
result         : Passed
submitted-time : 2023-05-04 10:55:29
start-time     : 2023-05-05 06:00:14
end-time       : 2023-05-05 06:00:15
duration(ms)   : 1000
test-name      : dev.galasa.Zos3270LocalJava11Ubuntu
requestor      : bobsmith 
bundle         : dev.galasa
run-log        : https://127.0.0.1/ras/run/cbd-123/runlog

method          type status   result start-time          end-time            duration(ms)
testCoreIvtTest test Finished Passed 2023-05-05 06:03:38 2023-05-05 06:03:39 1000

Total:1 Passed:1  
```

### View tests results in raw format

Use this format if you want to parse test results using scripts. The raw format returns values separated by pipes, without formatting or header information.

The following example command returns test status in a raw format:

On Mac or Unix:

```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap \
--format raw
``` 

On Windows (Powershell):
```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap \
--format raw
``` 

where:
- `--name` is the name of the test run 
- `--bootstrap` is the URL of the ecosystem's bootstrap properties
- `--format` is the format in which you want the results to display

Results are returned on the terminal in the following example format:

```
$galasactl runs get --name U456 --format raw
U456|Finished|Passed|2023-05-04T10:55:29.545323Z|2023-05-05T06:00:14.496953Z|2023-05-05T06:00:15.654565Z|1157|dev.galasa.Zos3270LocalJava11Ubuntu|galasa|dev.galasa|https://127.0.0.1/ras/run/cbd-123/runlog
```


