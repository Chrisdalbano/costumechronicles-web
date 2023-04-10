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
    if(cart.length > 0) {
      count.innerText = cart.length;
      count.style.visibility = 'visible';
    }
  }