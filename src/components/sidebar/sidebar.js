import React, { useState } from "react"
import { Location } from "@reach/router"
import { useStaticQuery, graphql, Link } from "gatsby"
import { normalisePath } from "../../utils/path"
import Hamburger from "../../images/hamburger.inline.svg"
import Cross from "../../images/cross.inline.svg"

import sidebarStyles from "./sidebar.module.scss"
import Level1Item from "./level-1-item"

export default () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const {
    navYaml: { sections },
  } = useStaticQuery(graphql`
    query SidebarQuery {
      navYaml {
        sections {
          title
          root
          items {
            title
            path
            items {
              title
              path
            }
          }
        }
      }
    }
  `)

  function getSection(location) {
    const normalisedPath = normalisePath(location.pathname)
    let sectionEnd = normalisedPath.indexOf("/", 1)
    if (sectionEnd === -1) sectionEnd = normalisedPath.length
    const sectionPath = normalisedPath.substring(0, sectionEnd)
    return sections.find(section => normalisePath(section.root) === sectionPath)
  }

  function getItemComponents(sectionItem, location) {
    return sectionItem.items.map(item => (
      <Level1Item key={item.title} item={item} />
    ))
  }

  return (
    <Location>
      {({ location }) => {
        const sectionItem = getSection(location)
        return (
          <nav className={sidebarStyles.nav}>
            <h2 className={sidebarStyles.sidebarHeader}>
              <Link to={sectionItem.root}>{sectionItem.title}</Link>
            </h2>
            <div
              className={
                sidebarStyles.navBlock +
                " " +
                (menuOpen ? sidebarStyles.openMenu : "")
              }
            >
              <Hamburger
                className={sidebarStyles.hamburger}
                onClick={() => setMenuOpen(true)}
              />
              <Cross
                className={sidebarStyles.cross}
                onClick={() => setMenuOpen(false)}
              />
              <ul className={sidebarStyles.level1List}>
                {getItemComponents(sectionItem, location)}
              </ul>
            </div>
          </nav>
        )
      }}
    </Location>
  )
}

export const isInNavPath = (item, location) => {
  const locationPath = normalisePath(location.pathname)
  return searchNavPath(item, locationPath)
}

const searchNavPath = (item, path) => {
  const itemPath = normalisePath(item.path)
  if (itemPath === path) {
    return true
  }
  if (item.items) {
    return item.items.find(subItem => searchNavPath(subItem, path))
  }
}
