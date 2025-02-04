const userModel = require("../models/userModel");

const syncCart = async (req, res) => {
    try {
        const cartData = req.body.cart;
        const user = await userModel.findOne({ _id: req.user._id });
        user.cart = cartData;
        await user.save()
        res.status(200).send("cart updated success");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const getUserCart = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.user._id });
        const userCart = user.cart;
        if (userCart.length === 0) return res.status(404).send("user cart is empty");
        res.status(200).send(userCart);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { syncCart, getUserCart };