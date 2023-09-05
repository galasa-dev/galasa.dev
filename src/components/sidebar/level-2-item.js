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

import {
  level2Item,
  level2Marker,
  level2MarkerSelected,
  markerInNavPath,
} from "./sidebar.module.scss"

const Level2Item = (props) => {
  const item = props.item

  return (
    <Location>
      {({ location }) => (
        <li
          id={"sidebar-l2-" + item.path}
          className={
            level2Item +
            " " +
            "sidebar-l2" +
            " " +
            (isInNavPath(item, location) ? "itemInNavPath" : "")
          }
        >
          <div
            className={
              level2Marker +
              " " +
              (isSamePath(location.pathname, item.path)
                ? level2MarkerSelected + " selected"
                : "") +
              " " +
              (isInNavPath(item, location)
                ? markerInNavPath + " markerInNavPath"
                : "")
            }
          >
            <Link to={item.path}>{item.title}</Link>
          </div>
        </li>
      )}
    </Location>
  )
}

export default Level2Item
