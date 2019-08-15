import { useStaticQuery, graphql, Link } from "gatsby"
import React, { useState } from "react"
import headerStyles from "./header.module.scss"
import Identifier from "./identifier"
import { Location } from "@reach/router"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  function isSelectedSection(section, location) {
    return location.pathname.startsWith(
      section + "/",
      1 /* skip initial slash */
    )
  }

  function selector(section, location) {
    return isSelectedSection(section, location) ? headerStyles.selected : ""
  }

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
      cross: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "cross.svg" }
      ) {
        publicURL
      }
      hamburger: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "hamburger.svg" }
      ) {
        publicURL
      }
    }
  `)

  return (
    <Location>
      {({ location }) => (
        <header
          className={
            headerStyles.header + " " + (menuOpen ? headerStyles.openMenu : "")
          }
        >
          <h1 className={headerStyles.title}>
            <Identifier />
          </h1>
          <div className={headerStyles.navContainer}>
            <Link
              to="/about"
              className={
                headerStyles.navLink + " " + selector("about", location)
              }
            >
              About
            </Link>
            <Link
              to="/tutorials"
              className={
                headerStyles.navLink + " " + selector("tutorials", location)
              }
            >
              Tutorials
            </Link>
            <Link
              to="/docs"
              className={
                headerStyles.navLink + " " + selector("docs", location)
              }
            >
              Docs
            </Link>
            <Link
              to="/downloads"
              className={
                headerStyles.navLink + " " + selector("downloads", location)
              }
            >
              Downloads
            </Link>
            <Link
              to="/support"
              className={
                headerStyles.navLink + " " + selector("support", location)
              }
            >
              Support
            </Link>
          </div>
          <div
            className={headerStyles.closeX}
            onClick={() => setMenuOpen(false)}
          >
            <img
              className={headerStyles.image}
              alt="Close"
              src={data.cross.publicURL}
            />
          </div>
          <div
            className={headerStyles.hamburger}
            onClick={() => setMenuOpen(true)}
          >
            <img
              className={headerStyles.image}
              alt="Menu"
              src={data.hamburger.publicURL}
            />
          </div>
        </header>
      )}
    </Location>
  )
}

export default Header
