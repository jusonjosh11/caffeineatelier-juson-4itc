<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
$requiredFields = ['customer_name', 'contact', 'coffee_selection', 'coffee_size', 'quantity'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Missing required field: $field"]);
        exit;
    }
}

try {
    // Get coffee price from menu based on size
    $stmt = $pdo->prepare("SELECT small_price, medium_price, large_price FROM coffee_menu WHERE coffee_name = ?");
    $stmt->execute([$input['coffee_selection']]);
    $coffee = $stmt->fetch();
    
    if (!$coffee) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid coffee selection']);
        exit;
    }
    
    // Get base price based on size
    $basePrice = 0;
    switch ($input['coffee_size']) {
        case 'Small':
            $basePrice = $coffee['small_price'];
            break;
        case 'Medium':
            $basePrice = $coffee['medium_price'];
            break;
        case 'Large':
            $basePrice = $coffee['large_price'];
            break;
    }
    
    // Calculate add-ons price
    $addonsPrice = 0;
    $addons = [];
    if (!empty($input['addons'])) {
        foreach ($input['addons'] as $addon) {
            switch ($addon) {
                case 'Extra Shot':
                    $addonsPrice += 25;
                    break;
                case 'Whipped Cream':
                    $addonsPrice += 15;
                    break;
                case 'Almond Milk':
                    $addonsPrice += 20;
                    break;
                case 'Oat Milk':
                    $addonsPrice += 20;
                    break;
            }
            $addons[] = $addon;
        }
    }
    
    // Calculate unit price (base price + addons, no size multiplier needed)
    $unitPrice = $basePrice + $addonsPrice;
    $totalPrice = $unitPrice * $input['quantity'];
    
    // Insert order using the correct database schema
    $stmt = $pdo->prepare("
        INSERT INTO orders (
            customer_id, customer_name, contact_info, coffee_selection, coffee_size, 
            quantity, unit_price, total_price, order_status, special_instructions, 
            addons, order_date, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    ");
    
    $stmt->execute([
        'GUEST_' . time(), // customer_id - generate unique guest ID
        $input['customer_name'],
        $input['contact'],
        $input['coffee_selection'],
        $input['coffee_size'],
        $input['quantity'],
        $unitPrice,
        $totalPrice,
        'Pending', // order_status - use correct enum value
        '', // special_instructions - empty for now
        json_encode($addons) // addons as JSON string
    ]);
    
    $orderId = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'order_id' => $orderId,
        'total_price' => $totalPrice,
        'message' => 'Order submitted successfully!'
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to submit order: ' . $e->getMessage()
    ]);
}
?>
