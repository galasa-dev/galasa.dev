---
path: "/reference/managers"
title: "Managers"
---

Manager | Purpose
--------|--------
Artifact Manager | Stores a skeleton XML request and then uses the HTTP Manager to send that request to an endpoint
CICS Manager | Represents a CICS region, and its parameters.
Comms Manager | 
Core Manager | Provides interface and framework services: enables creation of unique runIds, and an access the results archive.
HTTP Manager | Provides HTTP access to services: enables set up of REST requests, and conversion between JSON and Java objects.
zOS Batch Manager | Submits and monitors batch jobs, and retrieves results by using z/OS MF or FTP via pluggable bundles. Provides base functionality that is used by other Managers.
zOS Command Manager | HTTP access to services: enables set up of REST requests, and conversion between JSON and Java objects.
zOS File Manager | Used for FTP file transfer, creating VSAM files (and data), and for EBCDIC/ASCII conversion. Used to interact with a z/OS system, and to generate the data needed by a test, on the fly.
zOS Manager | Represents a z/OS image: used to return for example, SysID and hostname.  Controls the number of tests running in a z/OS image. Needed for managing the z/OS environment, especially when running multiple tests.
3270 Manager | Creates terminals to which commands can be sent.
