import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"
import identifierStyles from "./identifier.module.scss"
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
    <Link id={id} className={identifierStyles.identifier} to="/">
      <IdentifierSVG className={identifierStyles.image} />
      {siteTitle}
    </Link>
  )
}

export default Identifier
