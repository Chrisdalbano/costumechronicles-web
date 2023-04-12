if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  
  /*Set the atributes of the current product*/
  var productImg = localStorage.getItem('productImg');
  document.getElementById('currentMerch').src = productImg;
  var productName = localStorage.getItem('productName');
  document.getElementById('product-name').innerText = productName;
  var productPrice = localStorage.getItem('productPrice');
  document.getElementById('product-price').innerText = productPrice;

  /*display products base on the current product category*/
  var products = JSON.parse(localStorage.getItem('products')); 
  var women = JSON.parse(localStorage.getItem('women'));
  var men = JSON.parse(localStorage.getItem('men'));
  var kids = JSON.parse(localStorage.getItem('kids'));
  var collectibles = JSON.parse(localStorage.getItem('collectibles'));

  switch(url){
      case folder + "/category-women.html": displayProducts(women); break;
      case folder + "/category-men.html": displayProducts(men); break;
      case folder + "/category-kids.html": displayProducts(kids); break;
      case folder + "/category-collectibles.html": displayProducts(collectibles); break;
      case folder + "/category-new.html": displayProducts(products); break;
  }

  /*add event listener to all merchandise*/ 
  const merchandise = document.getElementsByClassName('product');
  for (var i = 0; i < merchandise.length; i++) {
    merchandise[i].addEventListener('click', event => {
      var merchImg = event.currentTarget.querySelector('.product-image').src;
      localStorage.setItem('productImg', merchImg);
      var merchName = event.currentTarget.querySelector('.product-name').innerText;
      localStorage.setItem('productName', merchName);
      var merchPrice =  event.currentTarget.querySelector('.product-price').innerText;
      localStorage.setItem('productPrice', merchPrice);
      window.location.reload();
    });
  }

  /*add event listener to all size buttons*/ 
  const price = parseFloat(productPrice.replace('$', ''));
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

function displayProducts(products) {
  for ( var i = 0 ; i < products.length; i++ ) {
    var item = products[i];
    var container = document.querySelector('merch-gallery');
    container.appendChild(Object.assign(document.createElement('div'), 
        {className:'product'}));
    var product = document.querySelectorAll('.product')[i];
    product.appendChild(Object.assign(document.createElement('img'), 
        {className:'product-image', src:item.image}));
    product.appendChild(Object.assign(document.createElement('h3'), 
        {className:'product-name', innerText:item.product_name}));
    product.appendChild(Object.assign(document.createElement('b'),
        {className:'product-price', innerText: "$" + item.price}));    
  }
}
