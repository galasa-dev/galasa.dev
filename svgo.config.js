module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
        name: "preset-default",
        params: {
            overrides: {
                removeTitle: false,
            },
        },
    },
    "prefixIds",
    {
      name: "sortAttrs",
      params: {
        xmlnsOrder: "alphabetical",
      },
    },
  ],
}
