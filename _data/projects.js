var config = require("../config.js");
var request = require("sync-request");
var res = request(
  "GET",
  `https://api.glitch.com/v1/collections/by/fullUrl/projects?orderKey=createdAt&orderDirection=ASC&fullUrl=${config.collection}`,
  {
    headers: {
      "user-agent": "AwesomeProjects/1.0 (https://support.glitch.com/t/34560)"
    }
  }
);
res = JSON.parse(res.getBody());
var obj = [];
var i = 0;
while (i < res.items.length) {
  obj.push({
    title: res.items[i].domain,
    description: res.items[i].description,
    url: `https://${res.items[i].domain}.glitch.me`,
    readme: request(
      "GET",
      `https://api.glitch.com/projects/${res.items[i].domain}/readme`,
      {
        headers: {
          "user-agent": "example-user-agent"
        }
      }
    )
      .getBody()
      .toString()
  });
  i++;
}
module.exports = obj;
