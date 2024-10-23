<?php
// Database connection
$host = 'localhost';
$dbname = 'pcparts';
$username = 'Binus';
$password = 'Binusian';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute a query to fetch all prebuilds
    $stmt = $pdo->prepare("SELECT * FROM Prebuild");
    $stmt->execute();
    $prebuilds = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the prebuilds as a JSON response
    header('Content-Type: application/json');
    echo json_encode($prebuilds);

} catch (PDOException $e) {
    // If there is an error, return it as a JSON error message
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}