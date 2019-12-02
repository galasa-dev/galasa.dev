import React from "react"

import announcementStyles from "./announcement.module.scss"

const Announcement = ({ children, title }) => {
  return (
    <div
      className={
        announcementStyles.announcement //+ " " + announcementStyles.flash
      }
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default Announcement
