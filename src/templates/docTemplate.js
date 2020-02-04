import React from "react"
import { graphql } from "gatsby"
import layoutStyles from "./docTemplate.module.scss"
import SEO from "../components/seo"
import GitHubSVG from "../images/github.inline.svg"

export default function Template({
  data: {
    site: {
      siteMetadata: {
        consts: { buildRepoUrl, buildBranch },
      },
    },
    markdownRemark: { frontmatter, html },
  },
  pageContext: { repoRelativePath },
}) {
  const MarkdownPageFooter = ({ repoRelativePath }) => (
    <div className={layoutStyles.metaFooter}>
      <a
        className={layoutStyles.editLink}
        href={`${buildRepoUrl}/blob/${buildBranch}/${repoRelativePath}`}
      >
        <GitHubSVG className={layoutStyles.editIcon} /> Edit this page on GitHub
      </a>
    </div>
  )

  return (
    <>
      <SEO title={frontmatter.title} />
      <div className={layoutStyles.docWrapper}>
        <div className={layoutStyles.docContent}>
          <h1 className={layoutStyles.topicTitle}>{frontmatter.title}</h1>
          <div
            className={layoutStyles.docPostContent}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <MarkdownPageFooter repoRelativePath={repoRelativePath} />
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        consts {
          buildRepoUrl
          buildBranch
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
