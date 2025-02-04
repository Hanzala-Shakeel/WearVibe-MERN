const mongoose = require("../config/databaseConfig");

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    discountPrice: { type: Number, default: 0 },
    availability: { type: String, required: true },
    category: { type: String, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("products", productSchema);