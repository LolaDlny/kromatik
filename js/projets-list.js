// Affichage de la liste des projets
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projets-container');
    if (!container) return;
    
    PROJETS.forEach(projet => {
        const card = document.createElement('a');
        card.href = `show-projet.html?slug=${projet.slug}`;
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${projet.cover}" alt="${projet.title}">
            <h3>${projet.category}</h3>
            <div class="infos-card">
                <h2>${projet.title}</h2>
                <p>${projet.type}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Calculer et appliquer le padding pour centrer la première carte
    const calculateCenterPadding = () => {
        const viewportWidth = window.innerWidth;
        const cardWidth = 320; // Largeur de vos cartes
        const centerPadding = (viewportWidth - cardWidth) / 2;
        container.style.paddingLeft = `${centerPadding}px`;
        container.style.paddingRight = `${centerPadding}px`;
    };
    
    // Appliquer au chargement et au redimensionnement
    calculateCenterPadding();
    window.addEventListener('resize', calculateCenterPadding);
    
    // Gestion du dimming des cartes au scroll
    const horizontal = document.querySelector('.horizontal');
    const cards = document.querySelectorAll('.card');
    
    function updateCardStates() {
        if (!horizontal || cards.length === 0) return;
        
        const scrollX = horizontal.scrollLeft;
        const viewportWidth = window.innerWidth;
        const viewportCenter = scrollX + (viewportWidth / 2);
        
        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = scrollX + cardRect.left + (cardRect.width / 2);
            const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
            
            // Si la carte est proche du centre (dans un rayon de 200px)
            if (distanceFromCenter < 200) {
                card.classList.add('is-active');
                card.classList.remove('is-dimmed');
            } else {
                card.classList.remove('is-active');
                card.classList.add('is-dimmed');
            }
        });
    }
    
    // Écouter le scroll horizontal
    if (horizontal) {
        horizontal.addEventListener('scroll', updateCardStates);
        // Initialiser l'état au chargement
        setTimeout(updateCardStates, 100);
    }
});

const scrollIndicator = document.querySelector(".scroll-indicator");
window.addEventListener("scroll", () => {
    const scrollX = window.scrollX;
    if (!scrollIndicator) return;
    // L'indicateur avance légèrement avec le scroll
    scrollIndicator.style.transform = `translateX(${-scrollX * 0.1}px)`;
    // Il disparaît progressivement
    if (scrollX > 100) {
        scrollIndicator.style.opacity = "0";
    } else {
        scrollIndicator.style.opacity = "1";
    }
});