import React from "react"

const fontsUrl =
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono&display=swap"

export const FontsHead = () => {
    return (
      <>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href={fontsUrl} rel="stylesheet" />
      </>
    );
  }