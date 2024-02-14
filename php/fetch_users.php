<?php
include 'db_connect.php';

$query = "SELECT * FROM users";

$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

$userData = array();

while ($row = mysqli_fetch_assoc($result)) {
    $userData[] = $row;
}

mysqli_free_result($result);

// Return the user data as JSON
header('Content-Type: application/json');
echo json_encode($userData);
?>
