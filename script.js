// Elementy formularza
const titleInput = document.getElementById('page-title');
const contentInput = document.getElementById('page-content');
const bgColorInput = document.getElementById('bg-color');

// Elementy podglądu
const previewBox = document.getElementById('preview-box');
const previewTitle = document.getElementById('preview-title');
const previewText = document.getElementById('preview-text');
const generateBtn = document.getElementById('generate-btn');

// Aktualizacja podglądu na żywo
titleInput.addEventListener('input', () => {
    previewTitle.innerText = titleInput.value || 'Tytuł strony';
});

contentInput.addEventListener('input', () => {
    previewText.innerText = contentInput.value || 'Tutaj pojawi się Twoja treść...';
});

bgColorInput.addEventListener('input', () => {
    previewBox.style.backgroundColor = bgColorInput.value;
});

// Funkcja generowania i pobierania pliku HTML
generateBtn.addEventListener('click', () => {
    const title = titleInput.value || 'Moja Strona';
    const content = contentInput.value || '';
    const bgColor = bgColorInput.value;

    // Szablon gotowego kodu HTML, który otrzyma użytkownik
    const fullHtmlCode = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: ${bgColor};
            padding: 40px;
            text-align: center;
        }
        .content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: inline-block;
            max-width: 600px;
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>${title}</h1>
        <p>${content}</p>
    </div>
</body>
</html>
    `;

    // Tworzenie pliku do pobrania przez przeglądarkę
    const blob = new Blob([fullHtmlCode], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    link.click();
});
