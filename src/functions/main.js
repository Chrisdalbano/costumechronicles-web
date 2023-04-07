if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
}
  
function ready() {

  if(!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  var cart = JSON.parse(localStorage.getItem('cart'));
  updateCartNumber(cart.length);
}

function updateCartNumber(length) {
  var cartNumber = document.querySelector('.cart-number');
  cartNumber.innerText = length;
  if (length > 0) {
    cartNumber.style.visibility = 'visible';
  }
}

