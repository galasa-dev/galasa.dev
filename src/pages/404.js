import React from "react"

import Footer from "../components/footer"

import _404Styles from "./404.module.scss"

const _404Page = () => (
  <>
    <div className={_404Styles.block}>
      <h1 className={_404Styles.heading}>404</h1>
      <h2 className={_404Styles.subheading}>Well, that didn't go to plan!</h2>
      <p className={_404Styles.text}>
        The page you were looking for has moved or doesn't exist.
      </p>
    </div>
    <Footer />
  </>
)

export default _404Page
