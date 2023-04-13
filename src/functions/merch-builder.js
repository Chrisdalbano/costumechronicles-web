if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  const products = JSON.parse(localStorage.getItem('products')); 
  const current_product = JSON.parse(localStorage.getItem('current_product'));
  
  /*Set the atributes of the current product*/
  document.getElementById('currentMerch').src = current_product.image;
  document.getElementById('product-name').innerText = current_product.product_name;
  document.getElementById('product-price').innerText = "$" + current_product.price;

  /*change the addres section*/
  var string = "Home/" + current_product.category + "/" + current_product.product_name;
  const address = document.querySelector('.address');
  address.innerText = string;

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
      event.preventDefault();
      var merch_id = event.currentTarget.id;
      localStorage.setItem('current_product', JSON.stringify(products[merch_id]));
      window.location.reload();
    });
  }

  /*add event listener to add button*/ 
  const addToCartButton = document.querySelector('#addButton');
  addToCartButton.addEventListener('click', event => {
    event.preventDefault();
    const sizeRadio = document.querySelectorAll('.btn-check');
    for (var i = 0; i < sizeRadio.length; i++) {
      if (sizeRadio[i].checked) {
        var size = sizeRadio[i].value;
        break;
      }
    }
    current_product["size"] = size;
    current_product["quantity"] = 1;
    addToCart(current_product);
  });
  updateCartCount();
}

function addToCart(current_product) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var match = false;

  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      if(cart[i].product_id == current_product.product_id && cart[i].size == current_product.size) {
        match = true;
        cart[i].quantity += 1;
        break;
      }
    }

    if (!match) {
      cart.push(current_product);
    };

  } else {
    cart.push(current_product);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var count = document.getElementById('item_count');
  var quantity = 0
  
  if(cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      quantity = quantity + parseInt(cart[i].quantity)
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
