const express = require("express");
const { UserAuth } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const authData = req.body;
    const data =await UserAuth.findOne({ where: { email: authData.email } });
    if (!data) {
      await UserAuth.create(authData);
      res.status(200).json("User created successfully.");
    } else res.status(409).json("User already exists.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const fields = req.query.fields ? req.query.fields.split(",") : null;
    if (!email) res.status(417).json("Email is requires");
    const data = await UserAuth.findOne(
      {
        attributes: fields || undefined,
      },
      { where: { email } }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { email, ...fieldsToUpdate } = req.body;
    if (!email) res.status(417).json("Email is requires");
    const updatedCount = await UserAuth.update(
      { ...fieldsToUpdate },
      { where: { email: email } }
    );
    if (updatedCount > 0) res.status(200).json("Update Successful.");
    else res.status(404).json("No Changes.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json("Email is required to delete a user.");
    }
    const deletedCount = await UserAuth.destroy({ where: { email } });

    if (deletedCount > 0) {
      res.status(200).json("User deleted successfully.");
    } else {
      res.status(404).json("User not found or already deleted.");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error.");
  }
});

module.exports = router;
