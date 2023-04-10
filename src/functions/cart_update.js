if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
  
  function ready() {
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
      console.log(quantity);
      count.innerText = quantity;
      count.style.visibility = 'visible';
    }
  }