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
  var project = request(
    "GET",
    `http://api.glitch.com/projects/${res.items[i].domain}`,
    {
      headers: {
        "user-agent": "AwesomeProjects/1.0 (https://support.glitch.com/t/34560)"
      }
    }
  );
  project = JSON.parse(project.getBody());
  obj.push({
    title: res.items[i].domain,
    description: res.items[i].description,
    url: `https://${res.items[i].domain}.glitch.me`,
    lastUpdated: project.updatedAt,
    users: project.users,
    readme: request(
      "GET",
      `https://api.glitch.com/projects/${res.items[i].domain}/readme`,
      {
        headers: {
          "user-agent":
            "AwesomeProjects/1.0 (https://support.glitch.com/t/34560)"
        }
      }
    )
      .getBody()
      .toString()
  });
  i++;
}
module.exports = obj;
