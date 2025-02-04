const orderModel = require("../models/orderModel");

// initialize stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items, amount, address } = req.body;
        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        });
        res.status(203).send("order placed sucessfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// place order using stripe

const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;
        const newOrder = await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.name,
                },
                unit_amount:
                    item.discountPrice > 0 ? item.discountPrice * 100 : item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 180 * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        res.status(200).send({ session_url: session.url });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// verify payment

const verifyStripe = async (req, res) => {
    try {
        const { orderId, success } = req.body;
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).send("payment success");
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(400).send("payment failed");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUserOrder = async (req, res) => {
    try {
        const userOrders = await orderModel.find({ userId: req.user._id });
        if (!userOrders)
            return res.status(404).send("you haven't placed any order yet");
        res.status(200).send(userOrders);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getOwnerOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find();
        if (!allOrders) return res.status(404).send("no orders yet");
        res.status(200).send(allOrders);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
            status: req.body.status,
        });
        if (!updatedOrder) return res.status(404).send("order not found");
        res.status(200).send("order status updated succesfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    getUserOrder,
    getOwnerOrders,
    updateOrderStatus,
};
