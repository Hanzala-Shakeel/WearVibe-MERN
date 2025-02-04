const mongoose = require("../config/databaseConfig");

const userSchema = mongoose.Schema({
    name: { type: String, minLength: 3, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);