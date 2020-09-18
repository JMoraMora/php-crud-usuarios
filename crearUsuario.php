<?php

include_once 'db.php';

$username = $_POST['username'];
$sql = "insert into usuarios(username) values('$username')";

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    
    $sql1 = "select id, username, createat, updateat, estado from usuarios where id=$last_id";
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
    echo "Error: " . $sql . "<br>" . $conn->error;
}