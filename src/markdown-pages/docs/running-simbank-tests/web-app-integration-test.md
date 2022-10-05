---
path: "/docs/running-simbank-tests/web-app-integration-test"
title: "WebAppIntegrationTest"
---

The `WebAppIntegrationTest` is somewhat different to the previously described Galasa SimBank tests. It shows how you can use Galasa to test a [hybrid cloud application](../../about_Galasa) that uses a mix of platforms and technologies. A mix of technologies makes end-to-end integration testing complicated. Use the `WebAppIntegrationTest` to help understand how Galasa simplifies integration testing in such an environment.

## About the WebAppIntegrationTest

This test performs a similar function to the `ProvisionedAccountCreditTest.java` but includes the use of the Selenium Manager. The Selenium Manager enables the test to run Selenium WebDrivers which drive the SimBank Web Application that is provided with Galasa SimBank. 

The `WebAppIntegrationTest` performs the following functions:

- Generates a random account number 
- Uses a 3270 application to ensure that this account number does not exist in SimBank
- If the account does not exist, invokes a batch job to create the account
- Uses Selenium to drive the SimBank Web Application to credit the account with some funds
- Runs the 3270 application again to validate that the expected funds were added to the account


## Running the WebAppIntegrationTest

As the `WebAppIntegrationTest` is slightly different to the other tests, there's a bit more set up to do than for the other supplied SimBank tests. 

The test is still run locally but is designed to help you to understand how to set the properties that enable the test to run in a Galasa Ecosystem. When running the `WebAppIntegrationTest` you can use the localhost setting `127.0.0.1` to ensure that only the local machine is able to connect. 

The test uses the Selenium Manager, which in turn is dependent on the Docker Manager. Use the following sections to help you to understand how to configure your environment to work with the Selenium Manager and Docker Manager. 

### Using the Selenium Manager

The `WebAppIntegrationTest` uses the Selenium Manager. To use the Selenium Manager you must have a web browser, for example, Chrome or Firefox installed as well as either a GeckoDriver or a Docker Engine. In this example, Firefox and a GeckoDriver are used. 

You can <a href="https://github.com/mozilla/geckodriver/releases" target="_blank"> download GeckoDriver from GitHub</a>. 

You must define the default and local driver properties in the CPS, as shown in the following example:

```
selenium.default.driver=FIREFOX
selenium.LOCAL.driver.FIREFOX.path=<path/to/geckodriver>
```

### Using the Docker Manager 

The Selenium Manager has a dependency on the Docker Manager in order to run. Some set up is required for the Docker Manager in the CPS properties file. To configure the Docker Manager, set the following CPS properties:  

```
docker.dse.engine.PRIMARY=LOCAL
docker.default.engines=LOCAL
docker.engine.LOCAL.hostname=127.0.0.1
docker.engine.LOCAL.port=2375
docker.engine.LOCAL.max.slots=10
docker.container.TAG.name=simbank-webapp
```

These properties allow local test runs to access the local Docker Engine when the TCP port of the local Docker Engine is enabled.


### Building a Docker image

Complete the following steps to build a Docker image to use in the test. We plan to automate these manual steps in a future release. 

1. Open a TCP socket
After updating the CPS properties for the Docker Manager, run the following terminal commands to open a TCP socket for accessing the Docker API:
```
docker pull alpine/socat
docker run -d -p 127.0.0.1:2376:2375 -v /var/run/docker.sock:/var/run/docker.sock alpine/socat tcp-listen:2375,fork,reuseaddr unix-connect:/var/run/docker.sock
```
2. Build a Docker image called `simbank-webapp`
	1. Clone the Galasa `simplatform` repository on your machine. 
	1. Build the image by running the following command. For the command to work, the terminal must be running in the same directory as the one containing the Dockerfile. The Dockerfile is located in the [galasa-simplatform-webapp directory](https://github.com/galasa-dev/simplatform/tree/main/galasa-simplatform-application/galasa-simplatform-webapp) in the Galasa `simplatform` repository.
	```
	mvn install
	docker image build -t simbank-webapp 
	```
	1. Test that the container is working correctly by running the following command:
	```
	docker run -p 8080:8080 -d simbank-webapp
	```

### Troubleshooting

If the container is not working correctly, for example, compilation and runtime errors are returned, check the version of tomcat in the Dockerfile. You might need to edit the tomcat version to a version that is compatible with Java 11, for example, ```FROM tomcat:8.5.82-jre11-temurin```.



## Walkthrough - WebAppIntegrationTest

To run the test, follow the same steps as for `SimBankIVT.java` but using the test class name `WebAppIntegrationTest` instead of `SimBankIVT`. Don't forget that you need to launch [Galasa SimBank](/docs/getting-started/simbank) before running the test.

For brevity, package declarations and imports are omitted in the following walkthrough.

First, some objects are declared and then the `provisionAccount()` method is specified: 

```java
String accountNumber = provisionAccount(openingBalance);
logger.info("Account number selected: " + accountNumber);
```

The `provisionAccount()` method generates a random account number to use in the test, using a 3270 SimBank terminal to ensure that the generated account does not exist:

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

The following code enables Selenium WebDrivers to use a web browser to interact with and submit a form inside the provisioned application:

```java
IWebPage page = completeWebFormAndSubmit(accountNumber, creditAmount.toString());
logger.info("Web form submitted");
```

Checks are made to ensure that the web application response is as expected and that the data is updated throughout the application, including the backend database:

```java
assertThat(page.waitForElementById("good").getText()).contains("You have successfully completed the transaction");
page.quit();
logger.info("Response from servlet OK. Now validating the data has been updated in the database");
BigDecimal balance = retrieveAccountBalance(accountNumber).setScale(2);
assertThat(balance).isEqualTo(openingBalance.add(creditAmount));
logger.info("Test method complete");
```

At the end of the test, the Selenium Manager automatically closes the WebDriver which removes the web page.
