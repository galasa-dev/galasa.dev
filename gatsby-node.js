const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/docTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
                path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: docTemplate,
        context: { title: node.frontmatter.title }, // additional data can be passed via context
      })
    })
  })
}
exports.onCreateWebpackConfig = ({ actions }) => {
  if (!process.env.NODE_ENV) {
    actions.setWebpackConfig({
      devtool: "eval-source-map"
    });
  }
};