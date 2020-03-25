---
path: "/docs/writing-own-tests/writing-test-classes"
title: "Writing test classes"
---

Having created your project structure and built the parent and sub-projects, you are ready to start writing your own test classes.

If you have imported, say, a Maven project into Eclipse, then autocompletion locates any resources referenced by its dependencies, making your job a lot easier. However, when using autocompletion, ensure that the class or resource that you select (or name) does not have a package name that includes the word `internal`, as this resource is not available to the test at runtime - you will receive a `Class not found` message.

## The anatomy of a Galasa test class

All Galasa tests must have a `@Test` annotation (`dev.galasa.Test`) defined and in place for it to be recognised by Galasa. Doing this allows the Galasa Maven plugin to differentiate between test and utility classes within a project. Only classes that use `@Test` are included in the test catalog.

Once loaded by the Galasa test runner, there are a few further annotations that dictate how a test is executed. These are `@BeforeClass`, `@Before`, `@Test`, `@After` and `@AfterClass`. These are visually similar to how they appear in JUnit, but are handled differently in Galasa.

### Galasa test method annotations

**`@Test`**
<br>
This annotation identifies a method as one that contains test code. Such methods are executed by Galasa by the order in which they appear in the test class - from top to bottom. If a test method fails, the ollowing test methods are bypassed to encourage short, sharp parallel testing. This behaviour can be overridden using the `@StopOnError` annotation on the `class` statement.

When a test method succeeds it is marked as PASSED, and if there is an exception it is marked FAILED. Managers can override this marking - for example, if a test throws a specific exception, a Manager could set the result to DISASTER.

**`@BeforeClass` and `@AfterClass`**
<br>
Methods marked `@Beforeclass` and `@AfterClass` are executed once before and once after any `@Test` method respectively. They are executed in the order they appear in the sources.

Such methods are used to perform setup and tear-down for the test class, for example, setting up an HTTP server that all of the `@Test` methods will use.

Unlike JUnit, these are not static methods as they need access to some _class fields_/_manager annotated fields_ which are described later.

Failures that occur in `@BeforeClass` and `@AfterClass` usually cause tests to fail with `ENVIRONMENT_FAILURE`, which indicates that the test itself didn't fail, but the set up did for some reason. For this reason, `@BeforeClass` and `@AfterClass` should not contain any test code.

**`@Before`** and **`@After`**
<br>
Methods marked `@Before` and `@After` are executed before and after every `@Test` method respectively, in the order in which they appear in the source.

These methods are typically used to reset resources before a test or perhaps check logs for post-test error messages.

Failures that occure in `@Before` and `@After` result in the test method being marked as FAILED, as it is likely that such methods contain test checking code.

**Manager annotated fields**
<br>
Before any of the `@` methods in a test class are executed, the Galasa test runner interrogates any active Managers to populate their _test fields_ with appropriate values. These fields are highly-dependent on the Managers, and you will need to review the Manager reference documentation to appreciate what is available.

As an example, the test field

```java
@RunName
public String runName;
```

is provided by the Core Manager. This populates the `runName` field with a String representing the run's name, which can be used to create a unique resource name that won't clash with other runs.

The framework ensures that all correctly coded fields are filled before executing any test code, so test code doesn't need to bother itself with validating the fields themselves. If a field cannot be populated by a Manager, the test is marked as ENVIRONMENT_FAILURE or RESOURCE_EXHAUSTION and an automated rerun queued.

A few Managers provide direct access to themselves, for example the Core Manager:

```java
@CoreManager
public ICoreManager coreManager;
```

The Core Manager provides a method to obtain credentials via an ID - but the test may not know the ID before it runs, so it would be difficult to do this via an annotated field.
