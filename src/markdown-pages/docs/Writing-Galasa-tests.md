---
path: "/docs/writing-galasa-tests"
title: "Writing a Galasa test"
---

Take a look at the following sections for hints and tips on making your tests easier to understand, use and maintain. 

## Keep it small and simple

1.	Write your Galasa tests so they are as simple as possible. The simpler a test is, the easier it will be to maintain and the more resilient it will be across a multitude of invocations. 
2.	Keep the amount of boilerplate code in a test class small. This approach makes the code much easier to maintain and minimizes the amount of potentially redundant code being copied and pasted into test classes. For example, if one of the Galasa Managers contains the functionality that you need for your test, then call that Manager from your test code by using an annotation rather than by writing repetitive code within your test. Look at the SimBank IVT test to find examples.  
3.	Ensure that a test class only tests one aspect of a piece of function.  Don't create test classes that are too large as these take longer to execute and are harder to debug.

## Be flexible 

1.	Don’t let tests be dependent on hard-coded information, for example, endpoint, environment or file path information. Instead, extract this type of information into a variable that the Galasa framework controls. 
2.	Although focusing on the golden path tests might be the first set of tests you automate, don't stop there. Writing tests that attempt to force errors and drive error paths within your applications are likely to expose interesting bugs. 


## Think about structure

1.	Structure and label your tests so that it’s easy to identify the set of tests you need to run at any given phase. Galasa provides the ability to catalog your tests for this very reason. For each test, a catalog entry exists to describe that test, containing information such as software versions supported by the test, areas tested and required environments. Labelling your tests in this way might seem like overkill at the time, but when you need to run lots of tests in parallel you’ll be thankful you did it. 
2.	Keep test methods distinct from each other; test methods shouldn't depend on method order or on a previous method passing or failing. Using this approach means that if a test method fails, the error is isolated to that method and other methods aren't affected.
3. Don't use commands that wait to validate the golden path of a test. This slows down test execution and should be used only as a last resort.

## Use existing features to help you

1. Use **@BeforeClass**, **@AfterClass**, **@Before** and **@After**  annotated methods to drive behaviour that needs to be done at the beginning and end of each test class and before and after each test method is executed. Annotations help readability and avoids test methods calling those functions themselves.
2. Use the **@StoredArtifactRoot** annotation to access the result archive. Here you can store any artifact that your test has produced. There's an example of this annotation in the SimBank ProvisionedAccountCreditTests. 
3. Use the **@Logger** annotation to record aspects of your test, making it easier diagnose the cause of a failure. There's an example of this annotation in the SimBank ProvisionedAccountCreditTests.
4. Remember that your test might be running multiple times in parallel, so don't rely on resources that aren't thread safe.  For example, interacting with a shared file.  Ideally use functions of the Managers to reserve and protect resources or use shared resources such as those within the test bundle.

