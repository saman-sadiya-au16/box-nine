const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
// const { updateStock } = require("../controllers/products");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getAllOrdersUserPage
} = require("../controllers/order");

//params
// router.param("userId", getUserById);
// router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
  "/order/create/:userId",
//   isSignedIn,
//   isAuthenticated,
//   pushOrderInPurchaseList,
//   updateStock,
  createOrder
);
//read
router.get(
  "/order/all",
  getAllOrders
);

router.get('/userorderdetail/:userId', getAllOrdersUserPage);

//status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
  updateStatus
);

module.exports = router;
