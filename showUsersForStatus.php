<?php

include_once 'db.php';

$status = $_POST['status'];

$sql = "select * from usuarios where estado = $status";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {        
        $data[] = [
            "id" => $row["id"],
            "username" => $row["username"],
            "createat" => $row["createat"],
            "updateat" => $row["updateat"],
            "estado" => $row["estado"]
        ];
    }
    echo json_encode($data);
} else {
    echo "0 results";
}