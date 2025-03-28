let data = [];

async function loadData() {
    try {
        const response = await fetch('./fortnite.json'); // Verifica que la ruta sea correcta
        const json = await response.json();

        console.log("JSON cargado:", json);
        
        // Verifica que json.data y json.data.br existan antes de asignar data
        if (json.data && json.data.br) {
            data = json.data.br.filter(item => item.introduction && item.introduction.chapter); // Filtra elementos válidos
        } else {
            console.error("Estructura del JSON no es la esperada.");
            return;
        }

        console.log("Datos extraídos correctamente:", data);
        alert("Datos cargados. Ahora puedes seleccionar un capítulo.");
    } catch (error) {
        console.error("Error cargando el JSON:", error);
        alert("Error al cargar los datos. Revisa la consola.");
    }
}

function loadChapter(chapterNumber) {
    if (data.length === 0) {
        alert("Los datos aún no se han cargado. Intenta nuevamente.");
        return;
    }

    // Filtramos los objetos que pertenecen al capítulo seleccionado
    const items = data.filter(item => String(item.introduction.chapter).trim() === String(chapterNumber));

    // Construimos el contenido a mostrar
    if (items.length > 0) {
        document.getElementById('content').innerHTML = `
            <h2>Capítulo ${chapterNumber}</h2>
            ${items.map(item => `
                <div class="item">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <img src="${item.images.icon}" alt="${item.name}" width="100">
                    <p><strong>Rareza:</strong> ${item.rarity.displayValue}</p>
                    <p><strong>Introducido en:</strong> ${item.introduction.text}</p>
                </div>
            `).join('')}
        `;
    } else {
        document.getElementById('content').innerHTML = `<h2>Capítulo ${chapterNumber}</h2><p>No hay información disponible.</p>`;
    }
}

// Espera a que la página cargue y los datos estén listos
window.onload = async () => {
    await loadData();
};