const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/docTemplate.js`)

  return graphql(`
    {
      markdownPagesFilesystemPlugin: sitePlugin(name: {
        eq: "gatsby-source-filesystem"
      }
      pluginOptions:{
        name:{
          eq: "markdown-pages"
        }
      }) {
        pluginOptions {
          path
        }
      } 
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            parent {
              ... on File {
                relativePath
              }
            }
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

    const projectRelativeMdBasePath = path.relative(process.cwd(), result.data.markdownPagesFilesystemPlugin.pluginOptions.path)
    const projectLocationInRepo = "."
    const repoRelativeMdBasePath = path.join(projectLocationInRepo, projectRelativeMdBasePath)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: docTemplate,
        context: {
          title: node.frontmatter.title,
          repoRelativePath: path.join(repoRelativeMdBasePath, node.parent.relativePath),
         },
      })
    })
  })
}
exports.onCreateWebpackConfig = ({ actions }) => {
  if (!(process.env.NODE_ENV === "production")) {
    actions.setWebpackConfig({
      devtool: "eval-source-map",
    })
  }
}
