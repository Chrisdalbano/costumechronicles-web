if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for ( var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('quantity-input')
  for ( var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChange);
  }
}

function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
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
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('subtotal')[0].innerText = '$' + total;
}