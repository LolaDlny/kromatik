// Gestion du formulaire de contact
function submitContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer un email valide');
        return;
    }
    
    // Simulation d'envoi
    alert(`Message envoyé avec succès!\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nNote: Pour un vrai envoi, intégrez FormSpree ou EmailJS`);
    
    // Réinitialiser
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}