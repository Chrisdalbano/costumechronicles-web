if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var products = JSON.parse(localStorage.getItem('products')); 
  var current_product = JSON.parse(localStorage.getItem('current_product'));
  
  /*Set the atributes of the current product*/
  document.getElementById('currentMerch').src = current_product.image;
  document.getElementById('product-name').innerText = current_product.product_name;
  document.getElementById('product-price').innerText = "$" + current_product.price;

  /*display products base on the current product category*/
  var women = JSON.parse(localStorage.getItem('women'));
  var men = JSON.parse(localStorage.getItem('men'));
  var kids = JSON.parse(localStorage.getItem('kids'));
  var collectibles = JSON.parse(localStorage.getItem('collectibles'));

  switch(current_product.category){
      case "women": displayProducts(women); break;
      case "men": displayProducts(men); break;
      case "kids": displayProducts(kids); break;
      case "collectibles": displayProducts(collectibles); break;
      default : displayProducts(products); break;
  }

  /*add event listener to all merchandise*/ 
  const merchandise = document.getElementsByClassName('product');
  for (var i = 0; i < merchandise.length; i++) {
    merchandise[i].addEventListener('click', event => {
      var merch_id = event.currentTarget.id;
      localStorage.setItem('current_product', JSON.stringify(products[merch_id]));
      window.location.reload();
    });
  }

  /*add event listener to add button*/ 
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
  var container = document.querySelector('.merch-gallery');
  
  for ( var i = 0 ; i < products.length; i++ ) {
    var item = products[i];
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
