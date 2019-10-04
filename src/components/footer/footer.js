import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

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
      <div>An open source project by IBM. Built in Hursley, UK.</div>
      <div>
        <OutboundLink
          className={footerStyles.icon}
          href={consts.github_org_url}
        >
          <GitHubSVG />
        </OutboundLink>
        <OutboundLink className={footerStyles.icon} href={consts.twitter_url}>
          <TwitterSVG />
        </OutboundLink>
        <OutboundLink className={footerStyles.icon} href={consts.spectrum_url}>
          <SpectrumSVG />
        </OutboundLink>
      </div>
    </div>
  )
}

export default Footer
