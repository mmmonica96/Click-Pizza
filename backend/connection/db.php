<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "clickpizza";

//create connection
$conn = new mysqli($host, $user, $pass, $dbname);

//verify connection
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
=======
$host = 'localhost';
$dbname = 'clickpizza'; // o click_pizza si no permite &
$username = 'root';
$password = '';

try {
$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
die("Error de conexión: " . $e->getMessage());
}
?>
>>>>>>> origin/maria