const express = require('express');
const router = express.Router();

// import base model used for router
const Order = require('../models/order');

router.post('/', async (req,res,next) => {
    try {
        // create a new order in the name of the user
        const result = await Order.createOrder();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/', async (req,res,next) => {
    try {
        // fetch all user orders
        const result = await Order.listOrdersForUser();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router