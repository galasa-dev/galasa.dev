/* Copyright contributors to the Galasa project */

import React from "react"
import { Link } from "gatsby"

import {
  buttonContainer,
  button,
  primary,
  secondary,
} from "./button.module.scss"

const Button = ({ target, children, flash = false, isPrimary = false }) => {
  return (
    <div className={buttonContainer}>
      <Link
        to={target}
        className={button + " " + (isPrimary ? primary : secondary)}
      >
        {children}
      </Link>
    </div>
  )
}

export default Button
