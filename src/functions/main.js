import database from './temp_database.json' assert { type: 'json' };

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

function ready() {

  if(!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  /*reads temp_database.json and stores it in the local storage*/
  var products = database.products;
  localStorage.setItem('products', JSON.stringify(products));

  var women = [];
  var men = [];
  var kids = [];
  var collectibles = [];

  for(var i = 0; i < products.length; i++) {
    switch (products[i].category) {
        case "women": women.push(products[i]); break;
        case "men": men.push(products[i]); break;
        case "kids": kids.push(products[i]); break;
        case "collectibles": collectibles.push(products[i]); break;
    }
  }

  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('women', JSON.stringify(women));
  localStorage.setItem('men', JSON.stringify(men));
  localStorage.setItem('kids', JSON.stringify(kids));
  localStorage.setItem('collectibles', JSON.stringify(collectibles));

  /*add event listener to the button of the slide gallery*/
  const galleryBtn = document.querySelector('#galleryBtn');
  galleryBtn.addEventListener('click', event => {
  var gallery = event.currentTarget.parentElement.parentElement.parentElement;

  var productImg = gallery.querySelector('#current-image').src;
  localStorage.setItem('productImg', productImg);

  var productName = gallery.querySelector('#current-name').innerText;
  localStorage.setItem('productName', productName);

  var productPrice = gallery.querySelector('#current-price').innerText;
  localStorage.setItem('productPrice', productPrice);

  window.location.href = "./merch-page.html";
  });
}
