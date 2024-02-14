<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve email from POST
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    // Update the user's account status to "Verified" based on email
    $updateQuery = "UPDATE users SET acc_status = 'Verified' WHERE email = '$email'";
    $updateResult = mysqli_query($conn, $updateQuery);

    if ($updateResult) {
        // Send email to the user
        $to = $email;
        $subject = 'Account Verified';
        $message = 'Your account has been successfully verified.';
        

        // Send the email
        $mailSent = mail($to, $subject, $message);

        if ($mailSent) {
            // Return success message if email sent successfully
            echo json_encode(array('success' => true, 'message' => 'User verified successfully. Email sent.'));
        } else {
            // Return success message but with email sending error
            echo json_encode(array('success' => true, 'message' => 'User verified successfully. Email sending failed.'));
        }
    } else {
        // Return error message
        echo json_encode(array('success' => false, 'message' => 'Error verifying user'));
    }
} else {
    // Return error message if not POST request
    echo json_encode(array('success' => false, 'message' => 'Invalid request method'));
}
?>
