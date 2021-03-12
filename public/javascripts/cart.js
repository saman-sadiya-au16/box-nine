document.getElementById('address').addEventListener('input', () => {
    document.getElementById('add-address').innerHTML = ``
})

$("#place-order").on('click', function(event){
    console.log('button clicked');
    document.getElementById('add-address').innerHTML = ``
    const cartId = event.target.getAttribute('data-cart-id');
    const session = JSON.parse(localStorage.getItem('session'));
    const orderAddress = document.getElementById('address').value;
    const totalPrice = event.target.getAttribute('data-total');
    console.log(cartId);
    console.log(orderAddress)
    if (orderAddress.length === 0) {
        document.getElementById('add-address').innerHTML = `Please Add Address to place order`
    } else {
        const data = {
           amount: Number(totalPrice),
           address: orderAddress,
           user: session.user._id,
        }
   
        console.log(data);
        fetch(`/order/order/create/${session.user._id}`, { 
           method: "POST", 
           body: JSON.stringify(data),  
           headers: { 
               "Content-type": "application/json; charset=UTF-8",
               'Authorization': `Bearer ${session.token}`,
           } 
       })
       .then(response => response.json())
       .then(data => {
           console.log(data);
           window.location.replace(`/order/userorderdetail/${session.user._id}`);
       }).catch(err => console.log(err));
    }
});