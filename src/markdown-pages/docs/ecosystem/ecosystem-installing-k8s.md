---
path: "/docs/ecosystem/installing/k8s"
title: "Installing an Ecosystem using Helm"
---

If you want to run scalable, highly available testing for enterprise level workloads, you need to install your Galasa Ecosystem in a Kubernetes cluster. Running Galasa in a Kubernetes cluster means that you can run many tests in parallel on a resilient and scalable platform, where the clean-up of test resources can be managed, and test results can be centralised and gathered easily. 

Galasa provides a Galasa Ecosystem Helm chart to install a Galasa Ecosystem. You can install the chart into a Kubernetes cluster or minikube. However, note that minikube is not suitable for production purposes because it provides a single Kubernetes node and therefore does not scale well. Use minikube only for development and testing purposes.

The following sections explain how to install a Galasa Ecosystem on a Kubernetes cluster (and on minikube) by using Helm and validate that the Ecosystem is installed correctly. 

The <a href=https://github.com/galasa-dev/helm target="_blank"> Galasa Helm repository</a> contains the Galasa Ecosystem Helm chart that is referenced in the following sections.

_Note:_ The Galasa Ecosystem Helm chart currently supports only x86-64 systems. It cannot be installed on ARM64-based systems.


## Prerequisites

- <a href=https://helm.sh target="_blank"> Helm</a> must be installed to use the chart. See the <a href=https://helm.sh/docs/ target="_blank"> Helm documentation</a> for installation instructions.
- The Kubernetes command-line tool *kubectl* must be installed on the machine that is used to run the commands and must be configured to point at your Kubernetes cluster. To find out more about Kubernetes, see the <a href=https://kubernetes.io/docs/home/ target="_blank"> Kubernetes Documentation</a>.
- You must have a Kubernetes cluster at version 1.16 or higher. You can check the version number by running the ```kubectl version``` command.  
- If you want to install the chart into minikube, ensure you have minikube installed and that it is running with `minikube status`. If minikube is not running, start it by running `minikube start`. Once minikube is running, follow the instructions in the following sections to install the Galasa Ecosystem Helm chart.



## Role-based access control

If role-based access control (RBAC) is active on your Kubernetes cluster, a user with the `galasa-admin` role (or a role with equivalent permissions) is needed to run Helm commands on the cluster. The `galasa-admin` role allows assigned users to run the Helm install, upgrade, and delete commands to interact with the Helm chart. 

You can assign the `galasa-admin` role to a user by replacing the placeholder username in the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml#L42 target="_blank"> rbac-admin.yaml </a> file with a username that corresponds to a user with access to your cluster. If multiple users require admin privileges, you can assign the `galasa-admin` role to multiple groups, users, or service accounts by extending the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/rbac-admin.yaml#L39 target="_blank"> subjects</a> list. See the <a href=https://kubernetes.io/docs/reference/access-authn-authz/rbac/ target="_blank"> Using RBAC Authorization</a> Kubernetes documentation for more information.

You also need a Galasa service account. The Galasa service account allows the API, Engine Controller, Metrics, and Resource Monitor to co-ordinate between themselves, and allows the Engine Controller to create and manage engine pods. 

For chart versions later than `0.23.0`, the Galasa service account is automatically created, if one does not already exist, when installing the Galasa Ecosystem Helm chart.  The Galasa service account enables the API, Engine Controller, Metrics, and Resource Monitor to co-ordinate, while allowing the Engine Controller to create and manage engine pods.

For chart versions `0.23.0` and earlier, you must create the Galasa service account manually by running the following command in the repository's <a href=https://github.com/galasa-dev/helm/tree/main/charts/ecosystem target="_blank"> ecosystem</a> directory:

```
kubectl apply -f \
https://raw.githubusercontent.com/galasa-dev/helm/ecosystem-0.23.0/charts/ecosystem/rbac.yaml
``` 


## Installing a Galasa Ecosystem 

Complete the following steps to install a Galasa Ecosystem by using Helm:

### Adding the Galasa repository

1.	Add or update the Galasa repository.<br>
    - If the repository does not exist, add the repository by running the following command: 
        ``` 
        helm repo add galasa https://galasa-dev.github.io/helm
        ```
    - If the repository exists, run the ```helm repo update``` command to get the latest versions of the packages and then run ```helm search repo galasa``` to see the available charts.<br>
    _Note:_ The Galasa Ecosystem Helm chart deploys three persistent volumes (PVs). If you need to provide a Kubernetes storage class for these PVs, download the  <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/values.yaml#L43 target="_blank"> values.yaml</a> file and update the `storageClass` value in the file with the name of a valid storage class on your cluster. If you are deploying to minikube, you can optionally use the standard storage class that is created for you by minikube, but this is not required.
1. Download the <a href=https://github.com/galasa-dev/helm/blob/main/charts/ecosystem/values.yaml target="_blank"> values.yaml</a> file if you have not done so already, and edit the values of the following properties: 
    - Set `galasaVersion` to the version of Galasa that you want to run. (See the [Releases](../../highlights) documentation for released versions). To ensure that each pod in the Ecosystem is running at the same level, do not use `latest` as the Galasa version.
    - Set `externalHostname` to the DNS hostname or IP address of the Kubernetes node that is used to access the Galasa NodePort services. If you are deploying to minikube, the cluster's IP address can be retrieved by running `minikube ip`.

After updating the `galasaVersion` and `externalHostname` values, complete the following instructions to set up Ingress for your Ecosystem. 

### <a name="configuring-ingress"></a>Configuring Ingress

By default, the Galasa Ecosystem Helm chart enables Ingress to reach services that are running within a Kubernetes cluster. To learn more about Ingress, see the <a href=https://kubernetes.io/docs/concepts/services-networking/ingress/ target="_blank"> Kubernetes Documentation</a>.

*Note:* If you are deploying to minikube and are using Ingress to expose services, ensure the NGINX Ingress controller is enabled by running the `minikube addons enable ingress` command.

Assuming that your Ingress controller is set up on your Kubernetes cluster, configure the use of Ingress in your Ecosystem by completing the following updates to the values that are listed under the `ingress` section within your `values.yaml` file:

1. Replace the `ingressClassName` value with the name of the IngressClass that is configured in your cluster. By default, `nginx` is used.
1. If you are using HTTPS, add a `tls` configuration within the `ingress` section, specifying the `hosts` list and a `secretName` value corresponding to the name of the Kubernetes Secret that contains your TLS private key and certificate. See the <a href=https://kubernetes.io/docs/concepts/services-networking/ingress/#tls target="_blank"> Kubernetes Documentation</a> for information on how to set up TLS.

After updating the values under the `ingress` section of your `values.yaml` file, complete the following instructions to configure Dex in your Ecosystem.

### Configuring Dex

**Note: The ecosystem chart's use of Dex is still under development and is subject to change.**

In a future release, [Dex](https://dexidp.io) will be used to authenticate users attempting to interact with a Galasa Ecosystem.

To configure Dex in your Ecosystem, complete the following steps to update your `values.yaml` file:

1. Replace the hostname in your `issuer` value with the same hostname given in `externalHostname` and set the URI scheme to either `http` or `https`. For example:

    ```yaml
    issuer: http://<your-external-hostname>/dex
    ```

2. Under the `staticClients` value, replace the example hostname given in the `redirectURIs` list with the value you provided in the `externalHostname`, and set the URI scheme to either `http` or `https`. For example:

    ```yaml
    staticClients:
    - id: galasa-webui
      redirectURIs:
      - 'http://<your-external-hostname>/api/auth/callback'
      name: 'Galasa Ecosystem Web UI'
      secret: example-webui-client-secret
    ```
3. If you want to supply a client secret for the Galasa Web UI by using a Kubernetes Secret, replace the `secret` key in the `staticClients` section with `secretEnv` and supply the name of your Secret as a value within the `envFrom` section. For example, if you have a Secret called `my-webui-client-credentials` with a key called `WEBUI_CLIENT_SECRET` and a value representing a client secret, provide the following values:

    ```yaml
    dex:
      envFrom:
        - secretRef:
          name: my-webui-client-credentials

      # Other Dex-related values...

      config:
        # Other Dex configuration values...

        staticClients:
        - id: galasa-webui
          redirectURIs:
          - 'http://<your-external-hostname>/auth/callback'
          name: 'Galasa Ecosystem Web UI'
          secretEnv: WEBUI_CLIENT_SECRET
    ```

4. Optional. Update the `expiry` section to configure the expiry of JSON Web Tokens (JWTs) and refresh tokens issued by Dex. By default, JWTs expire 24 hours after being issued and refresh tokens remain valid unless they have not been used for one year. See the Dex documentation on [ID tokens](https://dexidp.io/docs/id-tokens) for information and available expiry settings.

You can now configure Dex to authenticate via a connector to authenticate with an upstream identity provider, for example, GitHub, Microsoft, or an LDAP server. For a full list of supported connectors, refer to the [Dex documentation](https://dexidp.io/docs/connectors). The following instructions explain how to configure Dex to authenticate through GitHub.


### Configuring authentication

Complete the following steps to configure Dex to authenticate through GitHub:


1. Register an OAuth application in [GitHub](https://github.com/settings/applications/new), ensuring the callback URL of the application is set to your Dex `issuer` value, followed by `/callback`. For example, if your `issuer` value is `https://prod-ecosystem.galasa.dev/dex`, then your callback URL is `https://prod-ecosystem.galasa.dev/dex/callback`.

2. Add a GitHub connector to your Dex configuration, providing the name of your GitHub organisation and any teams that you require users to be part of to be able to use your Ecosystem as follows:

    ```yaml
    dex:
      config:
        # Other Dex configuration values...

        connectors:
        - type: github
          id: github
          name: GitHub
          config:
            clientID: $GITHUB_CLIENT_ID
            clientSecret: $GITHUB_CLIENT_SECRET
            redirectURI: <your-dex-issuer-url>/callback
            orgs:
            - name: my-org
              teams:
              - my-team
    ```
    where `$GITHUB_CLIENT_ID` and `$GITHUB_CLIENT_SECRET` correspond to the registered OAuth application's client ID and secret. Ensure that the `redirectURI` value is the same value that you provided when setting up your GitHub OAuth application in step 1.

    If you want to pull the client ID and secret values of your OAuth application from a Kubernetes Secret, create a Secret by running the following `kubectl` command, ensuring that the Secret's keys match those given in the GitHub connector's `clientID` and `clientSecret` values without the leading `$` (i.e. `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as shown in the following example):

    ```bash
    kubectl create secret generic my-github-oauth-app-credentials \
    --from-literal=GITHUB_CLIENT_ID="myclientid" \
    --from-literal=GITHUB_CLIENT_SECRET="myclientsecret"
    ```

    When your Kubernetes Secret is created, supply the name of the Secret by using the `envFrom` value in your `values.yaml` file to mount the Secret as shown in the following example:

    ```yaml
    dex:
      envFrom:
        - secretRef:
          name: my-github-oauth-app-credentials

      config:
        # Other Dex configuration values...

        connectors:
        - type: github
          id: github
          name: GitHub
          config:
            clientID: $GITHUB_CLIENT_ID
            clientSecret: $GITHUB_CLIENT_SECRET
            redirectURI: <your-dex-issuer-url>/callback
            orgs:
            - name: my-org
              teams:
              - my-team
    ```

By default, the Galasa Ecosystem Helm chart creates a Kubernetes Secret containing configuration details for Dex. If you want to apply your own Dex configuration as a Secret, your Dex configuration must be provided in a `config.yaml` key within the Secret, and the value of the `config.yaml` key must be a valid Dex configuration.

For more information on configuring Dex, see the [Dex documentation](https://dexidp.io/docs).

## Installing the chart

After configuring your `values.yaml` file, complete the following steps to install the Galasa Ecosystem Helm chart:

1.  Install the Galasa Ecosystem chart by running the following command:
    ```console
	helm install -f /path/to/values.yaml <release-name> galasa/ecosystem --wait
    ```
    where:<br>
    - `/path/to/values.yaml` is the path to where the `values.yaml` file is downloaded and<br>
    - `<release-name>` is the name that you want to give the Ecosystem.<br><br>
    The ```--wait``` flag ensures that the chart installation completes before marking it as `Deployed`. During the installation, the API pod waits for the etcd and RAS pods to initialise while the Engine Controller, Metrics, and Resource Monitor pods wait for the API pod to initialise.
1.	View the status of the deployed pods by running `kubectl get pods` in another terminal. The returned results should look similar to the following example:
    ```console
    NAME                                      READY   STATUS     RESTARTS      AGE
    test-api-7945f959dd-v8tbs                 1/1     Running    0             65s
    test-engine-controller-56fb476f45-msj4x   1/1     Running    0             65s
    test-etcd-0                               1/1     Running    0             65s
    test-metrics-5fd9f687b6-rwcww             1/1     Running    0             65s
    test-ras-0                                1/1     Running    0             65s
    test-resource-monitor-778c647995-x75z9    1/1     Running    0             65s
    ```


## <a name="verifying-your-galasa-ecosystem-installation"></a>Verifying the installation

After the `helm install` command completes with a successful deployment message, run the following command to check that the Ecosystem can be accessed externally to Kubernetes so that a simple test engine can be run:
```console
helm test <release-name>
```

where:

<release-name> is the name that you gave the Ecosystem during installation

When the `helm test` command ends and displays a success message, the Ecosystem is set up correctly and is ready to be used.


## Accessing services

### Using Ingress

When using Ingress, the URL of the Ecosystem bootstrap will be your external hostname, followed by `/api/bootstrap`.

For example, if the external hostname that you provided was `example.com` and you provided values for using TLS, the bootstrap URL would be `https://example.com/api/bootstrap`. This is the URL that you would enter into a galasactl command's `--bootstrap` option to interact with your Ecosystem.

If you have enabled Ingress and are deploying to minikube, add an entry to your `/etc/hosts` file, ensuring the IP address matches the output of `minikube ip`. For example:

```console
192.168.49.2 example.com
```


## Running Galasa tests

To reconfigure Galasa to point to the Galasa Ecosystem that you created, you need to edit the bootstrap. The bootstrap contains the information that Galasa needs to bring up a framework to connect to an Ecosystem. To find the URL of the Ecosystem bootstrap, run the following command:
```
kubectl get svc
```
Look for the `api-external` service and the `NodePort` that is associated with port `8080`. For example, the following snippet shows that node port `30960` is associated with port `8080`:
```
test-api-external  NodePort  10.107.160.208  <none>  \
9010:31359/TCP,9011:31422/TCP,8080:30960/TCP  18s
```
Combine the information with the external hostname that you provided to form the bootstrap URL. For example, if the external hostname you provided was `example.com`, the bootstrap URL is `http://example.com:30960/boostrap`. 

You can then deploy your Galasa tests to a Maven repository and set up a test stream. For more information on writing tests, see the <a href=https://galasa.dev/docs/writing-own-tests> Writing your own independent Galasa tests</a> documentation.

## Upgrading the Galasa Ecosystem

To upgrade the Galasa Ecosystem to use a newer version of Galasa, for example version 0.31.0, run the following command:


On Mac or Unix:

```console
helm upgrade <release-name> galasa/ecosystem --reuse-values \
--set galasaVersion=0.31.0 --wait
```

On Windows (Powershell):

```console
helm upgrade <release-name> galasa/ecosystem --reuse-values `
--set galasaVersion=0.31.0 --wait
```

where:<br>
- `galasaVersion` is set to the version that you want to use and<br>
- `<release-name>` is the name that you gave to the Ecosystem during installation


### Development

To install the latest development version of the Galasa Ecosystem Helm chart, clone the <a href=https://github.com/galasa-dev/helm target="_blank"> Galasa Helm repository</a> and update the following values in your [values.yaml](charts/ecosystem/values.yaml) file:

1. Set the `galasaVersion` value to `main`
2. Set the `galasaRegistry` value to `harbor.galasa.dev/galasadev`
3. Set the `externalHostname` value to the DNS hostname or IP address of the Kubernetes node that will be used to access the Galasa NodePort services.

If you are deploying to minikube, the cluster's IP address can be retrieved by running `minikube ip`.

Follow the installation instructions in the [Configuring Ingress](#configuring-ingress) section to update the rest of your `values.yaml` file, including values to configure Ingress and Dex.

After updating your `values.yaml` file, run the following command, providing the path to the <a href=https://github.com/galasa-dev/helm/tree/main/charts/ecosystem target="_blank"> ecosystem</a> directory in the helm repository, for example, `~/helm/charts/ecosystem`.

```console
helm install <release-name> /path/to/helm/charts/ecosystem --wait
```

When the `helm install` command completes with a successful deployment message, follow the installation instructions that are provided in the [Verifying the installation](#verifying-your-galasa-ecosystem-installation) section to test the deployed Ecosystem using `helm test` and determine the bootstrap URL.

### Troubleshooting

- Check the logs by running the ```kubectl logs``` command. 
- Check that the Galasa version number in the sample is correct by running the ```kubectl describe pod <podname>``` command.  If the version number is not the latest one, update the version number in the sample and apply the update.
- If an 'unknown fields' error message is displayed, you can turn off validation by using the  ```--validate=false``` command. 

