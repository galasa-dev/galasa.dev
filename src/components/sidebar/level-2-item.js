/* Copyright contributors to the Galasa project */

import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"
import { isSamePath } from "../../utils/path"
import { isInNavPath } from "./sidebar"

import sidebarStyles from "./sidebar.module.scss"

export default props => {
  const item = props.item

  return (
    <Location>
      {({ location }) => (
        <li
          id={"sidebar-l2-" + item.path}
          className={
            sidebarStyles.level2Item +
            " " +
            "sidebar-l2" +
            " " +
            (isInNavPath(item, location) ? "itemInNavPath" : "")
          }
        >
          <div
            className={
              sidebarStyles.level2Marker +
              " " +
              (isSamePath(location.pathname, item.path)
                ? sidebarStyles.level2MarkerSelected + " selected"
                : "") +
              " " +
              (isInNavPath(item, location)
                ? sidebarStyles.markerInNavPath + " markerInNavPath"
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
