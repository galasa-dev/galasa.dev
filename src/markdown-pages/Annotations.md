---
path: "/docs/annotations"
title: "Annotations"
---

Annotations are used on the class to provide information about the environment setup not 
contained in the SEM model or DSE definition, and to provide information about the 
test to the test server which can be used to prioritise or categorise tests. 
Annotations on methods within a test designate those methods as test methods, or special methods 
as described above, or can indicate dependency on other test methods, and there are also 
'field annotations' or 'resource annotations' which indicate to the test runner that it is to 
provide the test with certain resources (terminals, userids, ports, etc).

### Informational Class Annotations

These are the annotations used to provide general information about the test for administration and management purposes. Some are mandatory and some are optional:

Mandatory:

@Summary(<String summary>) - A brief description of the purpose of the test.
@ReleaseAdded(<release>) - The release at which this test was first created.
@AreasTested - A list of areas which are actually tested 


### Environmental Class Annotations


These are used to provide information used in the creation of the environment in which the test will run. Effective use of these annotations helps to keep accompanying SEM models simple and hence more generic and reusable. Whether these are mandatory or optional is more an issue of common sense - some will be effectively mandatory as the test will otherwise not run:

Mandatory:

@Test - Indicates to the test runner that this is a Galasa test, your test will not run without it.
@Topology(<String topology>) - Tells the test runner what model to use for the test environment. 


### TestManager

The first line within your test class wil normally be:

'public ITestManager testManager;'

This adds the Test Manager object to your test class. The test manager is used to provide resources in 
test (see 'Resource Annotations') and to give the tester access to various functions and information 
provided by the Galasa infrastructure (such as information about the testing environment).



### Resource Annotations


Resource annotations are annotations declared within the test class, but outside any test methods. They take the form:

'@Resource(arg1,...,argN) public <type> <field>;'

When each test method is started the Test Manager processes these annotations and assign an appropriate object to the variable <field>. Because Junit deals with test methods as independent entities this is repeated for each test method, but if a field has already had an object assigned during the current run, the test manager knows to use that same object again.

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
This assigns an 'IUserID' object of the type 'MVSBASIC' to the field 'myMVSUserid'. You could then use this object in your test methods, e.g. to change the password for that userid:
```
'myMVSUserid.changePassword("NEWPW0RD", true);'
```
Or:
```
'@Port() public int myPort;'
```
Which assigns the value of a free port number to the field 'myPort'. You might then use this to e.g., define a TCPIP service:

'testManager.getCEDAHelper(myTag).createResource(terminal, "TCPIPSERVICE", "TCPC", "TCPC", "PORTNUMBER(" + myPort + ") PROTOCOL(HTTP)");'

This would define your TCPIP service on 'myPort'.

### Test Annotations


The final type of annotation used in Galasa are the test annotations, or method annotations. These are declared on individual methods and denote the type of that method so that the test runner knows what to do with it. The annotations available are:

@Test - This indicates that the following method is a normal test method.
@Before - This indicates that the following method is to be run before each test method.
@After - This indicates that the following method is to be run after ech test method.
@Initialise - This indicates that the following method is always the very first method to be run in the test.

The use of @Test is very simple, the test runner will simply run through each such annotated test method in the order they appear (unless a particular order or selection of test methods is selected in the run configuration).
@Before and @After are called respectively before and after each method run. These methods would typically be used to ensure that your environment is in a usable state before the next test method is called, particularly if the preceeding test method has exited in an unexpected state. e.g.:

```
'@Before
public void initialize() throws TerminalException? {
myTerminal.resetAndClearScreen();
}'
```

This would reset the terminal object assigned to 'myTerminal' to the CICS welcome screen and then clear it, so each test method can be sure that that terminal is in a guaranteed state regardless of what happened in previous test methods.

@Initialise provides a way of denoting a method which is always run before any @Test,@Before or @After methods. It's possible when running a JATP test to specify only a selection of test methods to be run. @Initialise is intended to provide the tester with a means of performing any setup required which can't then be accidentally omitted by people running such a selection.

There are also two further annotations:

```
@TestCase(name=<String testcaseName>, testPlan=<String testPlan>) - The testcase covered by this method. If multiple trestcases are covered multiple @TestCase annotations can be declared within an @TestCases annotation.
@TestCases(cases={@TestCase(...),@TestCase(...),...}) - see @TestCase
Coding Standards
```

With the exception of some new standards applied to project structure and practices unique to working in the Java language, most of the coding standards expected fo JATP tests are common to all testing, e.g.: do not hard code anything that may change such as dataset names, uss paths, userids, hostnames, etc., or do anything else which unnecessarily limits the portability of your test; keep code well commented; reuse existing functionality where possible rather than writing it from scratch, etc.


### Mandatory practice


-Correct headers and the mandatory class annotations must be included in every test class.
-Any additional resources provided in the test bundle (e.g. csdinputs, file skeletons, cics bundle components, etc.) should be added to a subdirectory of the project's 'resources' directory. The subdirectories may be named as you wish, but should be sensible to other users.
-The class and all methods should be javadoc'd.
-Poolable resource should not have attributes referred to specifically. For example, userids, ip addresses, hostnames, port numbers, etc. should never be hard-coded. If you need to use a resource which requires some hard-coding then JATP requires enhancing.


