<?php
// Mostrar errores en desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexión a la base de datos
require_once __DIR__ . '/../connection/db.php'; // ✅ ruta absoluta segura

if (!$pdo) {
    echo json_encode(["success" => false, "message" => "Conexión no disponible"]);
    exit();
}

// Leer y decodificar JSON
$data = json_decode(file_get_contents("php://input"), true);

// Extraer campos
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

// Validación
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Todos los campos son requeridos"]);
    exit();
}

// Inserción
try {
    $stmt = $pdo->prepare("INSERT INTO contact (name, email, message, date) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $message]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al enviar mensaje: " . $e->getMessage()
    ]);
}
?>
