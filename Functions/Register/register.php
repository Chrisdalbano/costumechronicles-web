<?php
$servername = "ecommerce.mysql.database.azure.com";
$username = "admin_costumechronicles";
$password = "costumechronicles1!";
$dbname = "ecommerce";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$email = $_POST['email'];
$raw_password = $_POST['password'];

if (preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/', $raw_password)) {
    $password = password_hash($raw_password, PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        echo "User registered successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $stmt->close();
} else {
    echo "Password does not meet the requirements.";
}

$conn->close();
?>