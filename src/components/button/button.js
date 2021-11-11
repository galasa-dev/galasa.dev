/* Copyright contributors to the Galasa project */

import React from "react"
import { Link } from "gatsby"

import buttonStyles from "./button.module.scss"

const Button = ({ target, children, flash = false, primary = false }) => {
  return (
    <div className={buttonStyles.buttonContainer}>
      <Link
        to={target}
        className={
          buttonStyles.button +
          " " +
          (primary ? buttonStyles.primary : buttonStyles.secondary)
        }
      >
        {children}
      </Link>
    </div>
  )
}

export default Button
