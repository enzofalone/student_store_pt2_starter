const express = require("express");
const User = require("../models/user");
const Order = require("../models/orders");
const router = express.Router();
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
}
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false });
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = User.makePublicUser(user);
    const userOrders = await Order.listOrdersForUser(publicUser.email);
    return res.status(200).json({ orders: userOrders, user: publicUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
