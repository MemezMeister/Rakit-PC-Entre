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

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Query to select all PSUs from psu_list table
$sql = "SELECT * FROM psu_list";
$result = $conn->query($sql);

// Create an array to hold the PSU data
$psus = array();

// Check if query was successful
if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $psus[] = $row;
        }
    } else {
        echo json_encode(["message" => "No PSUs found"]);
        exit;
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($psus);

// Close the connection
$conn->close();
?>