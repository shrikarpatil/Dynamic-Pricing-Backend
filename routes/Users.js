const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { where } = require("sequelize");

router.get("/", async (req, res) => {
  try {    
    const { fields, ...filters } = req.query;

    const attributes = fields ? fields.split(",") : undefined;

    const options = {
      where: filters,
      attributes,
    };

    const data = await Users.findAll(options);

    if (data && data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json("Not found");
    }
  } catch (error) {
    console.error("Error in GET /users:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const data = await Users.findOne({ where: { email: user.email } });
    if (!data) {
      await Users.create(user);
      res.status(200).json("User created successfully.");
    } else res.status(409).json("User already exists.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const fieldsToUpdate = req.body;
    const { email } = req.query;
    if (!email) {
      return res.status(400).json("Email is required to update a user.");
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
