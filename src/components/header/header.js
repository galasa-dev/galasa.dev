import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useRef, useEffect } from "react"
import { Location } from "@reach/router"
import Hamburger from "../../images/hamburger.inline.svg"
import Cross from "../../images/cross.inline.svg"
import GitHubSVG from "../../images/github.inline.svg"

import Identifier from "../identifier"
import { isSelectedSection } from "../../utils/section"

import headerStyles from "./header.module.scss"
import Search from "../../components/search"

const Header = ({ extraHeight }) => {
  const {
    site: {
      siteMetadata: {
        consts: { githubOrgUrl },
      },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          consts {
            githubOrgUrl
          }
        }
      }
    }
  `)

  const [menuOpen, setMenuOpen] = useState(false)
  const navContainerNode = useRef()

  const handleClick = e => {
    if (!navContainerNode.current.contains(e.target)) {
      // Click outside the navContainer
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])

  return (
    
    <Location>
      {({ location }) => {
        const selector = (section, location) => {
          return isSelectedSection(section, location)
            ? headerStyles.selected
            : ""
        }

        return (
          <header
            className={
              headerStyles.header +
              " " +
              (menuOpen ? headerStyles.openMenu : "") +
              " " +
              (extraHeight ? headerStyles.extraMobileHeight : "")
            }
          >
            <h1 className={headerStyles.title}>
              <Identifier id="header-identifier" />
            </h1>
            <Search/>

            <div ref={navContainerNode} className={headerStyles.navContainer}>
              <Link
                id="header-about"
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={
                  headerStyles.navLink + " " + selector("about", location)
                }
              >
                About
              </Link>
              <Link
                to="/docs"
                onClick={() => setMenuOpen(false)}
                className={
                  headerStyles.navLink + " " + selector("docs", location)
                }
              >
                Docs
              </Link>
              <Link
                to="/releases"
                onClick={() => setMenuOpen(false)}
                className={
                  headerStyles.navLink + " " + selector("releases", location)
                }
              >
                Releases
              </Link>
              <Link
                to="/support"
                onClick={() => setMenuOpen(false)}
                className={
                  headerStyles.navLink + " " + selector("support", location)
                }
              >
                Support
              </Link>
              <Link
                to="/community"
                onClick={() => setMenuOpen(false)}
                className={
                  headerStyles.navLink + " " + selector("community", location)
                }
              >
                Community
              </Link>
              <div className={headerStyles.footerRepeatedLinks}>
                <a
                  className={headerStyles.footerRepeatedLink}
                  href="https://www.ibm.com/privacy/us/en/"
                >
                  Privacy policy
                </a>
                <a
                  className={headerStyles.footerRepeatedLink}
                  href="https://www.ibm.com/legal"
                >
                  Terms of use
                </a>
              </div>
              <div className={headerStyles.navContainerIcons}>
                <a
                  className={headerStyles.icon}
                  href={githubOrgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubSVG />
                </a>
              </div>
            </div>
            <div
              className={headerStyles.closeX}
              onClick={() => setMenuOpen(false)}
            >
              <Cross className={headerStyles.image} />
            </div>
            <div
              className={headerStyles.hamburger}
              onClick={() => setMenuOpen(true)}
            >
              <Hamburger className={headerStyles.image} />
            </div>
          </header>
        )
      }}
    </Location>
  )
}

export default Header
