<?php
// --- CABECERA CORS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Conexión a la base de datos
require_once 'db.php';

// Verificar que se haya enviado el parámetro 'action'
if (!isset($_GET['action'])) {
    http_response_code(400);
    echo json_encode(["error" => "No se especificó ninguna acción."]);
    exit;
}

// Selección de acción
switch ($_GET['action']) {

    case 'getPizzas':
    try {
        $stmt = $pdo->query("SELECT id, name, price, img FROM pizza");
        $pizzas = $stmt->fetchAll();
        echo json_encode($pizzas);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener pizzas: " . $e->getMessage()]);
    }
    break;


    case 'getEntrantes':
        try {
            $stmt = $pdo->query("SELECT id, name, description, price, img FROM appetiser");
            $entrantes = $stmt->fetchAll();
            echo json_encode($entrantes);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al obtener entrantes: " . $e->getMessage()]);
        }
        break;

    case 'getPastas':
        try {
            $stmt = $pdo->query("SELECT id, name, ingredients, price, img FROM paste");
            $pastas = $stmt->fetchAll();
            echo json_encode($pastas);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al obtener pastas: " . $e->getMessage()]);
        }
        break;

    case 'getPostres':
    try {
        $stmt = $pdo->query("SELECT id, name, price, img FROM dessert");
        $postres = $stmt->fetchAll();
        echo json_encode($postres);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener postres: " . $e->getMessage()]);
    }
    break;

    default:
        http_response_code(400);
        echo json_encode(["error" => "Acción no válida"]);
        break;
}
?>
