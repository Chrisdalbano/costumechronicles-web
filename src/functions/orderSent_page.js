if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
  
function ready() {
    displayCart();
    updateCartTotal();

    var infoObj = JSON.parse(localStorage.getItem('shippingInfo'));
    var info = infoObj.address + ' ' + infoObj.address2 + ', ' + infoObj.city + ' ' + infoObj.state + ' - ' + infoObj.zip;

    var shippingInfo = document.getElementById('shippingInfo'); 
    shippingInfo.innerText = info;

    sendConfirmationEmail();

    /*add event listener to continue button*/
    var continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = './index.html';
        localStorage.removeItem('cart');
        localStorage.removeItem('shippingInfo');
    });

}

function updateCartTotal() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var subTotal = 0;
    var tax = 0;
    var total = 0;
    
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    
    subTotal = Math.round(total * 100) / 100;
    var cartSubTotal = document.querySelector('.subTotal');
    cartSubTotal.innerText = '$' + subTotal;
  
    tax = (total * 0.065);
    var cartTax = document.querySelector('.tax');
    cartTax.innerText = '$' + tax.toFixed(2);
  
    total = Math.round((total + tax) * 100) / 100;
    var cartTotal = document.querySelector('.total');
    cartTotal.innerText = '$' + total; 
}
  
function displayCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    for ( var i = 0 ; i < cart.length; i++ ) {
        var item = cart[i];

        var container = document.getElementsByClassName('merch-container')[0];
        container.appendChild(Object.assign(document.createElement('div'), 
        {className:'merchandise'}))

        var merchandise = document.getElementsByClassName('merchandise')[i];
        merchandise.appendChild(Object.assign(document.createElement('img'), 
        {className:'product-image', src:item.image}))
        merchandise.appendChild(Object.assign(document.createElement('div'), 
        {className:'product-info'}))
        merchandise.appendChild(Object.assign(document.createElement('section')))

        var productInfo = document.getElementsByClassName('product-info')[i];
        productInfo.appendChild(Object.assign(document.createElement('h3'), 
        {className:'product-name', innerText:item.product_name}))
        productInfo.appendChild(Object.assign(document.createElement('p'), 
        {className:'product-size', innerText:item.size}))
        productInfo.appendChild(Object.assign(document.createElement('p'), 
        {className:'product-price', innerText:item.price}))
        productInfo.appendChild(Object.assign(document.createElement('b'), 
        {className:'product-quantity', innerText:item.quantity}))
    }
}

function sendConfirmationEmail() {
    emailjs.init("hs0baNagcAgV5iv6p");
  
    const serviceID = "service_k7bmzqa";
    const templateID = "template_kgo7vxb";
    const info = JSON.parse(localStorage.getItem('shippingInfo'));
    /*const items = JSON.parse(localStorage.getItem('cart'));*/

    var orderID = orderNumber();
    var orderDate = new Date();
    var address = info.address + ' ' + info.address2 + ', ' + info.city + ' ' + info.state + ' - ' + info.zip;
    var total = document.getElementById("total").innerText.replace("$", "");
    var email = info.email;
    

    // send the email here
    emailjs.send(serviceID, templateID, {
        orderID: orderID,
        orderDate: orderDate,
        address: address,
        total: total,
        email: email
    }).then(
    (response) => {
        console.log("SUCCESS!", response.status, response.text);
    },
    (error) => {
        console.log("FAILED...", error);
        alert("FAILED...", error);
    }
    );
}

function orderNumber() {
    let now = Date.now().toString()
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10)
    // format
    return  [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
  }
  