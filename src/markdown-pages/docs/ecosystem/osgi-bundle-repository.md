---
path: "/docs/ecosystem/osgi-bundle-repository"
title: "OSGi Bundle Repository (OBR)"
---

# OSGi Bundle Repository (OBR) in Galasa

OSGi Bundle Repository (OBR) is a service that simplifies deploying and using OSGi bundles in Galasa. It provides automatic dependency resolution and deployment of bundles from repositories.

## Key Benefits

- Automatic installation of bundles with their dependencies
- Access to both executable bundles and source code
- Simplified bundle deployment and updates
- Support for local and remote bundle repositories

## Key Components

- **Repository Admin** - Service to access bundle repositories
- **Repository** - Provides access to available bundles
- **Resource** - Description of a bundle to be installed
- **Resolver** - Handles bundle dependency resolution and deployment

## Using OBR in Galasa

In Galasa, OBR is primarily used behind the scenes to manage test bundles and their dependencies. The framework handles most OBR interactions automatically, so you typically don't need to work with it directly.

When you build Galasa tests, they are packaged as OSGi bundles and can be stored in an OBR repository. This allows Galasa to properly resolve and load all required dependencies when running tests.

## How OBR Works in Galasa

### Repository Structure
OBR uses XML-based repository files to describe available bundles and their metadata. These files contain:
- Bundle descriptions and documentation
- Package dependencies and version requirements  
- Service capabilities and requirements
- Resource capabilities and constraints

### Bundle Resolution
When Galasa needs to resolve bundle dependencies:

1. The OBR service searches available repositories
2. Analyzes bundle requirements and capabilities 
3. Constructs a dependency graph
4. Determines the optimal set of bundles to satisfy all dependencies
5. Downloads and installs required bundles

### Common Use Cases

#### Local Development
When developing Galasa tests locally:
- Test bundles are built and stored in your local Maven repository
- OBR indexes these bundles automatically
- Dependencies are resolved from both local and remote repositories
- Changes to test bundles are immediately available

#### CI/CD Environments  
In automated environments:
- Test bundles are published to shared repositories
- OBR handles coordinated deployment across test runs
- Version conflicts are automatically resolved
- Bundle updates are managed consistently

## Repository Management

### Adding Local Repositories
You can create local repositories for your custom bundles:

```properties
# Example repository.xml
<repository name="MyTestRepo" ...>
    <resource>
        <capability name='bundle'>
            <p n='symbolicname' v='dev.galasa.mytest'/>
            <p n='version' t='version' v='1.0.0'/>
        </capability>
        // ... other capabilities and requirements
    </resource>
</repository>
```

### Repository Federation
OBR supports multiple repositories:
- Local development repositories
- Team-shared repositories
- Global Galasa repositories
- Third-party bundle repositories

The resolver automatically federates across all configured repositories to find the best matches for dependencies.

## Best Practices

### Bundle Organization
- Group related test bundles in logical repositories
- Use clear naming conventions for bundles
- Include proper version information
- Document bundle dependencies

### Version Management
- Follow semantic versioning for bundles
- Specify version ranges appropriately
- Test bundle updates before deployment
- Maintain compatibility information

### Troubleshooting

Common issues and solutions:

1. **Missing Dependencies**
   - Check repository configuration
   - Verify bundle version requirements
   - Ensure all required repositories are accessible

2. **Version Conflicts** 
   - Review dependency version ranges
   - Check for duplicate bundle versions
   - Update bundles to compatible versions

3. **Repository Access**
   - Verify network connectivity
   - Check proxy settings if required
   - Ensure proper authentication

## Advanced Configuration

### Repository Properties
Additional properties for fine-tuning OBR:

```properties
# Repository configuration
repository.cache.location=${user.home}/.galasa/repository-cache
repository.local.directory=${user.home}/.galasa/local-repository
repository.connection.timeout=30000
repository.read.timeout=60000
```

### Security Considerations
When working with secure repositories:
- Use HTTPS for remote repositories
- Configure appropriate credentials
- Implement access controls
- Audit repository access

## When Working With Proxies

If you're behind a proxy, you'll need to configure the following system properties:

```properties
http.proxyHost=<proxy-host>
http.proxyPort=<proxy-port>
http.proxyAuth=<username:password> # If required
```

## Further Reading

For more detailed information about OBR, see the [Apache Felix OBR documentation](https://felix.apache.org/documentation/subprojects/apache-felix-osgi-bundle-repository.html).
