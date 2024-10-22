<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<?php
// Database connection
include 'db_connect.php';

// Query to select all CPUs from the cpus table
$sql = "SELECT * FROM cpus";
$result = $conn->query($sql);

// Create an array to hold the CPU data
$cpus = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $cpus[] = $row;  // Push each CPU data into the array
        }
    } else {
        echo json_encode(["message" => "No CPUs found"]);
        exit;
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

// Return the CPU data as JSON
header('Content-Type: application/json');
echo json_encode($cpus);

// Close the database connection
$conn->close();
?>
