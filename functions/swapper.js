let images = ["src/assets/image1.jpg", "src/assets/image2.jpg", "src/assets/image3.jpg"];
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