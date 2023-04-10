if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var productImg = localStorage.getItem('productImg');
  document.getElementById('currentMerch').src = productImg;

  var productName = localStorage.getItem('productName');
  document.getElementById('product-name').innerText = productName;

  var productPrice = localStorage.getItem('productPrice');
  document.getElementById('product-price').innerText = productPrice;

  var price = parseFloat(productPrice.replace('$', ''));

  const addToCartButton = document.querySelector('#addButton');
  addToCartButton.addEventListener('click', event => {
    const sizeRadio = document.querySelectorAll('.btn-check');
    for (var i = 0; i < sizeRadio.length; i++) {
      if (sizeRadio[i].checked) {
        var size = sizeRadio[i].value;
        break;
      }
    }

    var item = {
      'product_id':'',
      'product_name':productName,
      'price':price,
      'size':size,
      'image':productImg,
      'quantity':1,
    }
    
    addToCart(item);
  });

  updateCartCount();
}

function addToCart(currentProduct) {
  if(localStorage.getItem('cart')) {
    var cart = JSON.parse(localStorage.getItem('cart'));
  }
  cart.push(currentProduct);
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var count = document.getElementById('item_count');
  var quantity = 0
  
  if(cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      quantity = quantity + parseInt(cart[i].quantity )
    }
    count.innerText = quantity;
    count.style.visibility = 'visible';
  }
}