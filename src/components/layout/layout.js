/* Copyright contributors to the Galasa project */

import React from "react"
import Helmet from "react-helmet"

import Header from "../header"
import Footer from "../footer"
import Sidebar from "../sidebar"

import "./global-layout.scss"
import {
  frontMain,
  generalMain,
  docNav,
  globalStyle,
  container,
} from "./layout.module.scss"

const Layout = ({ children, location: { pathname } }) => {
  const frontPage = pathname === "/"
  const extraHeightHeader = !frontPage
  const content = frontPage ? (
    <main className={frontMain}>{children}</main>
  ) : (
    <>
      <main className={generalMain}>
        <div className={docNav}>
          <Sidebar />
        </div>
        {children}
      </main>
    </>
  )

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap"
          rel="stylesheet"
        />
        <html className={globalStyle} />
        <body />
      </Helmet>
      <div className={container}>
        <Header extraHeight={extraHeightHeader} />
        {content}
        <Footer />
      </div>
    </>
  )
}

export default Layout
