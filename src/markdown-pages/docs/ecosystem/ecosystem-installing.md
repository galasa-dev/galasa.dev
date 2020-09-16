---
path: "/docs/ecosystem/installing"
title: "Installing the Galasa Ecosystem in Docker"
---

The following section explains how to install and configure a Galasa ecosystem on a Docker server by using a Docker operator. Currently the Docker operator only supports the amd64 platform. A s390x (zLinux) implementation is planned for a future release.

The instructions assume a basic understanding of how Docker works.

### Before you begin

To bring up a Galasa ecosystem using Docker, you need access to a virtual machine (VM) with a Docker engine, Docker desktop and an etcd server installed on it. The VM hosts the ecosystem which runs docker containers, inside which are Galasa microservices, including the etcd server which contains the CPS, DSS and CREDs stores. It is possible to install a Docker engine on a local machine for experimentation purposes, but to realise the power of Galasa you need to run the docker engine on a VM.

Typically, a dedicated person, for example the test architect or test lead, is authorized to edit the CPS file. The file can be edited locally by using etcdctl, or by running the commands directly on the VM. Testers typically interact with the etcd server by putting or getting the value of a key. 

The VM requires a minimum of 8GB of memory, 4 VCPUs and 80GB of storage. Docker has a default value of 4GB of memory set, so you need to change this value. In Docker desktop you do this by using the ```Preferences > Resources``` tab.

If the VM or workstation has a firewall running, you might need to open the following ports:-

    2379 - etcd
    5984 - CouchDB
    8080 - API
    8081 - Nexus
    8082 - Jenkins


### Installing a docker engine and an etcd server


1. Install a docker engine 

Instructions to install a Docker engine can be found on the <a href="https://docs.docker.com/engine/install/" target="_blank"> Docker Documentation</a> page. We are not aware of a minimum version of Docker engine the Docker operator requires. 

If you are using a Mac or Windows OS, you need Docker desktop running a "socat" container.

2. Install an etcd server

You can install an etcd server with <a href="https://brew.sh/" target="_blank"> homebrew</a> by running the command ```brew install etcd``` either from the etcdctl interface (etcdctl is a command line tool for interacting with an etcd server) or by logging onto the VM via SSH.  



3. Connect to the etcd server

To connect up to the etcd server you need to set two environment variables by running the following commands:

```
export ETCDCTL_ENDPOINTS={YOUR_HOSTNAME}:2379
export ETCDCTL_API=3
```

The API version environment variable ETCDCTL_API is set to 3 in this example, as this is the latest version and also supports the commands that are used to check and set CPS properties on the etcd server.


### Installing the Galasa ecosystem in a Docker engine

The ecosystem needs to know the hostname or IP address of the VM or workstation on which the  the Docker engine is running. Due to the way Docker works, you cannot use *127.0.0.1* or *localhost*; you need to use the actual workstation or VM hostname or IP address. This information is provided in a *config.yaml* file.  Certain versions of the Galasa ecosystem servers must be provided in the *config.yaml* file.

1. Copy the following YAML to create a *config.yaml* file on your VM or workstation, making a note of the full path of the file:

```
hostname: {hostname}
galasaRegistry: docker.galasa.dev
version: 0.9.0
engineController:
  controllerVersion: 0.10.0
  engineVersion: 0.9.0
```

Change the ```{hostname}``` value to your hostname. Note the two spaces on the last two lines -  they are important in YAML.

2. Deploy the Galasa ecosystem by running the following Docker command:

```
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -v {path}/config.yaml:/config.yaml docker.galasa.dev/galasa-docker-operator-amd64:0.9.0
```
where ```{path}``` is the full pathname to the directory containing your *config.yaml* file.

When the command completes all nine docker containers should be running. 

3. View the active containers

Use the command ```docker ps``` to view the active containers.

This command brings up the  <a href="https://github.com/galasa-dev/docs/ecosystem" target="_blank"> microservices</a> that are required to run a Galasa ecosystem. 

3. Connect to the ecosystem

From your IDE, reconfigure Galasa by editing the bootstrap so that it points at the Galasa ecosystem. 

From the browser, go to ```localhost:8080/bootstrap```. The bootstrap contains the information that Galasa needs to bring up a framework in the Eclispe environment to connect to the ecosystem. 


### Configuring the CPS properties

You can configure the CPS properties by using etcdctl. If you have a large number of properties to configure using etcdctl might be time-consuming. A quicker option in this scenario is to use the Galasa web UI.  

1. Use the Docker command ```docker exec -it galasa.cps /bin /sh```  to log onto the etcd server. 

2. To view existing properties, enter the following command when the Docker operator is running:

```etcdctl get --prefix=true ""```

**Note:** Inserting text inside the quote marks ```""``` returns any properties containing that prefix.

If ```prefix=false``` is set, any properties containing that prefix are hidden.

3. To set properties run the command: ```etcdctl put {KEY} {VALUE}```

The value for ```{KEY}``` is the property name that is returned after running<br>
 ```tcdctl get --prefix=true ""```


### Verifying the installation

The Jenkins server has a *SimBank_IVT* build job that runs a Jenkins pipeline to request the SimBankIVT test run in the Galasa ecosystem. 

1. Go to ```http://{hostname}:8082```, using the username of ```admin``` and password of ```galasaadmin``` (you can change the password). 
2. Run the *SimBankIVT* job - you can follow its progress in the job console. You can also issue the docker command ```docker ps -a``` to see the run container being created. When the run finishes successfully, the Jenkins job is update to report that the test passed.
3. View the output of the automated run by changing the Eclipse preferences for Galasa by setting the bootstrap preference to ```http://{hostname}:8080/bootstrap```.
4.  After applying and closing the preferences, select ```Galasa->Initialise Galasa Framework``` from the Eclipse menu. You should see the Galasa console reporting that all is ok. 
5. Click the Galasa icon on the Eclipse toolbar. Two new Galasa views open; *Galasa Results* and *Galasa Runs*. You can run the Jenkins job again to see the new run in the *Galasa Runs* view.
The *Galasa Results* view contains two RASs; a local RAS and a automation RAS. On the automation branch, expand "All runs" and then expand "Today's runs" to view the automation run from Jenkins. 
6. Double-click the run name to open the results window, which you can use to explore the test result.

You can also submit automation tests from within Eclipse instead of Jenkins; select *Galasa->Submit tests to automation* option from the Eclipse menuto choose the runs that you want to submit.

### Next steps

Run a test which pulls in information from the centralized location rather than locally from your laptop or workstation.  

For example, use the 3270 Manager to connect to your mainframe to drive 3270 screens and log on to a CICS region. If you used a VM, then anyone with access to that VM can run the test using the same information from the centralized location.


### Deploying and running tests in the ecosystem

To deploy your tests to the ecosystem  you must deploy the Maven test bundle and OBR bundle to the Nexus repository. The automation engines can find them by using the CPS properties. 

The tests can then be run in Eclipse by using the automation tab. 
