# Galasa Homepage

This repository contains the source for the Galasa test automation system homepage.

If you are interested in the development of Galasa, take a look at the documentation and feel free to post a question in our <a href="https://galasa.slack.com" target="_blank"> Galasa Slack</a> workspace. <a href="https://join.slack.com/t/galasa/shared_invite/zt-ele2ic8x-VepEO1o13t4Jtb3ZuM4RUA" target="_blank"> Register to join</a> first if you're not yet a member. 

We have the following channels:

#galasa-dev - For developers of Galasa code or Galasa extensions 
#galasa-users - For users comments, and for making announcements
#galasa-tsc - For technical steering committee discussions on longer term over-arching issues relating to Galasa

You can raise new ideas / features / bugs etc. as issues on [GitHub](https://github.com/galasa-dev/projectmanagement). 

## Getting started

To use the site locally, follow the following instructions:

1. Ensure you have installed Node.js at the same version as specified in the [`.nvmrc`](./.nvmrc) file.
1. Clone this repository to your own machine.
1. From the root of the repository, install all the required dependencies:
    ```sh
    npm install
    ```
1. Run the development build, which will automatically update as you change files:
    ```sh
    npm run develop
    ```

Sometimes you want to be sure of exactly what will be produced in the CI build. If you want to run a full production build, you can do so using:
```sh
npm run build
```

You can then serve that production build using:
```sh
npm run serve
```

## Contributing

Take a look at the [contribution guidelines](https://github.com/galasa-dev/projectmanagement/blob/main/contributing.md).

Any changes to the documentation should be contributed as pull requests:

1. Make a fork of this repository (top-right).
1. Make your changes in a branch of your fork.
1. Create a pull request for your changed branch.

Please format your code using Prettier:
```sh
npm run format
```

## License

This code is under the [Eclipse Public License 2.0](./LICENSE).
