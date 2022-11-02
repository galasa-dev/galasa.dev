---
path: "/docs/writing-own-tests/setting-up-galasa-project"
title: "Setting up a Galasa project"
---

In this section, you will learn how to set up an Eclipse project structure to accommodate your own independent tests. In time, we plan to develop a Maven archetype (a kind of template project) that will reduce this manual burden. But that is for a future release.

## A bit about Maven

<a href="http://maven.apache.org" target="_blank">Maven</a> is an Open Source build automation tool, initially created in 2003 and part of the Apache Software Foundation. You do not explicitly need to install it - usually, it comes with your Eclipse distribution as the _.m2e_ plugin. If, for some reason, it isn't part of your Eclipse distribution, the Galasa Eclipse plugin downloads and installs it silently during its own installation and configuration. In extremely rare situations, this might not happen - just drop a message in our <a href="https://galasa.slack.com" target="_blank"> Galasa Slack</a> workspace if you sense this is the case, and we'll help you out. (<a href="https://join.slack.com/t/galasa/shared_invite/zt-ele2ic8x-VepEO1o13t4Jtb3ZuM4RUA" target="_blank">Register to join</a> first if you're not yet a member). In any case, if you have run any of the SimBank tests, you are already past this hurdle.

If you have already installed Maven as part of some other software project, no action is needed.

Maven is _opinionated_, which means that you need to comply with its expectations about how a project and its directories should be organised. When you create a Maven project in Eclipse, you should use the generated structure, or if you are importing a project, the provided structure.

The most visible practical evidence that a project is a Maven project is its pervasive use of `pom.xml` (Project Object Model) files. These XML files contain the magic that allows Maven to manage your project dependencies and build orchestration. You will see that a large part of setting up your Galasa project is to configure these properly.

## Before you start

First, you need to ensure that you have installed the Galasa Eclipse plug-in and can run one or more of the tests in an example project. Don't rush this - it is recommended that you familiarise yourself with all of the Galasa examples before creating your own project. But as a minimum, if you can run <a href="/docs/running-simbank-tests/simbank-IVT" target="_blank">The SimBank IVT</a> test, you are all set.

## A little plan

It is convenient to use Eclipse's sub-project feature, so that a full (parent) Galasa project includes several sub-projects, which can also be known as _modules_, some of which are mandatory and some optional.

We are going to build a hierarchy of projects, where the parent project contains:

- A Managers sub-project, allowing you to extend the provided range of Managers. In practice, if you have no intention of writing a Manager, you can omit this - it is included in the sample project for completeness.
- An OBR (OSGi Bundle Repository) sub-project, which is mandatory. Galasa uses the OBR to locate your test project(s) and reason about their interdependencies.
- One or more test sub-projects, that as the name implies, contain the tests themselves. The sample project will contain just one test project.

The parent project establishes all the dependencies for the sub-projects/modules. It builds all the modules in the order of the dependencies - it builds the Manager module before the test projects that use it.

For simplicity, it is assumed that you will only have one version of a test in production at any one time. However, by establishing different versions of your tests, you can have test streams with different versions of the same test project. For the purposes of the forthcoming example, the version of all projects is set to `0.1.0-SNAPSHOT`. The `SNAPSHOT` element forces Galasa to run with the absolute latest copy of your built test project.

