import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/400-italic.css"
import "@fontsource/ibm-plex-mono/700.css"
import "@fontsource/ibm-plex-mono/700-italic.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/400-italic.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/work-sans/400.css"
import "@fontsource/work-sans/500.css"
import "@fontsource/work-sans/600.css"

export const onRouteUpdate = () => {
  if (typeof window.createPageviewTagForSPA === "function") {
    window.createPageviewTagForSPA()
  }
}

