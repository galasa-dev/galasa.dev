---
path: "/docs/first-steps/writing-a-test"
title: "Writing your own SimBank test"
---

Now you have run through the tests provided as part of SimBank, you can have a go at writing your own test. Use the following scenario to help you create your own test that runs against SimBank in Eclipse. This scenario uses a 3270 terminal emulator to connect with SimBank and validates the sort code and balance that are associated with a SimBank account. 

At this stage, values are hard-coded - this scenario is designed to grow confidence in writing a simple Galasa test. 

<details>
<summary><b>Create a new Galasa test class in Eclipse</b></summary>

1. Start Eclipse and [launch SimBank](/docs/first-steps/simbank). 
2. Create a new test class by selecting *File > New > Class* from the main menu and clicking *Next* 
3. In the *Source Folder* field click *Browse* and navigate to *dev.galasa.simbank.tests* > *src/main/java* and click *OK* to add your class to the SimBank tests directory. 
4. In the *Package* field, enter *dev.galasa.tests*. 
5. In the *Name* field, type *ValidateAccount*.
5. Click *Finish*. 
The following empty test class is created: 
```
package dev.galasa.simbanks.tests;
public class ValidateAccount {}
```
</details>

<details>
<summary><b>Set up the Galasa test</b></summary>

1. Import the *dev.galasa.Test* package into your test class:
```
package dev.galasa.simbanks.tests;
import dev.galasa.Test;
public class ValidateAccount {}
```
2. Add the *@Test* annotation to tell the Galasa framework that the code that follows this annotation is test code: 
```
package dev.galasa.simbanks.tests;
import dev.galasa.Test;
@Test
public class ValidateAccount {}
```
</details>

<details>
<summary><b>Write a "not null" test</b></summary>

In this scenario, we are testing that we get the correct sort code and balance returned when we browse SimBank for a specified account by using 3270 screens.

1. Provision the resources that you need for the test. 
We know that we need a 3270 terminal. The 3270 terminal needs a z/OS image to run, so the following code from *BasicAccountCreditTest* is copied into the test:
```  
package dev.galasa.simbanks.tests;
import dev.galasa.Test;
import dev.galasa.zos.ZosImage;
import dev.galasa.zos.IZosImage;
import dev.galasa.zos3270.Zos3270Terminal;
import dev.galasa.zos3270.ITerminal;
@Test
public class ValidateAccount {
	 @ZosImage(imageTag="SimBank")
     public IZosImage image;

	 @Zos3270Terminal(imageTag="SimBank")
	 public ITerminal terminal;
} 
```  
2. Write a "not null" test method.
It's a good idea to write a "not null" test method to check that everything is working before you write your test code. Create the test method by and importing the assertThat method and by writing a *public void* method to check that the objects you need are loaded.
```
import static org.assertj.core.api.Assertions.assertThat;
```
```
@Test
public void testNotNull() {
	        assertThat(terminal).isNotNull();
	        }
```  
The following snippet shows the test code that is written so far:  
```
package dev.galasa.simbanks.tests;
import dev.galasa.Test;
import dev.galasa.zos.ZosImage;
import dev.galasa.zos.IZosImage;
import dev.galasa.zos3270.Zos3270Terminal;
import dev.galasa.zos3270.ITerminal;
import static org.assertj.core.api.Assertions.assertThat;
@Test
public class ValidateAccount {
	 @ZosImage(imageTag="SimBank")
     public IZosImage image;

	 @Zos3270Terminal(imageTag="SimBank")
	 public ITerminal terminal;
@Test 
public void testNotNull() {
	   assertThat(terminal).isNotNull();
	    }
}
```  
</details>

<details>
<summary><b>Run the "not null" test method</b></summary>

1. From the main menu, choose *Run > Run Configurations*.
2. In the *Create, manage and run configurations* pop-up window, select *Galasa* in the left pane and click the *New launch configuration* icon.
3. Name the configuration and click *OK*. In this scenario we have named the configuration *ValidateAccount*.
4. In the *Project* field, browse to *dev.galasa.simbank.tests* and click *OK*.
5. In the *Test class* field, browse to *dev.galasa.simbanks.tests.ValidateAccount*.
6. Select *Apply* > *Run*. 

A message `Passed - Test method dev.galasa.simbanks.tests.ValidateAccount#testNotNull,type=Test` appears in the console window.
</details>

<details>
<summary><b>Write the validate account test method</b></summary> 

When the "not null" test method completes successfully, write a second test method to validate the account sort code and balance of a specified account. SimBank has an account with the number *123456789*, so we are using this account for our test in this scenario. The test assumes that the sort-code is *11-01-45* and that the balance of the account is *56.72*.
1. Import the following required exceptions, which can be used to help with debugging the test if it fails. If you do not import the exceptions, Eclipse flags this and prompts you to complete the imports. 
```
	 	import java.io.IOException;
	 	import java.net.URISyntaxException;
	 	import dev.galasa.artifact.TestBundleResourceException;
		import dev.galasa.http.HttpClientException;
		import dev.galasa.zos.ZosManagerException;
		import dev.galasa.zos3270.FieldNotFoundException;
		import dev.galasa.zos3270.KeyboardLockedException;
		import dev.galasa.zos3270.TextNotFoundException;
		import dev.galasa.zos3270.TimeoutException;
		import dev.galasa.zos3270.spi.DatastreamException;
		import dev.galasa.zos3270.spi.NetworkException;
```
2. Create a *public void* method to log onto the terminal and open the application. 
When using the 3270 screens, the cursor is positioned under the first letter of the field name, for example, the "U" of Userid. The `.tab` code moves the cursor to the field where a value can be entered. Each time the screen changes, we need to include `waitforkeyboard` code. 
```
     @Test
	 public void testValidateAccount() throws TestBundleResourceException, URISyntaxException, IOException, HttpClientException, ZosManagerException, DatastreamException, TimeoutException, KeyboardLockedException, NetworkException, FieldNotFoundException, TextNotFoundException, InterruptedException  {
	        //Logon through the session manager
	    	terminal.waitForKeyboard()
	        .positionCursorToFieldContaining("Userid").tab().type("IBMUSER")
	        .positionCursorToFieldContaining("Password").tab().type("SYS1")
	        .enter().waitForKeyboard();	    	
	    	 //Open the banking application
	        terminal.pf1().waitForKeyboard()
	        .clear().waitForKeyboard()
	        .tab().type("bank").enter().waitForKeyboard();
```  
3. Create the new code to validate the correct sort code and balance is returned for account number *123456789*. 
```        
	        //Go to the Browse Accounts screen. 
	        terminal.pf1().waitForKeyboard();
	        //Position the cursor at Account Number field - the cursor is positioned under the letter A of the Account Number. The .tab code moves the cursor to the field where a value can be entered. 
	        terminal.positionCursorToFieldContaining("Account Number").tab();
	        //Enter the account number
	        terminal.type("123456789");
	        //The number is submitted by pressing enter on the terminal. The screen is refreshed, so we need the ```waitforkeyboard```  code
	        //The *sortcode*, *balance* and message *Account Found* should appear on the terminal screen
	        terminal.enter().waitForKeyboard();
```
3. Assert that the values returned are correct:
```
	        //Use the assert methods to test that the expected values are returned to the screen
	        assertThat(terminal.retrieveScreen()).containsOnlyOnce("123456789");
	    	assertThat(terminal.retrieveScreen()).containsOnlyOnce("11-01-45");
	    	assertThat(terminal.retrieveScreen()).containsOnlyOnce("56.72");
	    	assertThat(terminal.retrieveScreen()).containsOnlyOnce("Account Found");       
```
**Tip:** If you have more than one method in your test, you can select which method(s) to run from the Run configurations screen by clicking search on *Test Method*.
</details>

<details>
<summary><b>Run the validate account test</b></summary>

1. From the main menu, choose *Run > Run Configurations*.
2. In the *Create, manage and run configurations* pop-up window, select the *ValidateAccount* test.
3. Click *Run*. 

A message `Passed - Test method dev.galasa.simbanks.tests.ValidateAccount#testValidateAccount,type=Test` appears in the console window.

*Note:* If the expected value for either the sort-code or account balance does not match the actual values, then a message `Failed - Test method dev.galasa.simbanks.tests.ValidateAccount#testValidateAccount,type=Test` appears in the console window.

You can view the expected and actual values by double-clicking on the relevant run in the *Galasa Results* tab and selecting the *Run Log* tab. You can also add breakpoints to your code and step through to view the value of the variables used in the test.
</details>

Now create your own test to run against SimBank, or copy and modify one of the tests provided, to get more experience in writing Galasa tests. 

