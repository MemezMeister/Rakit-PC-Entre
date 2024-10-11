<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$servername = "localhost";
$username = "Binus";
$password = "Binusian";
$dbname = "pcparts";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection and handle error if connection fails
if ($conn->connect_error) {
    // Return error as JSON if the connection fails
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Query to select all GPUs from gpu_list table
$sql = "SELECT * FROM gpu_list";
$result = $conn->query($sql);

// Create an array to hold the GPU data
$gpus = array();

// Check if query was successful
if ($result) {
    if ($result->num_rows > 0) {
        // Fetch and store GPU data in the array
        while($row = $result->fetch_assoc()) {
            $gpus[] = $row;
        }
    } else {
        // No GPUs found, return a message
        echo json_encode(["message" => "No GPUs found"]);
        exit;
    }
} else {
    // Return query error as JSON
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

// Return the data as JSON
header('Content-Type: application/json');  // Set content type to JSON
echo json_encode($gpus);

// Close the connection
$conn->close();
?>
