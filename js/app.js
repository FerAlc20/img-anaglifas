document.addEventListener('DOMContentLoaded', () => {

    // --- 0. LÓGICA DE SPLASH SCREEN Y FADE-IN ---
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // Oculta el splash screen
    setTimeout(() => {
        splashScreen.classList.add('hidden');
    }, 1900); // Tu tiempo de 1.9s

    // Muestra el contenido principal
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 2000); // Tu tiempo de 2s


    // =============================================
    // --- 0.5. LÓGICA DE FILTRO STICKY ---
    // =============================================
    try {
        const navbar = document.querySelector('.navbar-custom');
        const filterWrapper = document.querySelector('.filter-sticky-wrapper');
        
        if (navbar && filterWrapper) {
            const navbarHeight = navbar.offsetHeight;
            filterWrapper.style.top = `${navbarHeight}px`;
        }
    } catch (e) {
        console.error("Error al aplicar el filtro sticky:", e);
    }
    // =============================================


    // --- 1. Definición de las Imágenes (CON TUS SÍMBOLOS) ---
    const galleryImages = [
        { id: 'alumno', title: 'Alumno', ext: 'jpg', disparity: '+' },
        { id: 'amigos', title: 'Amigos', ext: 'jpg', disparity: '-' },
        { id: 'banca', title: 'Banca', ext: 'jpg', disparity: 'x' },
        { id: 'basura', title: 'Basura', ext: 'jpg', disparity: 'x' },
        { id: 'craneo', title: 'Cráneo', ext: 'jpeg', disparity: 'x' },
        { id: 'escaleras', title: 'Escaleras', ext: 'jpg', disparity: '+' },
        { id: 'estudiante', title: 'Estudiante', ext: 'jpg', disparity: '+' },
        { id: 'fer', title: 'Fer', ext: 'jpeg', disparity: '+' },
        { id: 'gato', title: 'Gato', ext: 'jpeg', disparity: 'x' },
        { id: 'lampara', title: 'Lámpara', ext: 'jpg', disparity: 'x' },
        { id: 'lavanda', title: 'Lavanda', ext: 'jpg', disparity: '-' },
        { id: 'limon', title: 'Limón', ext: 'jpg', disparity: '-' },
        { id: 'palmera', title: 'Palmera', ext: 'jpg', disparity: 'x' },
        { id: 'papel', title: 'Papel', ext: 'jpg', disparity: '-' },
        { id: 'pasillo', title: 'Pasillo', ext: 'jpg', disparity: '+' },
        { id: 'suculenta', title: 'Suculenta', ext: 'jpg', disparity: '-' },
        { id: 'venado', title: 'Venado', ext: 'jpeg', disparity: '-' },
        { id: 'angel', title: 'Ángel', ext: 'jpeg', disparity: '-' }
    ];

    const imagePath = 'img/';
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = ''; 

    // --- 2. Generar la Galería ---
    galleryImages.forEach(img => {
        const imageExtension = `.${img.ext}`;
        const anaglyphSrc = `${imagePath}${img.id}${imageExtension}`;
        const sbs1Src = `${imagePath}${img.id}_s1${imageExtension}`;
        const sbs2Src = `${imagePath}${img.id}_s2${imageExtension}`;

        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6 gallery-item hidden d-none'; 
        col.dataset.disparity = img.disparity; // <- Ahora usa '+', '-', 'x'

        // Determinar la clase de la ETIQUETA
        let tagClass = 'tag-secondary'; // Gris para Nula (x)
        if (img.disparity === '+') tagClass = 'tag-success'; // Verde para Positiva (+)
        if (img.disparity === '-') tagClass = 'tag-danger'; // Rojo para Negativa (-)

        // MODIFICADO: Muestra el símbolo que le diste
        const cardHTML = `
            <div class="card gallery-card h-100" 
                 data-bs-toggle="modal" 
                 data-bs-target="#imageModal"
                 data-title="${img.title}"
                 data-anaglyph="${anaglyphSrc}"
                 data-sbs1="${sbs1Src}"
                 data-sbs2="${sbs2Src}">
                
                <img src="${anaglyphSrc}" class="card-img-top" alt="${img.title}">
                
                <div class="card-body">
                    <h5 class="card-title">${img.title}</h5>
                    <span class="card-disparity-tag ${tagClass}">
                        Disparidad: ${img.disparity}
                    </span>
                </div>
            </div>
        `;
        
        col.innerHTML = cardHTML;
        galleryGrid.appendChild(col);
    });

    // --- 3. Lógica del Modal (Color Púrpura) ---
    // (Esta sección no necesita cambios)
    const imageModal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const imageContainer = document.getElementById('modal-image-container');
    const btnAnaglyph = document.getElementById('btn-anaglyph');
    const btnSbs = document.getElementById('btn-sbs');
    let currentAnaglyph = '', currentSbs1 = '', currentSbs2 = '';

    imageModal.addEventListener('show.bs.modal', (event) => {
        const card = event.relatedTarget.closest('.gallery-card');
        const title = card.dataset.title;
        currentAnaglyph = card.dataset.anaglyph;
        currentSbs1 = card.dataset.sbs1;
        currentSbs2 = card.dataset.sbs2;
        modalTitle.textContent = title;
        showAnaglyphView();
        
        btnAnaglyph.classList.add('active', 'btn-custom-filter');
        btnAnaglyph.classList.remove('btn-outline-custom-filter');
        btnSbs.classList.remove('active', 'btn-custom-filter');
        btnSbs.classList.add('btn-outline-custom-filter');
    });

    function showAnaglyphView() {
        imageContainer.innerHTML = `<img src="${currentAnaglyph}" class="anaglyph-image" alt="Vista Anaglifo de ${modalTitle.textContent}">`;
    }
    function showSbsView() {
        imageContainer.innerHTML = `<div id="sbs-container"><img src="${currentSbs1}" class="sbs-image" alt="Ojo izquierdo"><img src="${currentSbs2}" class="sbs-image" alt="Ojo derecho"></div>`;
    }

    btnAnaglyph.addEventListener('click', () => {
        showAnaglyphView();
        btnAnaglyph.classList.add('active', 'btn-custom-filter');
        btnAnaglyph.classList.remove('btn-outline-custom-filter');
        btnSbs.classList.remove('active', 'btn-custom-filter');
        btnSbs.classList.add('btn-outline-custom-filter');
    });

    btnSbs.addEventListener('click', () => {
        showSbsView();
        btnSbs.classList.add('active', 'btn-custom-filter');
        btnSbs.classList.remove('btn-outline-custom-filter');
        btnAnaglyph.classList.remove('active', 'btn-custom-filter');
        btnAnaglyph.classList.add('btn-outline-custom-filter');
    });


    // --- 4. LÓGICA DE FILTROS (Línea Deslizante) ---
    // (Esta sección no necesita cambios)
    const filterContainer = document.getElementById('filter-container');
    const filterButtons = document.querySelectorAll('.filter-nav-btn');
    const activeLine = document.querySelector('.filter-active-line');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function moveActiveLine(activeButton) {
        if (!activeButton) return;
        const offsetLeft = activeButton.offsetLeft;
        const offsetWidth = activeButton.offsetWidth;
        activeLine.style.left = `${offsetLeft}px`;
        activeLine.style.width = `${offsetWidth}px`;
    }
    
    const initialActiveButton = document.querySelector('.filter-nav-btn.active');
    setTimeout(() => {
        moveActiveLine(initialActiveButton);
    }, 100); 

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter; // <- Obtiene '+', '-', 'x' del HTML (cuando lo actualices)
            
            const oldActiveButton = document.querySelector('.filter-nav-btn.active');
            if (oldActiveButton) {
                oldActiveButton.classList.remove('active');
            }
            button.classList.add('active');
            
            moveActiveLine(button);
            filterGallery(filter);
        });
    });

    // Función de filtrado (Fluida)
    function filterGallery(filter) {
        const animationDelay = 300; 

        galleryItems.forEach(item => {
            const itemDisparity = item.dataset.disparity; // <- Obtiene '+', '-', 'x' del item
            const shouldShow = (filter === 'all' || itemDisparity === filter);
            
            if (shouldShow) {
                item.classList.remove('d-none');
                setTimeout(() => {
                    item.classList.remove('hidden');
                }, 20); 
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.classList.add('d-none');
                }, animationDelay);
            }
        });
    }
    
    // --- 5. MOSTRAR TODAS LAS IMÁGENES AL INICIO ---
    setTimeout(() => {
        filterGallery('all');
    }, 2100); 

});