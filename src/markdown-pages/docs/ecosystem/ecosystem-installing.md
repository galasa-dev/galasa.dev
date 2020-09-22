---
path: "/docs/ecosystem/installing"
title: "Installing the Galasa Ecosystem on Docker"
---

The following section explains how to install a Galasa ecosystem on a Docker engine by using the <a href="https://github.com/galasa-dev/extensions/tree/master/galasa-extensions-parent/dev.galasa.docker.operator" target="_blank"> Docker operator</a>. Currently the Docker operator only supports the amd64 platform. A s390x (zLinux) implementation is planned for a future release.

The instructions assume a basic understanding of how Docker works.

## Prerequisites

To bring up the Galasa ecosystem by using the Docker operator, you need access to a Linux virtual machine (VM) with Docker engine installed on it. 

The VM requires a minimum of 8GB of memory, 4 VCPUs and 80GB of storage. Docker has a default value of 4GB of memory set, so you need to change this value. In Docker desktop you do this by using the ```Preferences > Resources``` tab.

Instructions on installing a Docker engine can be found on the <a href="https://docs.docker.com/engine/install/" target="_blank"> Docker documentation</a> page. We are not aware of a minimum version of Docker Engine the Docker operator requires. 

You can run Docker commands directly on the VM, or you can install Docker desktop on your local machine and run commands from there. If you are using Docker desktop on a Mac or Windows OS, you need Docker desktop running a "socat" container.

## About the Docker Operator

The Docker operator automatically brings up the the following servers on the VM:

Name   |                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| etcd| Contains the Configuration Property Store (CPS), the Dynamic Status Store (DSS) and the Credentials Store (CREDs)                                             |
| CouchDB| Contains the Result Archive Store (RAS)                                            |
| API| The Galasa API server, including the bootstrap                                            |
| ResMan| The Resource Manager service, handling the clean-up and management of resources in Galasa                                            |
| Engine controller | Responsible for spinning up docker containers to execute individual Galasa automation runs             |
| Metrics server | Indicates the health of the ecosystem to a Prometheus server          |


The following servers are not required by the ecosystem but are automatically deployed by the Docker Operator to improve understanding about how the ecosystem works and to run a *SimbankIVT* test to verify the installation of the ecosystem:

Name   |                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nexus| A Nexus server for deploying Maven artifacts to the ecosystem.                                          |
| Jenkins| A demonstration Jenkins server to show how to run Galasa tests in a pipeline                                           |
| Simplatform| Provides an instance of SimBank so that IVTs and demonstration pipelines can be run.bootstrap                                            |

For more detailed information about these servers, see the [Ecosystem architecture](ecosystem-architecture) documentation.

If the VM has a firewall running, you might need to open the following ports:

2379 - etcd <br>
5984 - CouchDB<br>
8080 - API <br>
8081 - Nexus <br>
8082 - Jenkins <br>


## Installing the Galasa ecosystem on the Docker engine

The ecosystem needs to know the hostname or IP address of the VM on which the Docker engine is running. Due to the way Docker works, you cannot use *localhost* or *127.0.0.1*; you must use the actual VM hostname or IP address. This information is provided in a *config.yaml* file. 

1. Copy the following YAML to create a *config.yaml* file on your VM, making a note of the full path of the file:

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

This command brings up the  <a href="https://github.com/galasa-dev/docs/ecosystem" target="_blank"> microservices</a> that are required to run a Galasa ecosystem. When the command completes, nine docker containers should be running. 

3. View the active containers by running the ```docker ps``` command.

4. Connect to the ecosystem

The bootstrap contains the information that Galasa needs to bring up a framework in the Eclispe environment to connect to the ecosystem. From your IDE, reconfigure Galasa to point to the Galasa ecosystem by editing the bootstrap.

In Eclipse you can edit the bootstrap by completing the following steps:

i.  Select *Eclispe > Preferences > Galasa* <br>
ii. Update  **Bootstrap URI** to point to ```http://{hostname}:8080/bootstrap``` <br>
iii. Press **Apply**   <br>


## Verifying the installation

The Jenkins server that was automatically installed by the Docker operator, hosts a *SimBank_IVT* build job that runs a Jenkins pipeline to request the *SimBankIVT* test run in the Galasa ecosystem. 

1. Go to ```http://{hostname}:8082```, using the username of ```admin``` and password of ```galasaadmin``` (you can change the password). 
2. Run *SimBankIVT*  - you can follow its progress in the job console. Run the Docker command ```docker ps -a``` to see the run container being created. When the run finishes successfully, the Jenkins job is updated to report that the test passed.
3. Ensure that the bootstrap is set to ```http://{hostname}:8080/bootstrap``` and then select *Galasa > Initialise Galasa Framework* from the Eclipse menu. The Galasa console reporting runs successfully. 
4. Click the *Galasa* icon on the Eclipse toolbar. Two new Galasa views open; *Galasa Results* and *Galasa Runs*. 
5. Run the Jenkins job again to see the new run in the *Galasa Runs* view. The *Galasa Results* view contains two RASs; a local RAS and a automation RAS. 
6. On the automation branch, expand **All runs** and then expand **Today's runs** to view the automation run from Jenkins. 
7. Double-click the run name to open the results window, which you can use to explore the test result.

Alternatively, you can submit automation tests from within Eclipse instead of Jenkins; select *Galasa->Submit tests to automation* option from the Eclipse menu to choose the runs that you want to submit.


### Notes - not for review
From the browser, go to ```localhost:8080/bootstrap```. 
### Connecting to the etcd server

Connect to the etcd server by setting the two following environment variables in the terminal profile:

```
export ETCDCTL_ENDPOINTS={YOUR_HOSTNAME}:2379
export ETCDCTL_API=3
```
The VM hosts the ecosystem which runs Docker containers. Inside the containers are the Galasa microservices, including the etcd server which hosts the CPS, DSS and CREDs stores. For more information about the architecture of the Galasa ecosystem, see <a href="https://galasa.dev/docs/ecosystem/architecture" target="_blank"> Ecosystem architecture</a>

Typically, a dedicated person, for example the test architect or test lead, is authorized to edit the CPS file. The file can be edited locally by using etcdctl, or by running the commands directly on the VM. Testers typically interact with the etcd server by putting or getting the value of a key. 

## Next steps

Run a test which pulls in information from the centralized location rather than locally from your laptop or workstation.  

For example, use the 3270 Manager to connect to your mainframe to drive 3270 screens and log on to a CICS region. If you used a VM, then anyone with access to that VM can run the test using the same information from the centralized location.


## Deploying and running tests in the ecosystem

To deploy your tests to the ecosystem  you must deploy the Maven test bundle and OBR bundle to the Nexus repository. The automation engines can find them by using the CPS properties. 

The tests can then be run in Eclipse by using the automation tab. 




