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