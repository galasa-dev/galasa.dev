---
path: "/docs/galasa-web-ui/test-run-information"
title: "Viewing test run information"
---

Selecting a test run from the table in <a href="http://cicsk8sm.hursley.ibm.com:32612/results" target="_blank">the Test History page</a>, takes you to the Run Test Detail page where you can view the details for that specific run.

Select the **Overview** tab to display information about the run, such as *Result*, *Run Name*, *Short Name*, *Bundle*, *Test Class*, *Engine*, *LPAR*, *Requestor*, *Requested time*, *Start time*, *Finished time*, and any *Tags* that are associated with the run. The tab also shows the duration of the run from start to finish. 
While the *Result* value shows the result of the Galasa test as a whole, there is a table showing the result of each individual test method within the class at the bottom of the **Overview** tab, enabling you to diagnose in more detail.

## Searching the run log
Click the **Run Log** tab to view the entire run log for the Galasa test. Two facilities are available for searching the run log for specific strings or phrases; the **Search** facility finds exact matches and the **Regex** facility uses regular expressions. By selecting the *Filter Results* checkbox, lines that do not contain a match for the search are hidden.
If there is a line in the run log that you want to come back to, you can bookmark it by using a line marker icon.
