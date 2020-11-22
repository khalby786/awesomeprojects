var md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addFilter("markdown", function(value) {
    return md.render(value);
  });
};
