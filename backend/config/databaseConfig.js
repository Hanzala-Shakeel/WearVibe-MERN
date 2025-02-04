const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

mongoose.connect(process.env.MONGODB_URI).then(() => {
    dbgr("connected to mongodb");
}).catch((err) => {
    dbgr(err);
})

module.exports = mongoose;