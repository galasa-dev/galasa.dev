---
path: "/reference/managers"
title: "Managers"
---
<table>
<tr>
<th>Manager</th>
<th>Purpose</th>
</tr>
<tr>
<td>Artifact Manager</td>
<td>Finds the set of artifacts needed for a test, retrieves the OSGi bundles.</td>
</tr>
<tr>
<td>CICS Manager</td>
<td>Represents a CICS region, and its parameters.</td>
</tr>
<tr>
<td>Comms Manager</td>
<td></td>
</tr>
<tr>
<td>Core Manager</td>
<td>Provides interface and framework services: create unique runIds, access results archive.</td>
</tr>
<tr>
<td>HTTP Manager</td>
<td>Provides HTTP access to services: set up REST requests, convert between JSON and Java objects.</td>
</tr>
<tr>
<td>zOS Batch Manager</td>
<td>Submits and monitors batch jobs, and retrieve results by using z/OSMF or FTP via pluggable bundles. 
Provides base functionality that is used by other Managers.</td>
</tr>
<tr>
<td>zOS Command Manager</td>
<td>HTTP access to services: set up REST requests, convert between JSON and Java objects.</td>
</tr>
<tr>
<td>zOS File Manager</td>
<td>Used for FTP file transfer, creating VSAM files (and data), EBCDIC/ASCII conversion.
Used to interact with a z/OS system, used to generate the data needed by a test, on the fly.</td>
</tr>
<tr>
<td>zOS Manager</td>
<td>Represents a z/OS image: used to return for example, sysid, hostname.  Also controls the number of tests running in a z/OS image. Needed for managing the z/OS environment, especially when running multiple tests.</td>
</tr>
<tr>
<td>3270 Manager</td>
<td>Creates terminals to which commands can be sent.</td>
</tr>
</table>