---
path: "/docs/managers/docker-manager"
title: "Docker Manager"
---

## Overview
The Docker Manager provides a test with the ability to run Docker Containers on a Docker Server  that is provided by the Galasa infrastructure.   The test does not need to worry about where the Docker infrastructure is, its credentials, or its capacity as this is all handled by the Manager. <br><br> The Docker Manager can be used by other Managers as a base for their own services.  For example, the JMeter Manager can run a JMeter service inside a Docker container.  Using the Docker Manager in this way means that the test or administration team  do not need to create dedicated JMeter resources. <br><br>  Containers that are provided by the Docker Manager can be used to either drive  workload for the application under test, or to receive workload from the application.  The Docker Manager can also be used to monitor the test or to provide a security context like  OpenLDAP. Docker Containers provide a powerful tool in helping test application in an integrated environment. <br><br> The Docker Manager supports Galasa Shared Environments.  Shared Environments provide  the ability to create a test environment that can be shared across multiple test runs  so you don't have to provision a test environment for each test.

## Limitations
The Docker Manager supports only AMD64 platforms. It is planned to expand the capability to S390x. <br><br> The Docker Manager currently supports only a single Docker Server.  It is planned to allow multiple Servers to be configured.


## Annotations

The following annotations are available with the Docker Manager
 
| Annotation: | Docker Container |
| --------------------------------------- | :------------------------------------- |
| Name: | $name |
| Description: | The DockerContainer annotation will request the Docker Manager allocate a slot and start a container  on the infrastructure Docker Engines.  The test can request as many containers as required and  can be supported simultaneously by the Docker Manager. |
| Syntax: | <code>@DockerContainer(image="library/httpd:latest")<br> public IDockerContainer httpdContainer;<br> @DockerContainer(image="privateimage", start=false)<br> public IDockerContainer container1;<br> </code> |
| Notes: | The <code>IDockerContainer</code> interface gives the test access to the IPv4/6 address and the exposed port numbers.  The interface also enables the test to execute commands and retrieve the log and transfer files that are sent to  and from the Container.<br><br> See [DockerContainer](https://javadoc-snapshot.galasa.dev/dev/galasa/docker/DockerContainer.html) and [IDockerContainer](https://javadoc-snapshot.galasa.dev/dev/galasa/docker/IDockerContainer.html) to find out more. |

## Code Snippets

Use the following code snippets to help you get started with the Docker Manager.
 
### Create a Docker container

The following snippet shows the minimum code that is required to request a Docker container in a Galasa test:

```
@Dockercontainer(image="httpd:latest", tag="http", start=true)
public IDockercontainer container1;
```

The code creates a Docker Container with an Apache HTTP Server running on it in port 80. Although this does not provide much, it does give a known target HTTP Server that you can start and stop in order to test how your application responds in those circumstances.  By accessing the *container1* field, you can find the IP address and port that was used for the Container. <how do you access the field?>

At the end of the test, the Docker Manager automatically stops and discards the Docker container. If for some reason the test was not able to do this, the Docker Manager Resource Management routines perform the same clean up after the Galasa Ecosystem discovers the test has disappeared. <might need a bit more info on the last sentence? I am not that clear on it.>

There's no limit in Galasa on how many Docker containers can be used within a single test. The only limit is the number of Docker containers that can be started in the Ecosystem(?). This limit is set by the Galasa Administrator and is typically set to the maximum number of containers that can be supported by the Docker Server or Swarm.  If there are not enough "slots" (?) available for an automated run, the run is put back on the queue in "waiting" state to retry.  Local test runs fail if there are not enough container "slots" available.


### Obtain the IP address and port of an exposed container port

Find the IP address and port by using the following code which provisions and starts an Apache HTTP server on port 80:

```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
InetSocketAddress port80 = httpcontainer.getFirstSocketForExposedPort(80);
```


### Stop and Start a container

Stop and start your Apache HTTP Server to test how your application responds by using the following code:

```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
httpcontainer.stop();

httpcontainer.start();
```

### Run a command in the container

Use the following code to ... (?)
```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
IDockerExec exec = httpcontainer.exec("ls","-l","/var/log");
exec.waitForExec();
String output = exec.getCurrentOutput();
```

### Retrieve the log of the container

Use the following code to get the container log for ?

```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
String log = httpcontainer.getStdOut();
```
 
### Create a Docker container

The following snippet shows the minimum code that is required to request a Docker container in a Galasa test:

```
@Dockercontainer(image="httpd:latest", tag="http", start=true)
public IDockercontainer container1;
```

The code creates a Docker Container with an Apache HTTP Server running on it in port 80. Although this does not provide much, it does give a known target HTTP Server that you can start and stop in order to test how your application responds in those circumstances.  By accessing the *container1* field, you can find the IP address and port that was used for the Container. <how do you access the field?>

At the end of the test, the Docker Manager automatically stops and discards the Docker container. If for some reason the test was not able to do this, the Docker Manager Resource Management routines perform the same clean up after the Galasa Ecosystem discovers the test has disappeared. <might need a bit more info on the last sentence? I am not that clear on it.>

There's no limit in Galasa on how many Docker containers can be used within a single test. The only limit is the number of Docker containers that can be started in the Ecosystem(?). This limit is set by the Galasa Administrator and is typically set to the maximum number of containers that can be supported by the Docker Server or Swarm.  If there are not enough "slots" (?) available for an automated run, the run is put back on the queue in "waiting" state to retry.  Local test runs fail if there are not enough container "slots" available.


### Obtain the IP address and port of an exposed container port

Find the IP address and port by using the following code which provisions and starts an Apache HTTP server on port 80:

```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
InetSocketAddress port80 = httpcontainer.getFirstSocketForExposedPort(80);
```


### Stop and Start a container

Stop and start your Apache HTTP Server to test how your application responds by using the following code:

```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
httpcontainer.stop();

httpcontainer.start();
```

### Run a command in the container

Use the following code to ... (?)
```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
IDockerExec exec = httpcontainer.exec("ls","-l","/var/log");
exec.waitForExec();
String output = exec.getCurrentOutput();
```

### Retrieve the log of the container

Use the following code to get the container log for ?

```
@Dockercontainer(image="httpd:latest")
public IDockercontainer httpcontainer;
...
String log = httpcontainer.getStdOut();
```
## Configuration Properties

The following are properties used to configure the Docker Manager.
 
| Property: | Default Docker Registries CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.default.registries |
| Description: | An ordered list of Docker Registries to search for Images requested by Galasa Tests |
| Required:  | No |
| Default value: | If not provided, Docker Hub will be added |
| Valid values: | A comma separated list of URLs. |
| Examples: | <code>docker.default.registries=`https://docker.galasa.dev`<br> docker.default.registries=`https://docker.galasa.dev`,`https://docker.galasa.dev`</code> |

In order to decouple Docker Registries from the Galasa Test, this property allows for the Docker Manager to search for images.  The main reason being if the customer docker registry moves, only this property needs  to change, instead of having to change the source code of lots of tests. <br> <br> The registries are searched in order when looking for an image.  When the image is located, the search stops.  <br> <br> If this property is provided in the CPS, the Docker Hub registry is not automatically appended. If it is required, then the Docker Hub URL must be included.
 
| Property: | Docker Engine Server CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.engine.server |
| Description: | Provides location of the Docker server |
| Required:  | Yes - the hostname of the Docker Server must be provided |
| Default value: | None |
| Valid values: | A valid DNS name or IPv4/6 address |
| Examples: | <code>docker.engine.server=docker.example.company.org<br> docker.engine.server=192.168.2.3 </code> |

Currently, the Docker Manager supports only a single Docker Server although it is planned to allow multiple Servers to be configured.<br> To allow local runs to access the local Docker Engine Server, you must add this property to the CPS and enable the TCP port of your local Docker Engine.<br> If the Docker Engine is not using the default TCP port, you must provide the *docker.engine.port* configuration property in the CPS.
 
| Property: | Docker Engine Server Port CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.engine.server.port |
| Description: | Provides TCP Port of the Docker server |
| Required:  | No |
| Default value: | 2375 |
| Valid values: | Any valid TCP Port number |
| Examples: | <code>docker.engine.server.port=2375</code> |

The Docker Manager will communicate with the Docker Engine Server via TCP.   The Docker Engine Server will need to be  configured to open the TCP port, which will normally be 2375.  If the port is not the default one, then this property will need to be provided in the CPS.
