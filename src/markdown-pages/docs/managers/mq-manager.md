---
path: "/docs/managers/mq-manager"
title: "MQ Manager"
---

**Alpha**

## Overview
This Manager provides the ability to connect to an existing Queue Manager, enabling applications to read and write one or more messages to and from a queue. <br><br> 


## Annotations

The following annotations are available with the CICS TS CECI Manager
<details>
<summary>MQ Manager</summary>

| Annotation: |MQ Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | @QueueManager |
| Description: | The <code>@QueueManager</code> annotation represents the name of the MQ Queue Manager |
| Syntax: | @QueueManager<br> public IMessageQueueManager qmgr;<br> |
| Notes: | The <code>IMessageQueueManager</code> interface enables connection to the MQ Queue Manager.  |
</details>

<details>
<summary>MQ Queue</summary>

| Annotation: |MQ Queue |
| --------------------------------------- | :------------------------------------- |
| Name: | @Queue |
| Description: | The <code>@Queue</code> annotation represents the name of the MQ Queue |
| Syntax: | @Queue<br> public IMessageQueue queue;<br> |
| Notes: | The <code>IMessageQueue</code> interface enables the test to put the provided messages onto the queue and retrieve messages from the queue. |
</details>



## Code snippets

Use the following code snippets to help you get started with the MQ Manager.
 
<details><summary>Create a MQ Manager</summary>

The following snippet shows the code that is required to create an instance of a MQ Manager:

```java
@QueueManager
public IMessageQueueManager qmgr;
```
</details>

<details><summary>Instantiate a MQ Queue</summary>

The following snippet shows the code that is required to instantiate a MQ Queue:

```java
@Queue(archive = "true", name = "GALASA.INPUT.QUEUE")
public IMessageQueue queue;
```

You can just as simply instantiate multiple MQ Queues:

```java
@Queue(archive = "true", name = "GALASA.INPUT.QUEUE")
public IMessageQueue queue;
	
@Queue(archive = "false", name = "GALASA.INPUT.QUEUE2")
public IMessageQueue queue2;
	
@Queue(tag = "NEWQUEUE")
public IMessageQueue queue3;
```
</details>

<details><summary>Put messages to a queue</summary>

The following snippet shows the code required to put a message on a queue:

```java
TextMessage tm = qmgr.createTextMessage(testData);
queue.sendMessage(tm);
```
</details>

<details><summary>Read messages from a queue</summary>

The following snippet shows the code required to read a message from a queue:

```java
Message m = queue.getMessage();
String response = m.getBody(String.class);
```
</details>

<details><summary>Clear messages from a queue</summary>

The following snippet shows the code required to clear messages from a queue:

```java
queue.clearQueue();
Message m = queue.getMessageNoWait();
```
</details>

## Configuration Properties

The following are properties used to configure the MQ Manager.
 
<details>
<summary>Queue Manager channel CPS Property</summary>

| Property: | Queue Manager channel CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].channel |
| Description: | The channel for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].channel=DEV.APP.SVRCONN</code> |

</details>
 
<details>
<summary>Queue Manager host CPS Property</summary>

| Property: | Queue Manager host CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].host |
| Description: | The host for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].host=127.0.0.1</code> |

</details>
 
<details>
<summary>Queue Manager name CPS Property</summary>

| Property: | Queue Manager name CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].name |
| Description: | The queue manager name for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].name=QM1</code> |

</details>

<details>
<summary>Queue Manager port CPS Property</summary>

| Property: | Queue Manager port CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].port |
| Description: | The queue manager port for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].port=1414</code> |

</details>
