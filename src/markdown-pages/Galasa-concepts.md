---
path: "/about/concepts"
title: "Galasa concepts"
---
## Key concepts

Galasa gives you the ability to have automated and scalable scheduling and execution of tests. 

Galasa abstracts the complex, repetitive boilerplate code out of manual test cases and into Galasa Managers. A Galasa Manager provides an interface that enables you to control, provision and use an application, tool or product.

A Manager focuses only on its specific application, tool or product, which means that each Manager is responsible for a specific aspect of the test environment. For example, the CICS Manager manages the CICS resources for each CICS region, and the z/OS batch Manager is responsible for running batch jobs - for example JCL or a CICS or MVS utility such as DFH0STAT, IDCAMs or IXCMIAPU.

The different Managers collaborate with each other to perform a joint task, including sharing information and getting other Managers to complete tasks for them. This work is coordinated by the Galasa Framework.

Managers reduce the amount of boilerplate code within a test and provide proven tool interaction code. The test code cecomes simpler and easier to write, understand, and maintain and the focus of a test's development shifts to validating application changes, rather than marshaling environmental resources.

## What's next?
Galasa provides a large suite of commonly required Managers for interfacing with common tools, products and operating systems. The current list of Managers and what they do is shown in _this table_. More Managers will be available in future Galasa releases – if you have a Manager that you would really like to see developed, let us know on _Slack_. Alternatively, you can write your own Managers for your own applications, and here are some examples that can help you get started. You can share your Managers with the _Community_ – we’d love to see what you come up with. Check out the _contributor guidelines here_. Let's start making cool stuff together!



