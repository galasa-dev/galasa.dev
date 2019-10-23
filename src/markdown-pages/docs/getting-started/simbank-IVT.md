---
path: "/docs/getting-started/simbank-IVT"
title: "Running the supplied SimBank tests"
---
SimBank comes with a selection of prepared Galasa tests:

- A basic Installation Verification Test (IVT) using a Manager that provides a 3270 terminal interface - `SimBankIVT.java`.
- A test that updates an account using web services - `BasicAccountCreditTest.java`.
- A test that uses a provisioned account object to perform a series of credit tests - `ProvisionedAccountCreditTests.java`.

# SimBankIVT.java
1. Ensure that Eclipse is running and that you have launched the SimBank server as described [here](/docs/getting-started/simbank).
1. Choose *File > New > Example*, select *SimBank example projects* and press *Next*.
1. Confirm your *New project* prefix (it's OK to leave it as `dev.galasa.simbank`) and press *Finish*. In your *Package Explorer* (if it's not visible, choose *Window > Show View > Package Explorer*), two new entries appear:
```
dev.galasa.simbank.manager
dev.galasa.simbank.tests 
```
1. Expand *dev.galasa.simbank.tests > src/main/java > galasa.test* in your *Package Explorer* and select *SimBankIVT.java*.
1. Choose *Run > Run Configurations* and look for and select *Galasa* in the left pane this time (not Galasa SimBank).
1. Right-click *Galasa* and choose *New Configuration*.
1. In the dialog, choose *Browse* to locate your project - `dev.galasa.simbank.tests`, then press *Search* to locate your test class, *SimBankIVT*.
1. Un-tick the *Include ~/.galasa/override.properties* box when back in the main *Run Configurations* dialog.
1. Press *Apply* then *Run*.
1. The *SimBankIVT* tests run, and the Eclipse console displays their progress through to completion. You will also see a *live terminal* window in which the interactions with the 3270 terminal are captured - when the test has finished, you can use the attached controls to step back and forth along the sequence of screens.

## `SimBankIVT.java` - exploring the code
Even without any prior knowledge of Galasa, if you know a little Java, you will have no trouble understanding the flow of logic in `SimBankIVT.java`.

### Imports
The code starts off with some imports, and these are largely divided into three broad categories:

* Interface and class definitions of Galasa Managers, such as `HttpClient`, `IHttpClient` and the `zos3270` Manager imports and their related exceptions.
* Application (SimBank) related imports - `Account`, `IAccount` and so on.
* Some standard Java imports such as `java.io.IOException` and `java.math.BigDecimal`.

```
package dev.galasa.simbanks.tests;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.URISyntaxException;

import dev.galasa.Test;
import dev.galasa.artifact.ArtifactManager;
import dev.galasa.artifact.IArtifactManager;
import dev.galasa.artifact.TestBundleResourceException;
import dev.galasa.core.manager.CoreManager;
import dev.galasa.core.manager.ICoreManager;
import dev.galasa.http.HttpClient;
import dev.galasa.http.HttpClientException;
import dev.galasa.http.IHttpClient;
import dev.galasa.zos.IZosImage;
import dev.galasa.zos.ZosImage;
import dev.galasa.zos.ZosManagerException;
import dev.galasa.zos3270.FieldNotFoundException;
import dev.galasa.zos3270.ITerminal;
import dev.galasa.zos3270.KeyboardLockedException;
import dev.galasa.zos3270.TextNotFoundException;
import dev.galasa.zos3270.TimeoutException;
import dev.galasa.zos3270.Zos3270Terminal;
import dev.galasa.zos3270.spi.DatastreamException;
import dev.galasa.zos3270.spi.NetworkException;
```

### The `SimBankIVT` test class
The class is first annotated with `@Test` - not a Galasa-specific structure - it provides a general hint to many types of Java tooling (for example, Maven or JUnit) that a method or class is a test (for scoping purposes).

Next at the beginning of the test class proper, four Galasa Managers are declared via annotations, together with four corresponding public interfaces - `@ZosImage`, `@Zos3270Terminal` and so on.

```
@Test
public class SimBankIVT{ 

    @ZosImage(imageTag="A")
    public IZosImage image;

    @Zos3270Terminal(imageTag="A")
    public ITerminal terminal;

    @ArtifactManager
    public IArtifactManager artifacts;

    @HttpClient
    public IHttpClient client;

    @CoreManager
    public ICoreManager coreManager;
```

Then a helper method `testNotNull` is defined - such methods can be very useful when creating and debugging new tests (... to eliminate the possibility that important elements of a test have not been initialized correctly).

```
@Test
public void testNotNull() {
    //Check all objects loaded
    assertThat(terminal).isNotNull();
    assertThat(artifacts).isNotNull();
    assertThat(client).isNotNull();
}
```

Finally, the main test method itself - `checkBankIsAvailable()` - is defined, and calls `coreManager.registerConfidentialText` to register the application password to the confidential text filtering service. This service replaces occurrences of registered phrases from log output with a numbered shield - e.g. \*\*\*1\*\*\*.

Then, a sequence of method calls chained off `terminal.waitForKeyboard()` enables Galasa to sign into the SimBank system using its session manager. It demonstrates using the following methods:

* `positionCursorToFieldContaining()` - which as its name implies, positions the cursor to a field containing a specific label
* `tab()` - which presses the TAB key in the application under test
* `type()` - where a sequence of characters are typed into an input field
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
Finally, four assertions confirm that the test has arrived at its destination screen.
```
//Assert that the bank menu is showing
assertThat(terminal.retrieveScreen()).containsOnlyOnce("Options     Description        PFKey ");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("BROWSE      Browse Accounts    PF1");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("UPDATE      Update Accounts    PF2");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("TRANSF      Transfer Money     PF4");
```

# BasicAccountCreditTest.java
This test illustrates how to use web services to interface with the SimBank application, and how to use regular helper methods that you do not wish to be recognized as test methods.

To run this test, follow the same steps as for `SimBankIVT.java` but using the test class name `BasicAccountCreditTest` instead of `SimBankIVT`. Don't forget that you need to launch [SimBank](/docs/getting-started/simbank) before running the test.

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
Note that the `userBalance` is obtained by calling the private helper method `getBalance` - it is not annotated with `@Test`, and so will (correctly) not be identified to Galasa as a test method. It's also a good habit to declare such methods as *private* if possible.

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

A sample web services request is created by populating the `testSkel.skel` skeleton SOAP message with the prepared parameters, and the web services request invoked. The actual call is made by `client`, an instance of our HTTPClient Manager.
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
To run this test, follow the same steps as for `SimBankIVT.java` but using the test class name `ProvisionedAccountCreditTests` instead of `SimBankIVT`. Don't forget that you need to launch [SimBank](/docs/getting-started/simbank) before running the test.

** TO BE COMPLETED **