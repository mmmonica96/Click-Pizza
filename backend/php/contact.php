<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
session_start();
include '../connection/db.php';



if (!$pdo) {
    echo json_encode(["success" => false, "message" => "Conexión a la base de datos no está disponible"]);
    exit();
}

//json
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Todos los campos son requeridos."]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO contact (name, email, message, date) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $message]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error al enviar mensaje: " . $e->getMessage()]);
}
?>