/* Copyright contributors to the Galasa project */

import React from "react"

import keyFeatureStyles from "./key-feature.module.scss"
import OddIllustrationSVG from "../../images/key-feature-odd.inline.svg"
import EvenIllustrationSVG from "../../images/key-feature-even.inline.svg"

const KeyFeature = ({ children, title, index }) => {
  const illustration =
    index % 2 === 0 ? <EvenIllustrationSVG /> : <OddIllustrationSVG />

  return (
    <div className={keyFeatureStyles.keyFeature}>
      <div className={keyFeatureStyles.info}>
        <h3 className={keyFeatureStyles.title}>{title}</h3>
        <div className={keyFeatureStyles.body}>{children}</div>
      </div>
      <div className={keyFeatureStyles.illustration}>{illustration}</div>
    </div>
  )
}

export default KeyFeature
