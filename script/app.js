// Ajouter un écouteur d'événement pour toggle le menu
const navLinks = document.getElementById('nav-links');
navLinks.classList.toggle('active');

// Fonction pour afficher une alerte avec les informations du formulaire
function showAlert(event) {
    event.preventDefault();  // Empêche l'envoi du formulaire pour éviter de recharger la page

    // Récupérer les valeurs des champs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Afficher une alerte avec les informations saisies
    alert(`Nom: ${name}\nE-mail: ${email}\nMessage: ${message}`);
    
    // Si tu veux envoyer le formulaire après l'alerte, décommente la ligne suivante:
    // document.getElementById('contactForm').submit();
}

// Définition de la classe Client
class Client {
    constructor(nom, email, message) {
        this.nom = nom;
        this.email = email;
        this.message = message;
    }

    // Méthode pour afficher les informations du client
    presentation() {
        alert(`Bonjour, je suis ${this.nom}, vous pouvez me contacter sur ${this.email}. Mon message est : ${this.message}.`);
    }

    // Méthode pour soumettre le formulaire après avoir créé l'objet
    submitForm() {
        document.getElementById('contactForm').submit();
    }
}

// Fonction déclenchée lors du clic sur "Envoyer"
document.getElementById("envoyer").addEventListener("click", (event) => {
    // Empêcher l'envoi du formulaire (comportement par défaut)
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const nom = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value; 

    // Validation basique (tous les champs doivent être remplis)
    if (!nom || !email || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Création de l'objet client
    const client = new Client(nom, email, message);

    // Appel de la méthode presentation() pour afficher les informations
    client.presentation();

    // Envoi des données via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'send_email.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Créer une chaîne de données à envoyer à PHP
    const data = `name=${encodeURIComponent(nom)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;

    // Lorsque la requête est terminée, gérer la réponse (par exemple, afficher un message de succès)
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Si l'envoi a réussi, afficher un message de confirmation
            alert("Message envoyé avec succès !");
        } else {
            // Si une erreur se produit, afficher un message d'erreur
            alert("Une erreur est survenue lors de l'envoi du message.");
        }
    };

    // Envoi des données
    xhr.send(data);

    // Si tu veux soumettre le formulaire après, appelle ici la méthode pour soumettre le formulaire en arrière-plan ou de manière plus propre avec AJAX
    // document.getElementById('contactForm').submit();
});

// Fonction pour basculer entre le mode sombre et clair
function toggleBackground() {
    const body = document.body;
    const button = document.querySelector('.toggle-btn');
    const sections = document.querySelectorAll('.section');

    // Vérifie la couleur actuelle et la bascule
    if (body.style.backgroundColor === 'black') {

        body.style.backgroundColor = '#402b47';
        body.style.color = 'black';

        sections.forEach(section => {
            section.style.backgroundColor = '#400443'; // Arrière-plan clair
            section.style.color = 'black'; // Texte noir
            section.style.border = '1px solid #ddd'; // Bordure claire
        });

        button.textContent = 'Dark Mode';
        button.classList.remove('dark-mode');
        button.classList.add('light-mode');
    } else {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        button.textContent = 'Light Mode';
        button.classList.remove('light-mode');
        button.classList.add('dark-mode');

        sections.forEach(section => {
            section.style.backgroundColor = 'black'; // Arrière-plan sombre
            section.style.color = 'white'; // Texte blanc
            section.style.border = '1px solid #555'; // Bordure sombre
        });
    }
}
