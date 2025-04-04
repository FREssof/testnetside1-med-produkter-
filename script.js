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

document.getElementById("menu-icon").addEventListener("click", toggleMenu);
document.getElementById("overlay").addEventListener("click", closeMenu);

// Produktdata
const produkter = {
    jagerfly: [
        { navn: "F-22 Raptor", bilde: "bilder/jagerfly/F-22 Raptor (bilde).jpg" },
        { navn: "F-35 Lightning II", bilde: "bilder/jagerfly/F-35 Lightning II (bilde).jpg" },
        { navn: "F-15EX Eagle II", bilde: "bilder/jagerfly/F-15EX Eagle II.jpeg" },
        { navn: "F-14 Tomcat", bilde: "bilder/jagerfly/F-14 Tomcat.jpg" },
        { navn: "F/A-18 Super Hornet", bilde: "bilder/jagerfly/F-18 Super Hornet.jpg" },
        { navn: "P-51 Mustang", bilde: "bilder/jagerfly/P-51 Mustang.jpg" },
        { navn: "F-16 Fighting Falcon", bilde: "bilder/jagerfly/F-16 Fighting Falcon.jpg" },
        { navn: "Eurofighter Typhoon", bilde: "bilder/jagerfly/eurofighter typhoon.jpg" },
        { navn: "Messerschmitt Bf 109", bilde: "bilder/jagerfly/Messerschmitt Bf 109.jpg" },
        { navn: "Saab JAS 39 Gripen E", bilde: "bilder/jagerfly/Saab JAS 39 Gripen E.jpg" }
    ],
    biler: [
        { navn: "Ford Mustang Shelby GT500", bilde: "bilder/biler/Ford Mustang Shelby GT500.jpg" },
        { navn: "Chevrolet Corvette Z06", bilde: "bilder/biler/Chevrolet Corvette Z06.jpg" },
        { navn: "Dodge Challenger SRT Hellcat Redeye", bilde: "bilder/biler/Dodge Challenger SRT Hellcat Redeye.jpg" },
        { navn: "Chevrolet Camaro ZL1 1LE", bilde: "bilder/biler/Chevrolet Camaro ZL1 1LE.jpg" },
        { navn: "Dodge Viper ACR", bilde: "bilder/biler/Dodge Viper ACR.jpg" },
        { navn: "BMW M5 CS", bilde: "bilder/biler/BMW M5 CS.jpg" },
        { navn: "Mercedes-AMG GT Black Series", bilde: "bilder/biler/Mercedes-AMG GT Black Series.jpg" },
        { navn: "Audi RS7 Sportback Performance", bilde: "bilder/biler/Audi RS7 Sportback Performance.jpg" },
        { navn: "Porsche 911 GT3 RS", bilde: "bilder/biler/Porsche 911 GT3 RS.webp" },
        { navn: "Lamborghini Huracán STO", bilde: "bilder/biler/Lamborghini Huracán STO.jpg" }
    ]
};

// Funksjon for å vise produkter
function visProdukter(kategori) {
    const container = document.getElementById("produkter");
    container.innerHTML = "";

    produkter[kategori].forEach(produkt => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundImage = `url('${produkt.bilde}')`;

        const overlay = document.createElement("div");
        overlay.classList.add("card-overlay");
        overlay.innerHTML = `<h3>${produkt.navn}</h3>`;

        card.appendChild(overlay);
        container.appendChild(card);
    });

    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    const activeButton = document.querySelector(`.tab-button[data-kategori="${kategori}"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}
function gåTilProdukt(kategori) {
    window.location.href = `startside.html#${kategori}`;
}
// Initialiser første visning
document.addEventListener("DOMContentLoaded", () => visProdukter('jagerfly'));
