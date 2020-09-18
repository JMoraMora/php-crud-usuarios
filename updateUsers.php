<?php

include_once 'db.php';

$data = $_POST['data'];
$data = json_decode($data);

foreach ($data as $obj) {
    $sql = '';
    $sql = "update usuarios set username='$obj->username', estado=$obj->estado where id=$obj->id";
    $conn->query($sql);
}

$sql1 = "select id, username, createat, updateat, estado from usuarios";
$result = $conn->query($sql1);

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