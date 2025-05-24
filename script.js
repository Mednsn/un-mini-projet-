function toggleMenu(e) {
    e.preventDefault(); // empêche un comportement par défaut si nécessaire
    window.location.href = "menu.html"; // redirige vers menu.html
}

// On attend que le DOM soit chargé pour attacher le listener
document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("openMenu");
    if (menuButton) {
        menuButton.addEventListener("click", toggleMenu);
    }
});