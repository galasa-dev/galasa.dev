---
path: "/docs/contribute"
title: "Contributing to Galasa"
---

Anyone can contribute to the Galasa project and we welcome your contributions!

There are multiple ways to contribute: report bugs, fix bugs, contribute code, improve upon documentation, etc. You must follow these guidelines:

    Raising issues
    Contributor License Agreement
    Coding Standards

### Raising issues

Please raise any bug reports on the Galasa project repository's GitHub issue tracker. Be sure to search the list to see if your issue has already been raised.

A good bug report is one that make it easy for everyone to understand what you were trying to do and what went wrong. Provide as much context as possible so we can try to recreate the issue.

### Contributor License Agreement

If you are contributing code changes via a pull request for anything except trivial changes, you must signoff on the Individual Contributor License Agreement If you are doing this as part of your job you may also wish to get your employer to sign a CCLA Corporate Contributor License Agreement. Instructions how to sign and submit these agreements are located at the top of each document. Trivial changes such as Typos, redundant spaces, minor formatting and spelling errors will be labeled as "CLA trivial", and don't require a signed CLA for consideration.

After we obtain the signed CLA, you are welcome to open a pull request, and the team will be notified for review. We ask you follow these steps through the submission process.

    Ensure you run a passing local gradle build explained in the README before opening a PR.
    Open PR's against the "integration" branch, as we ensure changes pass our series of verification buckets before pushing to master.
    A label will be added "CLA signed" or "CLA trivial" depending on the nature of the change.
    A team of "reviewers" will be notified, will perform a review, and if approved will invoke a full integration build.
    Based on the results of the build, and if further review is needed, more discussion will occur.
    If the reviewer is satisfied with the results, and agrees to the change, the PR will be merged to integration, otherwise the PR will be closed with an explaination and suggestion for followup.

### Coding Standards

Please ensure you follow the coding standards used throughout the existing code base. Some basic rules include:

    all files must have a Copyright including EPL license in the header.
    all PRs must have a passing build.
