import React from "react"

import Identifier from "../identifier/identifier"
import GitHubSVG from "../../images/github.inline.svg"
import TwitterSVG from "../../images/twitter.inline.svg"
import SpectrumSVG from "../../images/spectrum.inline.svg"
import footerStyles from "./footer.module.scss"

import consts from "../../data/consts"

const Footer = () => {
  return (
    <div className={footerStyles.footer}>
      <div className={footerStyles.identifier}>
        <Identifier />
      </div>
      <div>An open source project by IBM. Built in Hursley, UK.</div>
      <div>
        <a className={footerStyles.icon} href={consts.github_org_url}>
          <GitHubSVG />
        </a>
        <a className={footerStyles.icon} href="https://twitter.com/galasa_dev">
          <TwitterSVG />
        </a>
        <a className={footerStyles.icon} href="https://spectrum.chat/galasa">
          <SpectrumSVG />
        </a>
      </div>
    </div>
  )
}

export default Footer
