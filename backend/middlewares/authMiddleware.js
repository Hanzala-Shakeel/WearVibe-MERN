// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
    const token = req.cookies.userToken; // Token from cookies

    if (!token) {
        return res.status(401).send("Access Denied: No Token Provided");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = verified; // Store the decoded user information in the request
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

const verifyOwnerToken = (req, res, next) => {
    const token = req.cookies.ownerToken; // Token from cookies

    if (!token) {
        return res.status(401).send("Access Denied: No Token Provided");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.owner = verified; // Store the decoded user information in the request
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = { verifyUserToken, verifyOwnerToken };