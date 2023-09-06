/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
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
import SiteHead from "../components/site-head"
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

export const Head = ({ data }) => {
  const {
    markdownRemark: { excerpt, frontmatter },
  } = data
  return (
    <SiteHead title={frontmatter.title} description={excerpt} data={data} />
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    site {
      siteMetadata {
        consts {
          buildRepoUrl
          buildBranch
          algolia {
            appId
            apiKey
            indexName
          }
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        path
        title
      }
    }
  }
`
