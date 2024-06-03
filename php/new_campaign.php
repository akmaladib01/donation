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

if (isset($data['name']) && isset($data['description']) && isset($data['goal_amount']) && isset($data['charity_id'])) {
    $name = $conn->real_escape_string($data['name']);
    $description = $conn->real_escape_string($data['description']);
    $goal_amount = $conn->real_escape_string($data['goal_amount']);
    $charity_id = $conn->real_escape_string($data['charity_id']);

    $sql = "INSERT INTO campaign (name, description, goal_amount, charity_id) VALUES ('$name', '$description', '$goal_amount', '$charity_id')";

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
