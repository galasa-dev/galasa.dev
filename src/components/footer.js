import React from "react"
import Identifier from "./identifier"
import { useStaticQuery, graphql, Link } from "gatsby"
import footerStyles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query SiteFooterQuery {
      site {
        siteMetadata {
          title
        }
      }
      github: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "github.svg" }
      ) {
        publicURL
      }
      twitter: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "twitter.svg" }
      ) {
        publicURL
      }
      spectrum: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "spectrum.svg" }
      ) {
        publicURL
      }
    }
  `)

  return (
    <div className={footerStyles.footer}>
      <div className={footerStyles.identifier}>
        <Identifier />
      </div>

      <div className={footerStyles.links}>
        <Link to="/blogs">Blogs</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/brand">Logo &amp; Assets</Link>
        <Link to="/contribute">Contribute</Link>
      </div>
      <div>An open source project by IBM. Built in Hursley, UK.</div>
      <div>
        <a className={footerStyles.icon} href="#github">
          <img alt="GitHub" src={data.github.publicURL} />
        </a>
        <a className={footerStyles.icon} href="#twitter">
          <img alt="Twitter" src={data.twitter.publicURL} />
        </a>
        <a className={footerStyles.icon} href="#spectrum">
          <img alt="Spectrum" src={data.spectrum.publicURL} />
        </a>
      </div>
    </div>
  )
}

export default Footer
