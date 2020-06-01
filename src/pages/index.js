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
        you save to focus on designing more complex tests to root out those
        hard-to-find application defects.
      </>
    ),
  },
  {
    title: "Integrate across systems",
    body: (
      <>
        Whether your application runs in z/OS, on Linux, inside a container, or
        as combination of those, Galasa can interrogate all parts of that
        application and integrate a mix of tooling into a single test. When
        you’re ready, Galasa integrates easily into your{" "}
        <Link to="/about/devops">DevOps strategy</Link>, and can be used
        alongside other test tools.
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
          Deep integration testing for z/OS powered hybrid cloud applications
        </h1>
        <p className={indexStyles.heroDescription}>
          Allowing you to test applications at scale regardless of platform -
          including z/OS
        </p>
        <br></br>
        <div className={indexStyles.heroButtons}>
          <Button target={"/docs/getting-started"} flash={true} primary={true}>
            Get Started
          </Button>
          <Button target={"/about"} flash={true} primary={true}>
            Learn more
          </Button>
          <Button target={"/releases"} flash={true} primary={true}>
            0.8.0 highlights
          </Button>
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
