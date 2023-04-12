if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  displayCart();
  updateCartTotal();

  const products = JSON.parse(localStorage.getItem('products'));
  displayProducts(products);

  var infoObj = JSON.parse(localStorage.getItem('shippingInfo'));
  var info = infoObj.address + ' ' + infoObj.address2 + ', ' + infoObj.city + ' ' + infoObj.state + ' - ' + infoObj.zip;

  var shippingInfo = document.getElementById('shippingInfo'); 
  shippingInfo.innerText = info;

  /*add event listener to the billing checkbox*/
  var billing = document.getElementsByName('billing')[0];
  billing.addEventListener('change', event => {
    event.preventDefault();
    if (billing.checked) {
      document.getElementById('billing_form').style.display = 'none';
    } else {
      document.getElementById('billing_form').style.display = 'flex';
    }
  });

  /*add event listener to confirm payment*/
  var payment = document.getElementById("confirm_payment");
  payment.addEventListener('click', event => {
    console.log('payment clicked');
    window.location.href = './order_sent.html';
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

function displayProducts(products) {
  var shuffledArray = products.sort((a, b) => 0.5 - Math.random());
  var container = document.querySelector('.merch-gallery');
  
  for ( var i = 0 ; i < 6; i++ ) {
    var item = shuffledArray[i];
    container.appendChild(Object.assign(document.createElement('div'), 
        {className:'product', id:item.product_id}));
    var product = document.querySelectorAll('.product')[i];
    product.appendChild(Object.assign(document.createElement('img'), 
        {className:'product-image', src:item.image}));
    product.appendChild(Object.assign(document.createElement('h3'), 
        {className:'product-name', innerText:item.product_name}));
    product.appendChild(Object.assign(document.createElement('b'),
        {className:'product-price', innerText: "$" + item.price}));    
  }
}