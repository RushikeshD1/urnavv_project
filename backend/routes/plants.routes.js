const express = require("express");
const { createPlants, fetchAllPlants } = require("../controllers/plants.controller");

const router = express.Router();

router.post("/create", createPlants);
router.get("/fetch", fetchAllPlants);

module.exports = router;