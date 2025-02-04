const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const createToken = require("../services/createToken");

const registerUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) return res.status(400).send("you already have an account please login!");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = await userModel.create({ ...req.body, password: hash });
        const token = createToken(newUser); // Generate the token
        res.cookie('userToken', token, {
            secure: true,     // Cookie only sent over HTTPS
            httpOnly: true,   // Cookie cannot be accessed via JavaScript
            sameSite: 'none', // Helps prevent CSRF attacks
            path: '/',        // Cookie valid across entire site
            domain: '.wearvibe-frontend.vercel.app' // Optional: Use if needed for subdomains
        });
        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("email or password is incorrect");
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) return res.status(400).send("email or password is incorrect");
        const token = createToken(user); // Generate the token
        res.cookie('userToken', token, {
            secure: true,     // Cookie only sent over HTTPS
            httpOnly: true,   // Cookie cannot be accessed via JavaScript
            sameSite: 'none', // Helps prevent CSRF attacks
            path: '/',        // Cookie valid across entire site
            domain: '.wearvibe-frontend.vercel.app' // Optional: Use if needed for subdomains
        });
        res.status(200).send("Successfully logged in");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const logout = (req, res) => {
    if (!req.cookies.userToken) {
        return res.status(400).send("No active session found.");
    }
    res.clearCookie("userToken");
    res.status(200).send("Logged out successfully");
};

module.exports = { registerUser, loginUser, logout };