import React from "react"
import { Link } from "gatsby"

import KeyFeature from "../components/key-feature"
import SEO from "../components/seo"

import indexStyles from "./index.module.scss"
import Button from "../components/button"

const keyFeatures = [
  {
    title: "Lighten the load with automation",
    body: (
      <>
        With Galasa you can run reliable, repeatable, scalable, automated
        integration tests instead of time-consuming manual ones. Use the time
        saved to focus on designing more complex tests to root out those
        hard-to-find application defects.
      </>
    ),
  },
  {
    title: "Integrate across systems",
    body: (
      <>
        Galasa integrates easily into your{" "}
        <Link to="/about/devops">DevOps strategy</Link> and can be used
        alongside other test tools. Able to access external files and commands,
        Galasa comes with pluggable support for deep integration with multiple
        Operating Systems, including z/OS subsystems.
      </>
    ),
  },
  {
    title: "Get the test data you need, fast",
    body: (
      <>
        Galasa can integrate with your test data strategy by helping you to
        provision new or existing test data records. Galasa can also lock test
        data so that many tests can run in parallel against the same test data
        pool, making it easy to repeat tests under identical conditions for
        swift debugging.
      </>
    ),
  },
  {
    title: "Fly through test cases",
    body: (
      <>
        Use Galasa to run large numbers of tests across different environments
        in parallel - no environment is too complex. You can use an existing
        environment, or provision an environment specifically for your own use.
      </>
    ),
  },
  {
    title: "Speed up diagnosis",
    body: (
      <>
        Galasa automatically records test artifacts and stores the results in a
        single repository - a single place to search all test output. This makes
        it easy to quickly identify the cause of a failure and run tests locally
        to assist with debugging.
      </>
    ),
  },
  {
    title: "Environmentally friendly",
    body: (
      <>
        With Galasa you can run the same test in different test environments
        without changing a single line of code. Provisioned environments are
        automatically deprovisioned at test completion, leaving a clean test
        system state ready for the next tests.
      </>
    ),
  },
]

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <div className={indexStyles.heroContainer}>
      <div>
        <h1 className={indexStyles.heroTitle}>
          Deep integration testing for power-seeking testers
        </h1>
        <p className={indexStyles.heroDescription}>
          Start running repeatable, reliable, automated tests and deliver your
          software changes faster and with confidence.
        </p>
        <p className={indexStyles.announceBanner}>
          Release 0.6.0 of Galasa is now available!
        </p>
        <p className={indexStyles.announceDescription}>
          Highlights:
          <ul>
            <li>Selenium Manager (alpha)</li>
            <li>JMeter Manager (alpha)</li>
            <li>
              Documentation update -{" "}
              <i>Writing your own independent Galasa tests</i>
            </li>
          </ul>
          <Link
            to="/docs/getting-started/installing"
            className={indexStyles.announceLink}
          >
            Install
          </Link>{" "}
          the Galasa Eclipse plug-in today.
        </p>
        <div className={indexStyles.heroButtons}>
          <Button target={"/docs/getting-started"} flash={true} primary={true}>
            Get Started
          </Button>
          <Button target={"/about"}>Learn more</Button>
        </div>
      </div>
    </div>
    <div className={indexStyles.keyFeatureContainer}>
      {keyFeatures.map((item, i) => {
        return (
          <KeyFeature title={item.title} index={i}>
            {item.body}
          </KeyFeature>
        )
      })}
    </div>
  </>
)

export default IndexPage
