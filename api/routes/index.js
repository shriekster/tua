var express = require("express");
var router = express.Router();

const { createSession } = require("better-sse");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const session = await createSession(req, res);
  let counter = 0;

  setInterval(() => {
    if (session.isConnected) {
      session.push(counter, "counter", "some-id");
      counter++;
    }
  }, 1000);
});

module.exports = router;
