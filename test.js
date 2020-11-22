var request = require("sync-request");
var res = request("GET", "https://example.com", {
  headers: {
    "user-agent": "example-user-agent"
  }
});
console.log(res.getBody());
