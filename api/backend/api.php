<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection settings
$servername = "ecommerce.mysql.database.azure.com";
$username = "admin_costumechronicles@ecommerce";
$password = "costumechronicles1!";
$dbname = "ecommerce";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch the product data
$productName = "snowWhite"; // Set the product name to filter
$sql = "SELECT product_name, price, image_url FROM products WHERE product_name = '$productName'";
$result = $conn->query($sql);

if ($result = $conn->query($sql)) {
    if ($result->num_rows > 0) {
        // Output the product data
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);
    } else {
        echo json_encode(["error" => "No products found"]);
    }
} else {
    echo json_encode(["error" => "Error executing query: " . $conn->error]);
}

$conn->close();
?>