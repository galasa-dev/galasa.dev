/* Copyright contributors to the Galasa project */
import PropTypes from "prop-types"
import React from "react"
import { SearchHead } from "../search"

import SEO from "../seo"


interface Props {
    title: string,
    data: any,
}

const SiteHead = ({title, data}: Props) => {
    return (
        <>
            <SEO title={title} />
            <SearchHead data={data} />
        </>
    )
}

SiteHead.propTypes = {
    title: PropTypes.string,
    data: PropTypes.any,
  }

export default SiteHead