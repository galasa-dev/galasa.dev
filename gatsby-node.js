const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/docTemplate.js`)

  return graphql(`
  {
    filesystemPlugins: allSitePlugin(
      filter: {name: {eq: "gatsby-source-filesystem"}}
    ) {
      nodes {
        pluginOptions
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

    const markdownPagesFilesystemPlugin = result.data.filesystemPlugins.nodes.find((filesystemPlugin) => {
      return "markdown-pages" === filesystemPlugin.pluginOptions.name
    })
    const projectRelativeMdBasePath = path.relative(process.cwd(), markdownPagesFilesystemPlugin.pluginOptions.path)
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
