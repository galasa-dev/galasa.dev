import React from "react"
import { Link } from "gatsby"

import KeyFeature from "../components/key-feature"
import SEO from "../components/seo"

import indexStyles from "./index.module.scss"
import Button from "../components/button"

const keyFeatures = [
  {
    title: "Consistent testing - for all technologies",
    body: (
      <>
        You can write Galasa tests as a JUnit-style Java class and run them
        locally from your IDE or in automation without having to change a single
        line of code. Deep z/OS integration means you can verify data by
        interrogating the CICS application directly and gives you the ability to
        check other z/OS resources, such as messages on queues, without using
        stubs or mocking.
      </>
    ),
  },
  {
    title: "Focus on the test – not the integration problems",
    body: (
      <>
        Galasa’s framework enables deep integration tests to be run across
        multiple technologies. One test case can interact with 3270, Selenium,
        JMeter, batch jobs and more. When you’re ready, Galasa integrates easily
        into your <Link to="/about/devops">DevOps strategy</Link>, and can be
        used alongside other test tools.
      </>
    ),
  },
  {
    title: "Get the test data you need - fast",
    body: (
      <>
        Galasa can integrate with your test data strategy by helping you to
        provision new or existing test data records. Galasa can also lock test
        data so that many tests can run in parallel against the same test data
        pool, making it easy to repeat tests under identical conditions for
        swift debugging. Provisioned environments are automatically
        deprovisioned at test completion, leaving a clean test system state
        ready for the next tests.
      </>
    ),
  },
  {
    title: "See the big picture – from one location",
    body: (
      <>
        Test results and artifacts are stored in a single location in a uniform
        style, enabling easy extraction of big picture information. A single
        place to search all test output makes it easy to quickly identify the
        cause of a failure and run tests locally to assist with debugging.
      </>
    ),
  },
  {
    title: "Test planning and recording – made easy",
    body: (
      <>
        The ability to create a test catalog within Galasa means that you can
        easily define areas under test, enabling automation of even the most
        arduous manual tests and making it easy to record and plan what tests
        have run and what is left to do.
      </>
    ),
  },
  {
    title: "Keep on growing – Galasa grows with you",
    body: (
      <>
        Galasa is open source, so can be extended to support additional tooling
        with no vendor lock-in and no initial cost. The framework supports
        enterprise level through put, as the test workload can be scaled
        horizontally in its own cloud environment.
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
            0.16.0 highlights
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
