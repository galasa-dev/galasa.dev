import React from "react"
import { graphql } from "gatsby"
import layoutStyles from "./docTemplate.module.scss"
import Footer from "../components/footer"
import Sidebar from "../components/sidebar"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div className={layoutStyles.docContainer}>
      <div className={layoutStyles.docNav}>
        <Sidebar />
      </div>
      <div className={layoutStyles.docContent}>
        <h1>{frontmatter.title}</h1>
        <div
          className="doc-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Footer />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
