/* Copyright contributors to the Galasa project */

import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useRef, useEffect } from "react"
import { Location } from "@reach/router"
import Hamburger from "../../images/hamburger.inline.svg"
import Cross from "../../images/cross.inline.svg"
import GitHubSVG from "../../images/github.inline.svg"

import Identifier from "../identifier"
import { isSelectedSection } from "../../utils/section"
import { SearchOnNonLocal } from "../search"
import {
  selected,
  header,
  openMenu,
  extraMobileHeight,
  title,
  navContainer,
  navContainerMainTitles,
  navLink,
  footerRepeatedLinks,
  footerRepeatedLink,
  navContainerIcons,
  icon,
  closeX,
  image,
  hamburger,
} from "./header.module.scss"

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

  const handleClick = (e) => {
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
            ? selected + " selected"
            : ""
        }

        return (
          <header
            className={
              header +
              " " +
              (menuOpen ? openMenu : "") +
              " " +
              (extraHeight ? extraMobileHeight : "")
            }
          >
            <h1 className={title}>
              <Identifier id="header-identifier" />
            </h1>
            <nav ref={navContainerNode} className={navContainer} id="headerNav">
              <div className={navContainerMainTitles}>
                <Link
                  id="header-about"
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={navLink + " " + selector("about", location)}
                >
                  About
                </Link>
                <Link
                  to="/docs"
                  onClick={() => setMenuOpen(false)}
                  className={navLink + " " + selector("docs", location)}
                >
                  Docs
                </Link>
                <Link
                  to="/releases"
                  onClick={() => setMenuOpen(false)}
                  className={navLink + " " + selector("releases", location)}
                >
                  Releases
                </Link>
                <Link
                  to="/support"
                  onClick={() => setMenuOpen(false)}
                  className={navLink + " " + selector("support", location)}
                >
                  Support
                </Link>
                <Link
                  to="/community"
                  onClick={() => setMenuOpen(false)}
                  className={navLink + " " + selector("community", location)}
                >
                  Community
                </Link>
                <Link
                  to="/hub"
                  onClick={() => setMenuOpen(false)}
                  className={navLink + " " + selector("hub", location)}
                >
                  Hub
                </Link>
                <div className={footerRepeatedLinks}>
                  <a
                    className={footerRepeatedLink}
                    href="https://www.ibm.com/privacy/us/en/"
                  >
                    Privacy policy
                  </a>
                  <a
                    className={footerRepeatedLink}
                    href="https://www.ibm.com/legal"
                  >
                    Terms of use
                  </a>
                </div>
              </div>
              <SearchOnNonLocal />
              <div className={navContainerIcons}>
                <a
                  className={icon}
                  href={githubOrgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubSVG />
                </a>
              </div>
            </nav>
            <div className={closeX} onClick={() => setMenuOpen(false)}>
              <Cross className={image} />
            </div>
            <div className={hamburger} onClick={() => setMenuOpen(true)}>
              <Hamburger className={image} />
            </div>
          </header>
        )
      }}
    </Location>
  )
}

export default Header
