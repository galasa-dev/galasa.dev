---
path: "/docs/managers/docker-manager"
title: "Docker Manager"
---

**Release**

## Overview
This Manager enables tests to run Docker Containers on a Docker Engine provided by the Galasa infrastructure, making it easy to write tests that consume container-based services. The test does not need to worry about where the Docker infrastructure is, its credentials, or its capacity as this is all handled by the Manager. <br><br> The Docker Manager can be used by other Managers as a base for their own services.  For example, the JMeter Manager can run a JMeter service inside a Docker Container.  Using the Docker Manager in this way means that the test or administration team  do not need to create dedicated JMeter resources. <br><br>  Containers that are provided by the Docker Manager can be used to either drive  workload for the application under test, or to receive workload from the application.  The Docker Manager can also be used to monitor the test or to provide a security context like  OpenLDAP. Docker Containers provide a powerful tool in helping test applications in an integrated environment. <br><br> The Docker Manager supports Galasa Shared Environments.  Shared Environments provide  the ability to create a test environment that can be shared across multiple test runs  so you don't have to provision a test environment for each test.

## Limitations
The Docker Manager supports only AMD64 platforms. It is planned to expand the capability to S390x. <br><br> The Docker Manager currently supports only a single Docker Engine.  It is planned to allow multiple Docker Engines to be configured.


## Annotations

The following annotations are available with the Docker Manager
<details>
<summary>Docker Container</summary>
| Annotation: | Docker Container |
| --------------------------------------- | :------------------------------------- |
| Name: | @DockerContainer |
| Description: | The <code>@DockerContainer</code> annotation requests the Docker Manager to allocate a slot and start a container  on the infrastructure Docker Engines. The test can request as many containers as required within  the limits set by the Docker Manager configuration. |
| Attribute: `dockerContainerTag` |  The <code>dockerContainerTag</code> is used to identify the Docker Container to other Managers or Shared Environments.  If a test is using multiple  Docker Containers, each separate Docker Container must have a unique tag. If two Docker Containers use the same tag, they will refer to the  same Docker Container. |
| Attribute: `image` |  The <code>image</code> attribute provides the Docker Image that is used to create the Docker Container.  The image name must not  include the Docker Registry as this is provided in the CPS.   If using a public official image from DockerHub,  then the  image name must be prefixed with <code>library/</code>, for example <code>library/httpd:latest</code>, the Docker Manager will not default to the library namespace like the Docker commands do. |
| Attribute: `start` |  The <code>start</code> attribute indicates whether the Docker Container should be started automatically. If the  test needs to perform some work before the container is started, then <code>start=false</code> should be used, after which  <code>IDockerContainer.start()</code> can be called to start the container. |
| Attribute: `dockerEngineTag` |  The <code>dockerEngineTag</code> will be used in the future so that a container can be run on a specific Docker Engine type. You would not normally need to provide a Docker Engine tag. |
| Syntax: | <code>@DockerContainer(image="library/httpd:latest")<br> public IDockerContainer httpdContainer;<br> @DockerContainer(image="privateimage", start=false)<br> public IDockerContainer container1;<br> </code> |
| Notes: | The <code>IDockerContainer</code> interface gives the test access to the IPv4/6 address and the exposed port numbers of the Docker Container.  The interface also enables the test to execute commands and retrieve the log and transfer files that are sent to  and from the container.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/docker/DockerContainer.html" target="_blank">DockerContainer</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/docker/IDockerContainer.html" target="_blank">IDockerContainer</a> to find out more. |
</details>



<details>
<summary>Code snippets</summary>

Use the following code snippets to help you get started with the Docker Manager.
 
### Create a Docker Container

The following snippet shows the minimum code that is required to request a Docker Container in a Galasa test:

```
@Dockercontainer(image="library/httpd:latest", tag="http", start=true)
public IDockercontainer container1;
```

The code creates a Docker Container with an Apache HTTP Server running on port 80. Although this does not provide much, it does give a known target HTTP Server that you can start and stop in order to test how your application responds in those circumstances.  By accessing the *container1* field, you can find the IP address and port that was used for the container. 


At the end of the test, the Docker Manager automatically stops and discards the Docker Container. If for some reason the test was not able to do this, the Docker Manager resource management routines perform the same clean up after the Galasa Ecosystem discovers the test has disappeared.

There is no limit in Galasa on how many Docker Containers can be used within a single test. The only limit is the number of Docker Containers that can be started in the Galasa Ecosystem. This limit is set by the Galasa Administrator and is typically set to the maximum number of containers that can be supported by the Docker Server or Swarm.  If there are not enough slots available for an automated run, the run is put back on the queue in *waiting* state to retry. Local test runs fail if there are not enough container slots available.

### Obtain the IP address and port of an exposed container port

Find the IP address and port by using the following code which provisions and starts an Apache HTTP server on port 80:

```
@Dockercontainer(image="library/httpd:latest")
public IDockercontainer httpcontainer;
...
InetSocketAddress port80 = httpContainer.getFirstSocketForExposedPort(80);
```


### Stop and Start a container

Stop and start your Apache HTTP Server to test how your application responds by using the following code:

```
@Dockercontainer(image="library/httpd:latest")
public IDockercontainer httpcontainer;
...
httpContainer.stop();

httpContainer.start();
```

### Run a command in the container

Use the following code to execute a command within the Docker Container and return the resulting output:
```
@Dockercontainer(image="library/httpd:latest")
public IDockercontainer httpcontainer;
...
IDockerExec exec = httpContainer.exec("ls","-l","/var/log");
exec.waitForExec();
String output = exec.getCurrentOutput();
```

### Retrieve the log of the container

Use the following code to retrieve the container log:

```
@Dockercontainer(image="library/httpd:latest")
public IDockercontainer httpcontainer;
...
String log = httpContainer.getStdOut();
```


</details>

## Configuration Properties

The following are properties used to configure the Docker Manager.
 
<details>
<summary>Docker Engine CPS Property</summary>
| Property: | Docker Engine CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.engine.[engineId].hostname |
| Description: | Provides location of the Docker Engine |
| Required:  | Yes - the hostname of the Docker Engine must be provided |
| Default value: | None |
| Valid values: | A valid DNS name or IPv4/6 address |
| Examples: | <code>docker.engine.[engineId].hostname=docker.example.company.org<br> docker.engine.[engineId].hostname=192.168.2.3 </code> |

Currently, the Docker Manager supports only a single Docker Engine although it is planned to allow multiple Engines to be configured.<br> To allow local runs to access the local Docker Engine, you must add this property to the CPS and enable the TCP port of your local Docker Engine.<br> If the Docker Engine is not using the default TCP port, you must provide the *docker.engine.port* configuration property in the CPS.
</details>
 
<details>
<summary>Docker Engine Port CPS Property</summary>
| Property: | Docker Engine Port CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.engine.port |
| Description: | Provides TCP Port of the Docker Engine |
| Required:  | No |
| Default value: | 2375 |
| Valid values: | Any valid TCP Port number |
| Examples: | <code>docker.engine.port=2375</code> |

The Docker Manager communicates with the Docker Engine via TCP. The Docker Engine needs to be  configured to open the TCP port, which is usually 2375. If the port is not the default one, then this property needs to be provided in the CPS.
</details>
 
<details>
<summary>Default Docker Registries CPS Property</summary>
| Property: | Default Docker Registries CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.default.registries |
| Description: | An ordered list of Docker Registries IDs to search for Images requested by Galasa Tests |
| Required:  | No |
| Default value: | If not provided, DOCKERHUB id will be added |
| Valid values: | A comma separated list of ID.  See CPS property <code>docker.registry.ID</code> |
| Examples: | <code>docker.default.registries=LOCAL,DOCKERHUB</code> |

To decouple Docker Registries from the Galasa test, this property allows the Docker Manager to search for images. The main reason being if the customer Docker Registry moves, only this property needs  to change, instead of having to change the source code of lots of tests. <br> <br> The registries are searched in order when looking for an image. When the image is located, the search stops.  <br> <br> If this property is provided in the CPS, the Docker Hub registry is not automatically appended. If it is required, then the DOCKERHUB id must be included.
</details>
 
<details>
<summary>Docker Registry Credentials CPS Property</summary>
| Property: | Docker Registry Credentials CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.registry.[ID.]credentials |
| Description: | Provides the credentials of a Docker Registry that is used by the Docker Manager |
| Required:  | Yes if the registry requires authentication. |
| Default value: | DOCKER |
| Valid values: | A valid credentials ID. |
| Examples: | <code>docker.registry.LOCAL.credentials=CREDSID</code> |

If the <code>docker.registry.ID.credentials</code> CPS property is missing, the Docker Manager will attempt to use the credentials ID that is provided in <code>docker.registry.credentials</code>, if that is missing, then the default credentials  ID of <code>DOCKER</code> will be used.
</details>
 
<details>
<summary>Docker Registry URL CPS Property</summary>
| Property: | Docker Registry URL CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | docker.registry.ID.url |
| Description: | Provides the URL of a Docker Registry that is used by the Docker Manager. |
| Required:  | Yes if the Registry ID is used in the CPS Property <code>docker.default.registries</code>. However,  the Docker Manager will default DOCKERHUB to <code>https://registry.hub.docker.com</code> if not provided. |
| Default value: | None, except for DOCKERHUB where the default is <code>https://registry.hub.docker.com</code> |
| Valid values: | A valid URL |
| Examples: | <code>docker.registry.LOCAL.url=https://registry.local.com</code> |

If the Docker Registry requires credentials for authentication, then the id for the credentials must be provided using the CPS property  <code>docker.registry.ID.credentials</code> or <code>docker.registry.credentials</code>
</details>
