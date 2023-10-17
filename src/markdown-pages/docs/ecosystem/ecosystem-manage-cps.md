---
path: "/docs/ecosystem/cps"
title: "Managing automated test runs"
---

[Retrieving properties](#retrieving)<br>
[Setting properties](#setting)<br>
[Deleting properties](#deleting)<br>

The ability to retrieve, set, and delete properties held in the Configuration Properties Store (CPS) directly into an Ecosystem by using the Galasa CLI makes it easier for testers to set parameters and credentials on the Ecosystem for tests to read and use at runtime. 

System administrators can use the CLI to set Ecosystem-wide configuration properties after Ecosystem installation.


## About the Configuration Properties Store 

Properties in the CPS are dot separated values with lower and upper-case segments that define, for example, endpoint, port, and repository properties. These properties instruct the way in which a Galasa test runs.  It is the CPS and the configurational properties that enable tests to run against multiple environments, without changing the code inside the test. 

The CPS is hosted in the Ecosystem's etcd server, a key-value pair store which also hosts the Dynamic Status Store (DSS) and the Credentials Store (CREDs), maintaining a single source of truth about the status of the ecosystem. For more information see the [Ecosystem Architecture](/docs/ecosystem/architecture) documentation.


## Managing CPS properties

When a test is ready to run in the Ecosystem, you can use the CLI to ensure that the appropriate properties and credentials are installed in the Ecosystem for the test to query and use. There is no need to directly access the etcd server, or the REST service, which would have previously been necessary to achieve the same result. Instead, use the `galasasctl properties get`, `galasasctl properties set`, and `galasasctl properties delete` commands to help you to dynamically manage CPS properties that are stored in the etcd server. 

Most properties that are commonly used in Galasa are held in the `framework` namespace and many of the provided examples use the `framework` namespace. The properties that are typically stored in the `framework` namespace are [test stream](../writing-own-tests/test-streams) properties that are used to help run groups of tests in automation in the Ecosystem. Managers also provide their own configuration properties, for example, the configuration properties of the Docker Manager are held in the `docker` namespace. The `--namespace` flag is mandatory for all `galasasctl properties` commands. 

The example commands assume that `GALASA_BOOTSTRAP` environment variable is set, so the `--bootstrap` flag is not required in the command. 

## <a name="retrieving"></a>Retrieving properties from a namespace 

Use the `galasactl properties get` command to read CPS properties and values from a specified namespace in the Galasa Ecosystem to verify that the properties exist and are set correctly. You can filter the properties that are returned by using the property name (to return a single property), or by using prefixes, suffixes, and infixes to return a subset of properties that match the provided criteria. 


### Retrieve all properties from a namespace

To retrieve all properties that are stored in the `framework` namespace, use the following command:<br><br>
`galasactl properties get --namespace framework`


### Retrieve a single property from a namespace

To retrieve a specific property from the `framework` namespace, specify the property name in the command by using the `-–name` flag. For example:

```galasactl properties get --namespace framework --name propertyName```
 

*Note:* The `-–name` flag cannot be used in conjunction with the `–suffix`, `--prefix`, or `-–infix` flags.

### Retrieve a subset of properties in a namespace

To filter the properties that are returned, without specifying the property name, use the `–prefix`, `–suffix`, and ``--infix`` flags. You can specify more than one `--infix` value by using a comma separated list. For example, to return properties in the `docker` namespace that start with `docker.engine`, end with `hostname`, and contain `LOCAL` or `REMOTE` use the following command: 


On Mac and Unix:

```
galasactl properties get \
--namespace framework --prefix docker.engine --suffix hostname --infix LOCAL,REMOTE
```

On Windows (Powershell):

```
galasactl properties get `
--namespace framework --prefix docker.engine --suffix hostname --infix LOCAL,REMOTE
```


The `--prefix`, `--suffix` and `-–infix` flags can be used together or separately to retrieve all properties that match the provided criteria.


For a complete list of supported parameters see the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_properties_get.md" target="_blank"> galasactl properties get</a> documentation in the cli repository.


### Returned properties


Properties are returned in summary format. For example:

```
namespace name                           value
docker    docker.engine.LOCAL.hostname   127.0.0.1
docker    docker.engine.REMOTE.hostname  103.67.89.6

Total: 2
```

If the property value that is returned is longer than 50 characters, the first fifty characters are displayed, followed by three ellipses (`...`). For example:

```
namespace name         value
framework test.stream  this-value-is-60-characters-long-xxxxxxxxxxxxxxxxx...

Total: 1
```


Returned properties are first sorted according to the number of segments in the property name (denoted by the period character (.)), and then in alphabetical order. For example:

```
namespace name                          value
framework framework.test.stream.a.b     account1
framework framework.test.stream.b.c     account2
framework framework.test.stream.a       myteststream
framework framework.test.stream         bestsofar

Total: 4
```


## <a name="setting"></a>Setting properties in a namespace

You can update a property and its value in a namespace by using the `galasactl properties set` command. If the property does not exist in that namespace, the command creates the property. You must provide the namespace, the name of the property, and the value of the property in the command in the following example format:

```galasactl properties set --namespace namespaceName --name propertyName --value newValue```

A success message is displayed when the property is updated or created.

For a complete list of supported parameters see the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_properties_set.md" target="_blank"> galasactl properties set</a> documentation in the cli repository.

### Examples of setting properties in a namespace

The [WebAppIntegrationTest](../running-simbank-tests/web-app-integration-test) documentation is designed to help you to understand how to set the properties that enable a local test to run in a Galasa Ecosystem.

For example, the following CPS properties are set for the Docker Manager when running the `WebAppIntegrationTest` locally:

```
docker.dse.engine.PRIMARY=LOCAL
docker.default.engines=LOCAL
docker.engine.LOCAL.hostname=127.0.0.1
docker.engine.LOCAL.port=2375
docker.engine.LOCAL.max.slots=10
```

The first component, `docker` indicates the namespace. The upper-case components are used to show which part of the property is dynamic, while the lower case is used to define the static parts.

You can use the `galasactl properties set` command to update these properties so that the test can run in the Ecosystem. To use a remote server as a Docker Engine, simply change the default engine from LOCAL to REMOTE and specify the appropriate connection details. No change is required to the test code, only to the CPS properties file.

For example, to change the value of the properties in the `docker` namespace, use the following example commands:

```
galasactl properties set --namespace docker --name docker.dse.engine.PRIMARY --value REMOTE
galasactl properties set --namespace docker --name docker.default.engines --value REMOTE
galasactl properties set --namespace docker --name docker.engine.REMOTE.hostname --value 103.67.89.6
galasactl properties set --namespace docker --name docker.engine.REMOTE.port --value 2987
galasactl properties set --namespace docker --name docker.engine.REMOTE.max.slots --value 20
```

You can also use `galasactl properties set` command to set a repository, OBR, and test catalog property for a test stream. For example, you can set up a test stream called `EXAMPLE` in the `framework` namespace with the following properties:   

```
framework.test.streams EXAMPLE
framework.test.stream.EXAMPLE.repo http://hostname/your/maven/repository
framework.test.stream.EXAMPLE.obr mvn:dev.galasa/dev.galasa.examples.obr/0.0.1-SNAPSHOT/obr
framework.test.stream.EXAMPLE.location http://<your-ecosystem-hostname>/testcatalog/example
framework.test.stream.EXAMPLE.description "Example Test Stream"
```

Tests for the `EXAMPLE` test stream are deployed to the Maven repository that is set for `framework.test.stream.EXAMPLE.repo` and are listed in the test catalog location that is provided in `framework.test.stream.EXAMPLE.location`.


## <a name="deleting"></a>Deleting properties from a namespace

You can delete a property and its associated value in a namespace by using the `galasactl properties delete` command. You must provide the namespace and the name of the property that you want to delete.  For example:

```galasactl properties delete --namespace framework --name propertyName```

A success message is displayed when the property is deleted.

For a complete list of supported parameters see the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_properties_delete.md" target="_blank"> galasactl properties delete</a> documentation in the cli repository.



