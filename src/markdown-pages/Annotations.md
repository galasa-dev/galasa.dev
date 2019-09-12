---
path: "/docs/reference/annotations"
title: "Annotations"
---

Annotations provide data about a program that is not part of the test itself. The at sign character (@) indicates to the test runner that what follows is an annotation. Annotations can be used on the declaration of classes, methods or fields.

Annotations are used on the class to provide information about the environment setup, and the test to the test server. This information can be used to prioritise or categorise tests. 

Annotations on methods within a test designate those methods as test methods, or special methods,or can indicate dependency on other test methods. 

Field annotations or resource annotations tell the test runner that it needs to 
provide the test with certain resources, for example, terminals, userids, or ports.

### Informational Class Annotations

These are the annotations used to provide general information about the test for administration and management purposes. Some are mandatory and some are optional:

Mandatory:

@Summary(<String summary>) - A brief description of the purpose of the test.
@ReleaseAdded(<release>) - The release at which this test was first created.
@AreasTested - A list of areas which are actually tested 


### Environmental Class Annotations


These are used to provide information needed to create the environment in which the test will run.  Whether these are mandatory or optional is more an issue of common sense - some will be effectively mandatory as the test will otherwise not run:

Mandatory:

@Test - Indicates to the test runner that the public void method to which it is attached can be run as a Galasa test. The test needs this annotation to run. 
@Topology(<String topology>) - Tells the test runner what model to use for the test environment. 


### TestManager

The first line within your test class wil normally be:

'public ITestManager testManager;'

This adds the Test Manager object to your test class. The test manager is used to provide resources in test (see 'Resource Annotations') and to give the tester access to various functions and information provided by the Galasa infrastructure (such as information about the testing environment).


### Resource Annotations

Resource annotations are annotations declared within the test class, but outside any test methods. They take the form:

'@Resource(arg1,...,argN) public <type> <field>;'

When each test method is started the Test Manager processes these annotations and assign an appropriate object to the variable <field>. 

The resource annotations and corresponding types are as follows:

@Applid(tag=<String tag>); String - Provides the applid for the CICS region with the specified tag.
@CICSTerminal(tag=<String tag>[, startTerminal=<boolean startTerminal>]) ITerminal - Provides a terminal which will connect to the CICS region with the specified tag. Setting startTerminal=false will stop the terminal connecting automatically.
@Port(); int - Provides the number of the next free port in the current pool.
@RunID(); String - Provides the run id of the current test run.
@Sysid(tag=<String tag>); String - Provides the sysid for the CICS region with the specified tag.
@Userid(useridType=<UseridType type>); IUserID? - Provides a free userid of the type 'type'.

For example:
```
'@Userid(useridType=UseridType.MVSBASIC) public IUserID?myMVSUserid;'
```
This assigns an 'IUserID' object of the type 'MVSBASIC' to the field 'myMVSUserid'. You could then use this object in your test methods, for example to change the password for that userid:
```
'myMVSUserid.changePassword("NEWPW0RD", true);'
```
Or:
```
'@Port() public int myPort;'
```
Which assigns the value of a free port number to the field 'myPort'. 

### Test Annotations

The final type of annotation used in Galasa are the method annotations. These are declared on individual methods and denote the type of that method so that the test runner knows what to do with it. The annotations available are:

@Test - This indicates that the following method is a normal test method.
@Before - This indicates that the following method is to be run before each test method.
@BeforeClass - This indicates that the following method is to be run before each test class.
@After - This indicates that the following method is to be run after ech test method.
@AfterClass - This indicates that the following method is to be run after each test class.


The use of @Test is very simple, the test runner will simply run through each such annotated test method in the order they appear (unless a particular order or selection of test methods is selected in the run configuration).
@Before and @After are called respectively before and after each method run. These methods would typically be used to ensure that your environment is in a usable state before the next test method is called, particularly if the preceeding test method has exited in an unexpected state. For example:

```
'@Before
public void initialize() throws TerminalException? {
myTerminal.resetAndClearScreen();
}'
```

This resets the terminal object assigned to 'myTerminal' to the welcome screen and then clears it, so each test method can be sure that that terminal is in a guaranteed state regardless of what happened in previous test methods.

### Coding standards

Coding standards expected fo Galasa tests are common to all testing. For example, 
- Avoid hard coding anything that may change such as dataset names, uss paths, userids, hostnames as this  limits the portability of your test.
- Make sure your code is well commented.
- Reuse existing functionality where possible rather than writing it from scratch.


### Mandatory practice

-Correct headers and the mandatory class annotations must be included in every test class.
-Any additional resources provided in the test bundle (for example, csdinputs, file skeletons, cics bundle components) should be added to a subdirectory of the project's 'resources' directory. The subdirectories may be named as you wish, but should be sensible to other users.
-The class and all methods should be described in Javadoc.
-Poolable resource should not have attributes referred to specifically. For example, userids, ip addresses, hostnames, port numbers should not be hard-coded. 

Annotation | Manager  | Level  | Purpose
--------|--------|--------|--------
@Test  | Core | Class | Indicates following method is a test method
@Before | Core | Method | Indicates following method is run before each test method
@BeforeClass | Core | Method | Indicates following method is run before the test class
@After | Core | Method | Indicates following method is run after each test method
@AfterClass | Core | Method | Indicates following method is run after the test class
@Artifact | Artifact | Resource | 
@HttpClient | Http | Resource |
@MinimumRelease | Core | Class and Method | The minumum release level on which this test is run
@MaximumRelease | Core | Class and Method | The maxumum release level on which this test is run
