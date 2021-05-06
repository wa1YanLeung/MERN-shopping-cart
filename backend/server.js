require("dotenv").config();
const path = require('path');
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Api running")
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));