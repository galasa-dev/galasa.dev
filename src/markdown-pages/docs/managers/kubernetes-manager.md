---
path: "/docs/managers/kubernetes-manager"
title: "Kubernetes Manager"
---

**ALPHA - This Manager has been written to provide a Kubernetes Namespace for the Galasa integrated test pipeline.  It has the bare  minimum code necessary to do that.  It has not been extensively tested (other than on the pipeline).  The TPI is subject to change.  However, saying all that,  it can be used within tests.**

## Overview
This Manager provides a Test with a Kubernetes Namespace to utilise.  The test will provide YAML representations of the resources that the Test requires. <br><br> As an absolute minimum, the CPS property <code>kubernetes.cluster.K8S.url</code> must be provided and a credential <code>secure.credentials.K8S.token</code> for the API token <br><br> The Kubernetes Manager supports Galasa Shared Environments.  Shared Environments provide  the ability to create a test environment that can be shared across multiple test runs  so you don't have to provision a test environment for each test.

## Limitations
The Manager only supports the following Kubernetes resources:-<br> Deployment<br> StatefulSet<br> Service<br> Secret<br> ConfigMap<br> PersistentVolumeClain<br> <br> If additional resources are required, please raise an Issue.


## Annotations

The following annotations are available with the Kubernetes Manager
 
| Annotation: | Kubernetes Namespace |
| --------------------------------------- | :------------------------------------- |
| Name: | @KubernetesNamespace |
| Description: | The <code>@KubernetesNamespace</code> annotation will request the Kubernetes Manager allocate a namespace on the infrastructure Kubernetes Clusters.  The test can request as many Namesapces as required that  can be supported simultaneously by the Kubernetes Manager configuration. |
| Attribute: `kubernetesNamespaceTag` |  The <code>kubernetesNamespaceTag</code> is used to identify the Kubernetes names to other Managers or Shared Environments.  If a test is using multiple  Kubernetes Namespace, each separate Kubernetes Namesapce must have a unique tag.  If two Kubernetes Namespace use the same tag, they will refer to the  same actual Kubernetes Namespace. |
| Syntax: | <code>@KubernetesNamespace<br> public IKubernetesNamesapce namespace;<br> </code> |
| Notes: | The <code>IKubernetesNamespace</code> interface gives the test access to create and manage resources on the Kubernetes cluster.  See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/kubernetes/KubernetesNamespace.html" target="_blank">KubernetesNamespace</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/kubernetes/IKubernetesNamespace.html" target="_blank">IKubernetesNamespace</a> to find out more. |

## Code Snippets

Use the following code snippets to help you get started with the Kubernetes Manager.
 
### Create Kubernetes namespaces for the Kubernetes Manager to use

Note: Isolated namespaces must be provided for the Kubernetes Manager to use.  The Manager will delete any resource that 
exists on the namespace once a Test has finished.

The following are example scripts and YAML files necessary to create namspaces:-
1. [Namespace creation script](https://github.com/galasa-dev/managers/blob/master/galasa-managers-parent/galasa-managers-cloud-parent/dev.galasa.kubernetes.manager/examples/namespaces.yaml)
1. [Create Service Account for the Manager to use (including api token)](https://github.com/galasa-dev/managers/blob/master/galasa-managers-parent/galasa-managers-cloud-parent/dev.galasa.kubernetes.manager/examples/account.sh)
1. [The RBAC rules to be applied to each namespace](https://github.com/galasa-dev/managers/blob/master/galasa-managers-parent/galasa-managers-cloud-parent/dev.galasa.kubernetes.manager/examples/rbac.yaml)
The following snippet shows the minimum code that is required to request a Docker container in a Galasa test:

### Obtain a Kubernetes namespace

```java
@KubernetesNamespace()
public IKubernetesNamespace namespace;
```

This code will request the Kubernetes Manager allocate a namespace for the test to use.

There is no limit in Galasa on how many Kuberentes namespaces can be used within a single test. The only limit is the number of Kuberentes namespaces that can be started in the Galasa Ecosystem. This limit is set by the Galasa Administrator and is typically set to the maximum number of namespaces defined in the Kubernetes cluster.  If there are not enough "slots" available for an automated run, the run is put back on the queue in "waiting" state to retry.  Local test runs fail if there are not enough container "slots" available.

### Create a resource on the namespace

```java
@ArtifactManager
public IArtifactManager artifactManager

@KubernetesNamespace()
public IKubernetesNamespace namespace;

@Test
public void test() {
	IBundleResources bundleResources = artifactManager.getBundleResources(getClass());
	
	String yaml = bundleResource.streamAsString(bundleResources.retrieveFile("/example.yaml"));
	
	IResource resource = namespace.createResource(yaml);
}

```

In this snippet, the test will retrieve the contents of the `/example.yaml` resource file as a String.  The YAML file is passed the the namespace for creation.  The YAML must contain only one Kubernetes resource.

The resource is created but is not checked to see if the resource has been started or allocated.

### Retrieve a pod log

```java
IStatefulSet statefulSet = (IStatefulSet)namespace.createResource(yaml);

List<IPodLog> podLogs = statefulSet.getPodLogs("containername");

```

As Deployments and StatefulSets can have multiple pods and therefore containers with the same name,  a List is returned containing all the current logs for all the named containers.
## Configuration Properties

The following are properties used to configure the Kubernetes Manager.
 
| Property: | Kubernetes Cluster IDs CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.ids |
| Description: | Provides a comma separated list of the active Kubernetes Clusters defined in the CPS |
| Required:  | No |
| Default value: | Will default to a single cluster ID of K8S the property is missing |
| Valid values: | a comma separated list of alphanumeric IDs.  Normally uppercased. |
| Examples: | <code>kubernetes.cluster.ids=K8S,ALTERNATE</code> |

 
| Property: | Kubernetes Cluster Credentials CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.[XXXX.]credentials |
| Description: | Provides the Credentials ID for the token required to access the Kubernetes Cluster |
| Required:  | no |
| Default value: | K8S |
| Valid values: | a valid credentials ID, Galasa convention states IDs should be uppercase |
| Examples: | <code>kubernetes.cluster.K8S.credentials=K8S<br> kubernetes.cluster.credentials=K8S</code> |

 
| Property: | Maximum Slots on Cluster CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.[XXXX.]max.slots |
| Description: | Specifies the maximum number of slots(namespaces) that can be allocated at one time on the cluster |
| Required:  | No |
| Default value: | Will 2 if not provided |
| Valid values: | Integer value.  If the value is < 0, it will effectively disable the cluster. |
| Examples: | <code>kubernetes.cluster.K8S.max.slots=5</code> |

 
| Property: | Kubernetes Namespace IDs CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.[XXXX.]namespaces |
| Description: | Provides a comma separated list of the namespaces that are available on the cluster |
| Required:  | No |
| Default value: | Will default to galasa{1-2} is not provided |
| Valid values: | a comma separated list of valid Kubernetes namespaces,  with resource pooling expanders |
| Examples: | <code>kubernetes.cluster.K8S.namespaces=galasa1,galasa{2-9}<br> kubebernetes.cluster.namespaces=bob1,bob2,bob3</code> |

 
| Property: | Kubernetes Node Port Proxy Hostname CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.XXXX.nodeport.proxy.hostname |
| Description: | Gives the hostname that NodePorts can be accessed on. |
| Required:  | No |
| Default value: | The hostname as specified in the API Url |
| Valid values: | A valid URL hostname |
| Examples: | <code>kubernetes.cluster.K8S.nodeport.proxy.hostname=cluster.org</code> |

 
| Property: | Kubernetes Override Storage Class CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.[XXXX.]override.storageclass |
| Description: | Provides a Kubernetes StorageClass that will be set on all PersistentVolumeClaims that are created in the Kubernetes Namespace.   The value of this property will be set in the property spec.storageClassName |
| Required:  | No |
| Default value: | none |
| Valid values: | a valid StorageClass that is defined in the Kubernetes Cluster |
| Examples: | <code>kubernetes.cluster.K8S.override.storageclass=fast<br> kubernetes.cluster.override.storageclass=slow</code> |

 
| Property: | Kubernetes Cluster API URL CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.XXXX.url |
| Description: | The API URL of the Kubernetes Cluster |
| Required:  | Yes |
| Default value: | none |
| Valid values: | A valid URL |
| Examples: | <code>kubernetes.cluster.K8S.url=http://cluster.org:8443</code> |

 
| Property: | Kubernetes Validate Cluster Certificate CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | kubernetes.cluster.[XXXX.]validate.certificate |
| Description: | Should the Kubernetes Cluster API Certificate be validated |
| Required:  | No |
| Default value: | true |
| Valid values: | Either true or false |
| Examples: | <code>kubernetes.cluster.K8S.validate.certificate=false<br> kubernetes.cluster.validate.certificate=true</code> |

