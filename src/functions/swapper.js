let images = ["assets/image1.jpg", "assets/image2.jpg", "assets/image3.jpg"];
let descriptions = ["This is the first description", "This is another one", "And another one..."]
let currentImageIndex = 0;

function prevImage() {
  document.getElementById("current-image").style.opacity = 0;
  setTimeout(() => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    }
    document.getElementById("current-image").src = images[currentImageIndex];
    document.getElementById("current-description").textContent = descriptions[currentImageIndex];
    document.getElementById("current-image").style.opacity = 1;
  }, 400);
}

function nextImage() {
  document.getElementById("current-image").style.opacity = 0;
  setTimeout(() => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    document.getElementById("current-image").src = images[currentImageIndex];
    document.getElementById("current-description").textContent = descriptions[currentImageIndex];
    document.getElementById("current-image").style.opacity = 1;
  }, 450);
}

setInterval(nextImage, 8000);