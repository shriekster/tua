import express from "express";

const router = express.Router();

router.post("/", async function (req, res) {
  res.json({
    auth: "HELLO",
  });
});

export default router;
