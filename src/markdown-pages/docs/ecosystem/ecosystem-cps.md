---
path: "/docs/ecosystem/ecosystem-cps"
title: "Configuring the Configuration Property Store"
---


### Developer Specified Environment (DSE)

The SIMBANK application is a DSE that comes with the Galasa framework. It has a working CPS configuration that ensures the SIMBANK example works out-of-the-box. SIMBANK uses an example set of Managers to emulate interaction with a mainframe test environment, but without the mainframe. You can use SIMBANK to explore how to run your tests in a Galasa framework and even how to write your own tests. It is an introduction to Galasa’s extensive capability and extensibility.

CPS properties are the means by which the framework is configured and they must be carefully set up to ensure the tests you intend to run and automate do so where and in the way you intend. As shipped, the SIMBANK DSE has CPS properties, preconfigured to exploit your local machine but you can change the configuration, so that your tests run where you want them to, for example, as a DSE in a remote Docker container.

To progress to using a mainframe as the test space, you need to configure your CPS properties for the Galasa ecosystem, binding the framework properties to the mainframe, rather than the DSE. This means you can use z/OS clusters and z/OS images and the framework dynamically manages the test infrastructure for greater flexibility, scalability and resilience.

One simple way to get going is to evolve the SIMBANK CPS properties to try out CPS’ capabilities to reflect what you would like to achieve with your test framework. Having achieved that in your DSE, the next step could be to migrate your DSE CPS properties to use them to specify an ecosystem.

### How do CPS properties work

We have worked hard to ensure writing tests is simple, yet powerful. We have used @ annotations which can pass attributes, for example, from SIMBANK’s ```BatchAccountOpenTest.java```:  

```
@Test
public class BatchAccountsOpenTest {  @ZosImage(imageTag = "SIMIMAGE")
  public IZosImage    image;  @ZosBatch(imageTag="SIMIMAGE")
  public IZosBatch zosBatch;  @ZosBatchJobname(imageTag="SIMIMAGE")
  public IZosBatchJobname zosBatchJobname;  @BundleResources
  public IBundleResources resources;  @Logger
  public Log       logger;
```

### Anatomy of a CPS property

 There are four fundamental parts of a CPS property. The attribute name; consisting of prefix, infix and postfix and the attribute value:

```
zos.image.SIMIMAGE.ipv4.hostname=myhost.mydomain.com
zos.image.SIMIMAGE.telnet.port=992
zos.image.SIMIMAGE.telnet.tls=true
```


```zos.image``` is the prefix
```SIMIMAGE``` is the infix (upper case shows this is user setable) - This is what the ```imageTag``` in the test’s anotation refers to
```ipv4.hostname```, ``telnet.port`` and ``telnet.tls`` are postfixes.

The use of the string SIMBANK in the annotation is understood by the Manager supplying the property and it ties to the infix part of the attribute name in the CPS properties.

### Galasa Ecosystem
From your knowledge of your physical zOS ecosystem, you can configure your Galasa Ecosystem so that tests can exploit zOS and Galasa’s management of its resources. Here you can configure zOS clusters and the images they contain (or non-clustered images) .If you have been working through the SIMBANK sample shipped with Galasa, you may have customised or added to its configuration . You may find it helpful to reuse and evolve that configuration as the basis for a suitable configuration for a Galasa zOS Ecosystem. 

CPS properties are attribute value pairs but with more complexity in the attribute name. This will largely require the respecification of the infix part of the attribute name[the following text refers to a now possibly obsolete version. of the WebUI design]
If you would prefer, you can start from this (these?) basic alternatives	• SIMBANK (original basic specification)		
	• SIMBANK (my modified specification - imported from your DSE)
	• A single Cluster, two image example containing configuration for each one of the IBM capabilities (as shipped with Galasa)
	• From scratch.
	• [Other suggestions for more (or fewer) starting points, welcome]
	From your starting point, we can start to migrate to a zOS Ecosystem, guided by how you want to deliver these zOS capabilities:
	• Clusters, Images, purpose of images and then, 
	• guided by testing capability that may exploit the images you have configured or 
	• capability that is independent of the topology but which delivers test capability that you need for your ecosystem.

You can configure the CPS properties by using etcdctl. If you have a large number of properties to configure using etcdctl might be time-consuming. A quicker option in this scenario is to use the Galasa web UI.  

1. Use the Docker command ```docker exec -it galasa.cps /bin /sh```  to log onto the etcd server. 

2. To view existing properties, enter the following command when the Docker operator is running:

```etcdctl get --prefix=true ""```

**Note:** Inserting text inside the quote marks ```""``` returns any properties containing that prefix.

If ```prefix=false``` is set, any properties containing that prefix are hidden.

3. To set properties run the command: ```etcdctl put {KEY} {VALUE}```

The value for ```{KEY}``` is the property name that is returned after running<br>
 ```tcdctl get --prefix=true ""```

