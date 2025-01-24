<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Destinataire
    $to = "saralynaouyahia1@gmail.com";
    $subject = "Message de $nom";

    // Corps de l'email
    $body = "Nom: $nom\nE-mail: $email\n\nMessage:\n$message";

    // En-têtes
    $headers = "From: $email";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Erreur lors de l'envoi du message.";
    }
}
?>
