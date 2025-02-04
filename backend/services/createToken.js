const jwt = require("jsonwebtoken");

const createToken = (person) => {
    const token = jwt.sign({ _id: person._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = createToken;