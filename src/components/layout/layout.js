import React from "react"
import Helmet from "react-helmet"

import Header from "../header"
import { ThemeProvider, ThemeConsumer } from "../theme"

import "./global-layout.scss"
import impactStyles from "./layout.impact.module.scss"
import readableStyles from "./layout.readable.module.scss"

const getTheme = path => {
  if (path === "/") {
    return "impact"
  } else {
    return "readable"
  }
}

const getStyles = theme => {
  if (theme === "impact") {
    return impactStyles
  } else {
    return readableStyles
  }
}

const Layout = ({ children, data, path }) => {
  const theme = getTheme(path)

  return (
    <>
      <ThemeProvider theme={theme}>
        <ThemeConsumer>
          {theme => (
            <>
              <Helmet>
                <link
                  href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600&display=swap"
                  rel="stylesheet"
                />
                <link
                  href="https://fonts.googleapis.com/css?family=Work+Sans:400,500&display=swap"
                  rel="stylesheet"
                />
                <link
                  href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap"
                  rel="stylesheet"
                />
                <html className={getStyles(theme).globalStyle} />
                <body />
              </Helmet>
              <div className={getStyles(theme).container}>
                <Header />
                <main>{children}</main>
              </div>
            </>
          )}
        </ThemeConsumer>
      </ThemeProvider>
    </>
  )
}

export default Layout
