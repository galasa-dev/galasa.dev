const React = require("react")

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