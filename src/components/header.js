import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"
import headerStyles from "./header.module.css"

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <h1 className={headerStyles.title}>
        <Link to="/">{data.site.siteMetadata.title}</Link>
      </h1>
      <Link to="/learn" className={headerStyles.navLink}>
        Learn
      </Link>
      <Link to="/docs" className={headerStyles.navLink}>
        Docs
      </Link>
      <Link to="/support" className={headerStyles.navLink}>
        Support
      </Link>
    </header>
  )
}

export default Header
