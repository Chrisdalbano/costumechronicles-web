if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var currentProduct = JSON.parse(localStorage.getItem('productKey'));
  build(currentProduct);

  var cart = JSON.parse(localStorage.getItem('cart'));
  updateCartNumber(cart.length);

  var addToCartButton = document.getElementById('addButton');
  addToCartButton.addEventListener('click', event => {
    cart.push(addSize(currentProduct));
    updateCartNumber(cart.length);
    localStorage.setItem('cart', JSON.stringify(cart));
  });  
}

function build(product) {
  var productImg = product.source;
  document.getElementById('currentMerch').src = productImg;

  var productName = product.name
  document.getElementById('product-name').innerText = productName;

  var productPrice = product.price
  document.getElementById('product-price').innerText = productPrice;
}

function addSize(product) {
  var size = document.getElementsByName('btnradio');

  for (var i = 0; i < size.length; i++) {
    if(size[i].checked) {
      product.size = size[i].value;
      return product;
    }
  }
}

function updateCartNumber(length) {
  var cartNumber = document.querySelector('.cart-number');
  cartNumber.innerText = length;
  cartNumber.style.visibility = 'visible';
}
