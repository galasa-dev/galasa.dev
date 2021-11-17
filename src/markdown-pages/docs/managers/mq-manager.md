---
path: "/docs/managers/mq-manager"
title: "MQ Manager"
---

**Alpha**

## Overview
This Manager provides the ability to connect a test to an existing IBM MQ queue manager, enabling one or more messages to be written to and read from an existing IBM MQ queue. <br><br> 


## Annotations

The following annotations are available with the MQ Manager
<details>
<summary>MQ Manager</summary>

| Annotation: |MQ Manager |
| --------------------------------------- | :------------------------------------- |
| Name: | @QueueManager |
| Description: | The <code>@QueueManager</code> annotation represents the name of the IBM MQ queue manager |
| Attribute: `name` |  The name of the IBM MQ queue manager |
| Attribute: `host` |  The host name of the system on which the IBM MQ queue manager is running |
| Attribute: `port` |  The port number to connect to the IBM MQ queue manager |
| Attribute: `channel` |  The name of the channel used to move messages  |
| Attribute: `manager` |  The Galasa implementation of the IBM MQ queue manager |
| Syntax: | @QueueManager<br> public IMessageQueueManager qmgr;<br> |
| Notes: | The <code>IMessageQueueManager</code> interface enables connection to the IBM MQ queue manager.  |
</details>

<details>
<summary>MQ Queue</summary>

| Annotation: |MQ Queue |
| --------------------------------------- | :------------------------------------- |
| Name: | @Queue |
| Description: | The <code>@Queue</code> annotation represents the name of the IBM MQ queue |
| Attribute: `name` |  The name of the IBM MQ queue |
| Attribute: `qmgr` |  The name of the IBM MQ queue manager which controls access to the IBM MQ queue |
| Attribute: `archive` |  Archive log data sets. Valid values are `true` and `false`. |
| Attribute: `manager` |  The Galasa implementation of the IBM MQ queue manager  |
| Syntax: | @Queue<br> public IMessageQueue queue;<br> |
| Notes: | The <code>IMessageQueue</code> interface enables the test to put the provided messages onto the IBM MQ queue and retrieve messages from the IBM MQ queue. |
</details>



## Code snippets

Use the following code snippets to help you get started with the MQ Manager. Use the MQ Manager to connect a test to an existing IBM MQ queue manager and queue. Galasa does not provision new IBM MQ queue managers or queues. 
 
<details><summary>Create an instance of an IBM MQ Manager</summary>

The following snippet shows the code that is required to create an instance of an IBM MQ Manager:

```java
@QueueManager
public IMessageQueueManager qmgr;
```
</details>

<details><summary>Instantiate an IBM MQ queue</summary>

The following snippet shows the code that is required to instantiate an IBM MQ queue:

```java
@QueueManager()
public IMessageQueueManager qmgr;

@Queue(archive = "true", name = "GALASA.INPUT.QUEUE")
public IMessageQueue queue;
```

You can just as simply instantiate multiple IBM MQ queues:

```java
@QueueManager()
public IMessageQueueManager qmgr;

@Queue(archive = "true", name = "GALASA.INPUT.QUEUE")
public IMessageQueue queue;
	
@Queue(archive = "false", name = "GALASA.INPUT.QUEUE2")
public IMessageQueue queue2;
	
@Queue(tag = "NEWQUEUE")
public IMessageQueue queue3;
```
</details>

<details><summary>Put messages to an IBM MQ queue</summary>

The following snippets show the code required to create a text or binary message to put on an IBM MQ queue:

```java
TextMessage tm = qmgr.createTextMessage(testData);
queue.sendMessage(tm);
```
```java
TextMessage tm = qmgr.createTextMessage(testData);
queue.sendMessage(tm,tm,tm,tm,tm,tm,tm,tm);
```
```java
byte[] input = {41,01,33,76};
BytesMessage m = qmgr.createBytesMessage(input);
queue.sendMessage(m);
```

</details>

<details><summary>Read messages from an IBM MQ queue</summary>

The following snippet shows the code required to read a message from an existing IBM MQ queue:

```java
Message m = queue.getMessage();
String response = m.getBody(String.class);
```
</details>

<details><summary>Clear messages from an IBM MQ queue</summary>

The following snippet shows the code required to clear messages from an IBM MQ queue:

```java
queue.clearQueue();
```
</details>

## Configuration Properties

The following are properties used to configure the MQ Manager.
 
<details>
<summary>Queue manager channel CPS Property</summary>

| Property: | Queue manager channel CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].channel |
| Description: | The channel for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].channel=DEV.APP.SVRCONN</code> |

</details>
 
<details>
<summary>Queue manager host CPS Property</summary>

| Property: | Queue manager host CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].host |
| Description: | The host for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].host=127.0.0.1</code> |

</details>
 
<details>
<summary>Queue manager name CPS Property</summary>

| Property: | Queue manager name CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].name |
| Description: | The queue manager name for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].name=QM1</code> |

</details>

<details>
<summary>Queue manager port CPS Property</summary>

| Property: | Queue manager port CPS Property |
| --------------------------------------- | :------------------------------------- |
| Name: | mq.server.[tag].port |
| Description: | The queue manager port for the specified tag |
| Required:  | Yes |
| Default value: | None |
| Valid values: |  |
| Examples: | <code>mq.server.[tag].port=1414</code> |

</details>
