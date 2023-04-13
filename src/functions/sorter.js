if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Get the filter, sort and search inputs
  const sortInput = document.querySelector("#sort");
  const searchInput = document.querySelector("#search");

  // Add event listeners to the inputs
  sortInput.addEventListener("change", sortProducts);
  searchInput.addEventListener("keyup", searchProducts);
}

// Define the filter function
function filterProducts() {
  productArticles.forEach((article) => {
    article.style.display = "block";
  });
}

// Define the sort function
function sortProducts() {
  const productGrid = document.querySelector(".product-grid");
  const productArticles = productGrid.querySelectorAll(".incategory-product");
  const sortInput = document.querySelector("#sort");

  var sortValue = sortInput.value;
  var sortedArticles = Array.from(productArticles).sort((a, b) => {
    if (sortValue === "price-high") {
      return (
        parseFloat(b.querySelector("b").innerText.slice(1)) -
        parseFloat(a.querySelector("b").innerText.slice(1))
      );
    } else if (sortValue === "price-low") {
      return (
        parseFloat(a.querySelector("b").innerText.slice(1)) -
        parseFloat(b.querySelector("b").innerText.slice(1))
      );
    } else {
      return 0;
    }
  });

  productGrid.innerHTML = "";
  sortedArticles.forEach((article) => {
    productGrid.appendChild(article);
  });
}

// Define the search function
function searchProducts() {
  const productGrid = document.querySelector(".product-grid");
  const productArticles = productGrid.querySelectorAll(".incategory-product");
  const searchInput = document.querySelector("#search");

  const searchValue = searchInput.value.trim().toLowerCase();
  let numResults = 0;
  productArticles.forEach((article) => {
    if (
      article.querySelector("h3").innerText.toLowerCase().includes(searchValue)
    ) {
      article.style.display = "block";
      numResults++;
    } else {
      article.style.display = "none";
    }
  });

  const noResultsLabel = document.querySelector("#no-results-label");
  if (numResults == 0) {
    noResultsLabel.style.display = "block";
  } else {
    noResultsLabel.style.display = "none";
  }
}
