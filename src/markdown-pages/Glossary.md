---
path: "/docs/reference/glossary"
title: "Glossary"
---
## A
*Annotation*: A type of metadata that can be added to Java source code. In a Galasa context, you can think of annotations as a means to provide instructions to the framework. When the framework recognizes a source-code annotation, it can respond in potentially many ways, for example by invoking code or performing behind-the-scenes processing. Galasa managers are declared in test classes and test cases using annotations, and they are a fundamental part of how Galasa works. 

*Artifact*: A collection of aggregated project assets treated (and often packaged) as a whole to help you test, deploy or distribute an application. A Java JAR file is a common example of an artifact. 

*Automated testing*: A set of processes, practices and tools that encourage the use of software to control the execution and verification of tests against an application under test. Galasa is an automated testing framework for deep integration testing.

## C
*CICS*: An unparalleled mixed-language application server.    

*CI/CD pipeline*: Continuous Integration/Continuous Delivery pipeline. An automated sequence of infrastructure steps that help you to deliver software.

*CLI*: Command Line Interface. A way in which you can interact with a computer by typing lines of text, as opposed to interacting via a graphical interface.

*CPS*: Configuration Properties Store. The Galasa CPS service, together with the Dynamic Status Store (DSS) service work with Galasa managers to bind test instances to running environments, and can lock resources and data etc. to specific test instances.

## D
*DevOps strategy*: A set of guiding principles that describe how you intend to apply software development practices to infrastructure.

*Docker*: A software product that uses OS-level virtualization to enable you to deliver software in *containers*.

*DSS*: Dynamic Status Store. The Galasa DSS service, together with the Configuration Properties Store (CPS) service work with Galasa managers to bind test instances to running environments, and can lock resources and data to specific test instances.

## F

*Framework*: A (generally) large pre-written software component to which you can add your own code to accomplish a specific goal. Frameworks (and the Galasa framework is no exception) can often require that you use particular styles and idioms to use them effectively, and this can mean that you need to be familiar with their operation to get the best out of them.

## J
*JAT*: Java Automated Testing. The internal, non-open-source IBM ancestor of Galasa. 

*Java*: A general-purpose programming language designed by James Gosling and first released by Sun Microsystems in 1995.

*Java class*: A Java interpretation of the general concept of an object-oriented *class*.

*JCL*: Job Control Language. An IBM mainframe scripting language used to start batch jobs and mainframe subsystems.

*JDK*: A software package that allows developers to create, compile and run Java programs. To use Galasa, you will need to install version 8 (and not later) of the Java JDK for your operating system.

*JRE*: A software package that allows users to run (but not create or compile) Java programs.

### K
*Kubernetes*: An open-source system (originally designed by Google) for orchestrating the deployment, scaling and management of container-based infrastructures. 

## M
*Manager*: An important Galasa component that abstracts the setup and tear-down of test environments, isolating this process from writing and running the tests themselves. Galasa is delivered with a fixed set of initial managers to which you can add your own that operate with a knowledge of your own applications environment.

## O
*OBR*: OSGi (Open Services Gateway initiative) Bundled Resource.

## S
*Shift Left*: A colloquial phrase describing the principle of dealing with problems early in project lifecycles, thereby saving considerable resources (including money) over fixing them later.

*Simframe*: A toy banking application delivered with Galasa that helps you become familiar with Galasa's operating model before you need to get involved with more challenging activities, such as connecting to mainframe services.

## T

*Test/Test Case*: A set of (one or more) activities and their ideal results designed to root-out defects in the performance and functionality of a software system. Galasa tests are automated and written in Java.

*Test catalog*: A set of test cases of interest.

*Test class*: A (Java) class that is only used for testing and can be used to organise and structure large volumes of tests. Test class methods are often used to implement individual tests.

*Test runner*: A software component that receives a set of tests and executes them, often persisting the test results. Alongside the Galasa framework and its managers, Galasa's test runner is a major component of the system.

## Z
*z/OS*: A 64-bit operating system for IBM mainframes.