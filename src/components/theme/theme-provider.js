/* Copyright contributors to the Galasa project */

import React from "react"

import ThemeContext from "./theme-context"

export default ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
)
