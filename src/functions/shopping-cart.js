
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

  if (cart.length > 0) {
    build(cart);
  } else {
    document.querySelector('.merchandise').style.visibility = 'hidden';
  }
  
  updateCartContent(cart);
  updateCartNumber(cart.length);
  updateCartTotal();
  
  /*add event listener to all remove buttons*/
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for ( var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', event => {
      removeCartItem(event.currentTarget, cart);
    });
  }

  /*add event listener to all quantity inputs*/
  var quantityInputs = document.getElementsByClassName('quantity-input')
  for ( var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChange);
  }
}

function build(cart) {
  document.querySelector('.product-image').src = cart[0].source;
  document.querySelector('.product-name').innerText = cart[0].name;
  document.querySelector('.product-size').innerText = cart[0].size;
  document.querySelector('.product-price').innerText = cart[0].price;
}

function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(buttonClicked, cart) {
  var item = buttonClicked.parentElement.parentElement
  cart.splice(item.id, 1);
  item.remove();
  updateCartTotal();
  updateCartNumber(cart.length);
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('merch-container')[0];
  var cartItems = cartItemContainer.getElementsByClassName('merchandise');
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var cartItem = cartItems[i];
    var priceElement = cartItem.getElementsByClassName('product-price')[0];
    var quantityElement = cartItem.getElementsByClassName('quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total += price * quantity;
  }

  if (total)
    total = Math.round(total * 100) / 100;
  else
    total = 0;

  var cartTotal = document.querySelectorAll('.total');
  cartTotal[0].innerText = '$' + total;
  cartTotal[1].innerText = '$' + total;
}

function updateCartNumber(length) {
  var cartNumber = document.querySelector('.cart-number');
  cartNumber.innerText = length;
  if (length > 0) {
    cartNumber.style.visibility = 'visible';
  }
}

function updateCartContent(cart) {
  var container = document.querySelector('.merch-container');
  var item = container.querySelector('.merchandise');
  
  for (var i = 1; i < cart.length; i++) {
    var clone = item.cloneNode(true);
    clone.querySelector('.product-image').src = cart[i].source;
    clone.querySelector('.product-name').innerText = cart[i].name;
    clone.querySelector('.product-size').innerText = cart[i].size;
    clone.querySelector('.product-price').innerText = cart[i].price;
    clone.id = i;
    container.appendChild(clone);
  }
}