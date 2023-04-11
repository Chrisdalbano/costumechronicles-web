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
