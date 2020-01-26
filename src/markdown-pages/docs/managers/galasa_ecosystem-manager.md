---
path: "/docs/managers/galasa_ecosystem-manager"
title: "Galasa Ecosystem Manager"
---

**ALPHA - This Manager has been written to provide a Galasa Ecsosystem for the Galasa integrated test pipeline.  It has the bare  minimum code necessary to do that.  It has not been extensively tested (other than on the pipeline).  The TPI is subject to change.  However, saying all that,  it can be used within tests.**

## Overview
This Manager will provide the Test with a fully provisioned Galasa Ecosystem to test on.  When the Test starts running the Test can be assured that all the services are up and working. <br><br> The Galasa Ecosystem Manager supports Galasa Shared Environments.  Shared Environments provide  the ability to create a test environment that can be shared across multiple test runs  so you don't have to provision a test environment for each test.

## Limitations
The Manager only supports the following platforms:-<br> Kubernetes Namespace<br> <br> In the near future, this Manager will be able to provision Ecosystems in Docker and a plain Linux server


## Annotations

The following annotations are available with the Galasa Ecosystem Manager
 
| Annotation: | Kubernetes Ecosystem |
| --------------------------------------- | :------------------------------------- |
| Name: | @KubernetesEcosystem |
| Description: | The <code>@KubernetesEcosystem</code> annotation will request the Galasa Ecosystem Manager to provision a Galasa Ecosystem within a Kubernetes Namespace. |
| Attribute: `ecosystemNamespaceTag` |  The <code>ecosystemNamespaceTag</code> is used to identify the Ecosystem to other Managers or Shared Environments.  If a test is using multiple  Ecosystems, each separate Ecosystem must have a unique tag.  If two Ecosystems use the same tag, they will refer to the  same actual Ecosystem. |
| Attribute: `kubernetesNamespaceTag` |  The <code>kubernetesNamespaceTag</code> to identify which tagged Kubernetes Namespace is to be used to deploy the Galasa Ecosystem into. |
| Attribute: `yamlDirectory` |  The <code>yamlDirectory</code> points to a resource directory within the test bundle that contains a set of override yaml files to use when creating the  Ecosystem.  Each file must end with .yaml to be found.  If a directory or resource is not provided, the stable yaml files within the Ecosystem Manager will be used. |
| Syntax: | <code>@KubernetesEcosystem<br> public IKubernetesEcosystem ecosystem;<br> <br> @KubernetesEcosystem(yamlDirectory="/k8syaml"<br> public IKubernetesEcosystem ecosystem;<br> </code> |
| Notes: | The <code>IKubernetesEcosystem</code> interface gives the test access to the URLs to all the services and API endpoints within the Ecosystem. When the test starts to run, all the services will be up and verified.<br> <br> The Test must provide a @KubernetesNamespace IKubernetesNamespace annotation, as this will be where the Ecosystem will be provisioned in.  In the future, Docker and Linux will be options. <br> The Galasa Ecosystem has it's own stable versions of the Kubernetes YAML files necessary to create the entire Ecosystem.  If you wish to override those and use your own yaml files,  then use the yamlDirectory attribute.  If a resource is missing in the test's set,  then the stable version will be used. |

## Code Snippets

Use the following code snippets to help you get started with the Galasa Ecosystem Manager.
 
### Obtain a Kubernetes namespace

```java
@KubernetesEcosystem
public IKubernetesEcosystem ecosystem;
    
@KubernetesNamespace
public IKubernetesNamespace namespace;
```

This code will request the a Galasa Ecosystem be provisision in a Kubernetes Namespace.  The default Tag for both of them is 
PRIMARY.

### Retrieve the RAS Endpoint

```java
@KubernetesEcosystem
public IKubernetesEcosystem ecosystem;

URI ras = ecosystem.getEndpoint(EcosystemEndpoint.RAS);

```

This snippet demonstrates how to retrieve the Result Archive Store endpoint.   Be aware, that the URI is 
prefixed with the store type, eg couchdb:http://couchdb.server:5984.  This is the same for the CPS, DSS and CREDS.

### Set and retrieve a CPS property

```java
ecosystem.setCpsProperty("bob", "hello");

String value = ecosystem.getCpsProperty("bob")
```

Will set the CPS property `bob` with the value `hello`and retrieve it again.
## Configuration Properties

The following are properties used to configure the Galasa Ecosystem Manager.
