<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Fetch the username from the database
$query = "SELECT * FROM users LIMIT 1"; // You may need to adjust the query based on your database structure
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $full_name = $row['full_name'];
    echo json_encode(array('success' => true, 'full_name' => $full_name));
} else {
    echo json_encode(array('success' => false, 'message' => 'No name found'));
}
?>
