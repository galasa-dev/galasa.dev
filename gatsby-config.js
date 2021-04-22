const path = require(`path`)

console.log(process.env);

const consts = {
  githubRepoName: "galasa.dev",
  githubOrgName: "galasa-dev",
  twitterUrl: "https://twitter.com/galasa_dev",
  slackUrl: "https://join.slack.com/t/galasa/shared_invite/zt-ele2ic8x-VepEO1o13t4Jtb3ZuM4RUA",
}

consts.githubOrgUrl = `https://github.com/${consts.githubOrgName}`
consts.githubRepoUrl = `${consts.githubOrgUrl}/${consts.githubRepoName}`
consts.githubRepoSlug = `${consts.githubOrgName}/${consts.githubRepoName}`

// const buildRepoSlug = process.env.TRAVIS_PULL_REQUEST_SLUG || process.env.TRAVIS_REPO_SLUG || consts.githubRepoSlug
const buildRepoSlug = process.env.PR_REPO_SLUG || process.env.BASE_REPO_SLUG || consts.githubRepoSlug
consts.buildRepoUrl = `https://github.com/${buildRepoSlug}`
// consts.buildBranch = process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH || "master"
consts.buildBranch = process.env.PR_BRANCH_NAME || process.env.BRANCH_NAME || "master"

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
    {
      resolve: `@danbruegge/gatsby-plugin-stylelint`,
      options: {
        files: ["**/*.{css,s(a|c)ss}"],
      },
    },
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
  ],
}
