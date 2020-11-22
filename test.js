var request = require("sync-request");
var res = request(
  "GET",
  "https://api.glitch.com/v1/collections/by/fullUrl/projects?orderKey=createdAt&limit=50&orderDirection=ASC&fullUrl=aboutDavid/awesome-projects",
  {
    headers: {
      "user-agent": "example-user-agent"
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
console.log(obj);
