require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const dbgr = require("debug")("development:index");

app.use(express.json());

app.use(cors({
    origin: ['https://wearvibe-frontend.vercel.app', 'https://wearvibe-admin.vercel.app', 'https://shop-drab-chi.vercel.app'], // Adjust to the frontend URL if different
    credentials: true // Allow credentials (cookies) to be included
}));

app.use(cookieParser());

app.use("/", router);

app.listen(3000, () => {
    dbgr("server is running on port 3000");
})