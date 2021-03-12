const cart = document.getElementById('cart');
const order = document.getElementById('order');
const logout = document.getElementById('logout');

const session = JSON.parse(localStorage.getItem('session'));

if (cart) {
    console.log(cart);
    cart.addEventListener('click', () => {
        window.location.replace(`/cart/cart/${session.user._id}`)
    }) 
}

if (order) {
    console.log(order);
    order.addEventListener('click', () => {
        window.location.replace(`/order/userorderdetail/${session.user._id}`)
    }) 
}

if (logout) {
    logout.addEventListener('click', () => {
        fetch(`/auth/signout`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            localStorage.clear();
            window.location.replace('/auth/login');
        }).catch(err => console.log(err));
    }) 
}

console.log(window.location);

// if (!session and ) {
//     window.location.replace('/auth/login');
// }


