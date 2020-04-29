# Galasa Homepage

This repository contains the source for the Galasa test automation system homepage.

## Getting started

To use the site locally, follow the following instructions:

1. Ensure you have installed Node.js 8 or later - we recommend 10 or later.
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

If you are interested in the development of Galasa, take a look at the documentation and feel free to post a question on [Spectrum](https://spectrum.chat/galasa?tab=posts) or raise new ideas / features / bugs etc. as issues on [GitHub](https://github.com/galasa-dev/projectmanagement).

Take a look at the [contribution guidelines](https://github.com/galasa-dev/projectmanagement/blob/master/contributing.md).

Any changes to the documentation should be contributed as pull requests:

1. Make a fork of this repository (top-right).
1. Make your changes in a branch of your fork.
1. Create a pull request for your changed branch.

Please format your code using Prettier:
```sh
npm run format
```

## License

This code is under the [Eclipse Public License 2.0](https://github.com/galasa-dev/maven/blob/master/LICENSE).
