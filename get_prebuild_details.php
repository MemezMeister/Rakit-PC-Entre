<?php
// Database connection
$host = 'localhost';
$dbname = 'pcparts';
$username = 'Binus';
$password = 'Binusian';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch prebuild data from the Prebuild table
    $stmt = $pdo->prepare("SELECT * FROM Prebuild");
    $stmt->execute();

    // Return results as JSON
    $prebuilds = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($prebuilds);

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>
