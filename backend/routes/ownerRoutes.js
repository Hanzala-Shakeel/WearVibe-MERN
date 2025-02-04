const express = require("express");
const router = express.Router();
const { createOwner, loginOwner, logout } = require("../controllers/ownerController");
const { verifyOwnerToken } = require("../middlewares/authMiddleware");

if (process.env.NODE_ENV === "development") {
    router.post("/create", createOwner);
}

router.post("/login", loginOwner);

router.post("/logout", logout);

router.get("/checklogin", verifyOwnerToken, (req, res) => {
    // If the token is valid, it will reach here
    res.status(200).send("Owner is logged in");
});

module.exports = router;