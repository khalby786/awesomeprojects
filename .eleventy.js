var md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("markdown", function(value) {
    return md.render(value);
  });
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (
      outputPath.endsWith(".html") ||
      outputPath.endsWith(".css") ||
      outputPath.endsWith(".js")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      });
      return minified;
    }

    return content;
  });
};
