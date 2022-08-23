---
path: "/docs/managers/manager-name"
title: "manager-name Manager"
---

[Required]
[Opening paragraph for the level the Manager is at (ie Alpha, Beta or Release level) and where to find the Javadoc and the IVT for that Manager. Use the following example, editing the level and the two urls so they are correct for your Manager. Use the tagging as shown and include the <br> tag for formatting.]

Example:

This Manager is at Release level. You can view the <a href="https://javadoc.galasa.dev/dev/galasa/docker/package-summary.html">Javadoc documentation for the Manager here</a>. The <a href="https://github.com/galasa-dev/managers/tree/main/galasa-managers-parent/galasa-managers-cloud-parent/dev.galasa.docker.manager.ivt">Docker Manager IVT</a> is available in the Manager repository in GitHub.<br>


[Leave the following links in place and unchanged. These links take you directly to the relevant section further down the page. Don't change the order or tagging.]

[Overview](#overview)<br>
[Configuring](#configuring)<br>
[Provided annotations](#annotations)<br>
[Code snippets](#codesnippets)<br>


# <a name="overview"></a>Overview

[Required]
[A high level overview of what the Manager does]

Example:

This Manager enables tests to run Docker Containers on a Docker Engine that is provided by the Galasa infrastructure, making it easy to write tests that consume container-based services. The test does not need to worry about where the Docker infrastructure is, its credentials, or its capacity as this is all handled by the Manager. 

## <a name="usage"></a>Using the Docker Manager 

[Required]
[Include here information about why you might want to use the Docker Manager, any other Managers that it will often work with to complete a common task]

Example:

The Docker Manager can be used by other Managers as a base for their own services.  For example, the JMeter Manager can run a JMeter service inside a Docker Container.  Using the Docker Manager in this way means that the test or administration team  do not need to create dedicated JMeter resources.

Containers that are provided by the Docker Manager can be used to either drive workload for the application under test, or to receive workload from the application. The Docker Manager can also be used to monitor the test or to provide a security context like  OpenLDAP. Docker Containers provide a powerful tool in helping test applications in an integrated environment.

## <a name="features"></a>Manager features

[Optional]
[Short summary of any key Manager features]

Example:

The Docker Manager supports Galasa Shared Environments.  Shared Environments provide  the ability to create a test environment that can be shared across multiple test runs  so you don't have to provision a test environment for each test.

## <a name="limitations"></a>Limitations

[Optional]
[Short summary of any key Manager limitations]

Example:

The Docker Manager supports only AMD64 platforms. It is planned to expand the capability to S390x. <br><br> The Docker Manager currently supports only a single Docker Engine.  It is planned to allow multiple Docker Engines to be configured. 

# <a name="configuring"></a>Configuring

[Required]

[Give the user an idea on how to get started with the Manager eg any steps / thought processes that would be a good way of understanding how to incorporate the Manager into the test and start using it.

This section must include:
- CPS Properties needed to configure the manager
- The Maven/Gradle dependency on how to include the Manager in a test]

## <a name="cpsproperties"></a>Configuration Properties

[Required]
[Put any CPS in a collapsible table by using the tagging and naming conventions shown in the following example. ]

The following are properties that are used to configure the Docker Manager.
 
 
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

## <a name="dependencies"></a>Including the Manager in a test

[Required]
[The Maven and Gradle dependency on how to include the Manager in a test.]

## <a name="annotations"></a>Annotations provided by the Manager

[Required]
[Put any annotations in a collapsible table by using the tagging shown in the following examples.]

The following annotations are available with the Docker Manager:

<details>
<summary>@DockerContainer</summary>

The <code>@DockerContainer</code> annotation requests the Docker Manager to allocate a slot and start a container  on the infrastructure Docker Engines. The test can request as many containers as required within  the limits set by the Docker Manager configuration. 

| Attribute: | Docker Container |
| --------------------------------------- | :------------------------------------- |
| `dockerContainerTag` |  The <code>dockerContainerTag</code> is used to identify the Docker Container to other Managers or Shared Environments.  If a test is using multiple  Docker Containers, each separate Docker Container must have a unique tag. If two Docker Containers use the same tag, they will refer to the  same Docker Container. |
| `image` |  The <code>image</code> attribute provides the Docker Image that is used to create the Docker Container.  The image name must not  include the Docker Registry as this is provided in the CPS.   If using a public official image from DockerHub,  then the  image name must be prefixed with <code>library/</code>, for example <code>library/httpd:latest</code>, the Docker Manager will not default to the library namespace like the Docker commands do. |
| `start` |  The <code>start</code> attribute indicates whether the Docker Container should be started automatically. If the  test needs to perform some work before the container is started, then <code>start=false</code> should be used, after which  <code>IDockerContainer.start()</code> can be called to start the container. |
| `dockerEngineTag` |  The <code>dockerEngineTag</code> will be used in the future so that a container can be run on a specific Docker Engine type. You would not normally need to provide a Docker Engine tag. |

### Syntax: 
<code>@DockerContainer(image="library/httpd:latest")<br> public IDockerContainer httpdContainer;<br> @DockerContainer(image="privateimage", start=false)<br> public IDockerContainer container1;<br> </code> 

### Notes:
The <code>IDockerContainer</code> interface gives the test access to the IPv4/6 address and the exposed port numbers of the Docker Container.  The interface also enables the test to execute commands and retrieve the log and transfer files that are sent to  and from the container.<br><br> See <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/docker/DockerContainer.html" target="_blank">DockerContainer</a> and <a href="https://javadoc-snapshot.galasa.dev/dev/galasa/docker/IDockerContainer.html" target="_blank">IDockerContainer</a> Javadoc to find out more. 

</details>



# <a name="codesnippets"></a>Code snippets

[Required]
[Put any code snippets in a collapsible sections by using the tagging shown in the following example.]

Use the following code snippets to help you complete common tasks.

<details><summary>Create a Docker Container</summary>

The following snippet shows the minimum code that is required to request a Docker Container in a Galasa test:

```
@Dockercontainer(image="library/httpd:latest", tag="http", start=true)
public IDockercontainer container1;
```

The code creates a Docker Container with an Apache HTTP Server running on port 80. Although this does not provide much, it does give a known target HTTP Server that you can start and stop in order to test how your application responds in those circumstances.  By accessing the *container1* field, you can find the IP address and port that was used for the container. 


At the end of the test, the Docker Manager automatically stops and discards the Docker Container. If for some reason the test was not able to do this, the Docker Manager resource management routines perform the same clean up after the Galasa Ecosystem discovers the test has disappeared.

There is no limit in Galasa on how many Docker Containers can be used within a single test. The only limit is the number of Docker Containers that can be started in the Galasa Ecosystem. This limit is set by the Galasa Administrator and is typically set to the maximum number of containers that can be supported by the Docker Server or Swarm.  If there are not enough slots available for an automated run, the run is put back on the queue in *waiting* state to retry. Local test runs fail if there are not enough container slots available.
</details>

