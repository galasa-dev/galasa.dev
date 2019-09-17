---
path: "/docs/getting-started/simframe-IVT"
title: "Running the Simframe IVT"
---
Simframe is accompanied by a set of proving tests that start with a basic Installation Verification Test (IVT). To follow this example,ensure that Eclipse is running and that you have launched the Simframe server as described [here](/docs/getting-started/simframe).

## Loading and running the Simframe installation verification tests (IVT)
1. Choose *File > New > Example*, select *Simframe example projects* and press *Next*.
1. Confirm your *New project* prefix (it's OK to leave it as `dev.galasa.simframe`) and press *Finish*. In your *Package Explorer* (if it's not visible, choose *Window > Show View > Package Explorer*), two new entries appear:
```
dev.galasa.simframe.manager
dev.galasa.simframe.tests 
```
1. Expand *dev.galasa.simframe.tests > src/main/java > galasa.test* in your *Package Explorer* and select *SimframeBankIVT.java*.
1. Choose *Run > Run Configurations* and look for and select *Galasa* in the left pane this time (not Galasa Simframe).
1. Right-click *Galasa* and choose *New Configuration*.
1. In the dialog, choose *Browse* to locate your project - `dev.galasa.simframe.tests`, then press *Search* to locate your test class, *SimframeBankIVT*.
1. Un-tick the *Include ~/.galasa/override.properties* box when back in the main *Run Configurations* dialog.
1. Press *Apply* then *Run*.
1. The *SimframeBankIVT* tests run, and the Eclipse console displays their progress through to completion.

### `SimframeBankIVT.java` - exploring the code
Even without any prior knowledge of Galasa, if you know a little Java, you will have no trouble understanding the flow of logic in `SimframeBankIVT.java`.

#### Imports
The code starts off with some imports, and these are largely divided into three broad categories:

* Interface and class definitions of Galasa managers, such as `HttpClient`, `IHttpClient` and the `zos3270` manager imports.
* Application (Simframe) related imports - `Account`, `IAccount` and so on.
* Some standard Java imports such as `java.io.IOException` and `java.math.BigDecimal`.

```
package galasa.test;

import dev.galasa.Test;
import dev.galasa.common.artifact.ArtifactManager;
import dev.galasa.common.artifact.IArtifactManager;
import dev.galasa.common.artifact.IBundleResources;
import dev.galasa.common.artifact.TestBundleResourceException;
import dev.galasa.common.http.HttpClient;
import dev.galasa.common.http.HttpClientException;
import dev.galasa.common.http.IHttpClient;
import dev.galasa.common.zos.IZosImage;
import dev.galasa.common.zos.ZosImage;
import dev.galasa.common.zos.ZosManagerException;
import dev.galasa.common.zos3270.FieldNotFoundException;
import dev.galasa.common.zos3270.ITerminal;
import dev.galasa.common.zos3270.KeyboardLockedException;
import dev.galasa.common.zos3270.TextNotFoundException;
import dev.galasa.common.zos3270.TimeoutException;
import dev.galasa.common.zos3270.Zos3270Terminal;
import dev.galasa.common.zos3270.spi.DatastreamException;
import dev.galasa.common.zos3270.spi.NetworkException;
import galasa.manager.Account;
import galasa.manager.IAccount;
import galasa.manager.ISimBank;
import galasa.manager.SimBank;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
```

#### The `SimframeBankIVT` test class
The code begins with the `@Test` annotation which is not a Galasa-specific structure - it provides a general hint to many types of Java tooling (for example, Maven or JUnit) that a method or class is a test (for scoping purposes).

Next at the beginning of the test class proper, four Galasa managers are declared via annotations, together with four corresponding public interfaces - `@ZosImage`, `@Zos3270Terminal` and so on.

```
public class SimframeBankIVT{ 

    @ZosImage(imageTag="A")
    public IZosImage image;

    @Zos3270Terminal(imageTag="A")
    public ITerminal terminal;

    @ArtifactManager
    public IArtifactManager artifacts;

    @HttpClient
    public IHttpClient client;
```

Then a helper method `testNotNull` is defined - such methods can be very useful when creating and debugging new tests, and its decoration with the `@Test` annotation ensures that it runs when the code is invoked by the test runner.

```
    @Test
    public void testNotNull() {
        //Check all objects loaded
        assertThat(terminal).isNotNull();
        assertThat(artifacts).isNotNull();
        assertThat(client).isNotNull();
    }
```

Finally, the main test method itself - `checkBankIsAvailable()` - is defined, where a sequence of method calls chained off `terminal.waitForKeyboard()` enables Galasa to sign into the Simframe system using its session manager. It demonstrates using the following methods:

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
Two `assertThat()` assertions then confirm that the test has arrived on its intended screen, verified by the presence of a single occurrence of each of the strings SIMFRAME MAIN MENU and BANKTEST.
```
    	//Assert that the session manager has a bank session available
        assertThat(terminal.retrieveScreen()).containsOnlyOnce("SIMFRAME MAIN MENU");
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
