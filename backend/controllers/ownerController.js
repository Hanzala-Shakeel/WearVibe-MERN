const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");
const createToken = require("../services/createToken");

const createOwner = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const owner = await ownerModel.find();
        if (owner.length > 0) return res.status(403).send("you dont have permission to create a new owner");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password: hash
        })
        res.status(201).send({ message: "owner created sucessfully", createdOwner });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const loginOwner = async (req, res) => {
    try {
        const owner = await ownerModel.findOne({ email: req.body.email });
        if (!owner) return res.status(400).send("email or password is incorrect");
        const passwordMatch = await bcrypt.compare(req.body.password, owner.password);
        if (!passwordMatch) return res.status(400).send("email or password is incorrect");
        const token = createToken(owner); // Generate the token
        res.cookie('userToken', token, {
            secure: true,     // Cookie only sent over HTTPS
            httpOnly: true,   // Cookie cannot be accessed via JavaScript
            sameSite: 'Strict', // Helps prevent CSRF attacks
            path: '/',        // Cookie valid across entire site
            domain: 'https://wearvibe-admin.vercel.app' // Optional: Use if needed for subdomains
        });
        res.status(200).send("Successfully logged in");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const logout = (req, res) => {
    if (!req.cookies.ownerToken) {
        return res.status(400).send("No active session found.");
    }
    res.clearCookie("ownerToken");
    res.status(200).send("Logged out successfully");
};

module.exports = { createOwner, loginOwner, logout };