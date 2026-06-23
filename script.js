const canvas = document.getElementById('canvas');
const addBlockButtons = document.querySelectorAll('.add-block-btn');
const exportBtn = document.getElementById('export-btn');
const primaryColorInput = document.getElementById('primary-color');
const fontSelect = document.getElementById('font-family');

// Szablony sekcji jako czysty kod HTML
const templates = {
    hero: `
        <div class="editable-section section-hero" data-type="hero">
            <div class="section-actions"><button class="action-btn delete-btn"><i class="fa-solid fa-trash"></i></button></div>
            <h1 contenteditable="true">Kliknij, aby zmienić nagłówek Hero</h1>
            <p contenteditable="true">To jest podtekst nowoczesnego baneru reklamowego. Możesz go dowolnie edytować bezpośrednio na ekranie.</p>
        </div>
    `,
    features: `
        <div class="editable-section section-features" data-type="features">
            <div class="section-actions"><button class="action-btn delete-btn"><i class="fa-solid fa-trash"></i></button></div>
            <div class="feature-box">
                <h3 contenteditable="true">Funkcja 1</h3>
                <p contenteditable="true">Opis niesamowitej cechy Twojego produktu lub usługi.</p>
            </div>
            <div class="feature-box">
                <h3 contenteditable="true">Funkcja 2</h3>
                <p contenteditable="true">Drugi element specyfikacji, który przyciągnie uwagę klienta.</p>
            </div>
            <div class="feature-box">
                <h3 contenteditable="true">Funkcja 3</h3>
                <p contenteditable="true">Trzecia karta z zaletami oferty. Szybko i czytelnie.</p>
            </div>
        </div>
    `,
    cta: `
        <div class="editable-section section-cta" data-type="cta">
            <div class="section-actions"><button class="action-btn delete-btn"><i class="fa-solid fa-trash"></i></button></div>
            <h2 contenteditable="true">Zacznij korzystać już dziś!</h2>
            <p contenteditable="true">Zapisz się do naszego newslettera lub załóż darmowe konto.</p>
            <span class="cta-btn" contenteditable="true">Kliknij Mnie</span>
        </div>
    `
};

// 1. Dodawanie nowej sekcji do projektu
addBlockButtons.forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = templates[type].trim();
        const newSection = tempDiv.firstChild;

        // Obsługa usuwania sekcji
        newSection.querySelector('.delete-btn').addEventListener('click', () => {
            newSection.remove();
        });

        canvas.appendChild(newSection);
        applyGlobalStyles();
    });
});

// 2. Aktualizacja stylów na żywo
function applyGlobalStyles() {
    const color = primaryColorInput.value;
    const font = fontSelect.value;

    canvas.style.fontFamily = font;
    
    // Zmiana kolorów przycisków CTA na płótnie
    canvas.querySelectorAll('.cta-btn').forEach(btn => {
        btn.style.backgroundColor = color;
    });
}

primaryColorInput.addEventListener('input', applyGlobalStyles);
fontSelect.addEventListener('change', applyGlobalStyles);

// 3. Ekstraktor czystego kodu (usuwa interfejs kreatora i zostawia czysty HTML dla użytkownika)
exportBtn.addEventListener('click', () => {
    // Klonujemy zawartość canvasu, żeby nie popsuć edytora podczas czyszczenia kodu
    const canvasClone = canvas.cloneNode(true);
    
    // Usuwamy paski narzędzi (przyciski usuwania) z eksportowanego kodu
    canvasClone.querySelectorAll('.section-actions').forEach(el => el.remove());
    canvasClone.querySelectorAll('.editable-section').forEach(el => {
        el.removeAttribute('data-type');
        el.className = el.className.replace('editable-section', '').trim();
    });
    canvasClone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

    const cleanHtmlContent = canvasClone.innerHTML;
    const chosenColor = primaryColorInput.value;
    const chosenFont = fontSelect.value;

    // Budowanie pełnego pliku HTML gotowego do wrzucenia w sieć
    const finalFile = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moja Wygenerowana Strona</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: ${chosenFont}; color: #1e293b; line-height: 1.5; }
        .section-hero { padding: 80px 40px; text-align: center; background: #f8fafc; }
        .section-hero h1 { font-size: 48px; margin-bottom: 16px; color: #0f172a; }
        .section-hero p { font-size: 18px; color: #64748b; }
        .section-features { padding: 60px 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; background: white; }
        .feature-box { padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; }
        .feature-box h3 { margin-bottom: 10px; }
        .feature-box p { color: #64748b; }
        .section-cta { padding: 60px 40px; text-align: center; background: #0f172a; color: white; }
        .section-cta h2 { font-size: 32px; margin-bottom: 12px; }
        .cta-btn { display: inline-block; padding: 12px 24px; background-color: ${chosenColor}; color: white; border-radius: 6px; text-decoration: none; margin-top: 15px; font-weight: bold; }
    </style>
</head>
<body>
    ${cleanHtmlContent}
</body>
</html>`;

    // Pobieranie pliku
    const blob = new Blob([finalFile], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    link.click();
});
