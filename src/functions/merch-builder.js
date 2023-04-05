if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  build();
}

function build() {
  var productImg = localStorage.getItem('productImg');
  document.getElementById('currentMerch').src = productImg;

  var productName = localStorage.getItem('productName');
  document.getElementById('product-name').innerText = productName;

  var productPrice = localStorage.getItem('productPrice');
  document.getElementById('product-price').innerText = productPrice;
}