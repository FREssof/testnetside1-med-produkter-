// Funksjon for å toggle menyen
function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    const isOpen = sideMenu.classList.contains("open");
    
    if (isOpen) {
        sideMenu.classList.remove("open");
        overlay.classList.remove("active");
    } else {
        sideMenu.classList.add("open");
        overlay.classList.add("active");
    }
}

// Lukk menyen ved klikk på overlay
function closeMenu() {
    document.getElementById("side-menu").classList.remove("open");
    document.getElementById("overlay").classList.remove("active");
}

// Funksjon for å vise produkter
async function visProdukter(kategori) {
    const container = document.getElementById("produkter");
    if (!container) {
        console.error('Produktcontainer ikke funnet');
        return;
    }

    container.innerHTML = '<div class="loading-spinner">Laster produkter...</div>';

    try {
        const response = await fetch(`http://localhost:3000/api/produkter/${kategori}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const produkter = await response.json();
        
        if (produkter.length === 0) {
            container.innerHTML = '<p class="no-products">Ingen produkter funnet i denne kategorien.</p>';
            return;
        }

        // Oppdater aktive tabs
        document.querySelectorAll('.tab-button').forEach(btn => {
            if (btn.getAttribute('data-kategori') === kategori) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const produktHTML = produkter.map(produkt => `
            <div class="card" style="background-image: url('${produkt.bilde}')">
                <div class="card-overlay">
                    <h3>${produkt.navn}</h3>
                    <p>Kr ${produkt.pris},-</p>
                </div>
            </div>
        `).join('')

        container.innerHTML = produktHTML;

    } catch (error) {
        console.error('Feil ved lasting av produkter:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Kunne ikke laste produktene. Vennligst sjekk at serveren kjører.</p>
                <button onclick="visProdukter('${kategori}')">Prøv igjen</button>
            </div>`;
    }
}

function gåTilProdukt(kategori) {
    window.location.href = `startside.html#${kategori}`;
}

// Initialiser nettsiden
document.addEventListener("DOMContentLoaded", () => {
    visProdukter('jagerfly');
    
    // Setup menu functionality
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    menuIcon?.addEventListener("click", toggleMenu);
    overlay?.addEventListener("click", closeMenu);
});
