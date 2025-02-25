---
path: "/docs/managers/ims-tm-manager"
title: "IMS TM Manager"
---

This Manager is at Alpha level. You can view the <a href="https://javadoc.galasa.dev/dev/galasa/imstm/package-summary.html" target="_blank" rel="noopener noreferrer">Javadoc documentation for the Manager here</a>.<br>


[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotation](#annotations)<br>
[Code snippets and examples](#codesnippets)<br>


# <a name="overview"></a>Overview

This Manager provides IMS TM functions to Galasa tests. 

## Testing IMS Systems on z/OS

To connect your Galasa test to a developer supplied environment with a provisioned IMS system as a minimum you need to configure the following properties for the IMS TM Manager: 


```
imstm.provision.type=dse
imstm.dse.tag.[TAG].applid=[APPLID]
```

You also need to configure the following properties for the [z/OS Manager](zos-manager) as a minimum to connect to an IMS system, even if you do not reference a `@ZosImage` in your Galasa test. This is because IMS systems sit on a z/OS LPAR, and so to provision and connect to an IMS system in a test, you also need access to the z/OS image that it sits within to make requests on the IMS system. You might need to configure additional z/OS-related CPS properties, depending on your test.

```
zos.dse.tag.PRIMARY.imageid=[IMAGEID] OR zos.cluster.[clusterId].images=[IMAGEID]  
zos.image.[IMAGEID].ipv4.hostname=[IP ADDRESS]
zos.image.[IMAGEID].credentials=[CREDENTIALID]
```


## <a name="configuring"></a>Configuration Properties

The following are properties that are used to configure the IMS TM Manager in the CPS.


<details>
<summary>Developer Supplied Environment - IMS TM System - Type</summary>

| Property: | Developer Supplied Environment - IMS TM System - Type |
| --------------------------------------- | :------------------------------------- |
| Name: | imstm.provision.type |
| Description: | Provides the type of the IMS TM system for the DSE provisioner.  The type setting is mandatory for a DSE system. |
| Required:  | Yes if you want a DSE system, otherwise not required. You must set this property if you are using the <code>imstm.dse.tag.[TAG].applid</code> property. |
| Default value: | None |
| Valid values: | dse|
| Examples: | <code>imstm.provision.type=dse</code><br> |

</details>
 
<details>
<summary>Developer Supplied Environment - IMS TM System - Applid</summary>

| Property: | Developer Supplied Environment - IMS TM System - Applid |
| --------------------------------------- | :------------------------------------- |
| Name: | imstm.dse.tag.[TAG].applid |
| Description: | Provides the applid of the IMS TM system for the DSE provisioner. The applid setting is mandatory for a DSE system. If you are using this property, you must also set the <code>imstm.provision.type</code> property to specify the IMS TM system type to be `dse`. For example, <code>imstm.provision.type=dse</code>.|
| Required:  | Yes if you want a DSE system, otherwise not required. |
| Default value: | None |
| Valid values: | A valid VTAM applid |
| Examples: | <code>imstm.dse.tag.PRIMARY.applid=IM1A</code><br>  |

</details>
 
<details>
<summary>Developer Supplied Environment - IMS TM System - Version</summary>

| Property: | Developer Supplied Environment - IMS TM System - Version |
| --------------------------------------- | :------------------------------------- |
| Name: | imstm.dse.tag.[TAG].version |
| Description: | Provides the version of the IMS TM system to the DSE provisioner. |
| Required:  | Only requires setting if the test requests it. |
| Default value: | None |
| Valid values: | A value V.R.M version format, e.g. 15.5.0 |
| Examples: | <code>imstm.dse.tag.PRIMARY.version=15.5.0</code><br> |

</details>