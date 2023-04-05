if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  const logo = document.querySelector("#logo");
  logo.addEventListener("click", event => {
    redirectToWebsite(event.currentTarget.id);
  });

  const categories = document.querySelectorAll(".category");
  categories.forEach(category => {
    category.addEventListener("click", event => {
      redirectToWebsite(event.currentTarget.id);
    });
  });

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

  const product = document.querySelectorAll(".product");
  product.forEach(product => {
    product.addEventListener("click", event => {
      var productImg = event.currentTarget.querySelector('.product-image').src;
      localStorage.setItem('productImg', productImg);

      var productName = event.currentTarget.querySelector('.product-name').innerText;
      localStorage.setItem('productName', productName);

      var productPrice =  event.currentTarget.querySelector('.product-price').innerText;
      localStorage.setItem('productPrice', productPrice);

      window.location.href = "./merch-page.html";
    });
  });
}

function redirectToWebsite(categoryId) {
  switch (categoryId) {
    case "man":
      window.location.href = "./category-men.html";
      break;
    case "women":
      window.location.href = "./category-women.html";
      break;
    case "kids":
      window.location.href = "./category-kids.html";
      break;
    case "collectibles":
      window.location.href = "./category-collectibles.html";
      break;
    case "logo":
      window.location.href = "./index.html";
      break;
    default:
      break;
  }
}