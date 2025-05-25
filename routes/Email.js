const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/Email");

router.post("/email", async (req, res) => {
  try {
    const { type, ...payload } = req.body;

    if (!type || !payload.to) {
      return res
        .status(400)
        .json({ error: "'type' and 'to' fields are required" });
    }

    const info = await sendEmail(type, payload);
    res.status(200).json({ message: "Email sent", id: info.messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
