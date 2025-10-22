<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM coffee_menu ORDER BY category, name");
    $menu = $stmt->fetchAll();
    
    // Group by category
    $groupedMenu = [];
    foreach ($menu as $item) {
        $groupedMenu[$item['category']][] = $item;
    }
    
    echo json_encode([
        'success' => true,
        'data' => $groupedMenu
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch menu: ' . $e->getMessage()
    ]);
}
?>
