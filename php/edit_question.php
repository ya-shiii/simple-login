<?php
// Start session
session_start();

// Include database connection code
include_once 'db_connect.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    // User is not logged in, handle accordingly (redirect or error response)
    http_response_code(401); // Unauthorized
    exit("User is not logged in");
}

// Check if the request is POST and data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $questionID = $_POST['questionID'];
    $question = $_POST['question'];
    $answer = $_POST['answer'];
    $choice1 = $_POST['choice1'];
    $choice2 = $_POST['choice2'];
    $choice3 = $_POST['choice3'];

    // Optional: Perform additional validation and sanitization of data

    // Prepare SQL update statement
    $sql = "UPDATE questions SET question=?, answer=?, choice1=?, choice2=?, choice3=? WHERE id=?";

    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $question, $answer, $choice1, $choice2, $choice3, $questionID);

    // Execute the statement
    if ($stmt->execute()) {
        // Success: Question updated
        echo "Question updated successfully";
    } else {
        // Error: Failed to update question
        http_response_code(500); // Internal Server Error
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // Invalid request method
    http_response_code(405); // Method Not Allowed
    exit("Invalid request method");
}
?>
