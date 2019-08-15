---
path: "/docs/getting-started/simframe"
title: "Simframe"
---
# Simframe
Simframe is a component distributed with Galasa that simulates a mainframe application. As delivered, it implements a toy banking application against which you can configure and run some provided tests in preparation for running your own tests against an *actual* mainframe application. You can also practice writing some new tests to run against Simframe.

By exercising the Galasa framework against Simframe, you can pre-empt a lot (but not all) of the work necessary to eventually hook your own tests up with a genuine mainframe environment. If the provided Simframe tests do not work, then it is unlikely that you will be able to run your own tests on a mainframe application. Running the provided tests against Simframe is an advised (but not mandatory) precursor to running your own tests on the mainframe itself. In summary, Simframe helps to expose and fix problems that you might otherwise encounter only when attempting to run tests directly against a mainframe. When you become an experienced Galasa user, it is likely that you will be able to omit the Simframe stage, especially if you have been through the Simframe loop several times before.

## Launching Simframe
1. Start Eclipse.
1. From the main menu, choose *Run > Run Configurations*.
1. In the popup *Create, manage and run configurations* window, select *Galasa Simframe* in the left pane and press the *New Configuration* button. 
1. Type your preferred name for the run configuration in the *Name:* field, press *Apply* and then *Run*. Once created, your run configuration is available for future runs.
In a few seconds, the Eclipse *Console* window responds with a series of initialization messages, which on Windows looks like:
```
    2019-08-15 18:02:20 INFO dev.galasa.simframe.main.Simframe main Starting Simframe ...
    2019-08-15 18:02:21 INFO dev.galasa.simframe.db.Database setDerbyHome Setting Derby home to C:\Users\<Username>\AppData\Local\Temp\galasaSimframe3169992835626147051
    2019-08-15 18:02:22 INFO dev.galasa.simframe.saf.SecurityAuthorizationFacility <init> Creating SAF service
    2019-08-15 18:02:22 INFO dev.galasa.simframe.application.Bank accountExists Checking if account: 123456789 exists
    2019-08-15 18:02:22 INFO dev.galasa.simframe.application.Bank accountExists Account doesn't exist
    2019-08-15 18:02:22 INFO dev.galasa.simframe.application.Bank openAccount Creating account: 123456789
    2019-08-15 18:02:22 INFO dev.galasa.simframe.application.Bank accountExists Checking if account: 987654321 exists
    2019-08-15 18:02:22 INFO dev.galasa.simframe.application.Bank accountExists Account doesn't exist
    2019-08-15 18:02:22 INFO dev.galasa.simframe.application.Bank openAccount Creating account: 987654321
    2019-08-15 18:02:22 INFO dev.galasa.simframe.saf.SecurityAuthorizationFacility addUser Added user: IBMUSER
    2019-08-15 18:02:22 INFO dev.galasa.simframe.main.Simframe main Loading services...
    2019-08-15 18:02:22 INFO dev.galasa.simframe.listener.Listener <init> Loading service: dev.galasa.simframe.listener.WebServiceListener listening on port: 2080
    2019-08-15 18:02:22 INFO dev.galasa.simframe.listener.Listener <init> Loading service: dev.galasa.simframe.listener.TelnetServiceListener listening on port: 2023
    2019-08-15 18:02:22 INFO dev.galasa.simframe.main.Simframe main ... services loaded
```

        If you are a Mac or Linux user, the messages will be almost identical.

5. The Simframe process has been launched, and is listening on port *2023* for Telnet connections, and on port *2080* for web services connections (which are not further explored in this section).

## Exploring Simframe
Having launched Simframe, its banking application is listening on port 2023 for incoming Telnet connections - an ideal opportunity to connect to it manually to understand the nature of the (simulated) transactions it supports, before attempting to run the provided tests against it.

## Running the provided Simframe tests