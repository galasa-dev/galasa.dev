---
path: "/docs/cli-command-reference/cli-runs-get"
title: "Viewing test run status"
---

You can specify a number of parameters on the `galasactl runs get` command to query test runs on specific
details, and to display the output of those queries in different formats. The following table provides a high-level summary of a subset of available options. You can view the full command syntax, including parameter descriptions, in the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_runs_get.md" target="_blank">Galasa cli repository</a>.

| Name |  Description  |
| :---- | :-------- | 
| `--name`  | Use the `--name` parameter to query details about completed test runs or tests that are running by using the name of the test run.  |
| `--format` | Use the `--format` parameter view test status in a _summary_,  _details_, or _raw_ format. The default format is _summary_. The _summary_ format is useful if you just need to know the high-level status and result of a test. The _details_ format is useful when you need to see all the details of a test run. The _raw_ format output is useful if you are writing scripts to report on multiple test runs programmatically. The output from `galasactl runs get` is returned in a form that makes it easy for scripting to digest the individual pieces of data available, without having to query the data via the published REST interface. | 
| `--requestor`| Use the `--requestor` parameter to view tests results of test runs that were submitted to the ecosystem by a specified person. |
| `--age`| Use the `--age` parameter to specify a time period in which the tests ran. The _age_ parameter is specified in the format _FROM:TO_. Units of time can be specified in units of weeks _w_, days _d_, or hours _h_. The _TO_ part of the value is optional, with a default set to 0 which indicates the current time. The _FROM_ part of the value specifies how far back in time the query is applied. The _TO_ value must therefore always be a larger value than the _FROM_ value. If the `--name` parameter is specified, the `--age` parameter is not used. |


## View tests results in summary format

The following example command returns test status in a summary format:

```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap 
``` 

where:
- `--name` is the name of the test run 
- `--bootstrap` is the URL of the ecosystem's bootstrap properties



Results are returned on the terminal in the following example format:

```
galasactl runs get --name U456
name  status    result  test-name
U456  Finished  Passed  MyTestName
```

## View tests results in details format

The following example command returns test status in a details format:

On Mac or Unix:

```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap \
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
- `--format` is the format in which you want the results to display.


Results are returned on the terminal in the following example format:

```
galasactl runs get --name U456 --format details
name         :  U456
status       :  Finished
result       :  Passed
queued-time  :  2023-05-04 10:55:29
start-time   :  2023-05-05 06:00:14
end-time     :  2023-05-05 06:00:15
duration(ms) :  1000
test-name    :  dev.galasa.Zos3270LocalJava11Ubuntu
requestor    :  galasa
bundle       :  dev.galasa
run-log      :  https://127.0.0.1/ras/run/cbd-123/runlog

method          type status   result start-time          end-time            duration(ms)
testCoreIvtTest test finished passed 2023-05-05 06:03:38 2023-05-05 06:03:39 1000
```

## View tests results in raw format

The following example command returns test status in a raw format:

On Mac or Unix:

```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap \
--format raw
``` 

On Windows (Powershell):
```
galasactl runs get --name U456 --bootstrap http://example.com:30960/boostrap `
--format raw
``` 

where:
- `--name` is the name of the test run 
- `--bootstrap` is the URL of the ecosystem's bootstrap properties
- `--format` is the format in which you want the results to display.

Results are returned on the terminal in the following example format:

```
```

## Query test results by a specific requestor over a given time period

The following examples retrieve a list of test results between two times for tests that were submitted to the ecosystem by a specified requestor.

The following command queries runs that were submitted by requester `johnsmith` from two weeks ago and returns the results in summary format.

```
galasactl runs get --requestor johnsmith --age 2w
```

where:

- `--requestor` specifies the requestor name that is associated with the test runs that were submitted to the ecosystem
- `--age` specifies the time period in which the tests ran


The following command queries runs that were submitted by requester `janebrown` from four days ago to two days ago and returns the results in details format.

```
galasactl runs get --requestor janebrown --age 4d:2d --format details
```

where:

- `--requestor` specifies the requestor name that is associated with the test runs that were submitted to the ecosystem
- `--age` specifies the time period in which the tests ran
- `--format` is the format in which you want the results to display