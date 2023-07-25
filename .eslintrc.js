/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
module.exports = {
  parser: `@babel/eslint-parser`,
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  rules: {
    "no-anonymous-exports-page-templates": "warn",
    "limited-exports-page-templates": "warn"
  }
}