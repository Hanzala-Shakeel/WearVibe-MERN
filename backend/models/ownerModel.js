const mongoose = require("../config/databaseConfig");

const ownerSchema = mongoose.Schema({
    fullname: { type: String, minLength: 3, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        default: []
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("owner", ownerSchema);