---
path: "/docs/ecosystem/cps-yaml"
title: "Configuring an Ecosystem using resource files"
---

You might want to create or update a number of different Galasa properties and associated values at the same time, for example to configure a different Galasa Ecosystem. A good way to do this is by using a yaml file containing property resources and associated values to set the configuration of your Ecosystem. 

The topic [Managing integrated test runs](../ecosystem/ecosystem-manage-cps) describes how to use the `galasactl properties get` command with the `--format yaml` flag specified to extract a yaml file which describes Galasa properties and property values. 

If more than one property is returned, each property is separated in the file by three dashes, `---`, as shown in the following example: 

```
apiVersion: galasa-dev/v1alpha1
kind: GalasaProperty
metadata:
  name: engine.LOCAL.hostname
  namespace: docker
data:
  value: 127.0.0.1
---
apiVersion: galasa-dev/v1alpha1
kind: GalasaProperty
metadata:
  name: engine.REMOTE.hostname
  namespace: docker
data:
  value: 103.67.89.6
```

You can update the values in this yaml file and then create, update, or apply those updates by using the galasactl command line tool, as described in the following section. 


Alternatively, if you want to create a new yaml file, you can do so but you must use the following example format:


```
apiVersion: galasa-dev/v1alpha1
kind: GalasaProperty
metadata:
  name: my.property1
  namespace: myNamespace1
data:
  value: myValue1
---
apiVersion: galasa-dev/v1alpha1
kind: GalasaProperty
metadata:
  name: my.property2
  namespace: myNamespace2
data:
  value: myValue2
```

where:
- `apiVersion` is the version of the API that you are using
- `kind` is the type of resource you want to create or update. The current available value is `GalasaProperty`
- `name` is the name of the property that you want to create or update
- `namespace` is the namespace in which the property is contained in the configuration properties store (cps.properties). 
- `value` is the value that you want to assign to the specified property in the specified namespace


You can define multiple properties and values in the same yaml file by separating them using three dashes, `---`, as shown in the example.

You can save the file with a `.yaml` or `.yml` file extension.



### Creating and updating properties using a yaml resource file

You can use the galasactl command line tool to sumbit a yaml file to create new properties, or to update existing ones.

Use the following command to create a new property or properties in a specified namespace by using a yaml file called `myFile.yaml`:

```
galasactl resources create -f myFile.yaml
```

Use the following command to update an existing property or properties by using a yaml file called `myFile.yaml`:

```
galasactl resources update -f myFile.yaml
```

Use the following command to create a new property if the property does not exist and update an existing property if the property does exist by using a yaml file called `myFile.yaml`:

```
galasactl resources apply -f myFile.yaml
```

An error message is returned if the action is not able to complete successfully. For example, if a property could not be created in a particular namespace because the property already exists in that namespace.
 

### Deleting properties using a yaml resource file

When maintaining an Ecosystem, you might have a yaml file containing Galasa property resource definitions and want to delete a corresponding set of properties stored on the server in an Ecosystem. You can do this by using the following command: 

```
galasactl resources delete -f {filename}
```

where:

`{filename}` is the name of the yaml file that contains the list of properties that you want to delete.

For example, you might have a list of resources that you want to delete in a file called `resources_to_delete.yaml`. You can delete those resources by running the following command:

```
galasactl resources delete -f resources_to_delete.yaml
```


For a complete list of supported parameters see the <a href="https://github.com/galasa-dev/cli/blob/main/docs/generated/galasactl_resources.md" target="_blank"> galasactl resources</a> documentation in the Galasa cli repository.



