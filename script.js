function toggleMenu(e) {
    e.preventDefault(); 
    window.location.href = "menu.html"; 
}


document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("openMenu");
    if (menuButton) {
        menuButton.addEventListener("click", toggleMenu);
    }
});
