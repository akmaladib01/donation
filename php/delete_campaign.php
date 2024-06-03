<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student_b032110204";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Retrieve POST data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['campaign_id'])) {
    $campaign_id = $conn->real_escape_string($data['campaign_id']);

    // Prepare the SQL statement to delete the campaign
    $sql = "DELETE FROM campaign WHERE campaign_id = '$campaign_id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}

$conn->close();
?>
