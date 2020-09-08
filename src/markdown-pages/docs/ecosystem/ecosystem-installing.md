---
path: "/docs/ecosystem/installing"
title: "Installing the Galasa Ecosystem in Docker"
---

The following section explains how to bring up a Galasa Ecosystem on a Docker server by using a Docker Operator. Currently the Docker Operator only supports the amd64 platform. A s390x (zLinux) implementation is planned for a future release.

The instructions assume a basic understanding of how Docker works.

## Before you begin

To deploy a Galasa ecosystem using the Docker Operator, you need a Docker Engine, preferably on a Linux server, but it can be run on a laptop. If you are using a Mac or Windows OS, you  need Docker Desktop running a "socat" container.

The ecosystem requires a minimum of 4GB of memory to run everything, although 4GB is very tight, allowing a maximum of two parallel running tests.

The VM requires a minimum of 8GB of memory, 4 VCPUs and 80GB of storage. Docker has a default value of 4GB of RAM set, so you need to change this value. In Docker desktop you do this by using the Preferences > Resources tab.

We are not aware of a minimum version of Docker Engine the Docker Operator requires.

If the server or workstation has a firewall running, you might need to open the following ports:-

    2379 - etcd
    5984 - couchdb
    8080 - API
    8081 - Nexus
    8082 - Jenkins

### Installing a Galasa ecosystem in a Docker Engine

Due to the way the various servers communicate, the ecosystem needs to know the hostname or IP address of the server or workstation the Docker Engine is running on. Due to the way Docker works, you cannot use 127.0.0.1 or localhost, you need to use the actual workstation or server hostname or IP address. This is provided in a config.yaml file.

The Docker Operator is  distributed from the 0.10.0-SNAPSHOT, an unreleased version of Galasa, Therefore, certain versions of the Galasa ecosystem servers must be provided in the config.yaml file. Copy the following YAML and create a config.yaml file on your server or workstation, making a note of the full path of the file:

```
hostname: {hostname}
galasaRegistry: docker.galasa.dev
version: 0.9.0
engineController:
  controllerVersion: 0.10.0-SNAPSHOT
  engineVersion: 0.9.0
```

Change the {hostname} value to your hostname. Note the two spaces on the last two lines -  they are important in YAML.

To deploy the Galasa ecosystem, issue the following Docker command:

```
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -v {path}/config.yaml:/config.yaml docker.galasa.dev/galasa-docker-operator-amd64:0.9.0
```
where {path} is the full pathname to the directory containing your config.yaml file.

When the command is complete all 9 docker containers should be running. Use the command ```docker ps``` to list the active containers.


### Verifying the installation


### First steps
A good place to start would be to use the 3270 manager to connect to your mainframe and drive a few screens, maybe log on to a CICS region.  to complete this you will need to update the CPS or overrides properties to point to your mainframe. <Is this the same as the server address mentioned above?>


JVM inside a docker container, cloud hosted

Coming soon:
A Kubernetes GalasaEcosystem customer resource which can be used by an operator to bring up an entire Galasa Ecosystem in minutes, ready for enterprise ready workloads
Any information that needs to be shared between teams / people either before / after / both the ecosystem is configured. ( The bootstrap is all that should be needed).
Steps to set up the ecosystem in your environment
  Have a look and if you need any more guidance just let us know

at some point you will need a VM and then you need to install docker on it. 
If you do this then everyone can use it to do the work
You don’t need a vm initially to install as per the cmd in the alpha documentation
That doc will get you to a point where you have configured simbank and you are running locally to play around
Localhost:8082 will bring you your Jenkins server and you can bring it up in eclipse and that sort of thing
You need the vm to go into the cloud
You can play with configuring ur properties using etcdctl – gives u an interface to the properties but there might be 500 of them so that is a faff doing on cmd line – gregs web ui will sort that out a bit. 
Or you can do docker exec -it galasa.cps /bin /sh
And you log onto the server with properties that you want to change nad use etcdctl cmd
Or can do locally in vscode 
Etcdctl put keyname value

You can then go to eclipse nad run a job via automation tab
To deploy your tests to the ecosystem,  you need to deploy the maven test bundle to the nexus repository, as well as an OBR bundle.
With those 2 bundles in the repo, the automation engines will be able to find them with a few CPS properties
