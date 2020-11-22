var md = require("markdown-it")();
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addFilter("markdown", function(value) {
    return md.render(value);
  });
};
