import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"
import { isSamePath } from "../../utils/path"
import { isInNavPath } from "./sidebar"

import Level2Item from "./level-2-item"

import sidebarStyles from "./sidebar.module.scss"

export default props => {
  const { item, rootElement = false } = props

  let itemComps = null
  if (!rootElement) {
    itemComps = item.items
      ? item.items.map(subItem => (
          <Level2Item key={subItem.title} item={subItem} />
        ))
      : []
  }

  return (
    <Location>
      {({ location }) => (
        <li
          className={
            sidebarStyles.level1Item +
            " " +
            (isInNavPath(item, location) ? sidebarStyles.itemInNavPath : "")
          }
        >
          <div
            className={
              sidebarStyles.level1Marker +
              " " +
              (isSamePath(location.pathname, item.path)
                ? sidebarStyles.level1MarkerSelected
                : "") +
              " " +
              (isInNavPath(item, location) ? sidebarStyles.markerInNavPath : "")
            }
          >
            <Link to={item.path}>{item.title}</Link>
          </div>
          {itemComps && itemComps.length > 0 && (
            <ul className={sidebarStyles.level2List}>{itemComps}</ul>
          )}
        </li>
      )}
    </Location>
  )
}
