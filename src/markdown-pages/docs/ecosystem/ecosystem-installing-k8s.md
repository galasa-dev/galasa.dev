---
path: "/docs/ecosystem/installing/k8s"
title: "Installing the Ecosystem on Kubernetes"
---

The following sections explain how to install a Galasa ecosystem on a Kubernetes cluster by using Helm and validate that the Ecosytem installed successfully.

If you want to run scalable, highly available testing for enterprise level workloads, use Helm to install your Galasa Ecosystem in a Kubernetes cluster. Running Galasa in a Kubernetes cluster, rather than in a local JVM, means that you can run many tests in parallel on a resilient and scalable platform, where cleanup of test resources can be managed, and test results can be centralised and gathered easily.

If you want to create a local proof of concept, you might want to first run your Galasa tests within a JVM on the local machine.

To find out more about Kubernetes, see the <a href=https://kubernetes.io/docs/home/ target="_blank"> Kubernetes Documentation</a>.

The <a href=https://github.com/galasa-dev/helm target="_blank"> Galasa Helm repository</a> contains the YAML that is required to define the custom resource definition object, service account, role, and role binding that the operator needs to perform work.


## Prerequisites

- You must have administrator authority for Kubernetes. 
- The Kubernetes command-line tool **kubectl** must be installed on the machine that is used to deploy the operator and must be configured to point at your Kubernetes cluster. 
- You must have a Kubernetes cluster at version 1.16 or higher. You can check the version number by running the ```kubectl version``` command.  
- <a href=https://helm.sh target="_blank"> Helm</a> must be installed to use the charts. See the <a href=https://helm.sh/docs/ target="_blank"> Helm documentation</a> to get started.

_Note:_ The Galasa Ecosystem chart currently supports only x86-64 systems. It cannot be installed on ARM64-based systems.

## Role-based access control

Kubernetes uses role-based access control (RBAC) authorization mechanisms. Users are assigned to organizational units called namespaces. You can assign multiple namespaces to a team. Users of a team are members of the team's namespaces.

To enable users to interact with Helm charts, you must assign those users to the `galasa-admin` role. Users must have access to the cluster in order to be assigned to the `galasa-admin` role. This role allows assigned users to run the Helm install, upgrade, and delete commands to interact with the Helm chart. 

If RBAC is active on your Kubernetes cluster,  you can assign the `galasa-admin` role to a user by replacing the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml#L39 target="_blank"> placeholder username</a> in the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml target="_blank"> rbac-admin.yaml</a> file with the appropriate username. If multiple users require admin privileges, multiple groups, users, or ServiceAccounts can be assigned the `galasa-admin` role by extending the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml#L36 target="_blank"> subjects</a> list. See <a href=https://kubernetes.io/docs/reference/access-authn-authz/rbac/ target="_blank"> Using RBAC Authorization</a> for more information).

For chart versions 0.24.0 and later, the RBAC file <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/templates/rbac.yaml target="_blank"> rbac.yaml)</a> is applied automatically when installing the ecosystem chart. It creates a Galasa service account if one does not already exist so the API, Engine Controller, Metrics, and Resource Monitor can coordinate, while allowing the Engine Controller to create and manage engine pods.

For chart versions 0.23.0 and earlier, you must apply the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/templates/rbac.yaml target="_blank"> rbac.yaml)</a> file manually by running the following command in the repository's <a href=https://github.com/galasa-dev/helm/tree/main/charts/ecosystem target="_blank"> ecosystem</a> directory:
```
kubectl apply -f rbac.yaml
``` 

## Installing the Galasa Ecosystem in a Kubernetes cluster 

Complete the following steps to install the Galasa Ecosystem in a Kubernetes cluster: 

1.	Add the Galasa repository by running the following command: 
``` 
helm repo add galasa https://galasa-dev.github.io/helm
```
If the repository exists, run ```helm repo update``` to get the latest versions of the packages and then run ```helm search repo galasa``` to see the available charts.
_Note:_ The Galasa Ecosystem Helm chart will deploy three persistent volumes (PVs). If you need to provide a Kubernetes storage class for these PVs, update the `storageClass` value in your <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/values.yaml target="_blank"> values.yaml</a> file with the name of a valid StorageClass on your cluster.
1.	Edit the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/values.yaml target="_blank"> values.yaml</a> file: 
    1.	Set the `galasaVersion` value to a version of Galasa that you want to run. See [Release Highlights](../../highlights) for released versions). 
    1.	Set the `externalHostname `value to the DNS hostname or IP address of the Kubernetes node that is used to access the Galasa `NodePort` services.
1.  Run the following command to install the Galasa Ecosystem chart:
    ```
	helm install <release-name> galasa/ecosystem –wait
    ```
The ```--wait``` flag ensures that the chart installation completes before marking it as "Deployed". During the installation, the API pod waits for the etcd and RAS pods to initialise while the engine-controller, metrics, and resource-monitor pods wait for the API pod to initialise.
1.	View the status of the deployed pods by running `kubectl get pods` in another terminal. The following services are displayed with a status of *Running*:
```
NAME                                      READY   STATUS     RESTARTS      AGE
test-api-7945f959dd-v8tbs                 1/1     Running    0             65s
test-engine-controller-56fb476f45-msj4x   1/1     Running    0             65s
test-etcd-0                               1/1     Running    0             65s
test-metrics-5fd9f687b6-rwcww             1/1     Running    0             65s
test-ras-0                                1/1     Running    0             65s
test-resource-monitor-778c647995-x75z9    1/1     Running    0             65s
```


## Verifying the installation

After the Helm install command completes with a successful deployment message, run the following command to check that the Ecosystem can be accessed externally to Kubernetes so that a simple test engine can be run:
```
helm test <release-name>
```
When the `helm test` command ends and displays a success message, the Ecosystem is set up correctly and ready to be used.

To reconfigure Galasa to point to the Galasa Ecosystem that you created, you need to edit the bootstrap. The bootstrap contains the information that Galasa needs to bring up a framework to connect to an ecosystem.  

To find the URL of the Ecosystem bootstrap, run the following command:
```
kubectl get svc
```
Look for the `api-external` service and the `NodePort` that is associated with the `8080` port. For example, the following snippet shows 30960 to be associated with port 8080:
```
test-api-external  NodePort  10.107.160.208  <none>  9010:31359/TCP,9011:31422/TCP,8080:30960/TCP  18s
```
Combine that information with the external hostname that you provided to form the bootstrap URL. If the external hostname you provided was `example.com`, the bootstrap URL is `http://example.com:30960/boostrap`. 

In Eclipse, you can edit the bootstrap and run the SimBank tests by completing the following steps:

1.  Select *Eclipse > Preferences > Galasa* 
2.  Update **Bootstrap URI** to point to the Bootstrap URL that is returned by running the ```kubectl get galasaecosystem``` command.
3.  Apply and close the preferences.   
4.  Initialise the framework by selecting _Galasa > Initialise Galasa Framework_ from the   Eclipse main menu. 
5.  Select *Galasa > Submit tests to automation* option from the Eclipse menu. 
6.  Select the four SimBank tests to run them in parallel and click *Finish*. 
7.  Click the *Galasa* icon on the Eclipse toolbar to view the status of test runs *U1*, *U2*, *U3*, and *U4*. Valid values for the runs are *acknowledged*, *queued*, *allocated*, *running*, and *finished*. The tests run in parallel rather than consecutively.

Alternatively, you can enter the bootstrap URL in the ```--bootstrap``` option of a [Galasa CLI](../cli-command-reference) command.

## Upgrading the Galasa Ecosystem

To upgrade the Galasa Ecosystem to use a newer version of Galasa, for example version 0.25.0, run the following command:
```
helm upgrade --reuse-values --set galasaVersion=0.25.0 --wait
```
where `galasaVersion` is set to the version that you want to use.

### Troubleshooting

- Check the logs by running the ```kubectl logs``` command. 
- Check the Galasa version number in the sample is correct by running the ```kubectl describe pod <podname>``` command.  If the version number is not the latest one, update the version number in the sample and apply the update.
- If an 'unknown fields' error message is displayed, you can turn off validation by using the  ```--validate=false``` command. 

