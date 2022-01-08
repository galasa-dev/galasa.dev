/* Copyright contributors to the Galasa project */

import React from "react"

import {
  keyFeature,
  info,
  title as titleStyle,
  body,
  illustration as illustrationStyle,
} from "./key-feature.module.scss"

import OddIllustrationSVG from "../../images/key-feature-odd.inline.svg"
import EvenIllustrationSVG from "../../images/key-feature-even.inline.svg"

const KeyFeature = ({ children, title, index }) => {
  const illustration =
    index % 2 === 0 ? <EvenIllustrationSVG /> : <OddIllustrationSVG />

  return (
    <div className={keyFeature}>
      <div className={info}>
        <h3 className={titleStyle}>{title}</h3>
        <div className={body}>{children}</div>
      </div>
      <div className={illustrationStyle}>{illustration}</div>
    </div>
  )
}

export default KeyFeature
