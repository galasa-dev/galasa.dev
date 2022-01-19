import React from "react"

import { block, heading, subheading, text } from "./404.module.scss"

const _404Page = () => (
  <>
    <div className={block}>
      <h1 className={heading}>404</h1>
      <h2 className={subheading}>Well, that didn't go to plan!</h2>
      <p className={text}>
        The page you were looking for has moved or doesn't exist.
      </p>
    </div>
  </>
)

export default _404Page
