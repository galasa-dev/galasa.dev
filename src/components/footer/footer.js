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
        <Identifier id="footer-identifier" />
      </div>
      <div className={footerStyles.links}>
        <a
          href="https://www.ibm.com/privacy/us/en/"
          target="blank"
          rel="noopener noreferrer"
        >
          Privacy policy
        </a>
        <a
          href="https://www.ibm.com/legal"
          target="blank"
          rel="noopener noreferrer"
        >
          Terms of use
        </a>
      </div>
      <div>An open source project by IBM. Built in Hursley, UK.</div>
      <div>
        <a
          className={footerStyles.icon}
          href={consts.github_org_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubSVG />
        </a>
        <a
          className={footerStyles.icon}
          href={consts.twitter_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterSVG />
        </a>
        <a
          className={footerStyles.icon}
          href={consts.spectrum_url}
          target="blank"
          rel="noopener noreferrer"
        >
          <SpectrumSVG />
        </a>
      </div>
    </div>
  )
}

export default Footer
