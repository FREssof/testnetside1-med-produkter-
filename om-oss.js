document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    // Toggle meny
    function toggleMenu() {
        sideMenu.classList.toggle("open");
        overlay.classList.toggle("active");
    }

    // Lukk meny
    function closeMenu() {
        sideMenu.classList.remove("open");
        overlay.classList.remove("active");
    }

    // Event listeners
    menuIcon.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeMenu);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
