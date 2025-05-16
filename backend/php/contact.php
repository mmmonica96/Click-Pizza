<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


session_start();
//include the database connection file; assumes $pdo is created there
include '../connection/db.php';

//check if the database connection is available; if not, send error response and exit
// Conexión a la base de datos
require_once __DIR__ . '/../connection/db.php'; // ✅ ruta absoluta segura

if (!$pdo) {
    echo json_encode(["success" => false, "message" => "Conexión no disponible"]);
    exit();
}

//read raw JSON input from request body and decode into associative array
$data = json_decode(file_get_contents("php://input"), true);

//extract values or assign empty string if they don't exist

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

//validate required fields; if any are empty, return error response and exit
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Todos los campos son requeridos"]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO contact (name, email, message, date) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $message]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {

    //catch any database errors and return a JSON error message
    echo json_encode(["success" => false, "message" => "Error al enviar mensaje: " . $e->getMessage()]);
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al enviar mensaje: " . $e->getMessage()
    ]);
}
?>