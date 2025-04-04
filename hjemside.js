document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    // Funksjon for å toggle menyen
    function toggleMenu() {
        sideMenu.classList.toggle("open");
        overlay.classList.toggle("active");
    }

    // Funksjon for å lukke menyen
    function closeMenu() {
        sideMenu.classList.remove("open");
        overlay.classList.remove("active");
    }

    // Legg til event listeners
    menuIcon.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeMenu);
});

// Gå til produktkategori
function gåTilProdukt(kategori) {
    window.location.href = `index.html#${kategori}`;
}

// Åpne kontaktinformasjon
function åpneKontakt() {
    alert("Kontakt oss på support@helgomega.no eller ring +47 123 45 678.");
}
