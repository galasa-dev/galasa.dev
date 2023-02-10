---
path: "/docs/ecosystem/installing/k8s"
title: "Installing the Ecosystem on Kubernetes"
---

The following sections explain how to install a Galasa Ecosystem on a Kubernetes cluster by using Helm and to validate that the ecosystem is installed correctly.

If you want to run scalable, highly available testing for enterprise level workloads, use Helm to install your Galasa Ecosystem in a Kubernetes cluster. Running Galasa in a Kubernetes cluster, rather than in a local JVM, means that you can run many tests in parallel on a resilient and scalable platform, where the clean-up of test resources can be managed, and test results can be centralised and gathered easily. If you want to create a local proof of concept, you might want to first run your Galasa tests within a JVM on your local machine.

To find out more about Kubernetes, see the <a href=https://kubernetes.io/docs/home/ target="_blank"> Kubernetes Documentation</a>.

The <a href=https://github.com/galasa-dev/helm target="_blank"> Galasa Helm repository</a> contains the Galasa Ecosystem Helm chart that is referenced in the following sections.


## Prerequisites

- The Kubernetes command-line tool **kubectl** must be installed on the machine that is used to run the commands and must be configured to point at your Kubernetes cluster. 
- You must have a Kubernetes cluster at version 1.16 or higher. You can check the version number by running the ```kubectl version``` command.  
- <a href=https://helm.sh target="_blank"> Helm</a> must be installed to use the chart. See the <a href=https://helm.sh/docs/ target="_blank"> Helm documentation</a> for installation instructions.

_Note:_ The Galasa Ecosystem chart currently supports only x86-64 systems. It cannot be installed on ARM64-based systems.

## Role-based access control

If role-based access control (RBAC) is active on your Kubernetes cluster, a user with the `galasa-admin` role (or a role with equivalent permissions) is needed to run Helm commands on the cluster. This role allows assigned users to run the Helm install, upgrade, and delete commands to interact with the Helm chart. 

You can assign the `galasa-admin` role to a user by replacing the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml#L39 target="_blank"> placeholder username</a> in the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml target="_blank"> rbac-admin.yaml</a> file with the appropriate username. If multiple users require admin privileges, you can assign the `galasa-admin` role to multiple groups, users, or ServiceAccounts by extending the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml#L36 target="_blank"> subjects</a> list. See the <a href=https://kubernetes.io/docs/reference/access-authn-authz/rbac/ target="_blank"> Using RBAC Authorization</a> documentation for more information.

You also need to create a Galasa service account in the repository's ecosystem directory. The Galasa service account allows the API, Engine Controller, Metrics, and Resource mMnitor to co-ordinate between themselves, and also allows the Engine Controller to create and manage engine pods. You can create the service account by applying the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/templates/rbac.yaml target="_blank"> rbac.yaml</a> file. 

For chart versions `0.23.0` and earlier, you must apply the RBAC file manually by running the following command in the repository's <a href=https://github.com/galasa-dev/helm/tree/main/charts/ecosystem target="_blank"> ecosystem</a> directory:
```
kubectl apply -f \
https://raw.githubusercontent.com/galasa-dev/helm/ecosystem-0.23.0/charts/ecosystem/rbac.yaml
``` 

For chart versions later than `0.23.0`, the RBAC file is applied automatically when installing the ecosystem chart.  

## Installing the Galasa Ecosystem 

Complete the following steps to install the Galasa Ecosystem in a Kubernetes cluster by using Helm: 

1.	Add the Galasa repository by running the following command: 
    ``` 
    helm repo add galasa https://galasa-dev.github.io/helm
    ```
    If the repository exists, run the ```helm repo update``` command to get the latest versions of the packages and then run ```helm search repo galasa``` to see the available charts.<br>
    _Note:_ The Galasa Ecosystem Helm chart deploys three persistent volumes (PVs). If you need to provide a Kubernetes storage class for these PVs, download the  `values.yaml` file and update the `storageClass` value in the file with the name of a valid StorageClass on your cluster.
1. Download the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/values.yaml target="_blank"> values.yaml</a> file and edit the values of the following properties: 
    - Set `galasaVersion` to a version of Galasa that you want to run. 
    - Set `externalHostname` to the DNS hostname or IP address of the Kubernetes node that is used to access the Galasa `NodePort` services.
1.  Run the following command to install the Galasa Ecosystem chart:
    ```
	helm install -f /path/to/values.yaml <release-name> galasa/ecosystem --wait
    ```
    where:<br>
    `/path/to/values.yaml` is the path to where the `values.yaml` file is downloaded and<br>
    `<release-name>` is the name that you gave the ecosystem.<br><br>
    The ```--wait``` flag ensures that the chart installation completes before marking it as `Deployed`. During the installation, the API pod waits for the etcd and RAS pods to initialise while the Engine-Controller, Metrics, and Resource-Monitor pods wait for the API pod to initialise.
1.	View the status of the deployed pods by running `kubectl get pods` in another terminal. The returned results look similar to the following example:
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
When the `helm test` command ends and displays a success message, the Ecosystem is set up correctly and is ready to be used.

## Running Galasa tests

To reconfigure Galasa to point to the Galasa Ecosystem that you created, you need to edit the bootstrap. The bootstrap contains the information that Galasa needs to bring up a framework to connect to an ecosystem. To find the URL of the ecosystem bootstrap, run the following command:
```
kubectl get svc
```
Look for the `api-external` service and the `NodePort` that is associated with port `8080`. For example, the following snippet shows that node port `30960` is associated with port `8080`:
```
test-api-external  NodePort  10.107.160.208  <none>  \
9010:31359/TCP,9011:31422/TCP,8080:30960/TCP  18s
```
Combine the information with the external hostname that you provided to form the bootstrap URL. For example, if the external hostname you provided was `example.com`, the bootstrap URL is `http://example.com:30960/boostrap`. 

In Eclipse, you can edit the bootstrap by selecting *Eclipse > Preferences > Galasa* from the Eclipse menu. Alternatively, you can enter the bootstrap URL in the ```--bootstrap``` option of a `galasctl` command.

You can then deploy your Galasa tests to a Maven repository and set up a test stream. For more information on writing tests, see the <a href=https://galasa.dev/docs/writing-own-tests> Writing your own independent Galasa tests</a> documentation.

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

