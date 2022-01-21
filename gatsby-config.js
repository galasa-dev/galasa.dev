const path = require(`path`)
const crypto = require(`crypto`)

const digitalData = require("./src/utils/digital-data")

const consts = {
  githubRepoName: "galasa.dev",
  githubOrgName: "galasa-dev",
  twitterUrl: "https://twitter.com/galasa_dev",
  slackUrl: "https://join.slack.com/t/galasa/shared_invite/zt-ele2ic8x-VepEO1o13t4Jtb3ZuM4RUA",
  algolia: {
    appId: "0CBS2VLS6S",
    apiKey: "46b619eff7e9e3900835e17fc7aa880b",
    indexName: "galasa",
  },
}

consts.githubOrgUrl = `https://github.com/${consts.githubOrgName}`
consts.githubRepoUrl = `${consts.githubOrgUrl}/${consts.githubRepoName}`
consts.githubRepoSlug = `${consts.githubOrgName}/${consts.githubRepoName}`

const buildRepoSlug = process.env.PR_REPO_SLUG || process.env.BASE_REPO_SLUG || consts.githubRepoSlug
consts.buildRepoUrl = `https://github.com/${buildRepoSlug}`
consts.buildBranch = process.env.PR_BRANCH_NAME || process.env.BRANCH_NAME || "main"

function getDigitaDataHash() {
  if (process.env.GATSBY_GALASA_ENV !== "LOCAL") {
    return `'sha256-${crypto.createHash('sha256').update(digitalData).digest('base64')}'`
  } else {
    return ''
  }
}

const gatsbyRequiredRules = path.join(
  process.cwd(),
  "node_modules",
  "gatsby",
  "dist",
  "utils",
  "eslint-rules"
);

const eslintOptions = process.env.CI === `true` ? {
  failOnError: true,
  failOnWarning: true,
} : {};

module.exports = {
  siteMetadata: {
    title: `galasa`,
    description: `Galasa is an open source deep integration test framework for teams looking to give more power to their testers.`,
    siteUrl: `https://galasa.dev`,
    consts,
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
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        rulePaths: [gatsbyRequiredRules],
        stages: ['develop', 'build-javascript'],
        ...eslintOptions,
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
    `gatsby-plugin-catch-links`,
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
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeStyleHashes: false,
        directives: {
          "style-src": "'unsafe-inline' https://fonts.googleapis.com",
          "script-src": `'self' https://*.www.s81c.com https://*.ibm.com tags.tiqcdn.com consent.truste.com https://scripts.demandbase.com https://www.googletagmanager.com https://pixel.mathtag.com https://*.tealiumiq.com https://consent.trustarc.com https://cdn.trackjs.com https://dpm.demdex.net https://www.google-analytics.com ${getDigitaDataHash()}`,
          "font-src": "'self' data: https://fonts.gstatic.com https://*.www.s81c.com",
          "connect-src": "'self' https://*.ibm.com https://dbdm-events.mybluemix.net https://*.algolia.net https://*.algolianet.com https://dpm.demdex.net https://*.tealiumiq.com https://api.company-target.com https://www.google-analytics.com https://stats.g.doubleclick.net",
          "img-src": "'self' data: https://consent.trustarc.com https://id.rlcdn.com https://www.google-analytics.com https://cm.everesttech.net https://pixel.mathtag.com https://dpm.demdex.net https://sync.crwdcntrl.net",
          "frame-src": "'self' https://*.trustarc.com https://pixel.mathtag.com https://ibm.demdex.net",
        }
      }
    }
  ],
}
