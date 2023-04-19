
var currentIndex = 0;

function changeImage() {
  const products = JSON.parse(localStorage.getItem("products"));
  const product_container = document.getElementsByClassName("swapper-gallery")[0];
  const currentImage = document.getElementById("current-image");
  const currentName = document.getElementById("current-name");
  const currentPrice = document.getElementById("current-price");

  currentImage.style.opacity = 0;

  setTimeout(() =>{
    currentImage.src = products[currentIndex].image;
    currentName.textContent = products[currentIndex].product_name;
    currentPrice.textContent = "$" + products[currentIndex].price;
    product_container.id = products[currentIndex].product_id;
    currentImage.style.opacity = 1;
  }, 500);
}

// Update prevImage() and nextImage() functions to use changeImage() function
function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 2;
  }
  changeImage();
}

function nextImage() {
  currentIndex++;
  if (currentIndex >= 3) {
    currentIndex = 0;
  }
  changeImage();
}

