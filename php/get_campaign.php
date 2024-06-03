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

if (isset($_GET['charity_id'])) {
    $charity_id = $conn->real_escape_string($_GET['charity_id']);

    $sql = "SELECT * FROM campaign WHERE charity_id = '$charity_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $campaigns = [];
        while($row = $result->fetch_assoc()) {
            $campaigns[] = $row;
        }
        echo json_encode(['success' => true, 'campaigns' => $campaigns]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No campaigns found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}

$conn->close();
?>
