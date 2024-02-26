---
path: "/docs/ecosystem/ecosystem-authentication"
title: "Configuring authentication"
---

Galasa uses personal access tokens to authenticate users who want to interact with a Galasa Ecosystem by using the Galasa command line tool (galasactl). Personal access tokens are stored in the `GALASA_TOKEN` property of the `galasactl.properties` file in your Galasa home folder. The `galasactl.properties` file is created when you run the `galasa local init` command. Setting the `GALASA_TOKEN` property in this file with a valid token value allows the galasactl tool to access and communicate with an Ecosystem on behalf of the user. 

If you have [installed your Galasa Ecosystem](../ecosystem/ecosystem-installing-k8s) by using the Galasa Ecosystem Helm chart that is provided with Galasa, you will have access to the Galasa Web UI. To get a value for the `GALASA_TOKEN` property, log into the Galasa Web UI and request a personal access token which can be copied into the `GALASA_TOKEN` property. The instructions on how to do this are displayed in a dialog box in the Galasa Web UI. You can choose to set the token as an environmental variable but the value would not persist across terminals, so is valid only for that session.


## Authentication architecture

The following diagram shows the architecture for the authentication process:

![Galasa ecosystem architecture:](ecosystem-cluster-auth.svg)


## Configuring a personal access token into Galasa’s CLI tool

1. Log into the Galasa Web UI and click `Request personal access token`.
1. Enter a token name - this is helpful to distinguish between tokens in the future - and click `Submit request`.
1. From the `Personal access token details` screen that is returned, click the `Copy to clipboard` icon to copy the `GALASA_TOKEN` value.
1. Paste the copied value into your `galasactl.properties` file and save your change. (If you do not have a `galasactl.properties` file in your Galasa home directory, you can create one by running the `galasa local init` command).

You can now interact with your Galasa Ecosystem by using the Galasa command-line tool.


