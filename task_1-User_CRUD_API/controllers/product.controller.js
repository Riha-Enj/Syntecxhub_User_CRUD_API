const Product = require('../models/product.model');

//read all
const getProducts = async (req, res) => {
    try {
        //pagintation
        const page = req.query.page || 1;
        const productPerPage = 2;

        const products = await Product.find()
            .skip((page - 1) * productPerPage)
            .limit(productPerPage);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//read by ID
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//create
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get categories
const getCategories = async (req, res) => {
    try {
        const category = await Product.distinct('category');
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//filter by category
const filterByCategory = async (req, res) => {
    try {
        const { categoryName: category } = req.params;

        const categoryExists = await Product.exists({ category });
        if (!categoryExists) {
            return res.status(404).json({ message: "Category Not Found." });
        }

        const products = await Product.find({ category });
        // category cannot be assigned with out qny products by the model we made!
        // if (products.length == 0){
        //     return res.status(404).json({message: "No products found in this category"});
        // }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//filter by price range
const filterByPriceRange = async (req, res) => {
    try {
        const { maxPrice } = req.query;
        const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;

        if (!maxPrice) {
            return res.status(400).json({ message: "Provide a maxPrice." });
        }

        const products = await Product.find({ price: { $lte: maxPrice, $gte: minPrice } });

        if (products.length == 0) {
            return res.status(404).json({ message: "No Products found within this price range." })
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    filterByCategory,
    filterByPriceRange
};