export const isSelectedSection = (section, location) => {
  return (
    location.pathname.startsWith(`/${section}/`) ||
    location.pathname === `/${section}`
  )
}
