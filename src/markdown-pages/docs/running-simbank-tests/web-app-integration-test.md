---
path: "/docs/running-simbank-tests/web-app-integration-test"
title: "WebAppIntetgrationTest"
---


To run the test, follow the same steps as for `SimBankIVT.java` but using the test class name `WebAppIntetgrationTest` instead of `SimBankIVT`. Don't forget that you need to launch [Galasa SimBank](/docs/getting-started/simbank) before running the test.

The test is a bit different to the other tests. The idea of the test is ... 

As a result there's a bit more set up to do .. see the section for deets ..

This test performs a similar function to the `ProvisionedAccountCreditTest.java` but includes the use of the Selenium Manager. The Selenium Manager enables the test to run Selenium WebDrivers which drive the SimBank Web Application that is provided with Galasa SimBank. 

The `WebAppIntetgrationTest` generates a unique account number to use in the test and provisions the account with a randomly generated opening balance by using a 3270 emulator that connects to the web application which opens in Firefox. A batch job opens the account and fills in a form to credit the account with the opening balance. The 3270 emulator then connects to the web application, searches for the account number and retrieves the balance.  

The idea of this test is to ... run locally but then understand the properties to run in an ecosystem. If running locally lock it down for security purposes by using the 127.0.0.1 localhost. Wouldn't set it up in Production like this. 
The test is showing about application integration testing. The test is kept simple therefore. Shows proper integration testing. 
The Selenium Manager can be set up in various ways .. use gecko driver or use docker engine?? Say a bit about that. 

Create an image showing the interactions: 

1. 3270 emulator creates a random account number and checks that it does not exist in the CICS region.
2. If the account does not exist the account is created by the ZOS Batch Manager and is popped into the backend database.
3. Docker then spins up a web page? 
4. Selenium drives web browser to fill in a web form and this confirms the balance? 

## About the Selenium Manager

Need gecko driver for scenario 1 - tell a bit about why you would choose this option. 
It can be Firefox or Chrome or what have you but this example is showing Firefox. 

To use the Selenium Manager you must have Firefox and Gecko driver installed. You can <a href="https://github.com/mozilla/geckodriver/releases" target="_blank"> download Gecko driver from GitHub</a>. 

You must also define the default and local driver properties in the CPS, as shown in the following example:

```
selenium.default.driver=FIREFOX
selenium.local.driver.FIREFOX.path=<path/to/geckodriver>
```

The Selenium Manager has a dependency on the Docker Manager in order to run. Some set up is required for the Docker Manager in the CPS properties file. To configure the Docker Manager, set the following CPS properties:  

```
docker.dse.engine.PRIMARY=LOCAL
docker.default.engines=LOCAL
docker.engine.LOCAL.hostname=127.0.0.1
docker.engine.local.port=2375
docker.engine.local.max.slots=10
docker.container.TAG.name=simbank-webapp
```

These properties allow local test runs to access the local Docker Engine when the TCP port of the local Docker Engine is enabled.


After updating the CPS properties you need to run some commands on the terminal to open a TCP socket for accessing the Dokcer API:

```
docker pull alpine/socat
docker run -d -p 127.0.0.1:2376:2375 -v /var/run/docker.sock:/var/run/docker.sock alpine/socat tcp-listen:2375,fork,reuseaddr unix-connect:/var/run/docker.sock
```

Test that the container works by running the following command:

```
mvn install
docker image build -t simbank-webapp .
docker run -p 8080:8080 -d simbank-webapp
``

The last command is to make sure the container works - may need to change the dockerfile so the tomact version works with the machine's architecture 
Had errors for compilation and runtime java versions so had to change tomcat version in Dockerfile as the properties were already set to the correct java version in the pom.xml files. – Had to change to a version that works for java 11 and all architectures so I chose “FROM tomcat:8.5.82-jre11-temurin”

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
logger.info("Web form submitted");
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










