/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */

export const normalisePath = (/** @type {String} */ input) => {
  while (input.length > 0 && input.charAt(input.length - 1) === "/") {
    input = input.substr(0, input.length - 1)
  }
  return input
}

export const isSamePath = (
  /** @type {String} */ path1,
  /** @type {String} */ path2
) => {
  return normalisePath(path1) === normalisePath(path2)
}
