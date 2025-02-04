const express = require("express");

const router = express.Router();

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const ownerRoutes = require("./ownerRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");

router.get("/", (req, res) => {
    res.send("working");
})
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/owner", ownerRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

module.exports = router;