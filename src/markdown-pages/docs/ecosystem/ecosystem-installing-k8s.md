---
path: "/docs/ecosystem/installing/k8s"
title: "Installing the Galasa Ecosystem on Kubernetes"
---

The following section explains how to install a Galasa ecosystem by using the <a href="https://github.com/galasa-dev/extensions/tree/master/galasa-ecosystem-kubernetes-operator" target="_blank"> Kubernetes Ecosystem Operator</a>. 

To find out more about Kubernetes, take a look at the <a href=https://kubernetes.io/docs/home/ target="_blank"> Kubernetes Documentation</a>.

## Prerequisites

You must have a Kubernetes cluster (version 1.16 or higher), the Kubernetes command-line tool **kubectl** must be installed on the machine that is used to deploy the operator and configured to point at your Kubernetes cluster. 

If you are deploying the operator on a cluster which does not have access to the internet, you can build and host the docker image by using the *DockerFile* in the <a href=https://github.com/galasa-dev/extensions/blob/master/galasa-ecosystem-kubernetes-operator/build/Dockerfile target="_blank"> build/DockerFile directory</a> and your own docker image registry.

## About the Kubernetes Operator

If you want to run scalable, highly available testing for enterprise level workloads, use the Kubernetes Operator to install your Galasa Ecosystem. Running Galasa in a scalable cloud environment, rather than on a Docker engine, means that you are not limited by the size of the virtual machine.

The Kubernetes Operator not only installs Galasa but also maintains the health of Galasa and manages its lifecycle. If a problem arises in the cluster, the operator attempts to resolve the issue. 

The Kubernetes Operator is made up of two components; the ```CustomResourceDefinition``` (CRD) and the physical operator. 

The ```CustomResourceDefinition``` defines the Galasa Ecosystem custom resource and the operator deployment to the cluster. 

The physical Kubernetes Operator is hosted as a deployment and is brought up as a pod. The pod maintains the state of the namespace and any custom resources defined within that namespace

Deploy the operator by using the <a href=https://github.com/galasa-dev/extensions/tree/master/galasa-ecosystem-kubernetes-operator/deploy/crds target="_blank"> Galasa ecosystems CRD</a> that is provided with Galasa. 

For security reasons, the Kubernetes Operator is scoped to a namespace rather than cluster-wide. Create your own namespace for your operator to run in and for the ecosystem to be hosted in. Creating your own namespace avoids cross-contamination and improves security. 


## Installing the Galasa ecosystem in a Kubernetes cluster 

1. Define the ```CustomResourceDefinition``` to work with your cluster by using the following command:

```
kubectl apply -f deploy/crds/galasa.dev_galasaecosystems_crd.yaml
```

*Note:* This example uses a relative path. 

2. Define a ```ServiceAccount``` (the account that the operator uses) and a ```Role```and ```RoleBinding``` (the permissions that the account has). 


3. Deploy the operator by using the following command:

```
kubectl apply -f deploy/operator.yaml
```

Check that the pod has come up cleanly. The operator and custom resource definitions are now installed and ready to bring up a Galasa ecosystem. You can bring up the ecosystem by using the CustomResource sample that is provided with Galasa.


### About the CustomResource sample 

Galasa comes with a sample <a href=https://github.com/galasa-dev/extensions/blob/master/galasa-ecosystem-kubernetes-o[…]perator/deploy/crds/galasa.dev_v1alpha1_galasaecosystem_cr.yaml target="_blank"> ```CustomResource``` to create a Galasa ecosystem.</a>

1. Update the IP address and hostname in the sample to reflect where your cluster is installed. The Kubernetes Operator needs this information to configure the Galasa Ecosystem to self-register services. 

2. Check that the Galasa version is the latest version and then install the sample by running the following command:

```
kubectl apply -f deploy/crds/galasa.dev_v1alpha1_galasaecosystem_cr.yaml
```

The installation takes a few minutes. 

3. Check the status by running the following command:

```
kubectl get GalasaEcosystem
```

This command also returns the bootstrap endpoint, which you can paste into your Eclipse Galasa plugin to run SimBank tests for verifying the installation, and the Grafana endpoint which you can use to view ecosystem performance information.

The following example shows the information that is returned by running the command: 

```
NAME : 
galasa-ecosystem-demos                   
READY :  
true
BOOTSTRAPURL :  
http://<HOSTNAME>:32319/bootstrap                                    
GRAFANAURL :
http://<HOSTNAME>:31091/galasa-grafana
```

4. Check that the pods were brought up on the Ecosystem namespace by running the ```kubectl get pods``` command. The following services, are displayed with a status of *Running*.

```
NAME                                                        READY   STATUS    
galasa-ecosystem-demos-apiserver-6d848f4689-5w7sw           1/1     Running   
galasa-ecosystem-demos-cps-0                                1/1     Running   
galasa-ecosystem-demos-engine-controller-6fbb6bfc46-z6659   1/1     Running   
galasa-ecosystem-demos-grafana-5dd447dd8f-tsz7h             1/1     Running   
galasa-ecosystem-demos-metrics-bb865dff-f7xdj               1/1     Running   
galasa-ecosystem-demos-prometheus-c85cdbb97-s8rhc           1/1     Running   
galasa-ecosystem-demos-ras-0                                1/1     Running   
galasa-ecosystem-demos-resource-monitor-b7669c6b7-bq4x7     1/1     Running
galasa-ecosystem-kubernetes-operator-6cb9d79fb5-7zn6f       1/1     Running   
```

## Verifying the installation

You can verify the installation by connecting to an Eclipse session and running its own version of the SimBank tests by using the Bootstrap URL that was returned by running the ``` kubectl get GalasaEcosystem``` command. 

1. Open Eclipse and reinitialise the Eclipse framework by clicking the *Galasa* on the main menu between *Run* and *Window*, selecting *Initialise Galasa framework* and entering the bootstrap URL.
2. Submit the four SimBank tests to automation by clicking *Galasa* and selecting *Submit tests to automation*. Click the Galasa logo to view the status of test runs *U1*, *U2*, *U3*, and *U4*. Valid values for the runs are *acknowledged*, *queued*, *allocated*, *running*, and *finished*.
3. Click *Finish*.
4. Check that the pods were brought up on the Ecosystem namespace by running the ```kubectl get pods``` command. The following services, including SimBank, are displayed with a status of *Running*.

```
NAME                                                        READY   STATUS    
galasa-ecosystem-demos-apiserver-6d848f4689-5w7sw           1/1     Running   
galasa-ecosystem-demos-cps-0                                1/1     Running   
galasa-ecosystem-demos-engine-controller-6fbb6bfc46-z6659   1/1     Running   
galasa-ecosystem-demos-grafana-5dd447dd8f-tsz7h             1/1     Running   
galasa-ecosystem-demos-metrics-bb865dff-f7xdj               1/1     Running   
galasa-ecosystem-demos-prometheus-c85cdbb97-s8rhc           1/1     Running   
galasa-ecosystem-demos-ras-0                                1/1     Running   
galasa-ecosystem-demos-resource-monitor-b7669c6b7-bq4x7     1/1     Running
galasa-ecosystem-demos-simbank-74dd896c5-f84zc              1/1     Running   
galasa-ecosystem-kubernetes-operator-6cb9d79fb5-7zn6f       1/1     Running   
```


### Next steps 

Run your own tests from the artifact repository by <a href=/writing-own-tests/test-streams target="_blank"> setting up a test stream</a>. 





