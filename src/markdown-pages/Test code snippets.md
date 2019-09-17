---
path: "/docs/test_code_snippets"
title: "Galasa test examples"
---

The examples in this section are taken from the Simframe tests that are packaged as part of Galasa. To view the full set of Simframe test code see, xxx.

# Minimise boilerplate code

Keeping the amount of boilerplate code in a test case small makes tests easier to write,
understand and maintain. The less code a tester has to write, the faster tests can be written and the less that can go wrong. Use the time saved to focus on writing edge test cases or more complex test suites. 

In Galasa, boilerplate code is extracted out of tests and into Galasa Managers. The test can be coded to simply call the Managers it requires to run. The following examples show how boilerplate code has been abstracted out of the test and into a Manager. 

The following example "BasicAccountCreditTest.java" shows a Simframe test where many lines of code are required to enable Galasa to sign into the Simframe system using its session manager, find a high value account and return the account balance by using the following methods:

```
    positionCursorToFieldContaining() - positions the cursor to a field containing a specific label
    tab() - presses the TAB key in the application under test
    type() - a sequence of characters are typed into an input field
    enter() - the ENTER key is pressed


    	//Initial actions to get into banking application
    	terminal.waitForKeyboard()
        .positionCursorToFieldContaining("Userid").tab().type("IBMUSER")
        .positionCursorToFieldContaining("Password").tab().type("SYS1")
        .enter().waitForKeyboard()

        //Open banking application
        .pf1().waitForKeyboard()
        .clear().waitForKeyboard()
        .tab().type("bank").enter().waitForKeyboard();

        //Obtain the initial balance
        BigDecimal userBalance = getBalance("123456789");

```
Writing a test in this way is a good way to start understanding Galasa, but once you've understood the BasicAccountCreditTest, it's a good idea to extract the boilerplate code out of the test and into a Manager.

The following example shows the "ProvisionedAccountCreditTests.java" sample which is provided as part of Simframe. The many lines of boilerplate code shown in the first example are now reduced to the following single line of code:

```
//obtain the initial balance
		double preBalance = bank.getbalance(terminalCICS1, account.getAccountNumber());
```


The responsibility of logging onto the system and finding a valid account to test with has been moved from the test to  the HursleyBank Manager. For the purposes of this test, all the tester wants is a valid account. It is the responsibility of the SimBank Manager to provide that account and inject it into the class.

# Avoid hard coding

In the first example, "BasicAccountCreditTest.java", the userid ("IBMUSER"), password ("SYS1")  and account number ("123456789") is hard coded within the test. The disadvantage with hard-coding values is that it makes the test less portable and more difficult to maintain. The values must be changed manually to run on a different test environment, or to use a different bank account. With Galasa, you can run the same test on any environment without changing a single line of code by using variables. 

The second example,  "ProvisionedAccountCreditTests.java", shows how the hard-coded values are replaced with variables: 

```
public class ProvisionedAccountCreditTests {
	
	private IHursleyBank bank;
	
	@CICSTerminal(tag = "A")
	public ITerminal terminalCICS1;
	
	@ProvisionAccount(type=AccountType.HIGH)
	IAccount account;
	
	@Before
	public void cleanTerminals() throws Exception{
		terminalCICS1.clearScreen();
	}
```        
```
//Obtain the initial balance of an account with a high monetary value
		double preBalance = bank.getbalance(terminalCICS1, account.getAccountNumber());
```                

The HursleyBank Manager finds a valid account, creates an instance of IAccount with the correct characteristics (in this case an account with a high monetary value) and injects the instance into the test class.  The HursleyBank Manager "locks" the account, preventing other tests from using the same account. 
The architecture means that the following benefits are achieved: 
1. Tests are isolated from changes in the test data.
2. Hard coded account numbers are not required
3. Tests do not have contain code to search for specific account types, eliminating numerous lines of boilerplate code in hundreds of tests.
4. When the first line of test code is run, it is guaranteed that an account is available and that no other test will be using it.

# Tagging

Tagging your tests makes it easier for others to quickly understand what tests are available to run against a system, area or application, helping to avoid duplicate tests being written. Tagging also helps when you want to create a suite of tests to run automatically when a change set affecting a system or area is delivered. 

The "AbstractedAccountCreditTests.java" sample in Simframe tests the area of accounts, finding an account and crediting that account with money. The test is designed to run only on in service or production environments and uses a single CICS region. The test has the following tags:

```
@HursleyBankTest
@HursleyBankMinimumRelease(release=HursleyBankRelease.InService)
@HursleyBankMaximumRelease(release=HursleyBankRelease.Production)
@Topology("SingleRegion")
@HursleyBankAreasTested(primaryArea=HursleyBankAreasTested.TestingArea.Account)
@TestTags(tags={"AccountTests"})
```

The tags @HursleyBankMinimumRelease and @HursleyBankMaximumRelease indicate the minimum and maximum test environment release against which the test can run. 

The @Topology tag specifies the type of environment required by the test in order for it to run. In this example a single CICS region is required.

@HursleyBankAreasTested and @TestTags indicate which area(s) of a product is under test. For this test, the focus is on accounts. 

The information provided by the tags can be used by individuals or teams to discover what tests are currently available to be run against an area and environment, making it easier to re-use existing tests rather than creating new ones. The tagging also helps to identify tests that could be scheduled to run automatically each time a code change affecting, for example, the account area is delivered. 
