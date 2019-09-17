---
path: "/docs/introduction/writing"
title: "Writing Galasa tests"
---

Some points to consider when you’re thinking about your strategy for automating your manual tests by using Galasa:

1.	Write your [Galasa tests](../../about/concepts) so they are as simple as possible. The simpler a test is, the easier it will be to maintain and be resilient across a multitude of invocations. There are some examples of **Galasa tests here** that you can copy and then edit to fit your requirements.
1.	Keep the amount of boilerplate code in a [test class](../../about/concepts) small. This approach makes the code much easier to maintain and minimizes the amount of potentially redundant code being copied and pasted into test classes. There is an example of [code abstraction](../test_code_snippets#minimise-boilerplate-code) in the Simframe test set. 
1.	Don’t let tests be dependent on hard-coded information, for example, endpoint, environment or file path information. Instead, extract this type of information into a variable that the Galasa framework controls. Here’s an example of a Simframe test where [variables](../test_code_snippets#avoid-hard-coding) are used instead of hard-coded values. 
1.	Structure your collection of tests so that it’s easy to identify the set of tests that need to run at any given phase. It might seem like overkill at the time, but when you need to run lots of tests in parallel you’ll be thankful you did it. You can find an example of [tagging](../test_code_snippets) in the Galasa test examples. 
1.	Although focusing on the golden path tests might be the first set of tests you automate, don't stop there.  Writing tests that attempt to force errors and drive error paths within your applications are likely to expose interesting bugs. 
1.  Each [test method](../../about/concepts) should be stand alone; you don't want your test method to rely on other test methods succeeding or failing. Using this approach means that if a test method fails, the error is isolated to that method and other methods aren't affected.



