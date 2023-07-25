/*
 * Copyright contributors to the Galasa project
 *
 * SPDX-License-Identifier: EPL-2.0
 */
export const isSelectedSection = (section, location) => {
  return (
    location.pathname.startsWith(`/${section}/`) ||
    location.pathname === `/${section}`
  )
}
