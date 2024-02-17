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

// Check if questionId is provided
if (!isset($_POST['questionId'])) {
    http_response_code(400); // Bad request
    exit("Question ID is not provided");
}

// Retrieve user ID from session
$user_id = $_SESSION['user_id'];

// Retrieve question ID from POST data
$question_id = $_POST['questionId'];

// Delete the question from the database
$sql = "DELETE FROM questions WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $question_id);

if ($stmt->execute()) {
    // Question deleted successfully
    echo "Question deleted successfully";
} else {
    // Error occurred while deleting the question
    http_response_code(500); // Internal Server Error
    echo "Error deleting the question: " . $stmt->error;
}

// Close statement and database connection
$stmt->close();
$conn->close();
?>
