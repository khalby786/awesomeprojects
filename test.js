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
console.log(res);
