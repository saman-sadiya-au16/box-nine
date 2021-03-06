var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', script: 'adminlogin.js' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Signup', script:  'signup.js'});
});

router.get("/signout", signout);

module.exports = router;