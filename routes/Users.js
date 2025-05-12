const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", async (req, res) => {
  try {
    const whereClause = req.query;
    const fields = req.query.fields ? req.query.fields.split(",") : null;
    let data;
    if (Object.keys(whereClause).length > 0) {
      data = await Users.findAll(
        { attributes: fields || undefined },
        { where: { ...whereClause } }
      );
    } else {
      data = await Users.findAll({ attributes: fields || undefined });
    }
    if (data) res.status(200).json(data);
    else res.status(404).json("Not found");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    await Users.create(user);
    res.status(200).json("User created successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { email, ...fieldsToUpdate } = req.body;
    if (!email) {
      return res.status(400).json("Email is required to delete a user.");
    }
    const [updatedUsersCount] = await Users.update(
      { ...fieldsToUpdate },
      { where: { email: email } }
    );
    if (updatedUsersCount > 0) res.status(200).json("Update Successful.");
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
    const deletedCount = await Users.destroy({ where: { email } });

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
