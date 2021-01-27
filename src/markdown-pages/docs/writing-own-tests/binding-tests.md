---
path: "/docs/writing-own-tests/binding-tests"
title: "Binding tests to an environment"
---

Ideally, you want to avoid hard coding within your test. If you hard code target hostnames, port numbers and so on, it means that the test is not portable, so you can't run the same test against different environments without changing the test code. You can avoid hard coding in Galasa tests by using attributes. The properties that are associated with an attribute are stored in the CPS file. 

Galasa Managers use attributes and their associated properties to bind a test to an environment at runtime. Using attributes to enable late binding of the test material to the system under test allows the same test to run against multiple environments without changing the test itself. 

## An example using SimBank

Let’s look at an example in the SimBank ```BatchAccountsOpenTest.java``` test code where the *imageTag* attribute is used to avoid hard coding an endpoint for a z/OS image.

The test declares that a z/OS image is required for the test to run and that this image is called *SIMBANK* by using the following test code: 
```
@ZosImage(imageTag="SIMBANK")
    public IZosImage image;
```

When the z/OS Manager reads the code, it creates a z/OS image by using the *imageTag* attribute to ascertain which set of properties from the CPS it needs to load to create the required image.

In this example, the following properties are associated with the *SIMBANK* z/OS image in the CPS file:
```
zos.image.SIMBANK.ipv4.hostname=127.0.0.1
zos.image.SIMBANK.telnet.port=2023
zos.image.SIMBANK.telnet.tls=false
zos.image.SIMBANK.credentials=SIMBANK
```

## Building on the SimBank example

When you create your own test that runs against a z/OS image, you probably want to call that image something other than *SIMBANK*. For example you might want to use an image called *zosImage1*.

You can do this by editing the CPS file to contain the properties that you want *zosImage1* to have and by declaring *zosImage1* in your test code, as per the following steps:

1.	Edit the CPS properties file (either locally or in your ecosystem) to define the properties of the image: 
```
zos.image.zosImage1.ipv4.hostname=xxx.x.x.x
zos.image.zosImage1.telnet.port=xx
zos.image.zosImage1.telnet.tls=false
```

2.	In the test code, declare a z/OS image called *zosImage1*:
```
@ZosImage(imageTag="zosImage1")
   public IZosImage image;
```
The z/OS Manager reads the test code and creates the image object by using the properties associated with *zosImage1* in the CPS file. 

## Clustering

What if you want to run your test against an image in a cluster? By editing the CPS properties file, you can define clusters containing images against which your test can run . Once defined, Galasa can dynamically select an image from that cluster at run time.

For example, you might want to use an cluster called *CLUSTER2*.

You can do this by editing the CPS file to contain the properties that you want *CLUSTER2* to have and by declaring *CLUSTER2* in your test code, as per the following steps:

1.	Edit the CPS properties file:
```
Zos.dse.tag.CLUSTER2.clusterid=CLUSTER2
Zos.dse.tag.CLUSTER2.imageid=CLUSTER2
zos.image.CLUSTER2.ipv4.hostname= winmvs2c.example.com
zos.image.CLUSTER2.telnet.port=23
zos.image.CLUSTER2.telnet.tls=false
```

2.	In your test code, declare a z/OS image called *CLUSTER2*:
```
@ZosImage(imageTag="CLUSTER2")
   public IZosImage image;
```
Once defined, Galasa dynamically selects an image inside *CLUSTER2* at run time, against which the test is run.

## Troubleshooting

If you see an error message in the run log indicating that a property is not found, check that the property is spelled correctly in your test and if so, check that the property is defined in the CPS properties file. 
