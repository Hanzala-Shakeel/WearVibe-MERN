const express = require("express");
const router = express.Router();
const { verifyUserToken, verifyOwnerToken } = require("../middlewares/authMiddleware");
const { placeOrder, placeOrderStripe, verifyStripe, getUserOrder, getOwnerOrders, updateOrderStatus } = require("../controllers/orderController");

// for users
router.post("/placeorder", verifyUserToken, placeOrder);
router.get("/getuserorders", verifyUserToken, getUserOrder);

// payment routes for users
router.post("/placeorderstripe", verifyUserToken, placeOrderStripe);
router.post("/verifystripe", verifyUserToken, verifyStripe);

// for owner
router.get("/getownerorders", verifyOwnerToken, getOwnerOrders);
router.put("/updateorderstatus/:id", verifyOwnerToken, updateOrderStatus);

module.exports = router;