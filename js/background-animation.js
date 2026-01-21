// Animation du fond grille
const body = document.body;
let x = 0;
let y = 0;
let vx = (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
let vy = (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);

function animateBackground() {
    x += vx;
    y += vy;
    body.style.backgroundPosition = `${x}px ${y}px, ${x}px ${y}px`;
    requestAnimationFrame(animateBackground);
}

function randomizeVelocity() {
    vx = (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
    vy = (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
}

animateBackground();
setInterval(randomizeVelocity, 2000);