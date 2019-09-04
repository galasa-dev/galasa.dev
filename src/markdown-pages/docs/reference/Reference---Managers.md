---
path: "/docs/reference/managers"
title: "Managers"
---
Managers are the provisioning engines of test environments. They abstract the setup and tear-down of test environments into a single place, and can be reused across multiple tests. Using managers protects your tests from pollution by provisioning code and drastically reduces the amount of boilerplate you need to write. Managers also allow you to parcel-out difficult-to-write environmental setup tasks to the experts who know how to do it, in complete isolation from the rather more mundane work of writing and running tests. When it makes sense, a test case can invoke multiple managers - the `SimframeBankIVT.java` example itself pulls in:

* A z/OS image manager (`@ZosImage`)
* A 3270 terminal manager (`@Zos3270Terminal`)
* An artifact manager (`@ArtifactManager`)
* An HTTP client manager (`@HttpClient`)

Managers are invoked using [Java annotations](https://en.wikipedia.org/wiki/Java_annotation).

Manager | Purpose
--------|--------
Artifact Manager | Allows a test to access resources within the same project as the test class and used within test execution.  Resources might contain skeleton requests or sample data.  Resources can contain variables which are dynamically substituted at runtime.
CICS Manager | Represents a CICS region, and its parameters.  The manager presents the test with methods that can be used to start/stop the region, initiate tracing or interact with resources within the CICS region.
Core Manager | Provides interface and framework services: enables creation of unique runIDs, and an access the results archive.
HTTP Manager | Provides HTTP access to services: enables set up of REST requests, and conversion between JSON and Java objects.
zOS Batch Manager | Allows a test to submit and monitor batch jobs and retrieves results by using z/OS MF or FTP via pluggable bundles. Provides base functionality that is used by other Managers.
zOS Command Manager | Allows a test to execute USS, TSO and console commands on the target mainframe system.
zOS File Manager | Used for FTP file transfer, creating VSAM files (and data), and for EBCDIC/ASCII conversion. Used to interact with a z/OS system, and to generate the data needed by a test, on the fly.
zOS Manager | Represents a z/OS image: used to return for example, SysID and hostname.  Controls the number of tests running in a z/OS image. Needed for managing the z/OS environment, especially when running multiple tests.
3270 Manager | Creates terminals pre-connected and configured to a mainframe application, a test can insert text, drive PF key functions and interrogate responses in a fluent style
