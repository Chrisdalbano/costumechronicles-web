let images = ["assets/image1.jpg", "assets/image2.jpg", "assets/image3.jpg"];
let descriptions = ["This is the first description", "This is another one description :)", "And another one..."]
let currentImageIndex = 0;

function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  document.getElementById("current-image").src = images[currentImageIndex];
  document.getElementById("current-description").textContent = descriptions[currentImageIndex];
}

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("current-image").src = images[currentImageIndex];
  document.getElementById("current-description").textContent = descriptions[currentImageIndex];
}

setInterval(nextImage, 10000);