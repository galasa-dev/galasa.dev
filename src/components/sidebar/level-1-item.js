/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"
import { isSamePath } from "../../utils/path"
import { isInNavPath } from "./sidebar"

import Level2Item from "./level-2-item"

import {
  level1Item,
  level1Marker,
  level1MarkerSelected,
  markerInNavPath,
  level2List,
} from "./sidebar.module.scss"

const Level1Item = (props) => {
  const { item, rootElement = false } = props

  let itemComps = null
  if (!rootElement) {
    itemComps = item.items
      ? item.items.map((subItem) => (
          <Level2Item key={subItem.title} item={subItem} />
        ))
      : []
  }

  return (
    <Location>
      {({ location }) => (
        <li
          id={"sidebar-l1-" + item.path}
          className={
            level1Item +
            " " +
            "sidebar-l1" +
            " " +
            (isInNavPath(item, location) ? "itemInNavPath" : "")
          }
        >
          <div
            className={
              level1Marker +
              " " +
              (isSamePath(location.pathname, item.path)
                ? level1MarkerSelected + " selected"
                : "") +
              " " +
              (isInNavPath(item, location)
                ? markerInNavPath + " markerInNavPath"
                : "")
            }
          >
            <Link to={item.path}>{item.title}</Link>
          </div>
          {itemComps && itemComps.length > 0 && (
            <ul className={level2List}>{itemComps}</ul>
          )}
        </li>
      )}
    </Location>
  )
}

export default Level1Item
