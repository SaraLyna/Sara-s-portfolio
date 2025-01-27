<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    error_log("Form submitted via POST");

    // Retrieve form data
    $nom = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validate inputs
    if (empty($nom) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Tous les champs sont requis.";
        exit;
    }

    // Email settings
    $to = "saralynaouyahia1@gmail.com";
    $subject = "Message de $nom";
    $body = "Nom: $nom\nE-mail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Erreur lors de l'envoi du message.";
    }
} else {
    http_response_code(405);
    echo "Méthode de requête non autorisée.";
}
?>
