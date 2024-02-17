<?php
// Include database connection code
include_once 'db_connect.php';

// Your SQL query to retrieve all questions
$sql = "SELECT * FROM questions";

// Prepare and execute the query
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $questions = array();

    // Fetch questions from the result set
    while ($row = $result->fetch_assoc()) {
        // Add each question to the array
        $question = array(
            'id' => $row['id'],
            'question' => $row['question'],
            'answer' => $row['answer'],
            'choices' => array($row['choice1'], $row['choice2'], $row['choice3']),
        );
        // Add the question array to the questions array
        $questions[] = $question;
    }

    // Close result set
    $result->close();

    // Close database connection
    $conn->close();

    // Send questions data as JSON response
    echo json_encode($questions);
} else {
    // No questions found
    echo json_encode(array());
}
?>
