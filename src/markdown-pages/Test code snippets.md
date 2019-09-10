---
path: "/docs/test_code_snippets"
title: "Test code snippets"
---

### Minimise boilerplate code

Keep the amount of boilerplate code in a test case small - this makes a test much easier to 
understand and maintain. The less code a tester has to write, the 
faster tests can be written and less can go 
wrong. Thereby freeing the tester to do 
more out of the box testing.

Avoid hard-coding values where possible. Using variables rather than hard coded values mean that you
can port your test between environments without need to update the code.


In the Simframe sample tests, the "BasicAccountCreditTest.java" uses the following boilerplate code to log onto
the environment and get the bank balance for account number "123456789".

```
// Register the password to the confidential text filtering service
    	coreManager.registerConfidentialText("SYS1", "IBMUSER password");

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

The userid, password and account balance is hard coded within the test. There is a significant number
of lines of code, some of which are repeated later in the test:

```
private BigDecimal getBalance(String accountNum) throws DatastreamException, TimeoutException, KeyboardLockedException, NetworkException, FieldNotFoundException, TextNotFoundException {
        BigDecimal amount = BigDecimal.ZERO;
        //Open account menu and enter account number
        terminal.pf1().waitForKeyboard()
                .positionCursorToFieldContaining("Account Number").tab()
                .type(accountNum).enter().waitForKeyboard();

        //Retrieve balance from screen
        amount = new BigDecimal(terminal.retrieveFieldTextAfterFieldWithString("Balance").trim());

        //Return to bank menu
        terminal.pf3().waitForKeyboard();
        return amount;
```

Writing a test in this way is a good way to start understanding Galasa, but once you've got the BasicAccountCreditTest
it's a good idea to extract the boilerplate code out of the test and into Managers, and 
use variables rather than hard-coded values so there's less maintenance and your test is more 
portable. 

If you look at the "ProvisionedAccountCreditTests.java" sample which is provided as part of Simframe,
you can see that the 14 lines of boilerplate code shown in the first example are now reduced to the following
single line of code:

```
//Obtain the initial balance
        BigDecimal userBalance = account.getBalance();
```

The responsibility of logging onto the system and getting a valid account to test with has been moved from 
the tester to the @SimBank Manager. For the purposes of this test, all the tester wants 
is a valid account. It is the responsibility of the SimBank Manager to provide that account and inject it 
into the class.

```
public class ProvisionedAccountCreditTests{ 

    @SimBank
    public ISimBank bank;
    
    @Account(existing=false, accountType=AccountType.HighValue)
    public IAccount account;
```
If a customer snapshots and anonymises 
their production data to create a test 
database, the Bank Manager could be 
written to use direct SQL calls to find 
accounts that are deemed valid.  Once it 
has found a candidate account, an instance 
of IBankAccount will be created, with all the 
required details, and injected into the test 
class.
The Bank Manager could also “lock” the 
account to prevent 2 tests from using the 
same account.
What this achieves is:-
1)
Tests are isolated from huge changes in 
the test data.
2)
Hard coded account numbers are not 
required
3)
Tests do not have account search code, 
thereby eliminating 50 lines of boilerplate 
code in hundreds of tests.
4)
When the first line of test code is run, it is 
guaranteed an account available and no 
other test will be using it.

```

**Talk about CPS - configuration property store**

For the “httpClient” field, the Bank Manager will do the 
following:-
1) Look in the CPS for a list of CICS Regions IDs that 
provide the Webservices, including the ports the 
webservice is exposed on.
2) Select a region to use.
2) Ask the CICS Manager for the zOS Image that region 
is running on.
3) Ask the zOS Manager for the hostname for that 
image.
4) Ask the HttpManager for a IHttpClient client for the 
that hostname/port.
5) Inject the IHttpClient into the “httpClient” field.

**Add information around where this code is extracted to and variables are used instead of hard 
coding. Need to include Manager and skeleton?** 


### Tagging

It's useful to tag your tests. For example:
```
@CICSTest
@Summary("An example test updating the CSD for a cics region")
@AreasTested(areas = { TestingArea.JAT_Infrastructure })
@Topology("SingleRegionWithJava")
```
@Summary shows at a glance what the test is doing, and @AreasTested show what part of the
product is under test - in this case the infrastructure. Tagging tests in this way makes it 
easier for teams to understand what tests are available to run for a changeset and makes creating a 
test catalog much eaiser. 


### Forcing an error

You might want to find out what happens in the event of an error occurring. For example, 

The following code snippet shows xyz
```

```


