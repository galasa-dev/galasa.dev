---
path: "/docs/ecosystem/ecosystem-authentication"
title: "Configuring authentication"
---

Galasa uses personal access tokens to authenticate users who want to interact with a Galasa Ecosystem by using the Galasa command line tool (galasactl). 

Personal access tokens are stored in the `GALASA_TOKEN` property in the `galasactl.properties` file in your Galasa home folder. The `galasactl.properties` file is created when you run the `galasa local init` command. Setting the `GALASA_TOKEN` property in this file with a valid token value allows the galasactl tool to access and communicate with an Ecosystem on behalf of the user. 

## Authentication architecture

If you have [installed your Galasa Ecosystem](../ecosystem/ecosystem-installing-k8s) by using the Galasa Ecosystem Helm chart that is provided with Galasa, you will have access to the Galasa Web UI. To get a value for the `GALASA_TOKEN` property, log into the Galasa Web UI and request a personal access token which can be copied into the `GALASA_TOKEN` property. The instructions on how to do this are displayed in a dialog box in the Galasa Web UI. You can choose to set the token as an environmental variable but the value would not persist across terminals, so is valid only for that session.

The following diagram shows the architecture for the authentication process:

![Galasa ecosystem architecture:](ecosystem-cluster-auth.svg)


When a user logs into the Galasa Web UI via their browser, the Web UI contacts the authorization REST endpoint which in turn talks to a Dex server, providing it with the user ID. The Dex server acts as authentication concentrator, talking to an identity provider, for example GitHub or LDAP, to authenticate that user. If the user is successfully authenticated, the provider returns an access token to the Dex server which sends that token to the Galasa Web UI where it is visible to the user. The user can then configure that token into the galasactl command line tool by updating the `GALASA_TOKEN` property in the `galasactl.properties` file. The user can then be authenticated each time the galasactl tool is used to interact with a Galasa Ecosystem. 



