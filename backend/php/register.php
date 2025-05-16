<?php
//CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

//handle preflight and bail out immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // 204 No Content is fine; browser will see the CORS headers above
    http_response_code(204);
    exit;
}

session_start();

//database connection
$conn = new mysqli("localhost", "root", "", "clickpizza");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

//parse JSON body
$data = json_decode(file_get_contents("php://input"), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

//validate inputs (notice the || for OR)
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
    exit;
}

//check for existing email
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "El correo ya está registrado."]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

//insert new user (you should really hash the password here!)
$stmt = $conn->prepare("INSERT INTO users (name, email, password, registration_date) VALUES (?, ?, ?, NOW())");
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();