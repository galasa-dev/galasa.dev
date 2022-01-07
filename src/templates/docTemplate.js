import React from "react"
import { graphql } from "gatsby"
import {
  metaFooter,
  editLink,
  editIcon,
  docWrapper,
  docContent,
  topicTitle,
  docPostContent,
} from "./docTemplate.module.scss"
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
    <div className={metaFooter}>
      <a
        className={editLink}
        href={`${buildRepoUrl}/blob/${buildBranch}/${repoRelativePath}`}
      >
        <GitHubSVG className={editIcon} /> Edit this page on GitHub
      </a>
    </div>
  )

  return (
    <>
      <SEO title={frontmatter.title} />
      <div className={docWrapper}>
        <div className={docContent}>
          <h1 className={topicTitle}>{frontmatter.title}</h1>
          <div
            className={docPostContent}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <MarkdownPageFooter repoRelativePath={repoRelativePath} />
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
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
