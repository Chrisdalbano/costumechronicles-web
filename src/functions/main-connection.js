async function fetchProductData() {
    try {
        const response = await fetch('api/api.php');
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        document.getElementById('woman01').src = data.image_url;
        document.getElementById('woman01').alt = data.product_name;
        document.getElementById('productName').innerText = data.product_name;
        document.getElementById('productPrice').innerText = '$' + parseFloat(data.price).toFixed(2);

    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchProductData();
});