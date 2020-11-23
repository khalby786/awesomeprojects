var md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("datestring", function() {
    return new Date().toString();
  });
  eleventyConfig.addFilter("markdown", function(value) {
    return md.render(value);
  });
  eleventyConfig.addFilter("markdownInline", function(value) {
    return md.renderInline(value);
  });
  eleventyConfig.addFilter("humanDate", function(value) {
    var date = new Date();

    return date
      .toLocaleString("en-US", {
        timeZone: "America/New_York",
        timeStyle: "short",
        dateStyle: "long"
      })
      .toString();
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
