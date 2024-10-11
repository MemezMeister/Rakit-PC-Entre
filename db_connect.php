<?php
$servername = "localhost";
$username = "Binus"; 
$password = "Binusian"; 
$dbname = "pcparts";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to select all GPUs from gpu_list table
$sql = "SELECT * FROM gpu_list";
$result = $conn->query($sql);

// Create an array to hold the GPU data
$gpus = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $gpus[] = $row;  // Push each GPU data into the array
        }
    } else {
        echo json_encode(["message" => "No GPUs found"]);
        exit;
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

// Return the data as JSON
echo json_encode($gpus);

// Close the connection
$conn->close();
?>
