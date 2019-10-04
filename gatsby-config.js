const path = require(`path`)

const eslintOptions = process.env.CI === `true` ? {
  failOnError: true,
  failOnWarning: true,
} : {};

module.exports = {
  siteMetadata: {
    title: `galasa`,
    description: `Galasa is an open source deep integration test framework for teams looking to give more power to their testers.`,
    siteUrl: `https://galasa.dev`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: path.join(__dirname, `src`, `markdown-pages`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.join(__dirname, `src`, `data`),
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
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-yaml`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GA_TRACKING_ID,
        ],
        gtagConfig: {
          anonymize_ip: true,
          link_attribution: true,
        },
        pluginConfig: {
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Galasa`,
        short_name: `Galasa`,
        start_url: `/`,
        background_color: `#EFEFEF`,
        theme_color: `#212121`,
        display: `browser`,
        icon: `src/images/identifier.inline.svg`
      },
    },
  ],
}
