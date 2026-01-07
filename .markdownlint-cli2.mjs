export default {
  config: {
  		"no-duplicate-header": false,
      "no-trailing-punctuation": false,
      "header-style": {
          "style": "atx"
      },
      "no-inline-html": false,
      "line-length": {
          "line_length": 120,
          "tables":      false,
          "code_blocks": false
      },
      "code-block-style": false,
      "ol-prefix": {
          "style": "ordered"
      }
  },
  ignores: ["node_modules", "CHANGELOG.md"]
};
