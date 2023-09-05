/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import React, { useState, useEffect } from "react"
import { Location, globalHistory } from "@reach/router"
import { useStaticQuery, graphql, Link } from "gatsby"
import { normalisePath } from "../../utils/path"
import Toc from "../../images/toc.inline.svg"
import Cross from "../../images/cross.inline.svg"

import {
  sidebarHeader,
  sideBarHeaderSeparator,
  sideBarHeaderCurrentTopic,
  navBlock,
  openMenu,
  toc,
  topicsHeader,
  cross,
  level1List,
} from "./sidebar.module.scss"
import Level1Item from "./level-1-item"

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu when navigation (PUSH or POP) occurs
  useEffect(() => {
    return globalHistory.listen(() => {
      setMenuOpen(false)
    })
  }, [])

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
    return sections.find(
      (section) => normalisePath(section.root) === sectionPath
    )
  }

  function getTitle(location) {
    const normalisedPath = normalisePath(location.pathname)
    for (const section of sections) {
      for (const item of section.items) {
        const result = getTitleUnderItem(item, normalisedPath)
        if (result) return result
      }
    }
  }

  function getTitleUnderItem(item, normalisedPath) {
    if (normalisePath(item.path) === normalisedPath) {
      return item.title
    }
    if (item.items) {
      for (const subItem of item.items) {
        const result = getTitleUnderItem(subItem, normalisedPath)
        if (result) return result
      }
    }
  }

  function getItemComponents(sectionItem, location) {
    return sectionItem.items.map((item) => (
      <Level1Item key={item.title} item={item} />
    ))
  }

  return (
    <Location>
      {({ location }) => {
        const sectionItem = getSection(location)
        return (
          <nav id="sidebar">
            {sectionItem && (
              <h1 className={sidebarHeader}>
                <div>
                  <Link
                    id={"sidebar-title-" + sectionItem.root}
                    to={sectionItem.root}
                  >
                    {sectionItem.title}
                  </Link>
                  <span className={sideBarHeaderSeparator}> ::</span>
                </div>
                <span className={sideBarHeaderCurrentTopic}>
                  {getTitle(location)}
                </span>
              </h1>
            )}
            <div className={navBlock + " " + (menuOpen ? openMenu : "")}>
              <Toc className={toc} onClick={() => setMenuOpen(true)} />
              <div className={topicsHeader} onClick={() => setMenuOpen(true)}>
                Topics
              </div>
              <Cross className={cross} onClick={() => setMenuOpen(false)} />
              {sectionItem && (
                <ul className={level1List}>
                  {getItemComponents(sectionItem, location)}
                </ul>
              )}
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
    return item.items.find((subItem) => searchNavPath(subItem, path))
  }
}

export default Sidebar
