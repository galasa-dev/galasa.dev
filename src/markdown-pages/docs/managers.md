---
path: "/docs/managers"
title: "Managers"
---

## Managers provided with the current Galasa distribution

| Name | Description | 
| :------------------------ | :------------------------------------- | 
| <b>Artifact Manager</b><img src="./alpha.png">| Enables tests to manage test artifacts (e.g. input files and output files) and resources. Often used by other Managers, it can also be useful for your own test code to invoke the services of an Artifact Manager.|
| <b>Core Manager</b><img src="./beta.png"> | Provides a number of fundamental services that are most likely to be consumed by other Managers, not test authors. |
| <b>[Docker Manager](/docs/managers/docker-manager)</b><img src="./alpha.png"> | This Manager enables tests to run Docker containers on a Docker server provided by the Galasa infrastructure, making it easy to write tests that consume container-based services. |
| <b>[Ecosystem Manager](/docs/managers/galasa-ecosystem-manager)</b><img src="./alpha.png"> | Provides a test with a fully-provisioned Galasa ecosystem. |
| <b>HTTP Client Manager</b><img src="./alpha.png"> | Provides an opportunity to write tests that incorporate an extensive range of HTTP client requests. |
| <b>[Kubernetes Manager](/docs/managers/kubernetes-manager)</b><img src="./alpha.png"> | Provides tests with access to a Kubernetes namespace so that you can scale up your automated test infrastructure and leverage Kubernetes' container management services. |
| <b>3270 Manager</b> <img src="./alpha.png">| Permits tests that can interact with z/OS via 3270 terminals.|
| <b>zOS Batch Manager</b><img src="./ga.png" > | The z/OS Batch Manager uses the z/OSMF Restful interface to enable tests that can submit z/OS batch jobs. See [BatchAccountsOpenTest](/docs/running-simbank-tests/batch-accounts-open-test) for a walkthrough of a test that employs this Manager. | 

| Key |   | 
| :------------------------ | :------------------------------------- | 
| <br>![alpha](./alpha.png)| This Manager is being actively developed. It is subject to change and has not been extensively tested.|
| <br>![beta](./beta.png)| This Manager is feature complete but it has not been fully tested and might be subject to change.|
| <br>![GA](./ga.png)| This Manager is feature complete, has passed all tests and is deemed Generally Available. |

## Managers under development
The following Managers are not currently available but are planned for a future release:

| Name | Description | 
| ------------------------ | :------------------------------------- | 
| <b>CECI Manager</b> | Enables tests that communicate with CICS regions via CECI.|
| <b>IP Network Manager</b> | With this Manager, you will be able to write tests that perform IP Network operations.|
| <b>Openstack Manager</b> | Allows you to provision OpenStack environments for test use.|
| <b>z/OSMF Manager</b> | Allows tests to interact with z/OS via the mechanisms made possible by z/OSMF.|