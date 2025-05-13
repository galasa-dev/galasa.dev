/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
const { globalStyle } = require("./src/components/layout/layout.module.scss")


exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ className: globalStyle })
}