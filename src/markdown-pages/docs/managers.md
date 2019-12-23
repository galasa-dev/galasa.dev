---
path: "/docs/managers"
title: "Managers"
---

## Managers provided with the current Galasa distribution

| Name | Description | 
| :------------------------ | :------------------------------------- | 
| **Artifact Manager** ![alpha](../../images/alpha.svg)| Enables tests to store test artifacts (e.g. output files) for later review. Often used by other Managers, it can also be useful for your own test code to invoke the services of an Artifact Manager.|
| **Core Manager** ![beta](../../images/beta.svg) | Provides a number of fundamental services that are most likely to be consumed by other Managers, not test authors. |
| **[Docker Manager](/docs/managers/docker-manager)** ![alpha](../../images/alpha.svg) | This Manager enables tests to run Docker containers on a Docker server provided by the Galasa infrastructure, making it easy to write tests that consume container-based services. |
| **[Ecosystem Manager](/docs/managers/galasa-ecosystem-manager)** ![alpha](../../images/alpha.svg) | Provides a test with a fully-provisioned Galasa ecosystem. |
| **HTTP Client Manager** ![alpha](../../images/alpha.svg) | Provides an opportunity to write tests that incorporate an extensive range of HTTP client requests. |
| **[Kubernetes Manager](/docs/managers/kubernetes-manager)**![alpha](../../images/alpha.svg) | Provides tests with access to a Kubernetes namespace so that you can scale up your automated test infrastructure and leverage Kubernetes' container management services. |
| **3270 Manager** ![alpha](../../images/alpha.svg)| Permits tests that can interact with z/OS via 3270 terminals.|
| **zOS Batch Manager** ![release](../../images/release.svg) | The z/OS Batch Manager uses the z/OSMF Restful interface to enable tests that can submit z/OS batch jobs. See [BatchAccountsOpenTest](/docs/running-simbank-tests/batch-accounts-open-test) for a walkthrough of a test that employs this Manager. | 

| Key |   | 
| :------------------------ | :------------------------------------- | 
| ![alpha](../../images/alpha.svg)| This Manager is being actively developed. It is subject to change and has not been extensively tested.|
| ![beta](../../images/beta.svg)| This Manager is feature complete but is likely to contain multiple known or unknown bugs.|
| ![release](../../images/release.svg)| This Manager is feature complete, has passed all tests and is deemed release grade. It may still contain one or more known or unknown bugs.|

## Managers under development
| Name | Description | 
| ------------------------ | :------------------------------------- | 
| **CECI Manager** | Enables tests that communicate with CICS regions via CECI.|
| **IP Network Manager** | With this Manager, you will be able to write tests that perform IP Network operations.|
| **Openstack Manager** | Allows you to provision OpenStack environments for test use.|
| **z/OSMF Manager** | Allows tests to interact with z/OS via the mechanisms made possible by z/OSMF.|
