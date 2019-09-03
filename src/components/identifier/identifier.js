import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"
import identifierStyles from "./identifier.module.scss"
import IdentifierSVG from "../../images/identifier.inline.svg"

const Identifier = () => {
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
    <Link className={identifierStyles.identifier} to="/">
      <IdentifierSVG className={identifierStyles.image} />
      {siteTitle}
    </Link>
  )
}

export default Identifier
