let lightboxImages = [];
let currentLightboxIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // --- Récupération du slug ---
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    if (!slug) {
        window.location.href = "projets.html";
        return;
    }

    // --- Récupération du projet ---
    const projetIndex = PROJETS.findIndex(p => p.slug === slug);

    if (projetIndex === -1) {
        window.location.href = "projets.html";
        return;
    }

    const projet = PROJETS[projetIndex];

    // --- Titre de la page ---
    document.title = `${projet.title} – Lola Delannoy`;

    // --- Infos principales ---
    document.getElementById("projet-cover").src = projet.cover;
    document.getElementById("projet-cover").alt = projet.title;
    document.getElementById("projet-title").textContent = projet.title;
    document.getElementById("projet-meta").textContent =
        `${projet.type} · ${projet.category} · ${projet.year}`;
    document.getElementById("projet-description").textContent =
        projet.description || "";

    // --- Outils ---
    const outilsContainer = document.getElementById("projet-outils-container");
    if (projet.outils && projet.outils.length > 0) {
        outilsContainer.innerHTML = "<h3>Outils utilisés :</h3>";
        const ul = document.createElement("ul");
        ul.className = "project-tools";

        projet.outils.forEach(outil => {
            const li = document.createElement("li");
            li.textContent = outil;
            ul.appendChild(li);
        });

        outilsContainer.appendChild(ul);
    } else {
        outilsContainer.style.display = "none";
    }

    // --- Médias ---
    const mediaContainer = document.getElementById("projet-media");
    if (projet.media && projet.media.length > 0) {
        lightboxImages = projet.media;

        projet.media.forEach((media, index) => {
            const div = document.createElement("div");
            div.className = "media-item";
            div.addEventListener("click", () => openLightbox(index));

            if (media.endsWith(".mp4")) {
                div.innerHTML = `
                    <video autoplay loop muted playsinline>
                        <source src="${media}" type="video/mp4">
                    </video>
                `;
            } else {
                div.innerHTML = `
                    <img src="${media}" alt="${projet.title} – média ${index + 1}">
                `;
            }

            mediaContainer.appendChild(div);
        });
    } else {
        mediaContainer.style.display = "none";
    }

    // --- Navigation précédent / suivant ---
    const prevLink = document.getElementById("prev-project");
    const nextLink = document.getElementById("next-project");

    if (prevLink && projetIndex > 0) {
        const prevProjet = PROJETS[projetIndex - 1];
        prevLink.href = `show-projet.html?slug=${prevProjet.slug}`;
        prevLink.style.display = "inline-block";
    }

    if (nextLink && projetIndex < PROJETS.length - 1) {
        const nextProjet = PROJETS[projetIndex + 1];
        nextLink.href = `show-projet.html?slug=${nextProjet.slug}`;
        nextLink.style.display = "inline-block";
    }

    const breadcrumbTitle = document.getElementById("breadcrumb-title");
    if (breadcrumbTitle && typeof projet !== "undefined") {
        breadcrumbTitle.textContent = projet.title;
}
});

// ===============================
// LIGHTBOX
// ===============================

function openLightbox(index) {
    currentLightboxIndex = index;

    const lightbox = document.getElementById("lightbox");
    const content = document.getElementById("lightbox-content");
    const counter = document.getElementById("lightbox-counter");

    const media = lightboxImages[index];

    if (media.endsWith(".mp4")) {
        content.innerHTML = `
            <video controls autoplay>
                <source src="${media}" type="video/mp4">
            </video>
        `;
    } else {
        content.innerHTML = `
            <img src="${media}" alt="Media ${index + 1}">
        `;
    }

    counter.textContent = `${index + 1} / ${lightboxImages.length}`;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxImages.length - 1;
    }

    if (currentLightboxIndex >= lightboxImages.length) {
        currentLightboxIndex = 0;
    }

    openLightbox(currentLightboxIndex);
}

// ===============================
// CLAVIER
// ===============================

document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowLeft") changeLightboxImage(-1);
    else if (e.key === "ArrowRight") changeLightboxImage(1);
    else if (e.key === "Escape") closeLightbox();
});

