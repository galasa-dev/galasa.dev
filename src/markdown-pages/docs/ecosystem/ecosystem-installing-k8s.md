---
path: "/docs/ecosystem/installing/k8s"
title: "Installing the Ecosystem on Kubernetes"
---

The following section explains how to install a Galasa ecosystem by using the <a href="https://github.com/galasa-dev/galasa-kubernetes-operator" target="_blank"> Kubernetes Operator</a>. To find out more about Kubernetes, see the <a href=https://kubernetes.io/docs/home/ target="_blank"> Kubernetes Documentation</a>.

If you want to run scalable, highly available testing for enterprise level workloads, use the Kubernetes Operator to install your Galasa Ecosystem in a cloud environment. Running Galasa in a scalable cloud environment, rather than on a Docker engine, means that you are not limited by the size of the virtual machine.

If you are looking to create a local proof of concept, you might want to first install a Galasa Ecosystem on a Docker engine by using the Docker Operator.

## Prerequisites

- The Kubernetes command-line tool **kubectl** must be installed on the machine that is used to deploy the operator and must be configured to point at your Kubernetes cluster. 
- You must have a Kubernetes cluster at version 1.16 or higher. You can check the version number by running the ```kubectl version``` command.  

## About the Kubernetes Operator kubectl apply -f role_binding.yaml

Like the Docker Operator, the Kubernetes Operator installs the Galasa Ecosystem, but in addition, it also maintains the state of the ecosystem and the services it brings up. 

The Kubernetes Operator is made up of two components: the ```CustomResourceDefinition``` (CRD) and the physical operator. The CRD defines the Galasa Ecosystem custom resource and the operator deployment to the cluster. The physical operator is hosted as a deployment and is brought up as a pod. The pod maintains the state of the namespace and any custom resources defined within that namespace.

The Kubernetes Operator requires a high privilege level, so for security reasons, the  operator is scoped to a namespace rather than cluster wide. Create your own namespace for your operator to run in and for the ecosystem to be hosted. Creating your own namespace avoids cross-contamination and improves security. 

## Installing the Galasa Ecosystem in a Kubernetes cluster 

You must install the operator by using the *release.yaml* that is provided in the <a href=https://github.com/galasa-dev/galasa-kubernetes-operator/tree/main/releases/0.18.1 target="_blank"> repository</a> in GitHub. This repository contains the YAML that is required to define the custom resource definition object, service account, role, and role binding that the operator needs to perform work.

Complete the following steps to install the Galasa Ecosystem in a Kubernetes cluster. 
Note that the examples use a relative path - check that you use the correct file path for your configuration.

## Installing the Operator

1. For a basic install that creates a namespace called *galasa* and installs the operator and relevant ecosystem CRD's, use the following command: 

```
kubectl apply -f https://raw.githubusercontent.com/galasa-dev/galasa-kubernetes-operator/main/releases/0.18.1/release.yaml
```

This install limits all work to the *galasa* namespace. If you want to install the operator and ecosystem in a different namespace, you must edit the *release.yaml* sample. For example, you might want to edit the following attributes:

- Custom resource definition (CRD) <br>
The CRD allows the topology and basic configuration for an ecosystem to be defined. A message is displayed to confirm that the CRD is successfully created.
- Service account 
- Role
- Role binding 

2. Deploy the operator by using the following command:
```
kubectl apply -f https://raw.githubusercontent.com/galasa-dev/galasa-kubernetes-operator/main/releases/0.18.1/release.yaml
```
3. Check that the pod is started cleanly by running the ```kubectl get pod``` command. The following service is displayed with a status of *Running*:
```
NAME                                                        READY   STATUS    
galasa-ecosystem-kubernetes-operator-6cb9d79fb5-7zn6f       1/1     Running   
```
The operator and custom resource definitions are now installed and ready to bring up a Galasa Ecosystem. 

## Installing the Galasa Ecosystem

Install the ecosystem by using the <a href=https://github.com/galasa-dev/galasa-kubernetes-operator/examples/basic.yaml target="_blank">basic.yaml</a> sample that is provided with Galasa.

1. Set the ```externalhostname``` value in the sample to the IP address or hostname of your Kubernetes cluster. The Kubernetes Operator needs this information to configure the Galasa Ecosystem to self-register services. 
2. Update any other default configurations that are required for the sample to work with your cluster and ensure that the Galasa version number in the sample is the latest version number. Take a look at the <a href=https://github.com/galasa-dev/galasa-kubernetes-operator/examples/basic.yaml target="_blank"> basic.yaml</a> sample for some examples of attributes that can be edited.
3. Install the sample by running the following command:
```
kubectl apply -f basic.yaml
```
The installation takes a few minutes. 
4. Check the status by running the following command:
```
kubectl get galasaecosystem
```
The following example shows the information that is returned by running the command: 
```
NAME : galasa-ecosystem                  
READY :  true
BOOTSTRAPURL : http://<HOSTNAME>:32319/bootstrap                                    
GRAFANAURL : http://<HOSTNAME>:31091/galasa-grafana
```
Note that the command returns the Bootstrap endpoint, which you can paste into your Eclipse Galasa plugin to run SimBank tests for verifying the installation. The Grafana endpoint is also returned, and can be used to view ecosystem performance information.
5. Check that the pods are brought up successfully on the ecosystem namespace by running the ```kubectl get pods``` command. The following services are displayed with a status of *Running*:
```
NAME                                                        READY   STATUS    
galasa-ecosystem-apiserver-6d848f4689-5w7sw                 1/1     Running   
galasa-ecosystem-cps-0                                      1/1     Running   
galasa-ecosystem-engine-controller-6fbb6bfc46-z6659         1/1     Running   
galasa-ecosystem-grafana-5dd447dd8f-tsz7h                   1/1     Running   
galasa-ecosystem-metrics-bb865dff-f7xdj                     1/1     Running   
galasa-ecosystem-prometheus-c85cdbb97-s8rhc                 1/1     Running   
galasa-ecosystem-ras-0                                      1/1     Running   
galasa-ecosystem-resource-monitor-b7669c6b7-bq4x7           1/1     Running
galasa-ecosystem-kubernetes-operator-6cb9d79fb5-7zn6f       1/1     Running   
```

## Verifying the installation

You can verify the installation by connecting to an Eclipse session, reconfiguring Galasa to point to the Galasa Ecosystem, and running the SimBank tests that are provided with Galasa. 

To reconfigure Galasa to point to the Galasa Ecosystem that you created, you need to edit the bootstrap. The bootstrap contains the information that Galasa needs to bring up a framework in the Eclipse environment to connect to an ecosystem.  

In Eclipse, you can edit the bootstrap and run the SimBank tests by completing the following steps:

1.  Select *Eclipse > Preferences > Galasa* 
2.  Update **Bootstrap URI** to point to the Bootstrap URL that is returned by running the ``` kubectl get GalasaEcosystem``` command.
3.  Apply and close the preferences.   
4.  Select *Galasa > Submit tests to automation* option from the Eclipse menu. 
5.  Select the four SimBank tests to run them in parallel and click *Finish*. 
5.  Click the *Galasa* icon on the Eclipse toolbar to view the status of test runs *U1*, *U2*, *U3*, and *U4*. Valid values for the runs are *acknowledged*, *queued*, *allocated*, *running*, and *finished*. The tests run in parallel rather than consecutively.

### Troubleshooting

- Check the logs by running the ```kubectl logs``` command. 
- Check the Galasa version number in the sample is correct by running the ```kubectl describe pod <podname>``` command.  If the version number is not the latest one, update the version number in the sample and apply the update.
- If an 'unknown fields' error message is displayed, you can turn off validation by using the  ```--validate=false``` command. 

