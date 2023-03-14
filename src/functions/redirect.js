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
      default:
        break;
    }
  }
  
  // Attach an event listener to each category element
  const categories = document.querySelectorAll(".category");
  categories.forEach(category => {
    category.addEventListener("click", event => {
      redirectToWebsite(event.currentTarget.id);
    });
  });