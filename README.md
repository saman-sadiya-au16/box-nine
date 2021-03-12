# Project Documentation
### - Online Food Delivery System
#
* step 1: `git clone <repo_url>`
* step 2: `cd <repo_name>`
* step 3: `git checkout dev`
* step 4: `open folder in your code editor`
#

## Technologies used

- Nodejs.
- Expressjs.
- Mongodb.
- Mongoose.
- Mongoose unique validator.
- Crypto.
- Javascript.
- DOM manipulation.
- Template engine (hbs).
- Css/Bootstrap.
- Express file-upload.
- Cloudinary.
- Heroku.

## Routes

### User routes: 

* `/user`

In this page admin can add menu items to the cart and navigate to other user routes.

* `/cart/cart/:userid`

In this user can place order and enter order address.

* `/order/userorderdetail/:userid`

In this user can view all orders.


### Admin routes: 

* `/admin`

This is admin dashboard in this route admin can have a look at orders in brief and navigate to other admin routes.

* `/admin/menu`

This is admin menu page where admin can add items to the menu update and delete items.

To add the items click on add more items.

To update the each food item click on update.

* `/order/order/all`

In this route admin can see all the orders which are Cancelled Delivered/Processing/Recieved with user details.

* `/admin/trackorder`

In this route admin can mark the status of the orders.


## Login

* `/auth/login`

User and admin can login.

admin login:-

email- saman123@gmail.com
password - 123


## Signup

* `/auth/signup`

User can signup.



