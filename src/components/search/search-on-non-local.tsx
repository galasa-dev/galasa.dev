/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import React from "react"

import Search from "./search"

function SearchOnNonLocal() {
  
  if (process.env.GATSBY_GALASA_ENV !== "LOCAL") {
    return <Search />
  } else {
    return null
  }
}

export default SearchOnNonLocal;
