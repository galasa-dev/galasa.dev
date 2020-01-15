---
path: "/docs/which-tests-to-automate"
title: "Which tests should I automate first?"
---

Moving from manual to automated testing minimizes the need to code mundane, repetitive tasks within numerous test scripts. Testers' time can be freed up, providing the opportunity to focus on more complex tests, for example, ad hoc and exploratory tests.

## What makes a manual test a good candidate for automation?

So, how do you decide which manual test to automate first? If you are unfamiliar with Galasa, we would recommend choosing an initial test that is fairly simple, and which can be driven using one of the   Galasa Managers that are available in the current release. Once you are more familiar with Galasa, choosing a test to automate might include these criteria:

- run on a regular basis, for example, regression tests
- used to connect to an existing test environment
- involved with environment set up and tear down 
- screen-scraping tests
- time-consuming to run manually
- repetitive or that cover complex areas (these areas are often prone to human error)
- data entry tests, including test that need multiple data inputs, or large amounts of data
- scheduled to manage throughput and provide bottlenecks for specific resources, hosts or platforms 
- mixed mode tests, for example, tests using a 3270 terminal, batch files and a web service 
- difficult to perform manually, such as concurrency or performance tests
- run on more than one build, or on multiple software and hardware configurations
- run to generate consistent expected results
- run to generate results which need to be filtered, viewed and diagnosed. For example, test results filtered by version.




