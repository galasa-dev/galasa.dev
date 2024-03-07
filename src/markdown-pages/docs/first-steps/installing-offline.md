---
path: "/docs/first-steps/installing-offline"
title: "Installing the Galasa plug-in offline"
---

The Galasa _isolated.zip_ file is available from the <a href="https://resources.galasa.dev" target="_blank">https://resources.galasa.dev/</a> site and can be downloaded and extracted to a directory of your choice. The zip file contains three directories (galasactl, maven, and javadoc), an `isolated.tar` file and a `docs.jar` file. 

The `galasactl` directory contains the binaries that are required to run the Galasa command line interface tool (Galasa CLI). The `maven` directory contains dependencies that are required for building Galasa tests. The `javadoc` directory contains the Javadoc API documentation for the Galasa Managers.

The `isolated.tar` file is an optional Docker image that hosts all the artifacts. You might want to use the Docker image if you want to host Galasa on an internal server that can be accessed by other users. If you want to host Galasa on your local machine only, you do not need to use the Docker image. 

The `docs.jar` file enables you to run the Galasa website locally on your machine or on an internal server. Instructions on how to do this are available in the `README.txt` that is provided in the Galasa zip file. 

## Getting started

The Galasa plug-in is accompanied by Galasa SimBank - a demonstration application - which sits on top of a very small middleware layer called SimPlatform (you may see its name in some console messages, but you will otherwise not need to interact with SimPlatform).

<!-- Later, you are likely to want to enhance your test capabilities and exploit Galasa's ability to integrate with automated CI/CD pipelines and a Kubernetes or equivalent container orchestration environment. Other similar but more complex scenarios are also possible, and may be required if your situation demands it. -->

This section describes using the Galasa command line tool (galasactl) to install the Galasa plug-in - together with SimPlatform/SimBank - on your local machine and preparing it to run an initial set of provided tests against a simulated mainframe application.


## Unpacking the zip file

Extract the contents of the zip file into a directory of your choice.

If you are using the zipped distribution hosted in Docker, ensure that you have the appropriate privileges to run Docker commands on the server on which you are hosting the Galasa artifacts and complete the following steps to load and run the Docker image: 

Note: The example uses port `8080` but you can use a different port.

1. Within the directory that contains the Docker image (`isolated.tar`), run the following command:
```
docker load -i isolated.tar
``` 

The following confirmation message is received: _Loaded image: icr.io/galasadev/galasa-distribution:main_.

2. Run the container by using the following command: 
```
docker run -d -p 8080:80 --name galasa icr.io/galasadev/galasa-distribution:main
```

3. Go to `http:\\localhost:8080` to view the running container. 



## <a name="installoffline"></a>Configuring the Galasa CLI for offline use

On Mac or Unix:

1. Find out the architecture of your machine by typing the command `uname -m` into your terminal.

1. Re-name the appropriate binary of the Galasa CLI for your machine architecture from inside the `galasactl` directory of the zipped distribution to `galasactl`. 

1. Add it to your PATH to enable you to run CLI commands from anywhere on your file system without having to specify the absolute path. To set the path permanently, you need add the Galasa CLI path to your shell's initialization file. For example, if you downloaded the `galasactl` executable to a folder called `~/tools` in your home directory, you need to add `~/tools` to the list of directories that your shell searches through when you enter a command. You can do this by adding the line `export PATH=$PATH:$HOME/tools` to your shell’s initialization file (for example `~/.bashrc` or `~/.zshrc`).

1. Set execute permission on the binary by running the `chmod +x galasactl` command in the directory containing `galasactl`. If you are using a Mac, you can set permission to open the Galasa CLI tool by running the `xattr -dr com.apple.quarantine galasactl` command in the directory containing `galasactl`.

You can now run the Galasa CLI too from any directory in your file system without having to specify the absolute path.

## Configuring your Galasa home to run the sample tests

1. Check to see if you have a `.galasa` folder in your user home directory. On Windows, the user home directory resembles: `C:\Users\<username>`, on MacOS or Linux, entering `cd ~` in a terminal takes you to your user home directory, whatever it has been configured to be. Note that any file or folder beginning with a `.` is a hidden folder, so you might need to change the settings on your operating system to show hidden files. If there isn't a `.galasa` folder in your home directory, create it with `galasactl local init`.
1. Edit a file called `overrides.properties` in your `.galasa` folder so that it contains the following configuration properties. Configuration properties held in this file are used by Galasa tests at runtime. You can change the value of the properties that are set in this file to enable you to run tests against different configurations without changing the test code. The following example configuration properties enable the provided Galasa SimBank tests to run on your machine:
   ```properties
   zos.dse.tag.SIMBANK.imageid=SIMBANK
   zos.dse.tag.SIMBANK.clusterid=SIMBANK

   simbank.dse.instance.name=SIMBANK
   simbank.instance.SIMBANK.zos.image=SIMBANK

   zos.image.SIMBANK.ipv4.hostname=127.0.0.1
   zos.image.SIMBANK.telnet.port=2023
   zos.image.SIMBANK.webnet.port=2080
   zos.image.SIMBANK.telnet.tls=false
   zos.image.SIMBANK.credentials=SIMBANK

   zosmf.image.SIMBANK.servers=SIMBANK
   zosmf.server.SIMBANK.image=SIMBANK
   zosmf.server.SIMBANK.port=2040
   zosmf.server.SIMBANK.https=false
   ```
1. Edit a file called `credentials.properties` in your `.galasa` folder. Credentials that are held in this file are used by Galasa tests, for example to pass credentials to the application being tested. Storing values in this file avoids the need to hard-code credentials inside a test class, enabling the test to run in different environments without changing any test code. The following example properties enable the provided Galasa SimBank tests to run on your machine:

   ```properties
   secure.credentials.SIMBANK.username=IBMUSER
   secure.credentials.SIMBANK.password=SYS1
   ```

   Note: If you have previously installed Galasa, this file is already populated.


## Running the SimBank IVT offline using the zipped distribution

1. **TEMPORARY** Replace `~/.m2/repository` in line 130 in the run-locally.sh script with the `maven` directory of wherever you have the zipped distribution saved: `~/Users/youruserid/Downloads/isolated/maven` for example. 

1. Run the run-locally.sh script to start the Simplatform server with `run-locally.sh --server` (**TO DO: Add this script to the zipped distribution**)

You are now ready to run a local Galasa test offline with just the contents of the zipped distribution.

1. Run the SimBankIVT test locally using the following command. Note the `--localMaven` flag refers to the `maven` directory inside the _isolated.zip_ as these are all the Maven artifacts that should be needed to run the test, including the `dev.galasa.simbank.obr` artifact which is passed to the `--obr` flag and the `SimBankIVT` test class which is passed to `class`.
```
galasactl runs submit local --log - \
--obr mvn:dev.galasa/dev.galasa.simbank.obr/0.25.0/obr \
--class dev.galasa.simbank.tests/dev.galasa.simbank.tests.SimBankIVT --localMaven file:////Users/youruserid/Downloads/isolated/maven
```

You can now run local Galasa tests offline. 
