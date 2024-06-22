const memberController = require("../controllers/memberController");
const router = require("express").Router();
const isAuth = require("../lib/authMiddleware").isAuth;
const isAdmin = require("../lib/authMiddleware").isAdmin;

router.get("/", isAdmin, memberController.getAllMembers);
router.get("/me", isAuth, memberController.getMemberById);

module.exports = router
