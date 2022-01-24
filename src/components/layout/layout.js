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
import lazyFontsScript from "./lazyFonts"

const fontsUrl =
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono&display=swap"

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
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={fontsUrl}
          rel="stylesheet"
          media="print"
          onload={lazyFontsScript}
        />
        <noscript>{`
          <link rel="stylesheet" href="${fontsUrl}" />
        `}</noscript>
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
