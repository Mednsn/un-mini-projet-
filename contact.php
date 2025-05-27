<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST ["name"];
    $email = $_POST ["email"];
    $mssg = $_POST ["message"];

  //   echo "les information de client est nome :$nom email:($email).";

 
    $conn = new mysqli;
    $serves = "localhost";
    $user ="root";
    $password = "";
    $database = "contact";
    $conn->connect($serves, $user, "", $database);
    $stmt = $conn->prepare("INSERT INTO contact (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nom, $email, $mssg);
    if ($stmt->execute()) {
        echo "Message sent successfully! Les information de client est nome : $nom email:($email).";
    } 
$stmt->close();
    $conn->close();

} 
?>
