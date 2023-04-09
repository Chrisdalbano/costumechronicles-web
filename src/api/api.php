<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection settings
$servername = "ecommerce.mysql.database.azure.com";
$username = "admin_costumechronicles";
$password = "costumechronicles1!";
$dbname = "ecommerce";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch the product data
$sql = "SELECT product_name, price, image_url FROM products WHERE product_id = 1";
$result = $conn->query($sql);

if ($result = $conn->query($sql)) {
    if ($result->num_rows > 0) {
        // Output the product data
        while ($row = $result->fetch_assoc()) {
            echo json_encode($row);
        }
    } else {
        echo json_encode(["error" => "No product found"]);
    }
} else {
    echo json_encode(["error" => "Error executing query: " . $conn->error]);
}

$conn->close();
?>