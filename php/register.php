<?php
$hostname = "localhost";
$dbname = "student_b032110204";
$username = "root";
$password = "";

$db = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);

http_response_code(404);
$response = new stdClass();

$admin_registration_code = "Jom@Admin"; // Replace with your actual admin code

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $requestData = json_decode(file_get_contents("php://input"), true);

        if (isset($requestData['fullname']) && isset($requestData['username']) && isset($requestData['email']) && isset($requestData['phone']) && isset($requestData['password']) && isset($requestData['role_id'])) {
            $fullname = $requestData['fullname'];
            $username = $requestData['username'];
            $email = $requestData['email'];
            $phone = $requestData['phone'];
            $password = $requestData['password']; // Store the password as plain text (consider using hashing in production)
            $role_id = $requestData['role_id']; // Role ID

            if ($role_id == '1') { // Admin role
                if (!isset($requestData['adminCode']) || $requestData['adminCode'] !== $admin_registration_code) {
                    http_response_code(403); // Forbidden
                    $response->error = "Invalid admin registration code.";
                    echo json_encode($response);
                    exit();
                }
            }

            $stmt = $db->prepare("SELECT * FROM user WHERE email=:email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(409);  // Conflict
                $response->error = "Email already exists.";
            } else {
                $stmt = $db->prepare("INSERT INTO user (fullname, username, email, phone, password, role_id) VALUES (:fullname, :username, :email, :phone, :password, :role_id)");
                $stmt->bindParam(':fullname', $fullname);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':role_id', $role_id);
                $stmt->execute();

                http_response_code(201);  // Created
                $response->message = "Registration successful.";
            }
        } else {
            http_response_code(400);  // Bad Request
            $response->error = "All fields are required.";
        }
    } catch (Exception $e) {
        http_response_code(500);  // Internal Server Error
        $response->error = "Error occurred: " . $e->getMessage();
    }
}

// Set the content type header and send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit();
?>
