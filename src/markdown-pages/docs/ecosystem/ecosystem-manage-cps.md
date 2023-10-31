---
path: "/docs/ecosystem/cps"
title: "Managing integrated test runs"
---

[Retrieving properties](#retrieving)<br>
[Setting properties](#setting)<br>
[Deleting properties](#deleting)<br>


Integration testing can be complicated. Tests often require configuration parameters to bind to a specific test environment. Galasa Managers require configuration so that systems under test can be contacted. Credentials for systems need to be supplied to tests and Managers to enable connections. The organisation of these parameters must be centralised if tests are to be run in automation. 

To address these challenges, Galasa uses a Configuration Property Store (CPS) as part of the core Galasa framework. The CPS holds all the configuration values, so that the Galasa framework, Ecosystem, Managers, and individual tests can use the CPS to retrieve configuration information.

A video -  <a href="https://www.youtube.com/watch?v=d_mufWVa31U" target="_blank">The Galasa Configuration Property Store </a> - is available on the Galasa YouTube channel. Watch the video to find out more about the features of the Galasa CPS, and to see a demonstration on how to manipulate CPS property values by using the Galasa command line tool.

## Simplifying test configuration with the CPS

When running Galasa tests locally, using the command line tool or Eclipse, the CPS is stored in the flat file `{GALASA_HOME}/cps.properties`. 

When running tests in the Galasa Ecosystem, where tests are run on a Kubernetes cluster, a REST service hosts the storage of the CPS properties in a central location. A centralised CPS means that configuration information can be supplied to all automated tests running in a Galasa Ecosystem, allowing multiple tests to run using the same shared configuration information. 

You can set, retrieve and delete properties that are held in the CPS by using the `galasasctl properties` command in the Galasa CLI. The ability to manage these properties directly makes it easier for testers to set parameters and credentials on the Ecosystem for tests to read and use at runtime. System administrators can use the CLI to set Ecosystem-wide configuration properties after Ecosystem installation.


## About the Configuration Properties Store 

The CPS is hosted in the Ecosystem's etcd server, a key-value pair store which also hosts the Dynamic Status Store (DSS) and the Credentials Store (CREDs), maintaining a single source of truth about the status of the Ecosystem. For more information see the [Ecosystem Architecture](/docs/ecosystem/architecture) documentation.

Properties in the CPS are dot separated values with lower and upper-case segments that define, for example, endpoint, port, and repository properties. These properties instruct the way in which a Galasa test runs.  It is the CPS and the configurational properties that enable tests to run against multiple environments, without changing the code inside the test. 

Naming conventions are used to maintain order in the properties which are stored in the CPS. If a property in the CPS consists of a prefix, suffix, and a variable infix, then the prefix and suffix are lower-case, and the infix part of the property name is upper-case, to indicate that it is variable in nature. This convention allows the CPS to group names together and for easy searching and lookup by tests, Managers and users alike. Properties can be searched by using the prefix, suffix and a list of possible infixes.

Namespaces are used to group properties together within the CPS. Namespaces help to restrict the values that can be drawn from the CPS. For example, test cases draw values only from the `test` namespace. The Galasa framework draws values from the `framework` namespace, for example, the location of the Credentials Store and the Dynamic Status Store. Managers also provide their own configuration properties, for example, the configuration properties of the Docker Manager are held in the `docker` namespace. The `--namespace` flag is mandatory for all `galasasctl properties` commands. 


## Managing CPS properties

Use the `galasasctl properties get`, `galasasctl properties set`, and `galasasctl properties delete` commands to dynamically manage CPS properties. These Galasa CLI commands make it easy to ensure that the appropriate properties and credentials are installed in the Ecosystem for automated tests to query and use. 

The example commands that are provided in the following sections assume that the `GALASA_BOOTSTRAP` environment variable is set, so the `--bootstrap` flag is not required in the command. 

## <a name="retrieving"></a>Retrieving properties from a namespace 

Use the `galasactl properties get` command to read CPS properties and values from a specified namespace in the Galasa Ecosystem to verify that the properties exist and are set correctly. You can filter the properties that are returned by using the property name (to return a single property), or by using the prefix, suffix, and infix flags to return a subset of properties that match the provided criteria. 


### Retrieve all properties from a namespace

To retrieve all properties that are stored in the `framework` namespace, use the following command:<br><br>
`galasactl properties get --namespace framework`


### Retrieve a single property from a namespace

To retrieve a specific property from the `framework` namespace, specify the property name in the command by using the `-–name` flag. For example, to retrive the credentials store property use the following command:

```galasactl properties get --namespace framework --name credentials.store```
 

*Note:* The `-–name` flag cannot be used in conjunction with the `–suffix`, `--prefix`, or `-–infix` flags.

### Retrieve a subset of properties in a namespace

To filter the properties that are returned, without specifying the property name, use the `–-prefix`, `–-suffix`, and ``--infix`` flags. You can specify more than one `--infix` value by using a comma separated list. For example, to return properties in the `docker` namespace that start with `engine`, end with `hostname`, and contain `LOCAL` or `REMOTE` use the following command: 


On Mac and Unix:

```
galasactl properties get \
--namespace docker --prefix engine --suffix hostname --infix LOCAL,REMOTE
```

On Windows (Powershell):

```
galasactl properties get `
--namespace docker --prefix engine --suffix hostname --infix LOCAL,REMOTE
```


The `--prefix`, `--suffix` and `-–infix` flags can be used together or separately to retrieve all properties that match the provided criteria.


For a complete list of supported parameters see the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_properties_get.md" target="_blank"> galasactl properties get</a> documentation in the cli repository.


### Returned properties


Properties are returned in summary format. For example:

```
namespace name                    value
docker    engine.LOCAL.hostname   127.0.0.1
docker    engine.REMOTE.hostname  103.67.89.6

Total: 2
```

If the property value that is returned is longer than 50 characters, the first fifty characters are displayed, followed by three ellipses (`...`). For example:

```
namespace name              value
framework credentials.store etcd:http://this-value-is-60-characters-long-xxxxx... 

Total: 1
```


Returned properties are sorted in alphabetical order. 


## <a name="setting"></a>Setting properties in a namespace

You can update a property and its value in a namespace by using the `galasactl properties set` command. If the property does not exist in that namespace, the command creates the property. You must provide the namespace, the name of the property, and the value of the property in the command in the following example format:

```galasactl properties set --namespace namespace --name name --value value```

where: 

 - `namespace` is the namespace in which the property is stored
 - `name` is the name of the property 
 - `value` is the property value 

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
galasactl properties set --namespace docker --name dse.engine.PRIMARY --value REMOTE
galasactl properties set --namespace docker --name default.engines --value REMOTE
galasactl properties set --namespace docker --name engine.REMOTE.hostname --value 103.67.89.6
galasactl properties set --namespace docker --name engine.REMOTE.port --value 2987
galasactl properties set --namespace docker --name engine.REMOTE.max.slots --value 20
```


## <a name="deleting"></a>Deleting properties from a namespace

You can delete a property and its associated value in a namespace by using the `galasactl properties delete` command. You must provide the namespace and the name of the property that you want to delete.  For example:

```galasactl properties delete --namespace namespace --name name```

where: 

 - `namespace` is the namespace that contains the property to delete
 - `name` is the name of the property you want to delete



A success message is displayed when the property is deleted.

For a complete list of supported parameters see the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_properties_delete.md" target="_blank"> galasactl properties delete</a> documentation in the cli repository.



