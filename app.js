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
    } else {
        newsContainer.innerHTML = '<p class="text-gray-500 italic">Nessun nuovo avviso al momento.</p>';
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

    // 3. Carousel Prima & Dopo
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentIndex = 0;

    if (siteData.confronti && siteData.confronti.length > 0) {
        // Render degli slide
        siteData.confronti.forEach((item) => {
            const slide = document.createElement('div');
            slide.className = 'min-w-full px-2';
            slide.innerHTML = `
                <div class="bg-white rounded-3xl p-5 shadow-soft border border-brand-primary/10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- PRIMA -->
                        <div class="relative group overflow-hidden rounded-2xl">
                            <span class="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow">
                                Prima
                            </span>
                            <img src="${item.primaImg}" alt="Prima: ${item.titolo}" class="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                            <span class="absolute bottom-2 left-2 right-2 text-center bg-black/60 backdrop-blur-sm text-white text-xs py-1.5 px-2 rounded-lg font-medium">
                                ${item.primaNote}
                            </span>
                        </div>
                        <!-- DOPO -->
                        <div class="relative group overflow-hidden rounded-2xl">
                            <span class="absolute top-3 left-3 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow">
                                Dopo Mani di Fata
                            </span>
                            <img src="${item.dopoImg}" alt="Dopo: ${item.titolo}" class="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                            <span class="absolute bottom-2 left-2 right-2 text-center bg-black/60 backdrop-blur-sm text-white text-xs py-1.5 px-2 rounded-lg font-medium">
                                ${item.dopoNote}
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

            // Generazione dot
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full transition-all bg-gray-300';
            dot.setAttribute('aria-label', `Vai a slide ${item.titolo}`);
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        const updateCarousel = (index) => {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((d, i) => {
                if (i === currentIndex) {
                    d.className = 'w-8 h-3 rounded-full transition-all bg-brand-primary';
                } else {
                    d.className = 'w-3 h-3 rounded-full transition-all bg-gray-300';
                }
            });
        };

        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex === 0 ? siteData.confronti.length - 1 : currentIndex - 1;
            updateCarousel(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex === siteData.confronti.length - 1 ? 0 : currentIndex + 1;
            updateCarousel(newIndex);
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => updateCarousel(idx));
        });

        updateCarousel(0);
    }

    // 4. Configurazione collegamenti telefonici
    const telLinks = document.querySelectorAll('.dynamic-tel');
    telLinks.forEach(link => {
        link.href = `tel:${siteData.phoneNumber}`;
    });
    const telDisplays = document.querySelectorAll('.dynamic-display-phone');
    telDisplays.forEach(el => {
        el.textContent = siteData.displayPhone;
    });
});
