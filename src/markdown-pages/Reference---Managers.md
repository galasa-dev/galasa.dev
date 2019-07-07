---
path: "/docs/reference/managers"
title: "Managers"
---

Manager | Purpose
--------|--------
Artifact Manager | Finds the set of artifacts needed for a test, retrieves the OSGi bundles.
CICS Manager | Represents a CICS region, and its parameters.
Comms Manager | 
Core Manager | Provides interface and framework services: create unique runIds, access results archive.
HTTP Manager | Provides HTTP access to services: set up REST requests, convert between JSON and Java objects.
zOS Batch Manager | Submits and monitors batch jobs, and retrieve results by using z/OSMF or FTP via pluggable bundles.<br>Provides base functionality that is used by other Managers.
zOS Command Manager | HTTP access to services: set up REST requests, convert between JSON and Java objects.
zOS File Manager | Used for FTP file transfer, creating VSAM files (and data), EBCDIC/ASCII conversion.<br>Used to interact with a z/OS system, used to generate the data needed by a test, on the fly.
zOS Manager | Represents a z/OS image: used to return for example, sysid, hostname.  Also controls the number of tests running in a z/OS image. Needed for managing the z/OS environment, especially when running multiple tests.
3270 Manager | Creates terminals to which commands can be sent.