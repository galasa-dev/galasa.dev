---
path: "/concepts"
title: "Cirillo concepts"
---
# About Cirillo
<p>Cirillo gives you the ability to have scalable and automated scheduling and execution of tests. Cirillo enables the repetitive steps, that are traditionally similarly coded in many test cases, to be abstracted away from those test cases and be managed by the Cirillo test framework.</p> 

## Why automate?
<p>Setting up and running a manual test is often complex, requiring knowledge of systems, application features, configurations, versions, and resource availability. You might run several different tasks - either manually or semi-manually by using bespoke utilities - before you even start your test, to ensure the test's specific data or set-up is in place.</p> 
<p>Running and re-running these manual tests is laborious, time consuming and (let's be honest) not exactly the best use of your testing skills. Your time is much better spent designing test cases that are more likely to find good defects. However, this is only possible if you can rely on high quality existing automated tests. </p>
<p>Automated testing is key to delivering change in an Agile way. Without test automation, it is very difficult to deliver changes quickly and successfully. Automation helps you to delight your customers, fast. </p>

## Key concepts
<p>Cirillo abstracts the complex, repetitive boilerplate code out of manual test cases and into Cirillo Managers. A Cirillo Manager provides an interface that enables you to control, provision and use an application, tool or product.</p>

<p>A Manager focuses only on its specific application, tool or product, which means that each Manager is responsible for a specific aspect of the test environment. For example, the CICS Manager manages the CICS resources for each CICS region, and the z/OS batch Manager is responsible for running batch jobs - for example JCL or a CICS or MVS utility such as DFH0STAT, IDCAMs or IXCMIAPU.</p> 

<p>The cool thing is that the different Managers collaborate with each other to perform a joint task, including sharing information and getting other Managers to complete tasks for them. This work is coordinated by the Cirillo Framework. </p>

<p>The two main purposes of a Manager are to reduce the amount of boilerplate code within a test and provide proven tool interaction code. This makes the test code simpler and easier to write, understand and maintain as the focus of a test's development shifts to validating application changes, rather than marshaling environmental resources. </p>

## What's next?
<p>Cirillo provides a large suite of commonly required Managers for interfacing with common tools, products and operating systems. The current list of Managers and what they do is shown in _this table_. More Managers will be available in future Cirillo releases – if you have a Manager that you would really like to see developed, let us know on _Slack_. Alternatively, you can write your own Managers for your own applications, and here are some examples that can help you get started. You can share your Managers with the _Community_ – we’d love to see what you come up with. Check out the _contributor guidelines here_. Let's start making cool stuff together!</p>

