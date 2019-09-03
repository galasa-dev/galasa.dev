import React from "react"
import { Link } from "gatsby"

import buttonStyles from "./button.module.scss"

const Button = ({ target, children, flash = false, primary = false }) => {
  return (
    <Link
      to={target}
      className={
        buttonStyles.button +
        " " +
        (primary ? buttonStyles.primary : buttonStyles.secondary) +
        " " +
        (flash ? buttonStyles.flash : "")
      }
    >
      {children}
    </Link>
  )
}

export default Button
