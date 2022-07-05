const express = require("express");
const User = require("../models/user");
const Store = require("../models/store");
const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        // fetch all posts
        const products = await Store.listProducts();

        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router
