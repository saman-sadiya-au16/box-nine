const Product = require("../models/products");
const _ = require("lodash");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
const ObjectID = require('mongoose').ObjectID

exports.getProductById = (req, res, next, id) => {
  console.log(req.params);
  Product.findById(id)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  console.log(req.files);
  console.log('req.body :', req.body);
      //destructure the fields
      const { name, description, price } = req.body;

      if (!name || !description || !price ) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }
  
      let product = new Product({...req.body, price: Number(price)});
      console.log(req.files.image);
  if(req.files.image) {
    cloudinary.uploader.upload(req.files.image.tempFilePath, ( err, result) => {
    if (err) {
      res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
        err
        }
        })
    }
    console.log(result)
    const image = result.url;
    product.uploadImageUrl = image;
        //save to the DB
        product.save((err, product) => {
          if (err) {
            console.log('error in db', err)
            res.status(400).json({
              error: "Saving product in DB failed"
            });
          }
          // res.json(product);
          res.redirect('/admin/menu');
        });
    });
    }
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.redirect('/admin/menu');
    // res.json({
    //   message: "Deletion was a success",
    //   deletedProduct
    // });
  });
};

// update controllers
exports.updateProduct = (req, res) => {
  console.log('current product', req.product)
  const { name, description, price, category } = req.body;

  if (!name || !description || !price ) {
    return res.status(400).json({
      error: "Please include all fields"
    });
  }

    //updation code
    // let product = req.product;
    let product = req.product;
    product = _.extend(product, req.body);
    // let product = new Product({...req.body, price: Number(price)});
    console.log(req.files.image);
    if(req.files.image) {
      cloudinary.uploader.upload(req.files.image.tempFilePath, ( err, result) => {
      if (err) {
        res.status(400).json({
          messge: 'someting went wrong while processing your request',
          data: {
          err
          }
          })
      }
      console.log(result)
      const image = result.url;
      product.uploadImageUrl = image;
      // newProduct = {...product, uploadImageUrl: image}
      console.log(product)
          Product.updateOne(
            {_id: req.product._id}, 
            {name: product.name, description: product.description, price: product.price, uploadImageUrl: product.uploadImageUrl, category: product.category}, 
            (err, result) => {
              if (err) {
                res.status(400).json({
                  error: "Updating product in DB failed"
                });
              }
              res.redirect('/admin/menu');
            });
      });
    }
};

//product listing

exports.getAllProducts = (req, res) => {

  Product.find()
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });
};

exports.getAllProductsAdminPage = (req, res) => {
  Product.find()
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      // res.json(products);
      res.render('menu', { title: 'Admin', products: products });
    });
};

exports.getAllProductsUserPage = (req, res) => {
  Product.find()
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      // res.json(products);
      res.render('user', { title: 'User', products: products });
    });
};


