// app.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Popolamento Notizie
    const newsContainer = document.getElementById('news-container');
    if (newsContainer && siteData.news && siteData.news.length > 0) {
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
    if (orariContainer && siteData.orario) {
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

    if (track && siteData.confronti && siteData.confronti.length > 0) {
        track.innerHTML = '';
        if (dotsContainer) dotsContainer.innerHTML = '';

        siteData.confronti.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'min-w-full px-2';
            slide.innerHTML = `
                <div class="bg-white rounded-3xl p-4 sm:p-5 shadow-soft border border-brand-primary/10">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="relative group overflow-hidden rounded-2xl aspect-square bg-gray-100">
                            <span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase z-10 shadow">
                                Prima
                            </span>
                            <img src="${item.primaImg}" alt="Prima: ${item.titolo}" class="w-full h-full object-cover">
                            <span class="absolute bottom-1.5 left-1.5 right-1.5 text-center bg-black/60 backdrop-blur-sm text-white text-[11px] py-1 rounded font-medium">
                                ${item.primaNote || 'Prima'}
                            </span>
                        </div>
                        <div class="relative group overflow-hidden rounded-2xl aspect-square bg-gray-100">
                            <span class="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase z-10 shadow">
                                Dopo
                            </span>
                            <img src="${item.dopoImg}" alt="Dopo: ${item.titolo}" class="w-full h-full object-cover">
                            <span class="absolute bottom-1.5 left-1.5 right-1.5 text-center bg-black/60 backdrop-blur-sm text-white text-[11px] py-1 rounded font-medium">
                                ${item.dopoNote || 'Dopo'}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4 text-center">
                        <h4 class="text-base sm:text-lg font-bold text-brand-dark">${item.titolo}</h4>
                        <p class="text-xs sm:text-sm text-gray-500 mt-1">${item.descrizione}</p>
                    </div>
                </div>
            `;
            track.appendChild(slide);

            if (dotsContainer) {
                const dot = document.createElement('button');
                dot.className = 'w-3 h-3 rounded-full transition-all bg-gray-300';
                dot.addEventListener('click', () => updateCarousel(index));
                dotsContainer.appendChild(dot);
            }
        });

        function updateCarousel(index) {
            currentIndex = (index + siteData.confronti.length) % siteData.confronti.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('button');
                dots.forEach((d, i) => {
                    d.className = i === currentIndex 
                        ? 'w-8 h-3 rounded-full transition-all bg-brand-primary' 
                        : 'w-3 h-3 rounded-full transition-all bg-gray-300';
                });
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
        updateCarousel(0);

        // Scorrimento automatico ogni 5 secondi
        setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000);
    }

    // 4. Collegamenti Chiamata Dinamica
    document.querySelectorAll('.dynamic-tel').forEach(link => {
        link.href = `tel:${siteData.phoneNumber}`;
    });
    document.querySelectorAll('.dynamic-display-phone').forEach(el => {
        el.textContent = siteData.displayPhone;
    });
});
