import React from "react"

import keyFeatureStyles from "./key-feature.module.scss"

const KeyFeature = ({ children, title }) => {
  return (
    <div className={keyFeatureStyles.keyFeature}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default KeyFeature
