---
path: "/docs/introduction/choosing"
title: "What are the best tests to automate?"
---

How do you decide which manual test to automate first? Initially you might want to pick a test that's relatively straightforward to automate, particularly if it's run on a regular basis or if it's used by many test cases. 

Once you've got more experience with Galasa automation, other good candidates include tests that are:

- used to connect to an existing test environment
- involved in environment set up and tear down
- screen-scraping tests
- time-consuming to run manually
- repetitive or that cover complex areas (these areas are often prone to human error)
- data entry tests, including test that need multiple data inputs, or large amounts of data
- scheduled to manage throughput and provide bottlenecks for specific resources, hosts or platforms
- mixed mode tests, for example, tests using a 3270 terminal, batch files and a web service
- difficult to perform manually, such as concurrency or performance tests
- run on more than one build, or on multiple software and hardware configurations 
- run to generate consistent expected results
