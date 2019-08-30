import React from "react"
import { Link } from "gatsby"

import KeyFeature from "../components/key-feature"
import Footer from "../components/footer"

import indexStyles from "./index.module.scss"

const IndexPage = () => (
  <>
    <div className={indexStyles.heroContainer} />
    <div className={indexStyles.keyFeatureContainer}>
      <KeyFeature title="Lighten the load with automation">
        With Galasa you can run reliable, repeatable, scalable, automated
        integration tests instead of time-consuming manual ones. Use the time
        saved to focus on designing more complex tests to root out those
        hard-to-find application defects.
      </KeyFeature>
      <KeyFeature title="Integrate across systems">
        Galasa integrates easily into your{" "}
        <Link to="/about/devops">DevOps pipeline</Link> and can be used
        alongside other test tools, such as JMeter and WSIM. Galasa can access
        z/OS files and commands, and comes with built-in support for integration
        with other z/OS subsystems.
      </KeyFeature>
      <KeyFeature title="Get the test data you need, fast">
        Galasa can provision the test data that you need or can find data that
        matches your requirements from an existing data pool, removing the need
        to manually create or locate valid test data each time a test is run.
        Tests are isolated from changes in test data, making it easy to repeat
        tests for swift debugging.
      </KeyFeature>
      <KeyFeature title="Fly through test cases">
        Use Galasa to run large numbers of tests across different environments
        in parallel by using automation. You can use an existing mainframe
        environment, or get an environment provisioned specifically for you.
      </KeyFeature>
      <KeyFeature title="Speed up diagnosis">
        Galasa automatically records test artifacts and stores the results in a
        single repository, making it easier to quickly identify the cause of
        failure.
      </KeyFeature>
      <KeyFeature title="Environmentally friendly">
        With Galasa you can run the same test in different test environments
        without changing a single line of code. Speed up problem determination
        by running test code locally on your laptop in debug mode or run a test
        suite overnight using automation.
      </KeyFeature>
    </div>
    <Footer />
  </>
)

export default IndexPage
