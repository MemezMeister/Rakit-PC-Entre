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
    // Return error as JSON if the connection fails
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Query to select all CPUs from cpus table
$sql = "SELECT * FROM cpus";
$result = $conn->query($sql);

// Create an array to hold the CPU data
$cpus = array();

// Check if query was successful
if ($result) {
    if ($result->num_rows > 0) {
        // Fetch and store CPU data in the array
        while($row = $result->fetch_assoc()) {
            $cpus[] = $row;
        }
    } else {
        // No CPUs found, return a message
        echo json_encode(["message" => "No CPUs found"]);
        exit;
    }
} else {
    // Return query error as JSON
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

// Return the data as JSON
header('Content-Type: application/json');  // Set content type to JSON
echo json_encode($cpus);

// Close the connection
$conn->close();
?>
