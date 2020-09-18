<?php

include_once 'db.php';

$ids = $_POST['ids'];
$ids = json_decode($ids);

$sql = "select id, username, estado from usuarios where id in (" . implode(',', $ids) . ")";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {        
        $data[] = [
            "id" => $row["id"],
            "username" => $row["username"],
            "estado" => $row["estado"]
        ];
    }
    echo json_encode($data);
} else {
    echo "0 results";
}