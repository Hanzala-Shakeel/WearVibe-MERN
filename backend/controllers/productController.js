const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");

const createProduct = async (req, res) => {
    try {
        const { name, price, discountPrice, availability, category, description } = JSON.parse(req.body.formData);
        const owner = await ownerModel.findOne();
        if (!owner) return res.status(404).send("owner not found");

        // Upload image to Cloudinary
        const result = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            async (error, result) => {
                if (error) return res.status(500).send('Cloudinary upload failed');

                // Save post in DB with Cloudinary image URL
                const newProduct = await productModel.create({
                    name,
                    price,
                    discountPrice,
                    availability,
                    description,
                    category,
                    image: result.secure_url, // Cloudinary URL of the uploaded image
                });

                await newProduct.save();
                owner.products.push(newProduct._id);
                await owner.save();
                res.status(201).send('Product created successfully')
            }
        );

        // Write file buffer to Cloudinary stream
        result.end(req.file.buffer);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find()
        if (allProducts.length < 1) return res.status(404).send("no products found");
        res.status(200).send(allProducts);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) return res.status(404).send("Product not found or already deleted");
        const owner = await ownerModel.findOne();
        if (owner) {
            const index = owner.products.indexOf(productId);
            if (index > -1) owner.products.splice(index, 1);
            await owner.save();
        }
        res.status(200).send("product deleted successfully");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await productModel.findByIdAndUpdate(productId, { availability: req.body.availability });
        res.status(200).send("product updated successfully");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.productId })
        if (!product) return res.status(404).send("no product found");
        res.status(200).send(product);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports = { createProduct, getAllProducts, getProduct, deleteProduct, updateProduct };