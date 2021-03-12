const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const Cart = require("../models/cart");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID

// router.param("userId", getUserById);

router.post("/cart/:userId", async (req, res) => {
    const { productId, quantity, name, price } = req.body;

    const userId = req.params.userId; //TODO: the logged in user id
    console.log(userId);

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);

        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
            let productItem = cart.products[itemIndex];
            productItem.quantity = productItem.quantity + quantity;
            productItem.price = productItem.price + price;
            cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
            cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
            userId,
            products: [{ productId, quantity, name, price }]
        });

        return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});



router.get("/cart/:userId", async (req, res) => {
    const userId = req.params.userId; 
    console.log(userId);

    try {
        let cart = await Cart.findOne({ userId });
        console.log('cart', cart);
        let totalPrice = 0;
        console.log(totalPrice);
        if (cart) {
        //cart exists for user
        for (const product of cart.products) {
            totalPrice += product.price
        }
        console.log(totalPrice);
        return res.render('cart', { title: 'User', cart: cart, totalPrice: totalPrice });
    } else {
        //no cart for user, create new cart
        return res.render('cart', { title: 'User', cart: [], totalPrice: totalPrice });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;