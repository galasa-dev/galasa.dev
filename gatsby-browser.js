exports.onRouteUpdate = () => {
  if (typeof window.createPageviewTagForSPA === "function") {
    window.createPageviewTagForSPA()
  }
}

