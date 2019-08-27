---
path: "/docs/reference/tests"
title: "Galasa test components and examples"
---

This is a WIP and needs to be completed, edited and separated into distinct sections on the website.

If you have seen JUnit tests then Galasa tests will look very familiar, with a few additions that are unique to Galasa. A Galasa test is comprised of Java classes that contain methods. Some methods are test methods, other methods are specially designated to run before or after every test method, or to run once at the start when the class is being run. 
To help you write great Galasa tests, it’s good to understand JUnit test style. There are a couple of key concepts that you need to know to get you started. Examples are provided so you to get you up and running more quickly. 

## Arrange, Act, Assert
The Arrange, Act, Assert (AAA) pattern is a simple way to structure your test. It divides a method into three sections, each with a specific purpose:
- <b>Arrange</b>: Initialize objects and set up input data before calling the method under test. 
- <b>Act</b>: Invoke the method under test. Act is the part that the test is interested in, for example, calling a method or function to return a result for analysis.
- <b>Assert</b>: Verify that the method under test behaves as expected. The assertion is the part that ensures that your expectations are met. 

### Why follow this pattern?
If your test code deviates from being simple and starts using interwoven actions and asserts, it quickly becomes clear that the template is broken, and your code is getting too complex. For example, the Assert section should only be used for verifying results, not performing actions on the method under test.


## Assertions
Use Assertions (or asserts) to validate the intended behaviour of the code.  

Each assertion contains a boolean expression that you believe will be true when the assertion executes. If it is not true, the system will throw an error.
Assertion Syntax

The assertion statement will have either of below given two forms:
1 assert Expression1;
2 //or 
3 assert Expression1 : Expression2

where:

    Expression1 is a boolean expression.
    Expression2 is an expression that has a value and this value will be compared with Expression1.

When you run the test, the assertion executes. If the method under test behaves exactly as you specified in the assertion, your test passes. Otherwise, an <b>AssertionError</b> is thrown.

Galasa provides support for assertions through a set of assert methods in the org.junit.Assert class. 

Assertions make your code stable and helps you to construct your tests in a logical, effective way. Think about how many asserts you need for each of your methods. If the method under test is complex, with many conditional statements, you can assert the outcome for each condition. A single assertion should suffice for a simple method, for example, a method performing a string manipulation.

Note, add a comment for most / all lines of code to explain what they are doing. Might need a different example eg a test using a manager that comes out of the box. 

```
package com.ibm.hursleybank.tests.accountTests;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import com.ibm.cics.jatp.annotations.CICSTerminal;
import com.ibm.cics.jatp.annotations.CICSTest;
import com.ibm.cics.jatp.annotations.Topology;
import com.ibm.cics.jatp.terminal.ITerminal;
import com.ibm.jat.cics.CICS;
import com.ibm.jat.cics.CICSMaximumRelease;
import com.ibm.jat.cics.CICSMinimumRelease;
import com.ibm.jat.cics.CICSRelease;
import com.ibm.jat.cics.ICICS;
import com.ibm.jat.cics.ICICSManager;
import com.ibm.jat.core.TestTags;
import com.ibm.jat.hursleybank.IHursleyBank;
import com.ibm.jat.hursleybank.IHursleyBankManager;
import com.ibm.jat.hursleybank.annotations.HursleyBankAreasTested;
import com.ibm.jat.hursleybank.annotations.HursleyBankMaximumRelease;
import com.ibm.jat.hursleybank.annotations.HursleyBankMinimumRelease;
import com.ibm.jat.hursleybank.annotations.HursleyBankTest;
import com.ibm.jat.hursleybank.enums.HursleyBankRelease;


@CICSTest
@HursleyBankTest
@HursleyBankMinimumRelease(release=HursleyBankRelease.InService)
@HursleyBankMaximumRelease(release=HursleyBankRelease.Production)
@Topology("SingleRegion")
@HursleyBankAreasTested(primaryArea=HursleyBankAreasTested.TestingArea.Account)
@TestTags(tags={"AccountTests"})

public class AbstractedAccountCreditTests {
	
	public IHursleyBank bank;
	
	@CICSTerminal(tag = "A")
	public ITerminal terminalCICS1;
	
	@Before
	public void cleanTerminals() throws Exception{
		terminalCICS1.clearScreen();
	}
	
	@Test
	public void creditAccountTest() throws Exception{
		/*
		 * Credit a test account with money - replicating a teller taking a cash payment
		 */
		String accountNumber = "1015";
		String creditAmount = "0000001000.00";
		
		double preBalance = bank.getbalance(terminalCICS1, accountNumber);
		bank.creditAccount(terminalCICS1, accountNumber, creditAmount);
		
		double postBalance = bank.getbalance(terminalCICS1, accountNumber);
		assertTrue(postBalance == preBalance + 1000);
		
		
	}
	
	
}

```

Key points of interest in this example - 
```import``` - Used at the beginning of a source file to specify classes or Java packages that are used by the methods within this Java  class so that the class knows where to find the code that it needs to invoke. As administrator, you can set up a list of imports that are associated with a package as default. Any Java classes created under that package are auto populated with those imports. If you need to add more imports for a specific test you can do so manually. 
```@``` - this symbol indicates to the Galasa framework that this is an annotation. For more information about annotations see Annotations and for a list of annotations supplied with Galasa see table 1. You can make your own annotations. You can also use hover help over annotations within a test.


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
@Topology(<String topology>) - Tells the test runner what to use for the test environment. For example, a single CICS region. 
@Programs - compiles the programs within your test. It is a good idea to store the resources (programs, source code, files) that you use for your test in the same place as you store the Java classes as this makes it easier to maintain and debug. 	

### TestManager 
The first line within your test class will normally add Manager objects to your test class. For example:

```
public ICICSTestManager testManager;
private ICICSManager cicsManager;
private IZosBatchManager batchManager;
```

This instruction adds the Test Manager, CICS Manager and Zos Batch Manager objects to your test class. The test manager is used to provide resources in test (see 'Resource Annotations') and to give the tester access to various functions and information provided by the Galasa framework (such as information about the testing environment).

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

Apart from some new standards applied to project structure and practices unique to working in the Java language, most of the coding standards expected for Galasa tests are common to all testing:
- Don't hard code anything that can change such as dataset names, uss paths, userids or hostnames as these limit the portability of your test. 
- Comment your code and reuse existing functionality where possible rather than writing it from scratch.
- Ensure the correct headers and any mandatory class annotations are included in every test class. 
- Any additional resources provided in the test bundle (e.g. csdinputs, file skeletons, cics bundle components) should be added to a subdirectory of the project's 'resources' directory. You can choose the subdirectory name, but it should make sense to other users.
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

In the previous example adding the ```.``` after ```terminalCICS1``` presents you with a dropdown list of options that are associated with the batchManager and are available to use in your program. In this case, the option selected is ```clearScreen```.   

### Naming conventions and tagging

Galasa tests are constructed with the following hierarchy: 
Bundles > Packages > Classes > Methods


You can choose how you organize your tests - for example you could organize them by function or by group. So, you might set up a Bundle of tests in a group called Processing. Within this bundle you set up a Package or subgroup called Event Processing. A Java package is a group of similar classes and interfaces. Packages are declared with the package keyword. Within the Package are a set of Java classes that are split into API commands, adapters etc and then written within these Java classes are your methods. 

Here is an example of such a hierarchy: insert image.


### Manifest.MF

The manifest is a special file that can contain information about the files packaged in a JAR file. When you install Galasa, a manifest file is automatically created. There can be only one manifest file in an archive, and it always has the pathname

```META-INF/MANIFEST.MF```

The manifest contains information about the other files that are packaged in the archive and tells the Java class where to find the code which a specified test needs to run. For example, the following manifest file is associated with the HursleyBank test:

```
Manifest-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Name: Tests
Bundle-SymbolicName: com.ibm.hursleyBank.tests
Bundle-Version: 1.0.0.qualifier
Bundle-Vendor: IBM
Import-Package: com.ibm.cics.jatp,
 com.ibm.cics.jatp.annotations,
 com.ibm.cics.jatp.attribute.cics,
 com.ibm.cics.jatp.attribute.cics.type,
 com.ibm.cics.jatp.exceptions,
 com.ibm.cics.jatp.terminal,
 com.ibm.jat.artifact,
 com.ibm.jat.cics,
 com.ibm.jat.core,
 com.ibm.jat.core.comms,
 com.ibm.jat.core.comms.http,
 com.ibm.jat.core.exceptions,
 com.ibm.jat.core.logging,
 com.ibm.jat.host,
 com.ibm.jat.hursleybank,
 com.ibm.jat.hursleybank.annotations,
 com.ibm.jat.hursleybank.enums,
 com.ibm.jat.manager,
 com.ibm.jat.zos.base,
 org.apache.log4j,
 org.junit
Bundle-RequiredExecutionEnvironment: JavaSE-1.8
Export-Package: com.ibm.hursleybank.tests.accountTests,
 com.ibm.hursleybank.tests.customerTests
```







