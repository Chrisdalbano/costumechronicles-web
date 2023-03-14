// Get the product grid and product articles
const productGrid = document.querySelector('.incategory-grid');
const productArticles = productGrid.querySelectorAll('.incategory-product');

// Get the filter, sort and search inputs
const sortInput = document.querySelector('#sort');
const searchInput = document.querySelector('#search');

// Add event listeners to the inputs
sortInput.addEventListener('change', sortProducts);
searchInput.addEventListener('keyup', searchProducts);

// Define the filter function
function filterProducts() {
  productArticles.forEach(article => {
    article.style.display = 'block';
  });
}

// Define the sort function
function sortProducts() {
  const sortValue = sortInput.value;
  const sortedArticles = Array.from(productArticles).sort((a, b) => {
    if (sortValue === 'price-high') {
      return parseFloat(b.querySelector('p').innerText.slice(1)) - parseFloat(a.querySelector('p').innerText.slice(1));
    } else if (sortValue === 'price-low') {
      return parseFloat(a.querySelector('p').innerText.slice(1)) - parseFloat(b.querySelector('p').innerText.slice(1));
    } else {
      return 0;
    }
  });
  productGrid.innerHTML = '';
  sortedArticles.forEach(article => {
    productGrid.appendChild(article);
  });
}

// Define the search function
function searchProducts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  let numResults = 0;
  productArticles.forEach(article => {
    if (article.querySelector('h3').innerText.toLowerCase().includes(searchValue)) {
      article.style.display = 'block';
      numResults++;
    } else {
      article.style.display = 'none';
    }
  });
  const noResultsLabel = document.querySelector('#no-results-label');
  if(numResults == 0){
    noResultsLabel.style.display = 'block';
  } else {
    noResultsLabel.style.display = 'none';
  }
}