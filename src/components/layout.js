import React from "react"
import Helmet from "react-helmet"

import Header from "./header"
import "./layout.scss"
import layoutStyles from "./layout.module.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className={layoutStyles.container}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
