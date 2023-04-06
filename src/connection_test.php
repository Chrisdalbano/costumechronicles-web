<?php
  $hostName = "ecommerce.mysql.database.azure.com";
  $userName = "admin_costumechronicles";
  $password = "costumechronicles1!";
  $databaseName = "ecommerce";
  $conn = mysqli_connect("$hostName", "$userName", "$password", "$databaseName");

  // Connection check
  if (!$conn) {
    echo 'Connection failed: ' . mysqli_connect_error();
  }

  //query for cus_info
  $sql = 'SELECT first_name, last_name, email, phone_number, address_1, city, state, zip_code, country FROM customer_info';

  //make the query and get reslut
  $result = mysqli_query($conn, $sql);

  //fetch the result
  $cus_info = mysqli_fetch_all($result);

  print_r($cus_info);
?>

