<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student_b032110204";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Retrieve POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name'], $data['description'], $data['goal_amount'], $data['charity_id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit();
}

$name = $data['name'];
$description = $data['description'];
$goal_amount = $data['goal_amount'];
$charity_id = $data['charity_id'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO campaign (name, description, goal_amount, charity_id) VALUES (?, ?, ?, ?)");
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param("ssdi", $name, $description, $goal_amount, $charity_id);

// Execute statement
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
