// app.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Popolamento Notizie
    const newsContainer = document.getElementById('news-container');
    if (siteData.news && siteData.news.length > 0) {
        siteData.news.forEach(item => {
            const newsEl = document.createElement('div');
            newsEl.className = 'bg-white p-5 rounded-2xl shadow-sm border-l-4 border-brand-primary';
            newsEl.innerHTML = `
                <span class="text-xs font-semibold text-brand-primary uppercase tracking-wider">${item.data}</span>
                <h4 class="text-lg font-bold text-brand-dark mt-1">${item.titolo}</h4>
                <p class="text-gray-600 text-sm mt-2 leading-relaxed">${item.testo}</p>
            `;
            newsContainer.appendChild(newsEl);
        });
    }

    // 2. Popolamento Orari
    const orariContainer = document.getElementById('orari-container');
    if (siteData.orario) {
        siteData.orario.forEach(item => {
            const li = document.createElement('li');
            li.className = 'py-3 px-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1';
            const isChiuso = item.ore.toLowerCase().includes('chiuso');
            const colorClass = isChiuso ? 'text-red-400 font-bold' : 'text-gray-600 font-medium';
            li.innerHTML = `
                <span class="text-base font-bold text-brand-dark">${item.giorno}</span>
                <span class="text-sm sm:text-base ${colorClass}">${item.ore}</span>
            `;
            orariContainer.appendChild(li);
        });
    }

    // 3. Gestione Dati Confronti (Dati predefiniti + Eventuali caricati via Drag & Drop)
    let userConfronti = [];
    try {
        const saved = localStorage.getItem('user_confronti');
        if (saved) {
            userConfronti = JSON.parse(saved);
        }
    } catch(e) { console.error(e); }

    let allConfronti = [...userConfronti, ...(siteData.confronti || [])];

    // 4. Carousel Logic
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentIndex = 0;

    function renderCarousel() {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        if (allConfronti.length === 0) return;

        allConfronti.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'min-w-full px-2';
            slide.innerHTML = `
                <div class="bg-white rounded-3xl p-4 sm:p-5 shadow-soft border border-brand-primary/10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
                            <span class="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow">
                                Prima
                            </span>
                            <img src="${item.primaImg}" alt="Prima" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                            <span class="absolute bottom-2 left-2 right-2 text-center bg-black/60 backdrop-blur-sm text-white text-xs py-1.5 px-2 rounded-lg font-medium">
                                ${item.primaNote || 'Prima del trattamento'}
                            </span>
                        </div>
                        <div class="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
                            <span class="absolute top-3 left-3 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow">
                                Dopo Mani di Fata
                            </span>
                            <img src="${item.dopoImg}" alt="Dopo" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                            <span class="absolute bottom-2 left-2 right-2 text-center bg-black/60 backdrop-blur-sm text-white text-xs py-1.5 px-2 rounded-lg font-medium">
                                ${item.dopoNote || 'Risultato finale'}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4 text-center">
                        <h4 class="text-lg font-bold text-brand-dark">${item.titolo}</h4>
                        <p class="text-sm text-gray-500 mt-1">${item.descrizione}</p>
                    </div>
                </div>
            `;
            track.appendChild(slide);

            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full transition-all bg-gray-300';
            dot.addEventListener('click', () => updateCarousel(index));
            dotsContainer.appendChild(dot);
        });

        updateCarousel(0);
    }

    function updateCarousel(index) {
        if (allConfronti.length === 0) return;
        currentIndex = (index + allConfronti.length) % allConfronti.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((d, i) => {
            d.className = i === currentIndex 
                ? 'w-8 h-3 rounded-full transition-all bg-brand-primary' 
                : 'w-3 h-3 rounded-full transition-all bg-gray-300';
        });
    }

    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
    renderCarousel();

    // 5. Drag & Drop Gestione File
    let primaBase64 = null;
    let dopoBase64 = null;

    function setupDropZone(dropZoneId, inputId, previewId, onLoaded) {
        const dropZone = document.getElementById(dropZoneId);
        const fileInput = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        const handleFile = (file) => {
            if (!file || !file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                preview.src = result;
                preview.classList.remove('hidden');
                dropZone.querySelector('.placeholder-text').classList.add('hidden');
                onLoaded(result);
            };
            reader.readAsDataURL(file);
        };

        dropZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.add('border-brand-primary', 'bg-violet-50');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-brand-primary', 'bg-violet-50');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            handleFile(file);
        });
    }

    setupDropZone('dropzone-prima', 'input-prima', 'preview-prima', (b64) => { primaBase64 = b64; });
    setupDropZone('dropzone-dopo', 'input-dopo', 'preview-dopo', (b64) => { dopoBase64 = b64; });

    // Salva nuova coppia di foto
    const saveComparisonBtn = document.getElementById('save-comparison-btn');
    if (saveComparisonBtn) {
        saveComparisonBtn.addEventListener('click', () => {
            if (!primaBase64 || !dopoBase64) {
                alert("Trascina o carica sia la foto del PRIMA che quella del DOPO.");
                return;
            }

            const titolo = document.getElementById('upload-titolo').value.trim() || "Nuovo Trattamento";
            const desc = document.getElementById('upload-desc').value.trim() || "Cura e pulizia artigianale Mani di Fata.";

            const newEntry = {
                titolo: titolo,
                descrizione: desc,
                primaImg: primaBase64,
                primaNote: "Prima",
                dopoImg: dopoBase64,
                dopoNote: "Dopo Mani di Fata"
            };

            userConfronti.unshift(newEntry);
            try {
                localStorage.setItem('user_confronti', JSON.stringify(userConfronti));
            } catch(e) {
                console.warn("Spazio storage locale limitato:", e);
            }

            allConfronti = [...userConfronti, ...(siteData.confronti || [])];
            renderCarousel();
            updateCarousel(0);

            // Resetta form
            document.getElementById('upload-titolo').value = '';
            document.getElementById('upload-desc').value = '';
            document.getElementById('preview-prima').classList.add('hidden');
            document.getElementById('preview-dopo').classList.add('hidden');
            document.querySelectorAll('.placeholder-text').forEach(el => el.classList.remove('hidden'));
            primaBase64 = null;
            dopoBase64 = null;

            alert("Confronto aggiunto con successo al carosello!");
        });
    }

    // Telefono dinamico
    document.querySelectorAll('.dynamic-tel').forEach(link => {
        link.href = `tel:${siteData.phoneNumber}`;
    });
    document.querySelectorAll('.dynamic-display-phone').forEach(el => {
        el.textContent = siteData.displayPhone;
    });
});
