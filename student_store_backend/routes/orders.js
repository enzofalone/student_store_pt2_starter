const express = require("express");
const router = express.Router();
const {
  requireAuthenticatedUser,
  extractUserFromJwt,
} = require("../middleware/security");
// import base model used for router
const Order = require("../models/orders");

router.post("/", requireAuthenticatedUser, async (req, res, next) => {
  try {
    // create a new order in the name of the user

    // get user
    const { user } = res.locals;

    // get order from body
    const { order } = req.body;

    // create new order
    const result = await Order.createOrder(user, order);

    res.status(200).json({ order: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", requireAuthenticatedUser, async (req, res, next) => {
  try {
    // fetch all user orders

    // get user
    const { user } = res.locals;
    // get all orders for user
    const result = await Order.listOrdersForUser(user);

    res.status(200).json({ orders: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
