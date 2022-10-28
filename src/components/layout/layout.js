/* Copyright contributors to the Galasa project */

import React from "react"

import Header from "../header"
import Footer from "../footer"
import Sidebar from "../sidebar"

import "./global-layout.scss"
import { frontMain, generalMain, docNav, container } from "./layout.module.scss"

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
    <div className={container}>
      <Header extraHeight={extraHeightHeader} />
      {content}
      <Footer />
    </div>
  )
}

export default Layout
