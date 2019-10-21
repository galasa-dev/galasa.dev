import { Link } from "gatsby"
import React, { useState, useRef, useEffect } from "react"
import { Location } from "@reach/router"
import { ThemeConsumer } from "../theme"
import Hamburger from "../../images/hamburger.inline.svg"
import Cross from "../../images/cross.inline.svg"

import Identifier from "../identifier"
import { isSelectedSection } from "../../utils/section"

import impactStyles from "./header.impact.module.scss"
import readableStyles from "./header.readable.module.scss"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navContainerNode = useRef()

  const getStyles = theme => {
    if (theme === "impact") {
      return impactStyles
    } else {
      return readableStyles
    }
  }

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
      {({ location }) => (
        <ThemeConsumer>
          {theme => {
            const headerStyles = getStyles(theme)

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
                  (menuOpen ? headerStyles.openMenu : "")
                }
              >
                <h1 className={headerStyles.title}>
                  <Identifier id="header-identifier" />
                </h1>
                <div
                  ref={navContainerNode}
                  className={headerStyles.navContainer}
                >
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
        </ThemeConsumer>
      )}
    </Location>
  )
}

export default Header
