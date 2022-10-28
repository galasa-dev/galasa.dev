/* Copyright contributors to the Galasa project */
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"


interface Props {
  description?: string,
  title?: string,
  children?: React.ReactElement[]
}

const SEO = ({ description = "", title, children }: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const siteTitle =
    site.siteMetadata.title.charAt(0).toUpperCase() +
    site.siteMetadata.title.slice(1)
  return (
    <>
      <title>{title} | {siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
}

export default SEO
