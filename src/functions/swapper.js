
const products = [{
  'source':'./merch/image1.jpg',
  'name':'Product #1',
  'price':'$69.99'
  },{
    'source':'./merch/image2.jpg',
    'name':'Product #2',
    'price':'$69.99'
  },{
    'source':'./merch/image3.jpg',
    'name':'Product #3',
    'price':'$69.99'
  }]

var currentIndex = 0;

function changeImage() {
  var currentImage = document.getElementById("current-image");
  var currentName = document.getElementById("current-name");
  var currentPrice = document.getElementById("current-price");

  currentImage.style.opacity = 0;
  setTimeout(() => {
    currentImage.src = products[currentIndex].source;
    currentName.textContent = products[currentIndex].name;
    currentPrice.textContent = products[currentIndex].price;
    currentImage.style.opacity = 1;
  }, 500);
}

// Update prevImage() and nextImage() functions to use changeImage() function
function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = products.length - 1;
  }
  changeImage();
}

function nextImage() {
  currentIndex++;
  if (currentIndex >= products.length) {
    currentIndex = 0;
  }
  changeImage();
}