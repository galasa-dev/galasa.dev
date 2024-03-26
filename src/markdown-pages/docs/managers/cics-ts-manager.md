---
path: "/docs/managers/cics-ts-manager"
title: "CICS TS Manager"
---

This Manager is at Alpha level. You can view the <a href="https://javadoc.galasa.dev/dev/galasa/cicsts/package-summary.html" target="_blank" rel="noopener noreferrer">Javadoc documentation for the Manager here</a>.<br>


[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>


# <a name="overview"></a>Overview

This Manager provides Galasa tests to CICS/TS functions. 

## Testing CICS Regions on z/OS

To connect your Galasa test to a developer supplied environment with a provisioned CICS region as a minimum you need to configure the following properties for the CICS TS Manager: 


```
cicsts.provision.type=dse
cicsts.dse.tag.[TAG].applid=[APPLID]
```

You also need to configure the following properties for the [z/OS Manager](zos-manager) as a minimum to connect to a CICS region, even if you do not reference a `@ZosImage` in your Galasa test. This is because CICS regions sit on a z/OS LPAR, and so to provision and connect to a CICS region in a test, you also need access to the z/OS image that it sits within to make requests on the CICS region. You might need to configure additional z/OS-related CPS properties, depending on your test.

```
zos.dse.tag.PRIMARY.imageid=[IMAGEID] OR zos.cluster.[clusterId].images=[IMAGEID]  
zos.image.[IMAGEID].ipv4.hostname=[IP ADDRESS]
zos.image.[IMAGEID].credentials=[CREDENTIALID]
```


## <a name="configuring"></a>Configuration Properties

The following are properties that are used to configure the CICS TS Manager in the CPS.


<details>
<summary>Developer Supplied Environment - CICS TS Region - Type</summary>

| Property: | Developer Supplied Environment - CICS TS Region - Type |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.provision.type |
| Description: | Provides the type of the CICS TS region for the DSE provisioner.  The type setting is mandatory for a DSE region. |
| Required:  | Yes if you want a DSE region, otherwise not required. You must set this property if you are using the <code>cicsts.dse.tag.[TAG].applid</code> property. |
| Default value: | None |
| Valid values: | dse|
| Examples: | <<code>cicsts.provision.type=dse</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment - CICS TS Region - Applid</summary>

| Property: | Developer Supplied Environment - CICS TS Region - Applid |
| --------------------------------------- | :------------------------------------- |
| Name: | cicsts.dse.tag.[TAG].applid |
| Description: | Provides the applid of the CICS TS region for the DSE provisioner. The applid setting is mandatory for a DSE region. If you are using this property, you must also set the <code>cicsts.provision.type</code> property to specify the CICS TS region type to be `dse`. For example, <code>cicsts.provision.type=dse</code>.|
| Required:  | Yes if you want a DSE region, otherwise not required. |
| Default value: | None |
| Valid values: | A value VTAM applid |
| Examples: | <code>cicsts.dse.tag.PRIMARY.applid=CICS1A</code><br>  |

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
| Description: | The symbolic names of any bundles that need to be loaded<br> with the CICS TS Manager. |
| Required:  | No |
| Default value: | dev.galasa.cicsts.ceci.manager,dev.galasa.cicsts.ceda.manager,<br>dev.galasa.cicsts.cemt.manager |
| Valid values: | bundle symbolic names comma separated |
| Examples: | <code>cicsts.extra.bundles=org.example.cicsts.provisioning</code><br> |

</details>
