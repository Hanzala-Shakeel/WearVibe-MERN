const express = require("express");
const router = express.Router();
const { verifyUserToken } = require("../middlewares/authMiddleware");
const { syncCart, getUserCart } = require("../controllers/cartController");

router.post("/synccart", verifyUserToken, syncCart)
router.get("/getusercart", verifyUserToken, getUserCart)

module.exports = router;