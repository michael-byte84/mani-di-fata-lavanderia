// app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Popolamento delle News
    const newsContainer = document.getElementById('news-container');
    if (siteData.news && siteData.news.length > 0) {
        siteData.news.forEach(item => {
            const newsEl = document.createElement('div');
            newsEl.className = 'bg-white p-5 rounded-xl shadow-sm border-l-4 border-brand-primary';
            newsEl.innerHTML = `
                <span class="text-xs font-semibold text-brand-primary uppercase tracking-wider">${item.data}</span>
                <h4 class="text-lg font-bold text-brand-dark mt-1">${item.titolo}</h4>
                <p class="text-gray-600 text-sm mt-2">${item.testo}</p>
            `;
            newsContainer.appendChild(newsEl);
        });
    } else {
        newsContainer.innerHTML = '<p class="text-gray-500 italic">Nessun nuovo avviso al momento.</p>';
    }

    // 2. Popolamento degli Orari (Versione Mobile-Friendly)
    const orariContainer = document.getElementById('orari-container');
    if (siteData.orari) {
        siteData.orari.forEach(item => {
            const li = document.createElement('li');
            // Su mobile (default) incolonna i dati, su tablet/desktop (sm:) li mette in riga
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

    // 3. Gestione Form Preventivo WhatsApp
    const waForm = document.getElementById('wa-form');
    waForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('wa-nome').value.trim();
        const capo = document.getElementById('wa-capo').value.trim();
        const messaggio = document.getElementById('wa-messaggio').value.trim();
        
        // Composizione del messaggio
        let textInfo = `Ciao! Mi chiamo ${nome}.%0AVorrei un preventivo per: *${capo}*.`;
        if (messaggio) {
            textInfo += `%0A%0ANote: ${messaggio}`;
        }
        textInfo += `%0A%0A(Ti invio le foto del capo qui in chat per farti vedere le condizioni).`;
        
        // Creazione URL e reindirizzamento
        const waUrl = `https://wa.me/${siteData.whatsappNumber}?text=${textInfo}`;
        window.open(waUrl, '_blank');
    });

    // 4. Configurazione bottone FAB WhatsApp
    const fab = document.getElementById('wa-fab');
    fab.href = `https://wa.me/${siteData.whatsappNumber}`;
});