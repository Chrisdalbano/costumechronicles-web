if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

function ready() {

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
