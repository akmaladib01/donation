<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");

$hostname = "localhost";
$dbname = "student_b032110204";
$username = "root";
$password = "";

try {
    $db = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    $response = new stdClass();
    $response->error = "dbname$dbname connection error: " . $e->getMessage();
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}

// Initial response code
http_response_code(404);
$response = new stdClass();

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['campaign_id'])) {
    $campaignId = $_GET['campaign_id'];
    try {
        $stmt = $db->prepare("SELECT * FROM campaign WHERE campaign_id = :campaign_id");
        $stmt->bindParam(':campaign_id', $campaignId, PDO::PARAM_INT);
        $stmt->execute();
        $campaign = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($campaign) {
            $response = $campaign;
            http_response_code(200);
        } else {
            http_response_code(404);  // Not Found
            $response->error = "Campaign not found.";
        }
    } catch (Exception $e) {
        http_response_code(500);
        $response->error = "Error occurred: " . $e->getMessage();
    }
} else {
    // Handle other HTTP methods if needed
    http_response_code(405);  // Method Not Allowed
    $response->error = "Method not allowed or missing campaign_id.";
}

// Before sending the JSON response, set the content type header
header('Content-Type: application/json');

// Then send the JSON response
echo json_encode($response);
exit();
?>
