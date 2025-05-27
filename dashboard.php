<?php
$file = 'les_commandes.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $orders = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    
    if ($_POST['action'] === 'accept' && isset($_POST['index'])) {
        $index = (int)$_POST['index'];
        if (isset($orders[$index])) {
            $orders[$index]['status'] = 'accepted';
            file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT));
        }
    } elseif ($_POST['action'] === 'delete' && isset($_POST['index'])) {
        $index = (int)$_POST['index'];
        if (isset($orders[$index])) {
            array_splice($orders, $index, 1);
            file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT));
        }
    }
    
    header('Location: dashboard.php');
    exit;
}

$orders = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$pendingOrders = array_filter($orders, function($order) {
    return $order['status'] === 'pending';
});
$acceptedOrders = array_filter($orders, function($order) {
    return $order['status'] === 'accepted';
});
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Admin</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      padding: 20px; 
      background: #f2f2f2; 
      max-width: 1200px;
      margin: 0 auto;
    }
    h1, h2 {
      color: #333;
    }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      background: white; 
      margin-bottom: 30px;
    }
    th, td { 
      padding: 12px; 
      border: 1px solid #ddd; 
      text-align: left;
    }
    th { 
      background: #e67e22; 
      color: white; 
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .accepted { 
      background: #d4edda; 
    }
    .pending { 
      background: #fff3cd; 
    }
    form { 
      margin: 0; 
      display: inline;
    }
    button { 
      padding: 6px 12px; 
      cursor: pointer;
      border: none;
      border-radius: 4px;
      color: white;
    }
    .accept-btn {
      background: #28a745;
    }
    .accept-btn:hover {
      background: #218838;
    }
    .delete-btn {
      background: #dc3545;
    }
    .delete-btn:hover {
      background: #c82333;
    }
    .section-title {
      margin-top: 30px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e67e22;
    }
  </style>
</head>
<body>

<h1>Tableau de bord - Café Dania</h1>

<h2 class="section-title">Commandes en attente</h2>
<?php if (empty($pendingOrders)): ?>
  <p>Aucune commande en attente.</p>
<?php else: ?>
  <table>
    <tr>
      <th>Table</th>
      <th>Sélections</th>
      <th>Suppléments</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
    <?php foreach ($pendingOrders as $index => $order): ?>
      <tr class="pending">
        <td><?= htmlspecialchars($order['table']) ?></td>
        <td><?= nl2br(htmlspecialchars($order['selections'])) ?></td>
        <td><?= nl2br(htmlspecialchars($order['supplements'])) ?></td>
        <td><?= htmlspecialchars($order['timestamp']) ?></td>
        <td>
          <form method="POST">
            <input type="hidden" name="action" value="accept">
            <input type="hidden" name="index" value="<?= $index ?>">
            <button type="submit" class="accept-btn">Accepter</button>
          </form>
          <form method="POST" onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer cette commande?');">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="index" value="<?= $index ?>">
            <button type="submit" class="delete-btn">Supprimer</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
  </table>
<?php endif; ?>

<h2 class="section-title">Commandes acceptées</h2>
<?php if (empty($acceptedOrders)): ?>
  <p>Aucune commande acceptée pour le moment.</p>
<?php else: ?>
  <table>
    <tr>
      <th>Table</th>
      <th>Sélections</th>
      <th>Suppléments</th>
      <th>Date</th>
      <th>Status</th>
    </tr>
    <?php foreach ($acceptedOrders as $index => $order): ?>
      <tr class="accepted">
        <td><?= htmlspecialchars($order['table']) ?></td>
        <td><?= nl2br(htmlspecialchars($order['selections'])) ?></td>
        <td><?= nl2br(htmlspecialchars($order['supplements'])) ?></td>
        <td><?= htmlspecialchars($order['timestamp']) ?></td>
        <td>✔ Acceptée</td>
      </tr>
    <?php endforeach; ?>
  </table>
<?php endif; ?>

</body>
</html>