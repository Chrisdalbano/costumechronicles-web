let images = ["assets/image1.jpg", "assets/image2.jpg", "assets/image3.jpg"];
let descriptions = ["This is the first description", "This is another one description :)", "And another one..."]
let currentImageIndex = 0;

function changeImage() {
  const currentImage = document.getElementById("current-image");
  const currentDescription = document.getElementById("current-description");

  currentImage.style.opacity = 0;
  setTimeout(() => {
    currentImage.src = images[currentImageIndex];
    currentDescription.textContent = descriptions[currentImageIndex];
    currentImage.style.opacity = 1;
  }, 500);
}

// Update prevImage() and nextImage() functions to use changeImage() function
function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  changeImage();
}

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  changeImage();
}