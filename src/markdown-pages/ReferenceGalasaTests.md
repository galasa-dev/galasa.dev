---
path: "/reference/tests"
title: "Galasa test components and examples"
---
If you have seen JUnit tests then Galasa tests will look very familiar, with a few additions that are unique to Galasa. A Galasa test is comprised of Java classes that contain methods. Some methods are test methods, other methods are specially designated to run before or after every test method, or to run once at the start when the class is being run. 
To help you write great Galasa tests, it’s good to understand JUnit test style. There are a couple of key concepts that you need to know to get you started. Examples are provided so you to get you up and running more quickly. 

## Arrange, Act, Assert
The Arrange, Act, Assert (AAA) pattern is a simple way to structure your test. It divides a method into three sections, each with a specific purpose:
- <b>Arrange</b>: Initialize objects and set up input data before calling the method under test. 
- <b>Act</b>: Invoke the method under test. Act is the part that the test is interested in, for example, calling a method or function to return a result for analysis.
- <b>Assert</b>: Verify that the method under test behaves as expected. The assertion is the part that ensures that your expectations are met.  You need to have a meaningful result to check, otherwise you are just checking that the code under test has not crashed. Take a look at the Assertions section to find out more.

### Why follow this pattern?
The AAA template acts as a code smell detector. If your test code deviates from being simple and starts using interwoven actions and asserts, it quickly becomes clear that the template is broken. For example, the Assert section should only be used for verifying results, not performing actions on the method under test. 


## Assertions
Use Assertions (or asserts) to validate the intended behaviour of the code. For example, to check whether a method returns the expected value for a given set of parameters or a method correctly sets up some class variables. When you run the test, the assertion executes. If the method under test behaves exactly as you specified in the assertion, your test passes. Otherwise, an <b>AssertionError</b> is thrown.
Galasa provides support for assertions through a set of assert methods in the org.junit.Assert class. 

Assertions make your code stable and helps you to construct your tests in a logical, effective way. Think about how many asserts you need for each of your methods. If the method under test is complex, with many conditional statements, you can assert the outcome for each condition. A single assertion should suffice for a simple method, for example, a method performing a string manipulation.

```
package com.ibm.hursleybank.tests.accountTests;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

    /**
    * Credit a test account with money - replicating a teller taking a cash payment
    * 
    * @throws Exception
    */
@Test
public void creditAccountTest() throws Exception
{
  /*Arrange*/
  double preBalance = bank.getbalance(terminalCICS1, account.getAccountNumber());
  bank.creditAccount(terminalCICS1, account.getAccountNumber(), account.getCreditAmount());
  /*Act*/	
  double postBalance = bank.getbalance(terminalCICS1, account.getAccountNumber());
  /*Assert*/
  assertTrue(postBalance == preBalance + 1000);
}
			
```

Key points of interest in this example - in the assertion method, we passed a String parameter as the identifying message for an assertion error and set message to describe what’s wrong if the condition isn’t met.
Also, you might be thinking “Why two separate test methods instead of a single method with both the assert methods?” Having multiple assert methods in a single test method will not cause any errors in tests, but a failed test method with multiple assertions requires more effort to determine which assertion failed. Also, it is not guaranteed that all the assertions took place. For an unchecked exception, the assertions after the exception will not execute and Galasa proceeds to the next test method. Therefore, it is generally a best practice to use one assertion per test method.

Another example

If you go back and investigate the test class, you will notice several lines of code in the Arrange part being repeated across the test methods. Ideally, they should be in a single place and get executed before each test. We can achieve this using JUnit annotations, which we will investigate next.

## Annotations
Galasa uses annotations, which have the form @Annotation or @Annotation(arg1,...,argN). Annotations provide non-programmatic information to the test runner about the test class, or its components. Some annotations used in Galasa are inherited from JUnit while others are unique to Galasa.

Annotations are used on the class to provide information to the test server about the environment setup and about the test. This information is  used to prioritise or categorise tests. Annotations on methods within a test designate those methods as test methods and there are also 'resource annotations' which indicate to the test runner that it needs to provide the test with certain resources, for example, terminals, userids or ports.

### Informational Class Annotations
Used to provide general information about the test for administration and management purposes, for example:

@Summary(<String summary>) - A brief description of the purpose of the test.
@ReleaseAdded(<CICSLevel release>) - The CICS release at which this test was first created.
@AreasTested - A list of CICS Technology Areas which are tested by the test 

### Environmental Class Annotations
Used to provide information needed to create the environment in which the test runs. For example:

@CICSTest - Indicates to the test runner that this is a Galasa test.
@Topology(<String topology>) - Tells the test runner what to use for the test environment. 

### TestManager
The first line within your test class will normally be:

```
public ICICSTestManager? testManager;
```

This instruction adds the Test Manager object to your test class. The test manager is used to provide resources in test (see 'Resource Annotations') and to give the tester access to various functions and information provided by the Galasa framework (such as information about the testing environment).


Even if you are not explicitly calling the testManager in your test it is still used implicitly, so it's declaration is mandatory.

### Resource Annotations
Resource annotations are annotations declared within the test class, but outside any test methods. They take the form:

```
@Resource(arg1,...,argN) public <type> <field>;
```

When each test method is started, the test manager processes these annotations and assigns an appropriate object to the variable <field>. Because Galasa deals with test methods as independent entities this is repeated for each test method, but if a field has already had an object assigned during the current run, the test manager knows to use that same object again.

The resource annotations and corresponding types are as follows:

@Applid(tag=<String tag>); String - Provides the applid for the CICS region with the specified tag.
@CICSTerminal(tag=<String tag>[, startTerminal=<boolean startTerminal>]) ITerminal - Provides a terminal which will connect to the CICS region with the specified tag. Setting startTerminal=false will stop the terminal connecting automatically.
@Port(); int - Provides the number of the next free port in the current pool.
@RunID(); String - Provides the run id of the current test run.
@Sysid(tag=<String tag>); String - Provides the sysid for the CICS region with the specified tag.
@Userid(useridType=<UseridType type>); IUserID? - Provides a free userid of the type 'type'.

For example:
```
@Userid(useridType=UseridType.MVSBASIC) public IUserID? myMVSUserid;
```
This assigns an 'IUserID' object of the type 'MVSBASIC' to the field 'myMVSUserid'. You could then use this object in your test methods. For example, use the following code to change the password for a userid:
```
myMVSUserid.changePassword("NEWPW0RD", true);
```
To assign the value of a free port number to the field 'myPort', use:
```
@Port() public int myPort;
```
 

### Test Annotations

The final type of annotation used in Galasa are the test annotations, or method annotations. These are declared on individual methods and denote the method type so that the test runner knows what to do with it. The annotations are:

@Test - Indicates that the following method is a normal test method.
@Before - Indicates that the following method is to be run before each test method. Typically used to allocate resource, setup common initialization code, and load configuration files that the test methods require.
@After - Indicates that the following method is to be run after each test method. This method is guaranteed to run even if a @Before or @Test method throws an exception. Use this annotation to clean up initialization code and release any resource allocations done in @Before.
@Initialise - Indicates that the following method is always the very first method to be run in the test.


The use of @Test is very simple, the test runner will simply run through each annotated test method in the order they appear (unless an order or selection of test methods is selected in the run configuration).
@Before and @After are called respectively before and after each method run. These methods would typically be used to ensure that your environment is in a usable state before the next test method is called, particularly if the preceding test method has exited in an unexpected state. 
The following code resets the terminal object assigned to 'myTerminal' to the CICS welcome screen and then clear it, so each test method can be sure that that terminal is in a guaranteed state regardless of what happened in previous test methods.

```
@Before
public void initialize() throws TerminalException? {
myTerminal.resetAndClearScreen();
}
```


The annotation @Initialise denotes a method which is always run before any @Test, @Before or @After methods. It is possible when running a Galasa test to specify only a selection of test methods to be run. @Initialise provides the tester with a way of performing any setup required which cannot then be accidentally omitted by people running a subset of test methods.
There are also two further annotations:

@TestCase(name=<String testcaseName>, testPlan=<String testPlan>) - The testcase covered by this method. If multiple testcases are covered multiple @TestCase annotations can be declared within an @TestCases annotation.
@TestCases(cases={@TestCase(...),@TestCase(...),...}) - see @TestCase

Example

Another important use of the @Test annotation is to test for exceptions. Suppose for a condition, a code throws an exception. Use the @Test annotation to test whether the code indeed throws the exception when the condition is met.
Here’s an example that uses all these Galasa annotations.

Example

## Coding Standards

With the exception of some new standards applied to project structure and practices unique to working in the Java language, most of the coding standards expected for Galasa tests are common to all testing:
- Don't hard code anything that can change such as dataset names, uss paths, userids or hostnames as this limits the portability of your test. 
- Comment your code and reuse existing functionality where possible rather than writing it from scratch.
- Ensure the correct headers and any mandatory class annotations are included in every test class. 
- Any additional resources provided in the test bundle (e.g. csdinputs, file skeletons, cics bundle components) should be added to a subdirectory of the project's 'resources' directory. You can choose the subdirectory name but it should make sense to other users.
- The class and all methods should be included in Javadoc. Because  Galasa uses Java, there is support for Javadoc in Galasa code and in the tests. Javadoc is essentially a beefed-up form of commenting. In Java you can create line comments with '//' and multiline comments with:
```
/*
*
*/
```
and Javadoc comments with:
```
/**
*
*/
```
Using Javadoc means that your comments are associated with the subsequent object, so if you place a comment above a class then that becomes the documentation for that class, above a method, for that method and so on. This means that users can view information about these objects through Eclipse's on-hover Javadoc support, and html documentation is automatically generated.

Eclipse assists you with your Javadoc. If you type ```/**``` where you want your Javadoc to start, and then [enter] Eclipse completes the comment block for you and adds fields to be completed (describing method input and return, or class author, etc.).











