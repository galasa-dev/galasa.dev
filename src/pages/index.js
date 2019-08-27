import React from "react"
import { Link } from "gatsby"

import KeyFeature from "../components/key-feature"
import Footer from "../components/footer"

import indexStyles from "../components/index.module.css"

const IndexPage = () => (
  <>
    <div className={indexStyles.heroContainer} />
    <div className={indexStyles.keyFeatureContainer}>
      <KeyFeature title="Lighten the load with automation">
        Let Galasa take care of repetitive, time-consuming manual regression
        tests, so you can focus on designing more complex test cases to root out
        critical application defects.
      </KeyFeature>
      <KeyFeature title="Integrate across systems">
        Galasa integrates easily into your{" "}
        <Link to="/about/devops">delivery pipeline</Link> and can be used
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
        Run large numbers of tests across different environments in parallel by
        using automation. Test output is automatically recorded and stored in a
        single repository, making it easier to quickly identify the cause of a
        failure.
      </KeyFeature>
      <KeyFeature title="Deliver with confidence">
        Run reliable, repeatable, automated test suites to deliver changes
        quickly and with confidence. Dynamically build a test catalog from your
        test code and automatically select relevant regression test cases for a
        specific changeset.
      </KeyFeature>
      <KeyFeature title="Environmentally friendly">
        Run the same test in different test environments without changing a
        single line of code. Speed up problem determination by running test code
        locally on your laptop in debug mode or run a test suite overnight using
        automation. Use an existing z/OS environment, or get an environment
        provisioned specifically for you.
      </KeyFeature>
    </div>
    <Footer />
  </>
)

export default IndexPage
