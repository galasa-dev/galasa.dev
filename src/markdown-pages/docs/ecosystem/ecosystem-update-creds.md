---
path: "/docs/ecosystem/ecosystem-update-creds"
title: "Updating credentials in an Ecosystem"
---

It is likely that a test will need to pass credentials to the application being tested. For example, as HTTP credentials or as username and password values entered onto a 3270 screen. In a Galasa Ecosystem the credentials store (CREDS), which is hosted in the etcd server, securely provides the credentials (for example, password, username, and personal access token) that are required for a test to run in automation.  

You can set a username, password, or token in the CREDS by using a Visual Studio Code (VS Code) Kubernetes extension or by using the command line. The ability to set these properties means that you can supply test cases with the credentials and tokens that they need to run. To set these credentials you must have permission to access the CREDS pod on a Galasa Ecosystem. You can then use the etcdctl tool to manipulate the etcd server values in a [namespace](../ecosystem/ecosystem-manage-cps). 

The following examples show how you can update the CREDS. In these examples, the CREDS pod is called `creds` and the namespace is `galasa-ecosystem`.


## Logging into the CREDS pod by using the VSCode Kubernetes extension

Complete the following steps to log into the CREDS pod using the VS Code Kubernetes extension.

1. In the VSCode Kubernetes extension, confirm that the tool is pointing at the Kubernetes cluster that hosts your Galasa Ecosystem. If it is not, you can select the cluster by navigating to `Clusters`, right-clicking the cluster you need, and selecting `Set as Current Cluster`.
2. Set your namespace to `galasa-ecosystem` by navigating to `Namespaces`, right-clicking the namespace and selecting `Use Namespace`.
3. Go to your Pods by navigating to `Workloads`>`Pods`.
4. Exec on to the `creds` pod by right-clicking the pod and selecting `Terminal`, or by selecting the `Terminal` icon. A shell of the `creds` pod opens in VSCode.


## Logging into the CREDS pod by using the command line

1. Open a terminal and on the command line, exec into your `creds` pod:
```
kubectl exec -it creds -n galasa-ecosystem -- /bin/sh
```


## Configuring credentials in the CREDS pod

Once you are shelled into your `creds` pod you can configure credentials by using the `etcdctl` command line tool to interact with the etcd server.

First, set the `etcd` version by running the following command: 
```
export ETCDCTL_API=3
```

You can then use the following `etcdctl` commands in your CREDS pod to help you to configure your credentials.


### Retrieve all credentials 

To retrieve all credentials, run the following command:
```
etcdctl get --prefix ""
```

### Retrieve all credentials with a specified prefix

To retrieve all credentials with a specified prefix, use the following example command:
```
etcdctl get --prefix "{myprefix}"
```
where `{myprefix}` is the value that you want the returned credentials to start with.

For example, to view all credentials that start with `secure.credentials.SIMBANK`, run the following command:
```
etcdctl get --prefix "secure.credentials.SIMBANK"
```
The following example shows the returned credentials:
```
/ # etcdctl get --prefix "secure.credentials.SIMBANK"
secure.credentials.SIMBANK.password
SYS1
secure.credentials.SIMBANK.username
IBMUSER
```

### Retrieve a specific credential

To retrieve a specific credential, use the following example command: 
```
etcdctl get {key}
```
where `{key}` is the name of the credential that you want returned 

For example, to retrieve the credential `secure.credentials.SIMBANK.username`, run the following command:

```
etcdctl get --prefix "secure.credentials.SIMBANK.username"
```

The following example shows the returned credential:

```
/ # etcdctl get secure.credentials.SIMBANK.username
secure.credentials.SIMBANK.username
IBMUSER
```

### Create or update a credential

To retrieve a specific credential, use the following example command: 

```
etcdctl put {key} {value}
```

where:<br>
`{key}` is the name of the credential that you want to update and<br>
`{value}` is the value that you want to give to that credential

For example, to update the credential `secure.credentials.SIMBANK.username` with a value of `NEWUSER`, run the following command:

```
etcdctl put secure.credentials.SIMBANK.username NEWUSER
```

The following example shows a successful response:
```
/ # etcdctl put secure.credentials.SIMBANK.username NEWUSER
OK
```


### Delete a credential

To delete a specific credential, use the following example command: 

```
etcdctl del {key}
```

where:
`{key}` is the name of the credential that you want to delete


For example, to delete the credential `secure.credentials.SIMBANK.username`, run the following command:

```
etcdctl del secure.credentials.SIMBANK.username
```

The following example shows a successful response:
```
/ # etcdctl del secure.credentials.SIMBANK.username
1
```

If the credential does not exist, a value of `0` rather than `1` is returned in the response.

### Exit the shell

To exit the shell, simply run:
```
exit
```

Updated credentials are now available for a test to run in automation on a Galasa Ecosystem.