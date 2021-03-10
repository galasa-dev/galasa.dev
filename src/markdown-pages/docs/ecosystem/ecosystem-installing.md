---
path: "/docs/ecosystem/installing"
title: "Installing the Galasa Ecosystem on Docker"
---

The following section explains how to install a Galasa ecosystem on a Docker engine by using the <a href="https://github.com/galasa-dev/extensions/tree/master/galasa-extensions-parent/dev.galasa.docker.operator" target="_blank"> Docker operator</a>. Currently the Docker operator only supports the amd64 platform. A s390x (zLinux) implementation is planned for a future release.

## Prerequisites

To bring up the Galasa ecosystem by using the Docker operator, you need access to a Linux virtual machine (VM) with Docker engine installed on it. 

The VM requires 4 VCPUs, 80GB of storage and a recommended minimum of 8GB of memory. The size of the VM provided is directly related to the number of tests that can be run in parallel. It is possible to bring up the ecosystem with 4GB of memory, but this will support a maximum of two tests running in parallel. Docker has a default value of 4GB of memory set, so you need to change this value which you can do by using Docker Desktop. 

Instructions on installing a Docker engine can be found on the <a href="https://docs.docker.com/engine/install/" target="_blank"> Docker documentation</a> page. We are not aware of a minimum version of Docker engine the Docker operator requires. 


## About the Docker Operator

The Docker operator automatically brings up the following servers on the VM. For more detailed information about these servers, see the [Ecosystem architecture](/docs/ecosystem/architecture) documentation.

*Note:* If the VM has a firewall running, you might need to open the ports that are listed in the following tables.  

The following servers are required for the Galasa ecosystem:  


| Name      | Description | Port
| ----------- | ----------- |----------- |
| etcd| Contains the Configuration Property Store (CPS), the Dynamic Status Store (DSS) and the Credentials Store (CREDs)       | 2379 |
| CouchDB| Contains the Result Archive Store (RAS)   |  5984  |
| API server | The Galasa API server, including the bootstrap     |  8080    |
| Resource Management | The resource management service, handling the clean-up and management of resources in Galasa     | NA |
| Engine controller | Responsible for spinning up docker containers to execute individual Galasa automation runs    | NA |
| Metrics server | Indicates the health of the ecosystem to a Prometheus server   | NA |

The following servers are not required by the ecosystem but are automatically deployed by the Docker operator to improve understanding about how the ecosystem works and to run a *SimbankIVT* test to verify the installation of the ecosystem:

| Name      | Description | Port
| ----------- | ----------- |----------- |
| Nexus| A Nexus server for deploying Maven artifacts to the ecosystem  | 8081 |
| Jenkins| A demonstration Jenkins server to show how to run Galasa tests in a pipeline  | 8082 |
| Simplatform| Provides an instance of SimBank so that IVTs and demonstration pipelines can be run    |2023, 2027, 2080, 2040 |


## Installing the Galasa ecosystem on the Docker engine

The ecosystem needs to know the hostname or IP address of the VM on which the Docker engine is running. Due to the way Docker works, you cannot use ```localhost``` or  ```127.0.0.1``` - you must use the actual VM hostname or IP address. This information is provided in a *config.yaml* file. 

1. Copy the following YAML to create a *config.yaml* file on your VM, making a note of the full path of the file:

```
hostname: {hostname}
galasaRegistry: docker.galasa.dev
version: 0.15.0
engineController:
  controllerVersion: 0.15.0
  engineVersion: 0.15.0
```

Change the ```{hostname}``` value to your hostname. Note the two spaces on the last two lines -  they are important in YAML.

If you opened any ports, check that the port numbers are correct in the *config.yaml* file. 

2. Deploy the Galasa ecosystem by running the following Docker command on the VM:

```
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -v {path}/config.yaml:/config.yaml docker.galasa.dev/galasa-docker-operator-amd64:0.9.0
```
where ```{path}``` is the full pathname to the directory containing your *config.yaml* file.

This command brings up the [microservices](/docs/ecosystem/architecture) that are required to run a Galasa ecosystem. When the command completes, nine docker containers should be running. The command might take a little time to complete. 

3. View the active containers by running the ```docker ps``` command.

The Galasa ecosystem is now successfully installed on the VM.

### Connecting to the Galasa ecosystem

The bootstrap contains the information that Galasa needs to bring up a framework in the Eclipse environment to connect to the ecosystem. From your IDE, edit the bootstrap to reconfigure Galasa to point to the Galasa ecosystem that you created. 

In Eclipse, you can edit the bootstrap by completing the following steps:

1.  Select *Eclipse > Preferences > Galasa* 
2.  Update **Bootstrap URI** to point to ```http://{hostname}:8080/bootstrap``` 
3.  Apply and close the preferences   


## Verifying the installation

The Jenkins server that was automatically installed by the Docker operator hosts a *SimBank_IVT* build job. This job runs a Jenkins pipeline, which requests the *SimBankIVT* test to run in the Galasa ecosystem.

1. Go to ```http://{hostname}:8082```, using the username of ```admin``` and password of ```galasaadmin```. The *SimBankIVT* test is displayed in the Jenkins dashboard. 
2. Click the *SimBankIVT* link and select **Build Now** to run the test. If you are quick, you can follow its progress in the job console by running the Docker command ```docker ps -a``` to see the run container being created. When the run finishes successfully, the Jenkins job is updated to report that the test passed. 
3. View the output of the automated run in Eclipse by selecting *Galasa > Initialise Galasa Framework* from the Eclipse menu. The Galasa console reporting runs successfully. 
4. Click the *Galasa* icon on the Eclipse toolbar. Two new Galasa views open; *Galasa Results* and *Galasa Runs*. 
5. Run the Jenkins job again to see the new run in the *Galasa Runs* view. The *Galasa Results* view contains two RASs; a local RAS and an automation RAS. 
6. On the automation branch, expand **All runs** and then expand **Today's runs** to view the automation run from Jenkins. 
7. Double-click the run name to open the results window, which you can use to view the test results.

Alternatively, you can submit automation tests from within Eclipse instead of Jenkins; select the *Galasa > Submit tests to automation* option from the Eclipse menu to choose the runs that you want to submit.

Now that the ecosystem is successfully created on the VM, anyone with access to that VM can run tests that use the centralized configuration settings and can view the test logs and results. Tests can be run headlessly, without the need to keep individual workstations active.  
