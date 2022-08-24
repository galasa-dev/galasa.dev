---
path: "/docs/managers/github-manager"
title: "GitHub Manager"
---


This Manager is at Release level. You can view the <a href="https://javadoc.galasa.dev/dev/galasa/github/package-summary.html">Javadoc documentation for the Manager here</a>.<br>


[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>


# <a name="overview"></a>Overview


If there is an open issue in a GitHub repository that tracks a known problem which is expected to cause a test class or test method to fail, you can add the @GitHubIssue annotation to a test class or test method so that the expected failure is recorded as _Failed with Defects_  in the test report. Using this annotation on a test class or test method means that the expected failure is clearly identifiable in the test report, making it easier to spot any unexpected test failures and saving time by avoiding the investigation of a known issue. 


## Using the Manager

The GitHub Manager is activated if there is a @GitHubIssue annotation on the test class or any of its test methods. The presence of the @GitHubIssue annotation means that there is a known problem which is expected to affect the result of the test. If the issue is expected to affect one or more specific test methods, add the annotation on the test method. If the scope of the issue is larger and might affect the whole test class, add the annotation at the class level. 

To ensure that the failing exception is due to the known problem identified in the GitHub issue, use Regex in the annotation to check that the recorded test failure matches the string that is specified in Regex. If the failing exception does not match the Regex, the test has failed for a different or unknown reason, not the reason that is specified in the GitHub issue. If no Regex is provided in the annotation, any failure is accepted.

Once the GitHub issue is closed, remove the @GitHubIssue annotation from the test class or test method.


## a name="features"></a>Manager Features

Use the @GitHubIssue annotation in conjunction with the _@ContinueOnTestFailure_ annotation to return a test result for all test methods within a test class.

See the [Overrides](#overrides) section for more information.<br>

### Example

The following example shows how a SimBank test can be annotated with the @GitHubIssue annotation.

In the example, GitHub issue _1000_ has a status of _open_ on GitHub in the _galasa-dev/projectmanagement_ repository. Issue _1000_ tracks a known problem with the behaviour of the 
Z/OS Batch Manager. 

The issue causes the test class _BatchAccountsOpenTest_ to fail. Annotating the test class of the _BatchAccountsOpenTest_ with the GitHub issue means that if the test class fails, the GitHub Manager overrides the result of the test class to _Failed With Defects_. The _Failed With Defects_ result indicates that the failure of the _BatchAccountsOpenTest_ is due to a known problem, and does not require further investigation.

```
@Test
@GitHubIssue( issue = "1000", repo = "galasa-dev/projectmanagement" )
public class BatchAccountsOpenTest {

    @ZosImage(imageTag = "SIMBANK")
    public IZosImage        image;
    
    @ZosBatch(imageTag="SIMBANK")
    public IZosBatch zosBatch;
    
    @ZosBatchJobname(imageTag="SIMBANK")
    public IZosBatchJobname zosBatchJobname;

    @BundleResources
    public IBundleResources resources;
    
    @Logger
    public Log              logger;

    /**
     * Test which uses the SIMBANK batch job to open a number of new accounts.
     * The test passes if the job completes successfully (RC=0000)
     * @throws TestBundleResourceException 
     * @throws IOException 
     * @throws ZosBatchException
     */
    @Test
    public void batchOpenAccountsTest() throws TestBundleResourceException, IOException, ZosBatchException {
            // Create a list of accounts to create
            List<String> accountList = new LinkedList<>();
            accountList.add("901000001,20-40-60,1000");
            accountList.add("901000002,20-40-60,1000");
            accountList.add("901000003,20-40-60,1000");
            accountList.add("901000004,20-40-60,1000");
            accountList.add("901000005,20-40-60,1000");
            accountList.add("901000006,20-40-60,1000");
            accountList.add("901000007,20-40-60,1000");
            accountList.add("901000008,20-40-60,1000");
            accountList.add("901000009,20-40-60,1000");

            // Create the substitution parameters for the JCL
            HashMap<String, Object> parameters = new HashMap<>();
        parameters.put("CONTROL", "ACCOUNT_OPEN");
        parameters.put("DATAIN", String.join("\n", accountList));
            
            // Load the JCL with the given substitution parameters
                String jcl = resources.retrieveSkeletonFileAsString("/resources/skeletons/SIMBANK.jcl", parameters);
                
                // Submit the JCL
                IZosBatchJob batchJob = zosBatch.submitJob(jcl, zosBatchJobname);
                
                // Wait for the batch job to complete
                logger.info("batchJob.toString() = " +  batchJob.toString());
                int rc = batchJob.waitForJob();
                
                // If highest CC was not 0, fail the test
                if (rc != 0) {
                        // Print the job output to the run log
                        batchJob.retrieveOutput().forEach(jobOutput ->
                                logger.info("batchJob.retrieveOutput(): " + jobOutput.getDdname() + "\n" + jobOutput.getRecords() + "\n")
                        );
                        Fail.fail("Batch job failed RETCODE=" + batchJob.getRetcode() + " Check batch job output");
                        
                }
                logger.info("Batch job complete RETCODE=" + batchJob.getRetcode());
    }
}
```

## <a name="overrides"></a>Overrides

You can override the result of a test method or a test class.

### Overriding a test method result

If a test method is annotated with _@GitHubIssue_, and the initial result of the method is _Failed_, the GitHub Manager uses the GitHub API to retrieve the current state of the GitHub issue from the annotation. If the issue is in _open_ status, the result of the test method is overridden from _Failed_ to _Failed With Defects_. If the issue is in _closed_ status, the result is not overridden, as that issue is supposedly fixed and is not expected to affect the test method anymore. In this scenario, further investigation into the cause of the failure is required.

### Overriding a test class result 

At the end of a test class run, the results of each individual test method are combined to determine whether the result of the test class should be overridden. Use the following scenarios and examples to understand the expected test class result and what to do next.


### Scenario 1: 

Scenario 1 uses the _@GitHubIssue_ annotation on the test class _SimBankIVT_ without the _@ContinueOnTestFailure_ annotation:


@Test
@GitHubIssue( issue = "1000")
Test class SimBankIVT 
Test method testNotNull(): ![passed icon:](passed.svg)
Test method checkBankIsAvailable(): ![failed with defects icon:](failed-with-defects.svg)
Test class result: ![passed with defects icon:](passed-with-defects.svg)

Next steps: All methods passed, other than those expected to fail - in this case the _checkBankIsAvailable_ method. No further investigation is required.

### Scenario 2: 

Scenario 2 uses the _@GitHubIssue_ annotation on the test class _SimBankIVT_ with the _@ContinueOnTestFailure_ annotation:


@Test
@GitHubIssue( issue = "1000")
@ContinueOnTestFailure
Test class SimBankIVT 
Test method testNotNull(): _Failed With Defects_
Test method checkBankIsAvailable(): _Failed_
Test class result: _Failed_


Next steps: Test method _testNotNull_ returned a result of _Failed With Defects_. Test method _checkBankIsAvailable_ returned a result of _Failed_ for an unknown reason. Further investigation is required to understand why test method _checkBankIsAvailable_ failed.

### Scenario 3: 

Scenario 3 uses the _@GitHubIssue_ annotation on the test class _SimBankIVT_ with the _@ContinueOnTestFailure_ annotation:

@Test
@GitHubIssue( issue = "1000")
@ContinueOnTestFailure
Test class SimBankIVT 
Test method testNotNull(): _Failed With Defects_
Test method checkBankIsAvailable(): _Passed_
Test class result: _Passed With Defects_

Next steps: The first method _testNotNull_ returned a result of _Failed With Defects_.  As the _ContinueOnTestFailure_ annotation is used, the test continued to run and the following method _checkBankIsAvailable_ returned a result of _Passed_. All methods that are expected to pass returned a result of _Passed_, so the overall result of the test is _Passed With Defects_. No further investigation required.

### Scenario 4: 

Scenario 4 uses the _@GitHubIssue_ annotation on the test class _SimBankIVT_ without the _@ContinueOnTestFailure_ annotation:

@Test
@GitHubIssue( issue = "1000")
Test class SimBankIVT
Test method testNotNull(): _Passed_
Test method checkBankIsAvailable(): _Failed With Defects_
Test class result: _Passed With Defects_ 



Next steps: The method _checkBankIsAvailable_ returned a result of _Failed With Defects_. As the test did not use the _ContinueOnTestFailure_ annotation, the test would have ended prematurely. However, as the _checkBankIsAvailable_ method was the last test method, the results of all test methods in the class are known. All methods that are expected to pass returned a result of _Passed_, so the overall result of the test is _Passed With Defects_. No further investigation required.

### Scenario 5:

Scenario 5 uses the _@GitHubIssue_ annotation on the test class _SimBankIVT_ without the _@ContinueOnTestFailure_ annotation:

@Test
@GitHubIssue( issue = "1000")
Test class SimBankIVT
Test method testNotNull(): _Failed With Defects_
Test method checkBankIsAvailable(): Unknown
Test class result: _Failed With Defects_

Next steps: The _testNotNull_ method returned a status of _Failed With Defects_. As the _ContinueOnTestFailure_ annotation is not used, the results of the following methods - in this example _checkBankIsAvailable_ are not known. The overall result returned is _Failed With Defects_. To check the result of all methods, add the _@ContinueOnTestFailure_ annotation for future test runs.



# <a name="configuring"></a>Configuring 

You must configure your CPS properties so that the GitHub Manager knows the GitHub instance in which to look for the specified issue. The GitHub Manager converts the GitHub instance URL that is provided in the CPS to the correct URL for the GitHub API, removing the need to manually supply a URL for the GitHub API. Alternatively, you can set the GitHub repository in the @GitHubIssue annotation. The value in the annotation takes precedence over the value in the CPS. 

## <a name="cps"></a>Configuration Properties

The following are properties used to configure the GitHub Manager:
 
<details>
<summary>GitHub instance url CPS Property</summary>

| Property: | GitHub instance url CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | githubissue.instance.url |
| Description: | The GitHub instance for the issue  |
| Required:  | No |
| Default value: | https://github.com |
| Valid values: | A valid GitHub instance, for example <br> _https://github.com_, _https://github.ibm.com_ |
| Examples: | <code>ggithubissue.instance.DEFAULT.url=https://github.com</code><br>
<code>githubissue.instance.IBM.url=https://github.ibm.com</code><br> |

</details>

<details>
<summary>GitHub instance credentials CPS Property</summary>

| Property: | GitHub instance credentials CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | githubissue.instance.credentials |
| Description: | The credentials ID to use for the GitHub instance  |
| Required:  | No |
| Default value: | _GITHUB_ |
| Valid values: | _GITHUB_, _DEFAULT_, _IBM_ |
| Examples: | <code>githubissue.instance.DEFAULT.credentials=GITHUB</code><br>
<code>ggithubissue.instance.IBM.credentials=IBM</code> |

</details>


<details>
<summary>GitHub instance repository CPS Property</summary>

| Property: | GitHub instance repository CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | githubissue.instance.repository |
| Description: | The GitHub repository that contains the GitHub issue |
| Required:  | No, can be provided in the annotation |
| Default value: | N/A |
| Valid values: | A valid repository, for example, _galasa-dev/projectmanagement_ |
| Examples: |<code>githubissue.instance.DEFAULT.repository=galasa-dev/projectmanagement</code><br> |

Note: You must provide credentials for your GitHub Enterprise instances in the credentials store, so that the request to the GitHub API is authenticated.

</details>


You must also provide credentials for your GitHub Enterprise instances in the credentials store in order to authenticate the request to the GitHub API.


# <a name="annotations"></a>Annotation provided by the Manager

The following annotation is provided by the GitHub Manager:

<details>
<summary>GitHub Issue</summary>

| Name: | GitHub Issue |
| --------------------------------------- | :------------------------------------- |
| Name: | @GitHubIssue |
| Description: | If present on a method or class, this annotation will tell the GitHub Manager to influence the result of the method or class based on the known problem in the GitHub issue. |
| Syntax:  | @GitHubIssue( githubId = "DEFAULT", issue = "1000", repo = "galasa-dev/projectmanagement", regex = "[a-zA-Z1-9]" )|
| Attribute `issue`: | The number of the issue. Required.|
| Attribute `githubId`: | Optional. Default value is "DEFAULT".|
| Attribute `repo`: | Optional. If not present in the annotation, the CPS is checked. If a value is not present in the CPS, the Manager logs a warning message.|
| Attribute `regex`: | Optional. Use to narrow down the failing exception.|

The annotation can be used at the class or method level.

Use of the _@ContinueOnTestFailure_ annotation alongside the _@GitHubIssue_ annotation can affect the test result. For examples, see the [Overrides](#overrides) section.

</details>


# <a name="codesnippets"></a>Code snippets and examples

<details><summary>Add the @GitHubIssue and @ContinueOnTestFailure annotations on a test class</summary>

Use the following code to add GitHub issue _1000_ in the _galasa-dev/projectmanagement repository_ on the SimBank _BatchAccountsOpenTest_ test class. Ensure all test methods in the test class are run by using the _@ContinueOnTestFailure_ annotation:

```
@Test
@GitHubIssue( issue = "1000", repo = "galasa-dev/projectmanagement" )
@ContinueOnTestFailure
public class BatchAccountsOpenTest {
```
</details>

<details><summary>Add the @GitHubIssue annotations on a test method</summary>

Use the following code to add GitHub issue _1000_ in the _galasa-dev/projectmanagement repository_ on the _testNotNull_ method in the _BatchAccountsOpenTest_ test class:

```
@Test
@GitHubIssue( issue = "1000", repo = "galasa-dev/projectmanagement" )
public void testNotNull() {
    // Check all objects loaded
    assertThat(terminal).isNotNull();
    assertThat(resources).isNotNull();
    assertThat(client).isNotNull();
}
```
</details>


