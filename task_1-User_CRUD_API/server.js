const express = require('express');
const connectDB = require('./db.js');
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extented: false }));

connectDB();

//routes
app.use("/api/products", productRoute);

app.get('/', (req, res) => {
    res.send('Hello from Syntacxhub Backend 1st Task!');
});


// //delete
// app.delete('/api/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
