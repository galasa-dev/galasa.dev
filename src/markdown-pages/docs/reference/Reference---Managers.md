---
path: "/docs/reference/managers"
title: "Managers"
---

Manager | Purpose
--------|--------
Artifact Manager | Allows a test to access resources within the same project as the test class and used within test execution.  Resources might contain skeleton requests or sample data.  Resources can contain variables which are dynamically substituted at runtime.
CICS Manager | Represents a CICS region, and its parameters.  The manager presents the test with methods that can be used to start/stop the region, initiate tracing or interact with resources within the CICS region.
Core Manager | Provides interface and framework services: enables creation of unique runIds, and an access the results archive.
HTTP Manager | Provides HTTP access to services: enables set up of REST requests, and conversion between JSON and Java objects.
zOS Batch Manager | Allows a test to submit and monitor batch jobs, and retrieves results by using z/OS MF or FTP via pluggable bundles. Provides base functionality that is used by other Managers.
zOS Command Manager | Allows a test to executes USS, TSO and console commands on the target mainframe system.
zOS File Manager | Used for FTP file transfer, creating VSAM files (and data), and for EBCDIC/ASCII conversion. Used to interact with a z/OS system, and to generate the data needed by a test, on the fly.
zOS Manager | Represents a z/OS image: used to return for example, SysID and hostname.  Controls the number of tests running in a z/OS image. Needed for managing the z/OS environment, especially when running multiple tests.
3270 Manager | Creates terminals pre-connected and configured to a z/OS applications, a test can insert text, drive PF key functions and interrogate responses in a fluent style
