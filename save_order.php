<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if ($data === null) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
        exit;
    }
    
    if (empty($data['table']) || (!isset($data['selections']) && !isset($data['supplements']))) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }
    
    $order = [
        'table' => htmlspecialchars($data['table']),
        'selections' => isset($data['selections']) ? htmlspecialchars($data['selections']) : 'Aucune sélection',
        'supplements' => isset($data['supplements']) ? htmlspecialchars($data['supplements']) : 'Aucun supplément',
        'timestamp' => isset($data['timestamp']) ? htmlspecialchars($data['timestamp']) : date('Y-m-d H:i:s'),
        'status' => 'pending'
    ];

    $file = 'les_commandes.json';
    $orders = [];
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $orders = json_decode($content, true);
        if ($orders === null) {
            $orders = [];
        }
    }
    
    $orders[] = $order;
    
    if (file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT)) === false) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save the file']);
        exit;
    }

    echo json_encode(['status' => 'success']);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
?>