---
path: "/about/different"
title: "Why Galasa is different"
---

What makes Galasa different to other testing tools?

If you've ever struggled to implement automated testing across a complex technology stack, you might recognize some of the issues that we identified during our design process. Expand the following headings to see how Galasa solves these challenges.

## Running consistent, repeatable, reliable tests across the application stack: 


<details>
<summary><b>Ensuring consistent testing across technologies</b></summary>

Automating tests effectively and consistently across multiple environments and multiple tools requires a framework that can support and integrate across the whole application stack. The same test must also be capable of running against multiple z/OS environments without code changes.

Galasa is designed to work in hybrid cloud applications, operating with the entire application stack, so you can provision in a cloud environment, but bind to a z/OS test environment.
The Galasa framework integrates and wrappers multiple techonolgies and test tooling in a consistent way, providing a platform to test different aspects of the application stack in the same language and in the same fashion. One test case can interact with 3270 emulators, Selenium, JMeter, batch jobs and other applications. 
</details>

<details>
<summary><b>Verification and validation without mocking or stubbing</b></summary>

Verifying and validating data at every boundary without stubbing or mocking is hard. 
Galasa enables real data verification by interrogating a CICS (or other) application directly or by enabling the checking of other z/OS resources, for example, messages on queues or the updating of log streams.
</details>

<details>
<summary><b>Reliability and availability of test data</b></summary>

Test data is often in a state of flux, resulting in the breaking of existing tests and difficulty in snapshotting and data integrity.

Galasa enables you to generate test data on the fly via an application manager or find valid test data within an existing data lake. Use an application manager to lock test data within the Galasa framework whilst in use, so that it cannot be corrupted by other test runs.

You can integrate Galasa tests with your existing tooling, allowing you to share data between tools within the same test.
</details>

<details>
<summary><b>Running the same test locally and in automation</b></summary>

Tests need to be run on demand and in automation. Running and re-running manual tests is laborious, time consuming and not exactly the best use of a tester's skills or time. 
Galasa tests can be run locally from your own IDE, or in automation without changing a single line of test code. 

With Galasa you can automate and automatically schedule these repetitive regression tests and use the time saved to free up testers to spend their time designing test cases that are more likely to find important defects.

Once written, a Galasa test is available 24x7 for reuse.
</details>

## Centralizing, maintaining and storing results consistently:

<details>
<summary><b>Maintaining, recording and planning with a large suite of tests</b></summary>

Maintaining a set of test materials (which could be written in several different languages), recording which tests have been run, and scheduling any outstanding tests is difficult and time consuming. Manual tests are often split across teams and reported separately, with no single, consistent view of the testing.

The Galasa test catalog provides the ability to generate a clear description of the areas covered by any given test. Related tests can be stored within a shared test catalog, from which tests can be automatically selected to run for any given change set. Automated regression test suites can be created for new software versions, so you can run a specified set of tests for automated baselining of a new environment installation, such as a hardware migration. 
</details>

<details>
<summary><b>Diagnosing failures </b></summary>

Investigating test failures takes up time and can be particularly tedious with larger scripts. Test artifacts are often stored in lots of different repositories, making it time-consuming and difficult to locate the right information to help you root out the cause of a failure.

Galasa automatically stores all test artifacts in a single, central repository, making diagnostics quicker and easier and allowing big picture information to be extracted easily. You can also debug tests using a local instance of Galasa, so you can examine every line of code.
</details>

<details>
<summary><b>Big picture communication</b></summary>

Test results are often stored in spreadsheets and manually approved by product owners before changes are promoted. This makes it difficult to understand the tests that have been run, and the manual intervention required as part of the sign-off process can delay delivery.

Galasa's dashboard integrates all your test results in one place, making reporting and reviewing between test phases easy and consistent.
</details>

## Extensibility and scalability - future-proofing your testing:

<details>
<summary><b>Maintaining performance levels</b></summary>

Running scripts and tooling on tools such as Jenkins can lead to performance issues – ideally the tests and the Jenkins nodes should not share workload. Whilst you don’t want to miss defects by limiting the number of tests run, the more tests that are running the longer the testing phase takes, and the increased amount of computer resources that are required from the Jenkins node will limit the throughput. Locking resources within the framework prevents tests from colliding; instead tests are queued until those resources become available.

Galasa’s tests as a service allows the test workload to be moved off a Jenkins node, with the added benefit of being capable to scale horizontally in its own cloud environment. 
</details>

<details>
<summary><b>Expanding pipelines </b></summary>

The addition of new 3rd party tooling can lead to problems with managing test artifacts. Maintaining, updating and ensuring compliance on Jenkins servers with increasing numbers of plugins is time-consuming. 

Galasa is open source so can be extended to support additional specific tooling. In addition, Galasa manages its own plugins, so less manual intervention is required for installation and updates.  
</details>

<details>
<summary><b>Deep integration testing at scale</b></summary>

It can be difficult to ensure that testing across cloud and z/OS platforms is kept aligned.  If z/OS is the best place for the application to run, but developing a solution there is slower than elsewhere, it can cause problems. Manual testing can be tedious and error prone, making it time consuming to get an entire application thoroughly tested, both in terms of depth of testing and in breadth of coverage.

Galasa tests can scale horizontally without changing the underlying test code and the framework enables test isolation, so that multiple tests can run in parallel, logically isolated by the framework.
</details>

<details>
<summary><b>Minimizing manual intervention</b></summary>

Manual testing is expensive, involving a significant amount of human intervention, which means tests can take too long to write and are hard to understand and maintain.

Galasa makes tests quicker to write and easier to maintain by extracting the boilerplate code out of the tests. Just import the components you need from within your test code to access the abstracted functionality, gaining the benefit of the expertise of the person who wrote them, and the productivity introduced by their simple use.
 
</details>

## Summary
Galasa is an open source deep integration test framework for teams looking to give more power to their testers. What makes Galasa a deep integration test framework is its ability to support tests that cross system boundaries and reach into remote layers inaccessible to other test tools. 

Galasa has been architected to ensure that the routine tasks of writing and executing tests are straightforward. The more complex parts of tests (such as provisioning) are abstracted into other components that can be written by experts and easily distributed to the team.

Galasa is open source, so can be extended to support additional tooling. The framework is scalable, capable of supporting enterprise level throughput, whilst ensuring that resources are managed reliably.








