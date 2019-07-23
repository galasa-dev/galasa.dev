---
path: "/docs/introduction/writing"
title: "Writing Galasa tests"
---

Some points to consider when you’re thinking about your strategy for automating your manual tests by using Galasa:

1.	Make the writing of automated tests as easy as possible. The easier a test is to write, the more likely the tests will be good ones. There are some examples of **automated tests here** that you can copy and then edit to fit your requirements.
1.	Keep the amount of boiler plate code in a test class small. This approach makes the code much easier to maintain and minimizes the amount of potentially redundant code being copied and pasted into test classes. Look at some examples of **test class code here**. 
1.	Ensure the framework is set up to gather diagnostic information on behalf of the test.  There's nothing worse than a test failing and not having the right diagnostics to work out the cause. For examples of setting up the framework, check out the **configuring documentation**.
1.	Although focusing on the golden path tests might be the first set of tests you automate, don't stop there.  Writing tests that attempt to force errors and drive error paths within your applications are likely to expose interesting bugs. In this **sample test**, the code forces an application error. 
1.	Structure your collection of tests so that it’s easy to identify the set of tests that need to run at any given phase. It might seem like overkill at the time, but when you need to run lots of tests in parallel you’ll be thankful you did it. You can find examples of tagged tests in the **sample documentation**.
1.	Don’t let tests be dependent on hard-coded information, for example endpoint, environment or file path information. Instead, extract this type of information into a variable that the Cirillo framework controls. Here’s an example of **a Cirillo test where the environment information has been extracted out**.
1.  Each test method should be stand alone; you don't want your test method to rely on other test methods succeeding or failing. Using this approach means that if a test method fails, the error is isolated to that method and other methods aren't affected.



