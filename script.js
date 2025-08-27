// script.js
import * as MaterialColorUtilities from "https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.2/dist/cdn/material-dynamic-colors.min.js";

document.addEventListener('DOMContentLoaded', () => {
    const patternList = document.getElementById('pattern-list');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const generateMoreBtn = document.getElementById('generate-more-btn');
    const toast = document.getElementById('toast-notification');
    let favorites = JSON.parse(localStorage.getItem('md3-favorites')) || [];
    let currentActiveCard = null;

    const generateRandomHex = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase()}`;

    const renderPatternCard = (palette) => {
        const card = document.createElement('div');
        card.className = 'pattern-card';
        card.dataset.seed = palette.seed;
        card.paletteData = palette;
        const isFavorited = favorites.includes(palette.seed);

        card.innerHTML = `
            <div class="pattern-colors">
                <div class="color-tile" style="background-color:${palette.light.primary}"></div>
                <div class="color-tile" style="background-color:${palette.light.secondary}"></div>
                <div class="color-tile" style="background-color:${palette.light.tertiary}"></div>
            </div>
            <div class="pattern-info">
                <span class="seed-color">${palette.seed}</span>
                <div class="pattern-actions">
                    <button class="action-btn favorite-btn">
                        <i class="material-icons">${isFavorited ? 'favorite' : 'favorite_border'}</i>
                    </button>
                    <button class="action-btn export-kt-btn"><i class="material-icons">code</i></button>
                    <button class="action-btn export-json-btn"><i class="material-icons">data_object</i></button>
                </div>
            </div>
        `;
        patternList.appendChild(card);
    };

    const updateMockup = (palette) => {
        const theme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
        const colors = palette[theme];
        for (const [key, value] of Object.entries(colors)) {
            const property = `--md-sys-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            document.documentElement.style.setProperty(property, value);
        }
    };

    const showToast = (msg) => {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    const downloadFile = (filename, content, mime) => {
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportJson = (palette) => {
        downloadFile('palette.json', JSON.stringify(palette, null, 2), 'application/json;charset=utf-8');
        showToast('Exported palette.json');
    };

    const handleFavorite = (seed, btn) => {
        const icon = btn.querySelector('.material-icons');
        const idx = favorites.indexOf(seed);
        if (idx > -1) {
            favorites.splice(idx, 1);
            icon.textContent = 'favorite_border';
            showToast('Removed from favorites');
        } else {
            favorites.push(seed);
            icon.textContent = 'favorite';
            showToast('Added to favorites');
        }
        localStorage.setItem('md3-favorites', JSON.stringify(favorites));
    };

    darkModeToggle?.addEventListener('change', () => {
        document.documentElement.classList.toggle('dark-theme');
        if (currentActiveCard) updateMockup(currentActiveCard.paletteData);
    });

    patternList.addEventListener('click', (e) => {
        const card = e.target.closest('.pattern-card');
        if (!card) return;
        const actionBtn = e.target.closest('.action-btn');
        if (actionBtn) {
            e.stopPropagation();
            const palette = card.paletteData;
            if (actionBtn.classList.contains('export-json-btn')) handleExportJson(palette);
            if (actionBtn.classList.contains('favorite-btn')) handleFavorite(palette.seed, actionBtn);
            return;
        }
        currentActiveCard?.classList.remove('active');
        card.classList.add('active');
        currentActiveCard = card;
        updateMockup(card.paletteData);
    });

    const generateInitialPatterns = async (count = 20) => {
        patternList.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const seed = generateRandomHex();
            const palette = await materialDynamicColors(seed);
            renderPatternCard(palette);
        }
        const firstCard = patternList.querySelector('.pattern-card');
        if (firstCard) firstCard.click();
    };

    generateMoreBtn?.addEventListener('click', () => generateInitialPatterns());

    generateInitialPatterns();
});