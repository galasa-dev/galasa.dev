const React = require("react")

if (process.env.GATSBY_GALASA_ENV !== "LOCAL") {
  console.log("Non-local build - adding tracking.")

  exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }, pluginOptions) => {
    
    const totalComponents = getHeadComponents()
    totalComponents.push(<script type="text/javascript" dangerouslySetInnerHTML={{
      __html: `
        window.idaPageIsSPA = true;
        window.digitalData = {
          page: {
            category: {
              primaryCategory: 'NO_CATEGORY_ASSIGNED',
            },
            pageInfo: {
              ibm: {
                  siteID: 'IBM_NONMARKETING',
              }
            },
          }
        };
      `
    }}></script>)
    totalComponents.push(<script src="//1.www.s81c.com/common/stats/ibm-common.js" type="text/javascript" async></script>)
    replaceHeadComponents(totalComponents)
  }
} else {
  console.log("Local build - no tracking.")
}