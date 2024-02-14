<?php
session_start();

if (isset($_SESSION['user_id'])) {
    $response = array('isAdmin' => ($_SESSION['user_id'] === 'admin'));
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    $response = array('isAdmin' => false);
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
