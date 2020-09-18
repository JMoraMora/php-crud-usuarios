<?php 

$serverName = "localhost";
$userName = "root";
$password = "";
$dbname = "usuario";

$conn = new mysqli($serverName, $userName, $password, $dbname);

if($conn->connect_error){
    die("Conexion fallida: " . $conn->connect_error);
}