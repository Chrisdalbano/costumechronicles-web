if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
  
function ready() {
    var products = JSON.parse(localStorage.getItem('products')); 
    var women = [];
    var men = [];
    var kids = [];
    var collectibles = [];

    for(var i = 0; i < products.length; i++) {
        switch (products[i].category) {
            case "women": women.push(products[i]); break;
            case "men": men.push(products[i]); break;
            case "kids": kids.push(products[i]); break;
            case "collectibles": collectibles.push(products[i]); break;
        }
    }

    var url = window.location.pathname;
    switch(url){
        case "/src/category-women.html": displayProducts(women); break;
        case "/src/category-men.html": displayProducts(men); break;
        case "/src/category-kids.html": displayProducts(kids); break;
        case "/src/category-collectibles.html": displayProducts(collectibles); break;
        case "/src/category-new.html": displayProducts(products); break;
    }

    const logo = document.querySelector("#logo");
    logo.addEventListener("click", event => {
        window.location.href = "index.html";
    });

    /*add eventlistener to all products in the category-pages*/
    const category_item = document.querySelectorAll(".incategory-product");
    category_item.forEach(category_item => {
        category_item.addEventListener("click", event => {
        var productImg = event.currentTarget.querySelector('img').src;
        localStorage.setItem('productImg', productImg);

        var productName = event.currentTarget.querySelector('h3').innerText;
        localStorage.setItem('productName', productName);

        var productPrice =  event.currentTarget.querySelector('b').innerText;
        localStorage.setItem('productPrice', productPrice);

        window.location.href = "./merch-page.html";
        });
    });
}

function displayProducts(products) {
    var container = document.getElementsByClassName('product-grid')[0];
    for ( var i = 0 ; i < products.length; i++ ) {
        var item = products[i];
        container.appendChild(Object.assign(document.createElement('div'), 
            {className:'incategory-product'}));
        var product = document.getElementsByClassName('incategory-product')[i];
        product.appendChild(Object.assign(document.createElement('img'), 
            {className:'product-image', src:item.image}));
        product.appendChild(Object.assign(document.createElement('h3'), 
            {className:'product-name', innerText:item.product_name}));
        product.appendChild(Object.assign(document.createElement('b'),
            {className:'product-price', innerText: "$" + item.price}));    
    }
    container.appendChild(Object.assign(document.createElement('p'), 
                {id:"no-results-label", innerText:"No results matching the search."}));
  }