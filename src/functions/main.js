import database from "./temp_database.json" assert { type: "json" };

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  updateCartCount();

  /*reads temp_database.json and stores it in the local storage*/
  const products = database.products;
  localStorage.setItem("products", JSON.stringify(products));

  var women = [];
  var men = [];
  var kids = [];
  var collectibles = [];

  for (var i = 0; i < products.length; i++) {
    switch (products[i].category) {
      case "women":
        women.push(products[i]);
        break;
      case "men":
        men.push(products[i]);
        break;
      case "kids":
        kids.push(products[i]);
        break;
      case "collectibles":
        collectibles.push(products[i]);
        break;
    }
  }
  displayProducts();

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("women", JSON.stringify(women));
  localStorage.setItem("men", JSON.stringify(men));
  localStorage.setItem("kids", JSON.stringify(kids));
  localStorage.setItem("collectibles", JSON.stringify(collectibles));

  /*add event listener to the button of the slide gallery*/
  const galleryBtn = document.querySelector("#galleryBtn");
  galleryBtn.addEventListener("click", (event) => {
    var gallery = event.currentTarget.parentElement.parentElement.parentElement;
    var productImg = gallery.querySelector("#current-image").src;
    localStorage.setItem("productImg", productImg);
    var productName = gallery.querySelector("#current-name").innerText;
    localStorage.setItem("productName", productName);
    var productPrice = gallery.querySelector("#current-price").innerText;
    localStorage.setItem("productPrice", productPrice);

    window.location.href = "./merch-page.html";
  });

  /*add eventlistener to all products in index.html*/
  var merchandise = document.querySelectorAll(".product");
  for (var i = 0; i < merchandise.length; i++) {
    merchandise[i].addEventListener("click", (event) => {
      event.preventDefault();
      var current_id = event.currentTarget.getAttribute("id");
      var current_product = products[current_id - 1];
      localStorage.setItem("current_product", JSON.stringify(current_product));

      window.location.href = "./merch-page.html";
    });
  }
}

function displayProducts() {
  var products = JSON.parse(localStorage.getItem("products"));
  for (var i = 0; i < 6; i++) {
    var item = products[i];
    var container = document.querySelector(".product-grid");
    container.appendChild(
      Object.assign(document.createElement("div"), {
        className: "product",
        id: item.product_id,
      })
    );
    var product = document.querySelectorAll(".product")[i];
    product.appendChild(
      Object.assign(document.createElement("img"), {
        className: "product-image",
        src: item.image,
      })
    );
    product.appendChild(
      Object.assign(document.createElement("h3"), {
        className: "product-name",
        innerText: item.product_name,
      })
    );
    product.appendChild(
      Object.assign(document.createElement("p"), {
        className: "product-price",
        innerText: "$" + item.price,
      })
    );
  }
}

function updateCartCount() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var count = document.getElementById('item_count');
  var quantity = 0
  
  if(cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      quantity = quantity + parseInt(cart[i].quantity )
    }
    count.innerText = quantity;
    count.style.visibility = 'visible';
  }
}