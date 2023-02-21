let images = ["src/merch/image1.jpg", "src/merch/image2.jpg", "src/merch/image3.jpg"];
let currentImageIndex = 0;

function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  document.getElementById("current-image").src = images[currentImageIndex];
}

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("current-image").src = images[currentImageIndex];
}

setInterval(nextImage, 10000);