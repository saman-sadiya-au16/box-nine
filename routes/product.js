const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/products");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");


//all of params
// router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
//create route
router.post(
  "/create",
  createProduct
);

// read routes
router.get("/detail/:productId", getProduct);
// router.get("/product/photo/:productId", photo);

//delete route
router.delete(
  "/delete/:productId",
  // isSignedIn,
  // isAuthenticated,
  // isAdmin,
  deleteProduct
);

//update route
router.put(
  "/update/:productId",
    // isSignedIn,
    // isAuthenticated,
    // isAdmin, 
    updateProduct
);

router.get('/updateform/:productId', function(req, res) {
  console.log(req.product)
  res.render('updateform', { title: 'Admin', product: req.product });
});

//listing route
router.get("/products", getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
