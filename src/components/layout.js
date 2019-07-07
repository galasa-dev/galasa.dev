import React from "react"

import Header from "./header"
import "./layout.css"
import layoutStyles from "./layout.module.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className={layoutStyles.container}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
