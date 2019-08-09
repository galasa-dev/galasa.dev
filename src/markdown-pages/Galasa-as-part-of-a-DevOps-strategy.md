---
path: "/about/devops"
title: "Galasa as part of a DevOps strategy"
---
## What is DevOps?
Any DevOps strategy must aim to ensure the development of high-quality software within a shortened development life-cycle. Such a strategy is often designed to leverage the automation offered by a continuous delivery software deployment pipeline, including a focus on the DevOps practices of continuous deployment and testing. Continuous deployment automates the provisioning and deployment of new builds, enabling every stage in the pipeline to run more quickly and efficiently. Continuous testing involves running automated tests against the deployed software as early as possible.  The over-arching goal of the continuous delivery pipeline is the creation of a repeatable, reliable process that enables application changes to flow automatically from development into production.

## How Galasa fits into the DevOps pipeline
Galasa's focus is on the continuous testing part of the pipeline, and specifically around the provision of scalable test automation for regression. When an application is created or updated, the code must successfully run through a relevant suite of Galasa regression tests before it can move along the delivery pipeline. If the code passes all the tests, you can have confidence that the production deployment will be successful. The following image illustrates how the automated end-to-end pipeline process works in CICS:

![Flowchart showing how the CICS pipeline works](./cics-devops.png)

A continuous delivery pipeline can be used to execute a set of Galasa tests in paralell with a single API call.  The pipeline can then inquire on the state of the executing tests and once all are completed decide how to progress to the next stage of the pipeline.

Galasa supports a "shift left" approach to testing, enabling tests to run simultaneously across different environments. These test suites can be triggered to run whenever a change set is delivered.
