<?php
// --- CABECERAS CORS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//connection
require_once __DIR__ . '/../connection/db.php';

//json
$data = json_decode(file_get_contents("php://input"), true);

if (
    !$data ||
    !isset($data['cart']) ||
    !isset($data['total']) ||
    !isset($data['user_id'])
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
    exit;
}

$cart = $data['cart'];
$total = $data['total'];
$user_id = $data['user_id'];

try {
    $pdo->beginTransaction();

    foreach ($cart as $item) {
        $itemName = $item['name'];
        $itemType = isset($item['type']) ? $item['type'] : 'pizza';
        $fullName = ucfirst($itemType) . ": " . $itemName;

        $stmt = $pdo->prepare("INSERT INTO shopping_basket (idUser, price, pizzas, total) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $user_id,
            $item['price'],
            $fullName,
            $total
        ]);
    }

    $pdo->commit();

    echo json_encode(["success" => true, "message" => "Pedido guardado correctamente"]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al guardar el pedido: " . $e->getMessage()
    ]);
}

//dessert
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getPostres') {
    try {
        $stmt = $pdo->query("SELECT id, name, img, price, rating FROM postres");
        $postres = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($postres);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al obtener postres: " . $e->getMessage()]);
    }
    exit();
}
?>