<?php
session_start();

if (isset($_SESSION['user_id'])) {
    // Include your database connection file
    include 'db_connect.php';

    // Sanitize the user_id to prevent SQL injection
    $user_id = mysqli_real_escape_string($conn, $_SESSION['user_id']);

    // Query to check if the user is a teacher
    $query = "SELECT user_id FROM users WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        // User is a teacher
        $response = array('isUser' => true);
    } else {
        // User not found or not a teacher
        $response = array('isUser' => false);
    }

    // Close the database connection
    mysqli_close($conn);
} else {
    // User not logged in
    $response = array('isUser' => false);
}

// Output only the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
