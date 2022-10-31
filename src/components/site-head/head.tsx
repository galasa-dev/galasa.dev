/* Copyright contributors to the Galasa project */
import PropTypes from "prop-types"
import React from "react"
import { SearchHead } from "../search"

import SEO from "../seo"


interface Props {
    title: string,
    description: string,
    data: any,
}

const SiteHead = ({title, description, data}: Props) => {
    return (
        <>
            <SEO title={title} description={description} />
            <SearchHead data={data} />
        </>
    )
}

SiteHead.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    data: PropTypes.any,
  }

export default SiteHead