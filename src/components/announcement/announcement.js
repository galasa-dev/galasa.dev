/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import React from "react"

import announcementStyles from "./announcement.module.scss"

const Announcement = ({ children, title }) => {
  return (
    <div
      className={
        announcementStyles.announcement + " " + announcementStyles.flash
      }
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default Announcement
