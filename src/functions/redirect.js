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


