import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"
import identifierStyles from "./identifier.module.scss"

const Identifier = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      identifier: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "identifier.svg" }
      ) {
        publicURL
      }
    }
  `)

  return (
    <Link className={identifierStyles.identifier} to="/">
      <img
        className={identifierStyles.image}
        alt=""
        src={data.identifier.publicURL}
      />
      {data.site.siteMetadata.title}
    </Link>
  )
}

export default Identifier
