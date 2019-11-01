---
path: "/docs/first-steps/simbank-IVT"
title: "Running the supplied SimBank tests"
---
SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) logs on to SimBank and examines an account - `SimBankIVT.java`.
- A test that updates an account using web services and examines the changes with 3270 screens - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform the same test as above in an improved test design - `ProvisionedAccountCreditTests.java`.

# SimBankIVT.java
1. Ensure that Eclipse is running and that you have launched SimBank as described [here](/docs/first-steps/simbank).
1. Choose *File > New > Example*, select *SimBank example projects* and press *Next*.
1. Confirm your *New project* prefix (it's OK to leave it as `dev.galasa.simbank`) and press *Finish*. In your *Package Explorer* (if it's not visible, choose *Window > Show View > Package Explorer*), two new entries appear:
```
dev.galasa.simbank.manager
dev.galasa.simbank.tests 
```
1. Expand *dev.galasa.simbank.tests > src/main/java > deve.galasa.simbank.tests* in your *Package Explorer* and select *SimBankIVT.java*.
1. Choose *Run > Run Configurations* and look for and select *Galasa* in the left pane this time (not Galasa SimBank).
1. Right-click *Galasa* and choose *New Configuration*.
1. In the dialog, choose *Browse* to locate your project - `dev.galasa.simbank.tests`, then press *Search* to locate your test class, *SimBankIVT*.
1. Un-tick the *Include ~/.galasa/override.properties* box when back in the main *Run Configurations* dialog.
1. Press *Apply* then *Run*.
1. The *SimBankIVT* tests run, and the Eclipse console displays their progress through to completion. You will also see a *live terminal* window in which the interactions with the 3270 terminal are captured - when the test has finished, you can use the attached controls to step back and forth along the sequence of screens.

## `SimBankIVT.java` - exploring the code
Even without any prior knowledge of Galasa, if you know a little Java, you will have no trouble understanding the flow of logic in `SimBankIVT.java`.

### The `SimBankIVT` test class
The class is first annotated with `@Test` - informing the framework that a method or (as in this case) a class is a test.

Next at the beginning of the test class proper, several Galasa Managers are declared via annotations, together with their corresponding public interfaces - `@ZosImage`, `@Zos3270Terminal` and so on.
```
@Test
public class SimBankIVT{ 

    @ZosImage(imageTag="simbank")
    public IZosImage image;

    @Zos3270Terminal(imageTag="simbank")
    public ITerminal terminal;

    @ArtifactManager
    public IArtifactManager artifacts;

    @HttpClient
    public IHttpClient client;

    @CoreManager
    public ICoreManager coreManager;
```
Galasa will instantiate these objects - they are indeed, the Managers mentioned earlier.

Then a test method `testNotNull` is defined - when executed, this tests and demonstrates that Galasa has started the required Managers.

```
@Test
public void testNotNull() {
    //Check all objects loaded
    assertThat(terminal).isNotNull();
    assertThat(artifacts).isNotNull();
    assertThat(client).isNotNull();
}
```
Each line includes an assertion that states that an instance of a Manager should not be `null`. If one or more of these assertions is not true, then the test will fail, alerting you to the fact that one or more Managers has not been initialized correctly.

Finally, the main test method itself - `checkBankIsAvailable()` - is defined, and calls `coreManager.registerConfidentialText` to register the application password to the confidential text filtering service. This service replaces occurrences of registered phrases from log output with a numbered shield - e.g. \*\*\*1\*\*\*. In a generated log, a completed password field might look like:
```
Userid ===> IBMUSER  Password ===> *1**
```
Then, a sequence of method calls chained off `terminal.waitForKeyboard()` enables Galasa to sign into SimBank using its session manager. It demonstrates using the following methods:

* `positionCursorToFieldContaining(<string>)` - which as its name implies, positions the cursor to a field containing a specific label
* `tab()` - which presses the TAB key in the application under test
* `type(<string>)` - where a sequence of characters are typed into an input field
* `enter()` - where the ENTER key is pressed
```
@Test
public void checkBankIsAvailable() throws TestBundleResourceException, URISyntaxException, IOException, HttpClientException, ZosManagerException, DatastreamException, TimeoutException, KeyboardLockedException, NetworkException, FieldNotFoundException, TextNotFoundException {
    //Logon through the session manager
    terminal.waitForKeyboard()
    .positionCursorToFieldContaining("Userid").tab().type("IBMUSER")
    .positionCursorToFieldContaining("Password").tab().type("SYS1")
    .enter().waitForKeyboard();
```

These methods are available via the imported `Zos3270Terminal` Manager, which was written by a specialist and made available by the Galasa framework to anyone who needs to write a test that uses such an abstraction. It supports a fluent style, allowing its methods to be chained in a natural and easily-understandable fashion.

Two `assertThat()` assertions then confirm that the test has arrived on its intended screen, verified by the presence of a single occurrence of each of the strings SIMBANK MAIN MENU and BANKTEST.
```
//Assert that the session manager has a bank session available
assertThat(terminal.retrieveScreen()).containsOnlyOnce("SIMPLATFORM MAIN MENU");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("BANKTEST");
```
The test proceeds to open the banking application, pressing the PF1 key and clearing the screen, before tabbing to an input field and entering the name of the BANK transaction:
```
//Open banking application
terminal.pf1().waitForKeyboard()
.clear().waitForKeyboard()
.tab().type("bank").enter().waitForKeyboard();
```
Finally, three assertions confirm that the test has arrived at its destination screen.
```
//Assert that the bank menu is showing
assertThat(terminal.retrieveScreen()).containsOnlyOnce("Options     Description        PFKey ");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("BROWSE      Browse Accounts    PF1");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("TRANSF      Transfer Money     PF4");
```
If any assertion failed, then the whole test would be marked as a *failed* test.
# BasicAccountCreditTest.java
This test illustrates how to use web services to interface with the SimBank application, and how to use regular methods that you do not wish to be recognized as test methods.

To run this test, follow the same steps as for `SimBankIVT.java` but using the test class name `BasicAccountCreditTest` instead of `SimBankIVT`. Don't forget that you need to launch [SimBank](/docs/first-steps/simbank) before running the test.

The spine of this test resembles that of `SimBankIVT.java`, with a nearly-identical collection of imports and invoked Managers within the main test class - `BasicAccountCreditTest` in this case.

After registering the password as confidential text, the code uses the facilities of the 3270 terminal in much the same way as the previous example to retrieve an account balance:
```
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
Note that the `userBalance` is obtained by calling the private method `getBalance` - it is not annotated with `@Test`, and so will (correctly) not be identified to Galasa as a test method. It's also a good habit to declare such methods as *private* if possible.

```
private BigDecimal getBalance(String accountNum) throws DatastreamException, TimeoutException, KeyboardLockedException, NetworkException, FieldNotFoundException, TextNotFoundException, InterruptedException {
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
}
```

Next, the amount to be credited to the designated account is prepared by assigning it to the variable `amount`, and a HashMap is declared and loaded with the ACCOUNT_NUMBER and AMOUNT parameters.
```
//Set the amount be credited and call web service
BigDecimal amount = BigDecimal.valueOf(500.50);
HashMap<String,Object> parameters = new HashMap<String,Object>();
parameters.put("ACCOUNT_NUMBER", "123456789");
parameters.put("AMOUNT", amount.toString());
```

A sample web services request is created by populating the `testSkel.skel` skeleton SOAP message with the prepared parameters, and the web services request invoked. The actual call is made by `client`, an instance of our HTTPClient Manager. You can review the skeleton by expanding `src/main/resources > resources > skeletons` and browsing the `testSkel.skel` file.
```
//Load sample request with the given parameters
IBundleResources resources = artifacts.getBundleResources(this.getClass());
InputStream is = resources.retrieveSkeletonFile("/resources/skeletons/testSkel.skel", parameters);
String textContext = resources.streamAsString(is);

//Invoke the web request
client.setURI(new URI("http://" + image.getDefaultHostname() + ":2080"));
client.postTextAsXML("updateAccount", textContext, false);
```
Finally, the new balance is retrived, and an assertion checks that the new balance equates to the sum of the old balance plus the amount credited.
```
//Obtain the final balance
BigDecimal newUserBalance = getBalance("123456789");

//Assert that the correct amount has been credited to the account
assertThat(newUserBalance).isEqualTo(userBalance.add(amount));
```
# ProvisionedAccountCreditTests.java
To run this test, follow the same steps as for `SimBankIVT.java` but using the test class name `ProvisionedAccountCreditTests` instead of `SimBankIVT`. Don't forget that you need to launch [SimBank](/docs/first-steps/simbank) before running the test.

This test performs the same function as `BasicAccountCreditTest.java` but has an improved design which includes the use of a provisioned account object, which, once declared as:
```
@Account(existing=false, accountType=AccountType.HighValue)
public IAccount account;
```
is used to retrieve the account balance:
```
BigDecimal userBalance = account.getBalance();
```
Note how the `getBalance()` method has been moved into the provisioned account object, decluttering the main test class.
This declaration:
```
@Logger
public Log logger;
```
provides access to the log, to which an initial message is written:
```
Logger.info("Pre-test balance is " + userBalance.toString());
```
Once again, the amount to be credited is then set and a HashMap prepared with the parameters for the subequent web services call:
```
BigDecimal amount = BigDecimal.valueOf(500.50);
logger.info("Will credit account with " + amount.toString());
HashMap<String,Object> parameters = new HashMap<String,Object>();
parameters.put("ACCOUNT_NUMBER", account.getAccountNumber());
parameters.put("AMOUNT", amount.toString());
```
This time, the account number is obtained by calling `account.getAccountNumber()` rather than by hardcoding the value. 

The sample request is loaded with the prepared parameters, and a note made to the log:
```
//Load sample request with the given parameters
IBundleResources resources = artifacts.getBundleResources(this.getClass());
InputStream is = resources.retrieveSkeletonFile("/resources/skeletons/testSkel.skel", parameters);
String textContent = resources.streamAsString(is);

logger.info("Credit actioned");
```
The XML request is stored in the test results archive:
```
//Store the xml request in the test results archive
storeOutput("webservice", "request.txt", textContent);
```
This uses a private method called `storeOutput`:
```
private void storeOutput(String folder, String file, String content) throws IOException {
    	//Store the xml request in the test results archive
        Path requestPath = artifactRoot.resolve(folder).resolve(file);
        Files.write(requestPath, 
        		content.getBytes(), 
        		new SetContentType(ResultArchiveStoreContentType.TEXT), 
        		StandardOpenOption.CREATE);
    }
```
Then the actual web request is invoked, and the response stored in the test results archive:
```
//Invoke the web request
client.setURI(new URI(bank.getFullAddress()));
String response = (String) client.postTextAsXML(bank.getUpdateAddress(), textContent, false);

//Store the response in the test results archive
storeOutput("webservice", "response.txt", response);
```
To complete the test, the final balance is obtained and logged, an assertion checks that the correct amount has been credited and a final note is made to the log:
```
//Obtain the final balance
BigDecimal newUserBalance = account.getBalance();
logger.info("Post-test balance is " + newUserBalance.toString());

//Assert that the correct amount has been credited to the account
assertThat(newUserBalance).isEqualTo(userBalance.add(amount));

logger.info("Balances matched");
```