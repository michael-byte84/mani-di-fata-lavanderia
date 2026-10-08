// data.js
const siteData = {
    // Numero di telefono formattato per la chiamata diretta
    phoneNumber: "+393351423360",
    displayPhone: "335 142 3360",
    
    // Avvisi importanti
    news: [
        {
            data: "13 giugno 2026",
            titolo: "Donazione capi usati 2026",
            testo: "Per tutto il 2026, la raccolta di abiti usati avverrà dalle 08:00 alle 13:00, dal lunedì al sabato."
        },
        {
            data: "1 settembre 2026",
            titolo: "Ripristino orario invernale",
            testo: "Dal 1 settembre 2026 ritorna l'orario consueto: dal lunedì al sabato, dalle 08:00 alle 13:00 e dalle 15:00 alle 19:00; domenica chiuso."
        }
    ],

    // Orari di apertura
    orario: [
        { giorno: "Lunedì", ore: "08:00 - 13:00 | 15:00 - 19:00" },
        { giorno: "Martedì", ore: "08:00 - 13:00 | 15:00 - 19:00" },
        { giorno: "Mercoledì", ore: "08:00 - 13:00 | 15:00 - 19:00" },
        { giorno: "Giovedì", ore: "08:00 - 13:00 | 15:00 - 19:00" },
        { giorno: "Venerdì", ore: "08:00 - 13:00 | 15:00 - 19:00" },
        { giorno: "Sabato", ore: "08:00 - 13:00" },
        { giorno: "Domenica", ore: "Chiuso" }
    ],

    // Immagini e testi per il Carousel Prima & Dopo
    // (Puoi sostituire gli URL di Unsplash con i link alle tue foto reali)
    confronti: [
        {
            titolo: "Piumone Invernale in Piuma d'Oca",
            descrizione: "Lavaggio igienizzante antibatterico profondo, rimozione aloni e ripristino del volume originale.",
            primaImg: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
            primaNote: "Ingiallito & compresso",
            dopoImg: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
            dopoNote: "Bianco ottico & soffice"
        },
        {
            titolo: "Giacca Lana & Cashmere",
            descrizione: "Trattamento a secco ecologico per macchie d'olio e caffè senza rovinare le fibre nobili.",
            primaImg: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
            primaNote: "Macchie scure visibili",
            dopoImg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
            dopoNote: "Fibre rigenerate e pure"
        },
        {
            titolo: "Tappeto Orientale Pregiato",
            descrizione: "Lavaggio artigianale ad acqua a temperatura controllata per ravvivare i colori e sanificare la trama.",
            primaImg: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
            primaNote: "Tonalità spente e polvere",
            dopoImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            dopoNote: "Colori vivi e protetti"
        }
    ]
};
