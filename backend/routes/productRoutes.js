const express = require("express");
const router = express.Router();
const {verifyOwnerToken} = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { createProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productController");

router.post("/createproduct", verifyOwnerToken, uploadMiddleware.single('image'), createProduct)
router.get("/getallproducts", getAllProducts);
router.get("/getproduct/:productId", getProduct);
router.delete("/delete/:id", verifyOwnerToken, deleteProduct);
router.put("/update/:id", verifyOwnerToken, updateProduct);

module.exports = router;