<?php

include_once 'db.php';

$ids = $_POST['ids'];
$ids = json_decode($ids);

$sql = "delete from usuarios where id in (" . implode(',', $ids) . ")";

if ($conn->query($sql) === TRUE) {
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
} else {
    echo "Error deleting record: " . $conn->error;
}