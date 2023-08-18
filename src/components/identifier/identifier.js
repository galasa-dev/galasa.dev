/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"
import { identifier, image } from "./identifier.module.scss"
import IdentifierSVG from "../../images/identifier.inline.svg"

const Identifier = ({ id = "identifier" }) => {
  const {
    site: {
      siteMetadata: { siteTitle },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          siteTitle: title
        }
      }
    }
  `)

  return (
    <Link id={id} className={identifier} to="/">
      <IdentifierSVG className={image} />
      {siteTitle}
    </Link>
  )
}

export default Identifier
