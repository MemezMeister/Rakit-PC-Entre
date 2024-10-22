<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "Binus";
$password = "Binusian";
$dbname = "pcparts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$sql = "SELECT * FROM case_list";
$result = $conn->query($sql);

$cases = array();
if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $cases[] = $row;
        }
    } else {
        echo json_encode(["message" => "No cases found"]);
        exit;
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

header('Content-Type: application/json');
echo json_encode($cases);

$conn->close();
?>
