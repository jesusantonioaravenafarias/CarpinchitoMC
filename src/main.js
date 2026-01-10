const contentData = [
    {
        title: "ACTIONS AND STUFF",
        category: "Textura",
        description: "La mejor experiencia de animaciones y realismo para tu mundo. Última actualización disponible.",
        thumbnail: "public/actions-stuff.jpg",
        downloadUrl: "#"
    }
];

function createCard(item) {
    return `
        <div class="group bg-dark-800 rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-all hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-emerald-500/10">
            <div class="relative overflow-hidden">
                <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-auto block transition-transform duration-500 group-hover:scale-110">
                <span class="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    ${item.category}
                </span>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">${item.title}</h3>
                <p class="text-gray-400 text-sm mb-6">${item.description}</p>
                <button class="w-full py-3 bg-white/5 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    <span>Descargar ahora</span>
                </button>
            </div>
        </div>
    `;
}

function renderCards(data) {
    const grid = document.getElementById('cardsGrid');
    if (data.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-20 flex flex-col items-center text-center animate-fade-in">
                <div class="relative mb-8 group">
                    <div class="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                    <img src="public/not-found-new.png" alt="No encontrado" class="relative h-64 w-64 object-contain drop-shadow-2xl transition-transform group-hover:rotate-6">
                </div>
                <h3 class="text-3xl font-bold mb-4 text-white uppercase tracking-tighter">¡Chispas, bro! No hay nada por aquí</h3>
                <p class="text-gray-400 max-w-md mx-auto mb-8">
                    El carpincho buscó por todos los bloques pero no encontró esa textura o addon. Intenta con otra palabra o búscalo por categoría.
                </p>
                <button onclick="resetFilter()" class="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
                    Ver todo de nuevo
                </button>
            </div>
        `;
        return;
    }
    grid.innerHTML = data.map(item => createCard(item)).join('');
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = contentData.filter(item =>
            item.title.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term)
        );
        renderCards(filtered);

        // Scroll to results if there is a search term
        if (term.length > 0) {
            document.getElementById('downloads').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function filterItems(category) {
    const filtered = contentData.filter(item => item.category === category);
    renderCards(filtered);
}

function resetFilter() {
    renderCards(contentData);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderCards(contentData);
    initTypewriter();
});

function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const texts = ["Nivel Pro", "Máximo Nivel", "Siguiente Nivel", "Estilo Único"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 150;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            speed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            speed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}
