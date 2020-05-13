---
path: "/docs/managers/http-client-manager"
title: "HTTP Client Manager"
---

**Release**

## Overview
This Manager provides a variety of common HTTP client                     operations you can use in your tests. For example, you                     can use this Manager in a test where you want to                     determine if a particular web page contains (or does not                     contain) some specific content. This is exactly how it is                     used in the <a href=                     "https://github.com/galasa-dev/managers/blob/master/galasa-managers-parent/galasa-managers-cloud-parent/dev.galasa.docker.manager.ivt/src/main/java/dev/galasa/docker/manager/ivt/DockerManagerIVT.java"                     target="_blank" rel="noopener noreferrer"> Docker Manager                     IVT</a> (Installation Verification Test). As well as                     providing client functionality to people who write tests,                     it may also be used internally by other Managres to                     enrich their range of offered services.                      This Manager supports outbound HTTP calls, JSON requests,                     HTTP file transfer and Web Services calls. SSL is                     supported.                     You can view the <a href=                     "https://javadoc.galasa.dev/dev/galasa/http/package-summary.html"                     target="_blank" rel="noopener noreferrer">Javadoc                     documentation for the Manager here</a>. <br>                     <br>




## Code snippets

Use the following code snippets to help you get started with the HTTP Client Manager.
 
<details><summary>Instantiate an HTTP Client</summary>

This code instantiates an HTTP Client.

```java
@HttpClient
public IHttpClient client;
```

You can just as simply instantiate multiple HTTP Clients.

```java
@HttpClient
public IHttpClient client1;

@HttpClient
public IHttpClient client2;
```

</details>

<details><summary>Set the target URI for an HTTP Client</summary>

This code sets an HTTP Client's target URI.

```java
@HttpClient
public IHttpClient client;

client.setURI("http://www.google.com");
```

You would typically use this call prior to, say, an outbound HTTP call
to retrieve the contents of a web page.

</details>

<details><summary>Make an outbound HTTP call</summary>

This code makes a get request to the given path.

```java
String pageContent = client.get("/images",false);
```

Use this call after a prior call to `setURI` to establish the URI endpoint of your request.
The second parameter - a boolean - causes the function to retry as required if set to `true`.

</details>

<details><summary>Use streams to download a file</summary>
The following code is an example of one way to download a file using streams.

```java
@HttpClient
public IHttpClient client;

File f = new File("/tmp/dev.galasa_0.7.0.jar");

client.setURI(new URI("https://p2.galasa.dev"));
CloseableHttpResponse response = client.getFile("/plugins/dev.galasa_0.7.0.jar");
InputStream in = response.getEntity().getContent();
OutputStream out = new FileOutputStream(f);
int count;
byte data[] = new byte[2048];
while((count = in.read(data)) != -1) {
   out.write(data, 0, count);
}
out.flush();
out.close();
```

The snippet begins by declaring `client` as before and `f`, an instance of `File`. The client's URI is set and its `getFile` method called to return `response` - an instance of `CloseableHttpResponse`.

The two streams `in` and `out` are declared and initialized and the data transferred from `in` to `out` in 2048 byte chunks, after which the output stream is flushed and then closed.

</details>


