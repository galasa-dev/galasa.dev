require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
  if (typeof window.createPageviewTagForSPA === "function") {
    window.createPageviewTagForSPA()
  }
}

