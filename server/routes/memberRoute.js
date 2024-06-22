const memberController = require("../controllers/memberController");
const router = require("express").Router();

router.get("/", memberController.getAllMembers);

module.exports = router
