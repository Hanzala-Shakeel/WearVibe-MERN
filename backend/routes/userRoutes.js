const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/userController");
const { verifyUserToken } = require("../middlewares/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.get("/checklogin", verifyUserToken, (req, res) => {
    // If the token is valid, it will reach here
    res.status(200).send("user is logged in");
});

module.exports = router;