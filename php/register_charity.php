<?php
$hostname = "localhost";
$database = "student_b032110204";
$description = "root";
$password = "";

$db = new PDO("mysql:host=$hostname;dbname=$database", $description, $password);

http_response_code(404);
$response = new stdClass();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $requestData = json_decode(file_get_contents("php://input"), true);

        if (isset($requestData['name']) && isset($requestData['description']) && isset($requestData['email']) && isset($requestData['phone_company']) && isset($requestData['address']) && isset($requestData['password']) && isset($requestData['role_id'])) {
            $name = $requestData['name'];
            $description = $requestData['description'];
            $phone_company = $requestData['phone_company'];
            $address = $requestData['address'];
            $email = $requestData['email'];
            $password = $requestData['password']; // Store the password as plain text (consider using hashing in production)
            $role_id = $requestData['role_id']; // Role ID

            $stmt = $db->prepare("SELECT * FROM charity WHERE email=:email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(409);  // Conflict
                $response->error = "Email already exists.";
            } else {
                $stmt = $db->prepare("INSERT INTO charity (name, description, email, phone_company, address, password, role_id) VALUES (:name, :description, :email, :phone_company, :address, :password, :role_id)");
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':phone_company', $phone_company);
                $stmt->bindParam(':address', $address);
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
