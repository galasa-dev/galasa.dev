---
path: "/docs/managers/cics-ts-manager"
title: "CICS TS Manager"
---

**Alpha - This Manager is being actively developed. It is subject to change and has not been extensively tested.**

## Overview
This manager provides Galasa tests to CICS/TS functions.<br><br>





## Configuration Properties

The following are properties used to configure the CICS TS Manager.
 
<details>
<summary>Developer Supplied Environment - CICS TS Region - Applid</summary>

| Property: | Developer Supplied Environment - CICS TS Region - Applid |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.dse.tag.[TAG].applid |
| Description: | Provides the applid of the CICS TS region for the DSE provisioner.  The applid setting is mandatory for a DSE region. |
| Required:  | Yes if you want a DSE region, otherwide not required |
| Default value: | None |
| Valid values: | A value VTAM applid |
| Examples: | <code>cicsts.dse.tag.PRIMARY.applid=CICS1A</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment - CICS TS Region - Version</summary>

| Property: | Developer Supplied Environment - CICS TS Region - Version |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.dse.tag.[TAG].version |
| Description: | Provides the version of the CICS TS region to the DSE provisioner. |
| Required:  | Only requires setting if the test request it or a Manager performs a version dependent function. |
| Default value: | None |
| Valid values: | A value V.R.M version format, eg 5.6.0 |
| Examples: | <code>cicsts.dse.tag.PRIMARY.version=5.6.0</code><br> |

</details>
 
<details>
<summary>Extra bundles required to implement the CICS TS Manager</summary>

| Property: | Extra bundles required to implement the CICS TS Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.extra.bundles |
| Description: | The symbolic names of any bundles that need to be loaded                     with the CICS TS Manager |
| Required:  | No |
| Default value: | None |
| Valid values: | bundle symbolic names comma separated |
| Examples: | <code>cicsts.extra.bundles=org.example.cicsts.provisioning</code><br> |

</details>
