import React from "react"
import Helmet from "react-helmet"

import Header from "./header"
import "./layout.scss"
import layoutStyles from "./layout.module.scss"

const Layout = ({ children, data }) => {
  const title =
    (data ? data.markdownRemark.frontmatter.title + " | " : "") + "Galasa"

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
        <html lang="en" />
      </Helmet>
      <div className={layoutStyles.container}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
