import React from "react"
import { Link } from "gatsby"

import Identifier from "../identifier/identifier"
import GitHubSVG from "../../images/github.inline.svg"
import TwitterSVG from "../../images/twitter.inline.svg"
import SpectrumSVG from "../../images/spectrum.inline.svg"
import footerStyles from "./footer.module.scss"

const Footer = () => {
  return (
    <div className={footerStyles.footer}>
      <div className={footerStyles.identifier}>
        <Identifier />
      </div>

      <div className={footerStyles.links}>
        <Link to="/blogs">Blogs</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/brand">Logo &amp; Assets</Link>
        <Link to="/contribute">Contribute</Link>
      </div>
      <div>An open source project by IBM. Built in Hursley, UK.</div>
      <div>
        <a className={footerStyles.icon} href="#github">
          <GitHubSVG />
        </a>
        <a className={footerStyles.icon} href="#twitter">
          <TwitterSVG />
        </a>
        <a className={footerStyles.icon} href="#spectrum">
          <SpectrumSVG />
        </a>
      </div>
    </div>
  )
}

export default Footer
