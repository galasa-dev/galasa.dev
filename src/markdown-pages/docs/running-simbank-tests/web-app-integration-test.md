---
path: "/docs/running-simbank-tests/web-app-integration-test"
title: "WebAppIntetgrationTest"
---


To run the test, follow the same steps as for `SimBankIVT.java` but using the test class name `WebAppIntetgrationTest` instead of `SimBankIVT`. Don't forget that you need to launch [Galasa SimBank](/docs/getting-started/simbank) before running the test.

This test performs a similar function to the `ProvisionedAccountCreditTest.java` but includes the use of the Selenium Manager. The Selenium Manager enables the test to run Selenium WebDrivers which drive the SimBank Web Application that is provided with Galasa SimBank. 

The `WebAppIntetgrationTest` generates a unique account number to use in the test and provisions the account with a randomly generated opening balance by using a 3270 emulator that connects to the web application which opens in Firefox. A batch job opens the account and fills in a form to credit the account with the opening balance. The 3270 emulator then connects to the web application, searches for the account number and retrieves the balance.  


## About the Selenium Manager

To use the Selenium Manager you must have Firefox and Gecko driver installed. You can <a href="https://github.com/mozilla/geckodriver/releases" target="_blank"> download Gecko driver from GitHub</a>. 

You must also define the default and local driver properties in the CPS, as shown in the following example:

```
selenium.default.driver=FIREFOX
selenium.local.driver.FIREFOX.path=<path/to/geckodriver>
```

The Selenium Manager has a dependency on the Docker Manager in order to run. Some set up is required for the Docker Manager in the CPS properties file. To configure the Docker Manager, set the following CPS properties:  

```java
docker.dse.engine.PRIMARY=LOCAL
docker.default.engines=LOCAL
docker.engine.LOCAL.hostname=127.0.0.1
docker.engine.port=2375
docker.engine.max.slots=10
docker.container.TAG.name=simbank-webapp
```

Docker Engine DSE CPS Property allows an image to be tagged, and then selected from a test class where LOCAL is the ID for the engine. In this example, using the `imageTag="SIMBANK"` argument with `@ZosImage` allows you to associate an instance of a Manager with a set of configuration properties.

```java
@ZosImage(imageTag = "SIMBANK")
public IZosImage image;
@ZosBatch(imageTag = "SIMBANK")
public IZosBatch zosBatch;
```

The Docker Engines CPS Property allows local runs to access the local Docker Engine. You must add this property to the CPS and enable the TCP port of your local Docker Engine.

The Docker Engine Port CPS Property is the TCP Port of the Docker Engine. The Docker Manager communicates with the Docker Engine via TCP. The Docker Engine needs to be configured to open the TCP port, which is usually 2375. If the port is not the default one, then this property needs to be provided in the CPS.


## Walkthrough - WebAppIntegrationTest

For brevity, package declarations and imports are omitted in the following walkthrough.

First, some Managers are declared, including a new Manager - `seleniumManager` - and a related annotation and interface `resources`.

```java
@SeleniumManager
public ISeleniumManager seleniumManager;
@BundleResources
public IBundleResources resources;
```

Next, the `provisionAccount()` method is specified: 

```java
String accountNumber = provisionAccount(openingBalance);
logger.info("Account number selected: " + accountNumber);
```

The `provisionAccount()` method generates a new random account number to use in the test, using a 3270 SimBank terminal to interact with the SimBank web application to ensure that the generated account does not already exist:

```java
public String provisionAccount(BigDecimal openingBalance) throws Exception {
		// Generate a random account number
		String accountNumber =  generateRandomAccountNumber();
		boolean searching = true;
		
		// A looped search to ensure the account number is unique.
		while (searching) {
			if (doesAccountExist(accountNumber)) {
				accountNumber =  generateRandomAccountNumber();
			} else {
				searching = false;
			}
		}
```

The account is opened and credited by using a z/OS Batch Job. When the amount to be credited is set, a HashMap is prepared with the parameters for the subsequent web services call:

```java
HashMap<String, Object> parameters = new HashMap<>();
parameters.put("CONTROL", "ACCOUNT_OPEN");
parameters.put("DATAIN", accountNumber+",20-24-09,"+openingBalance);
```

The following code enables Selenium WebDrivers to use a web browser to interact with and submit a form inside the provisioned weplication:

```java
IWebPage page = completeWebFormAndSubmit(accountNumber, creditAmount.toString());
logger.info("Web from submitted");
```

Checks are made to ensure that the web app response is as expected and that the data is updated throughout the application, including the backend database:

```java
assertThat(page.waitForElementById("good").getText()).contains("You have successfully completed the transaction");
page.quit();
logger.info("Response from servlet OK. Now validating the data has been updated in the database");
BigDecimal balance = retrieveAccountBalance(accountNumber).setScale(2);
assertThat(balance).isEqualTo(openingBalance.add(creditAmount));
logger.info("Test method complete");
```

At the end of the test, the Selenium Manager automatically closes the WebDriver which removes the web page.










