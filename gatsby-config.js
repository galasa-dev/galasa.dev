const eslintOptions = process.env.CI === `true` ? {
  failOnError: true,
  failOnWarning: true,
} : {};

module.exports = {
  siteMetadata: {
    title: `Galasa`,
    description: ``,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop', 'build-javascript'],
        options: eslintOptions,
      }
    }
  ],
}
