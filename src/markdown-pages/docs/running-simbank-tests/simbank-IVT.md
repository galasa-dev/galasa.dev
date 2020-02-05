---
path: "/docs/running-simbank-tests/simbank-IVT"
title: "Running the SimBank Installation Verification Test"
---
This basic test logs on to SimBank and examines an account.
1. Create your initial example projects as described in <a href="/docs/running-simbank-tests" target="_blank">Running the supplied SimBank tests</a> - a once-only activity.
1. Ensure that Eclipse is running, your example projects are open and that you have launched SimBank as described in <a href="/docs/getting-started/simbank" target="_blank">Exploring SimBank</a>.
1. Choose *Run > Run Configurations* and look for and select *Galasa* in the left pane (not Galasa SimBank).
1. Right-click *Galasa*, choose *New Configuration* and give it a name.
1. In the dialog, choose *Browse* to locate your project - `dev.galasa.simbank.tests`, then press *Search* to locate your test class, *SimBankIVT*.
1. Press *Apply* then *Run*.
1. The *SimBankIVT* tests run, and the Eclipse console displays their progress through to completion - you will see a console message like: <br/>
`INFO dev.galasa.boot.Launcher.launch - Boot complete`
<br/>
 when the tests have finished. You will also see a *live terminal* window in which the interactions with the 3270 terminal are captured - you can use the attached controls to step back and forth along the sequence of screens. 

## Exploring the `SimBankIVT` test class
Even without any prior knowledge of Galasa, if you know a little Java, you will have no trouble understanding the flow of logic in `SimBankIVT.java` and the `SimBankIVT` test class.

The class is first annotated with `@Test` - informing the framework that a method or (as in this case) a class is a test.

Next at the beginning of the test class proper, several Galasa Managers are declared via annotations, together with their corresponding public interfaces - `@ZosImage`, `@Zos3270Terminal` and so on. Using the `imageTag="simbank"` argument with `@ZosImage` allows you to associate an instance of a Manager with a set of configuration properties.
```java
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

Note that as a general principle, any objects, classes or methods that you wish to interact with the Galasa test framework should be declared as `public`.

Next, a test method `testNotNull` is defined - when executed, this tests and demonstrates that Galasa has started the required Managers.

```java
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
```java
@Test
public void checkBankIsAvailable() throws TestBundleResourceException, URISyntaxException,
            IOException, HttpClientException, ZosManagerException,
            DatastreamException, TimeoutException, KeyboardLockedException,
            NetworkException, FieldNotFoundException, TextNotFoundException {
        //Logon through the session manager
        terminal.waitForKeyboard()
            .positionCursorToFieldContaining("Userid").tab().type("IBMUSER")
            .positionCursorToFieldContaining("Password").tab().type("SYS1")
            .enter().waitForKeyboard();
}
```

These methods are available via the imported `Zos3270Terminal` Manager, which was written by a specialist and made available by the Galasa framework to anyone who needs to write a test that uses such an abstraction. It supports a fluent style, allowing its methods to be chained in a natural and easily-understandable fashion.

Two `assertThat()` assertions then confirm that the test has arrived on its intended screen, verified by the presence of a single occurrence of each of the strings SIMBANK MAIN MENU and BANKTEST.
```java
//Assert that the session manager has a bank session available
assertThat(terminal.retrieveScreen()).containsOnlyOnce("SIMPLATFORM MAIN MENU");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("BANKTEST");
```
The test proceeds to open the banking application, pressing the PF1 key and clearing the screen, before tabbing to an input field and entering the name of the BANK transaction:
```java
//Open banking application
terminal.pf1().waitForKeyboard()
    .clear().waitForKeyboard()
    .tab().type("bank").enter().waitForKeyboard();
```
Finally, three assertions confirm that the test has arrived at its destination screen.
```java
//Assert that the bank menu is showing
assertThat(terminal.retrieveScreen()).containsOnlyOnce("Options     Description        PFKey ");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("BROWSE      Browse Accounts    PF1");
assertThat(terminal.retrieveScreen()).containsOnlyOnce("TRANSF      Transfer Money     PF4");
```
If any assertion failed, then the whole test would be marked as a *failed* test.