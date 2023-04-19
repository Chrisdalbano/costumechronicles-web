if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
  
function ready() {
    var products = JSON.parse(localStorage.getItem('products')); 
    var women = JSON.parse(localStorage.getItem('women'));
    var men = JSON.parse(localStorage.getItem('men'));
    var kids = JSON.parse(localStorage.getItem('kids'));
    var collectibles = JSON.parse(localStorage.getItem('collectibles'));

    var url = window.location.pathname;
    var folder = url.substring(url.indexOf('/'), url.lastIndexOf('/'));
    
    switch(url){
        case folder + "/category-women.html": displayProducts(women); break;
        case folder + "/category-men.html": displayProducts(men); break;
        case folder + "/category-kids.html": displayProducts(kids); break;
        case folder + "/category-collectibles.html": displayProducts(collectibles); break;
        case folder + "/category-new.html": displayProducts(products); break;
    }

    const logo = document.querySelector("#logo");
    logo.addEventListener("click", event => {
        window.location.href = "index.html";
    });

    /*add eventlistener to all products in the category-pages*/
    const category_item = document.querySelectorAll(".incategory-product");
    category_item.forEach(category_item => {
        category_item.addEventListener("click", event => {
            event.preventDefault();
            var current_id = event.currentTarget.getAttribute('id');
            var current_product = products[current_id - 1];
            
            localStorage.setItem('current_product', JSON.stringify(current_product));
            window.location.href = "./merch-page.html";
        });
    });
}

function displayProducts(products) {
    var container = document.getElementsByClassName('product-grid')[0];
    for ( var i = 0 ; i < products.length; i++ ) {
        var item = products[i];
        container.appendChild(Object.assign(document.createElement('div'), 
            {className:'incategory-product', id:item.product_id}));
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
