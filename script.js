document.addEventListener('DOMContentLoaded', () => {
    // --- Global Variables & Initial Setup --- //
    const { argbFromHex, themeFromSourceColor, CorePalette } = materialcolorutilities;

    const patternList = document.getElementById('pattern-list');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const generateMoreBtn = document.getElementById('generate-more-btn');
    const toast = document.getElementById('toast-notification');
    let favorites = JSON.parse(localStorage.getItem('md3-favorites')) || [];
    let currentActiveCard = null;

    // --- Core Functions --- //

    /**
     * Generates a random hexadecimal color code.
     * @returns {string} A hex color string (e.g., "#1A2B3C").
     */
    const generateRandomHex = () => {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${hex.padStart(6, '0')}`.toUpperCase();
    };

    /**
     * Converts an ARGB integer color to a HEX string.
     * @param {number} argb - The ARGB integer.
     * @returns {string} A hex color string.
     */
    const argbToHex = (argb) => {
        const r = (argb >> 16) & 0xFF;
        const g = (argb >> 8) & 0xFF;
        const b = argb & 0xFF;
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    };

    /**
     * Creates a full Material Design 3 tonal palette from a seed color.
     * @param {string} seedColor - The starting hex color.
     * @returns {object} An object containing the seed and structured light/dark theme palettes.
     */
    const createFullPalette = (seedColor) => {
        const sourceArgb = argbFromHex(seedColor);
        const corePalette = CorePalette.fromInt(sourceArgb);

        const palette = {
            seed: seedColor,
            light: {},
            dark: {}
        };

        const roles = [
            'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer',
            'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
            'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
            'error', 'onError', 'errorContainer', 'onErrorContainer',
            'background', 'onBackground', 'surface', 'onSurface',
            'surfaceVariant', 'onSurfaceVariant', 'outline'
        ];

        roles.forEach(role => {
            const camelRole = role.charAt(0).toUpperCase() + role.slice(1);
            palette.light[role] = argbToHex(corePalette.a1['light' + camelRole]);
            palette.dark[role] = argbToHex(corePalette.a1['dark' + camelRole]);
        });

        return palette;
    };

    /**
     * Renders a single color pattern card and appends it to the list.
     * @param {object} palette - The full palette object from createFullPalette.
     */
    const renderPatternCard = (palette) => {
        const card = document.createElement('div');
        card.className = 'pattern-card';
        card.dataset.seed = palette.seed;
        // Store the palette data directly on the element for easy access
        card.paletteData = palette;

        const isFavorited = favorites.includes(palette.seed);

        card.innerHTML = `
            <div class="pattern-colors">
                <div class="color-tile" style="background-color: ${palette.light.primary};"></div>
                <div class="color-tile" style="background-color: ${palette.light.secondary};"></div>
                <div class="color-tile" style="background-color: ${palette.light.tertiary};"></div>
            </div>
            <div class="pattern-info">
                <span class="seed-color">${palette.seed}</span>
                <div class="pattern-actions">
                    <button class="action-btn favorite-btn" title="Add to Favorites">
                        <i class="material-icons">${isFavorited ? 'favorite' : 'favorite_border'}</i>
                    </button>
                    <button class="action-btn export-kt-btn" title="Export to Jetpack Compose (.kt)">
                        <i class="material-icons">code</i>
                    </button>
                    <button class="action-btn export-json-btn" title="Export to JSON">
                        <i class="material-icons">data_object</i>
                    </button>
                </div>
            </div>
        `;
        patternList.appendChild(card);
    };

    /**
     * Updates the phone mockup preview with the selected color palette.
     * @param {object} palette - The full palette object.
     */
    const updateMockup = (palette) => {
        const theme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
        const colors = palette[theme];

        for (const [key, value] of Object.entries(colors)) {
            const propertyName = `--md-sys-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            document.documentElement.style.setProperty(propertyName, value);
        }
    };

    /**
     * Shows a toast notification message.
     * @param {string} message - The text to display in the toast.
     */
    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // --- Export & Action Functions --- //

    /**
     * Downloads content as a file.
     * @param {string} filename - The desired name of the file.
     * @param {string} content - The text content of the file.
     * @param {string} mimeType - The MIME type of the file.
     */
    const downloadFile = (filename, content, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportKt = (palette) => {
        const formatColor = (hex) => `Color(0xFF${hex.substring(1)})`;

        const lightColors = `
private val LightColors = lightColorScheme(
    primary = ${formatColor(palette.light.primary)},
    onPrimary = ${formatColor(palette.light.onPrimary)},
    primaryContainer = ${formatColor(palette.light.primaryContainer)},
    onPrimaryContainer = ${formatColor(palette.light.onPrimaryContainer)},
    secondary = ${formatColor(palette.light.secondary)},
    onSecondary = ${formatColor(palette.light.onSecondary)},
    secondaryContainer = ${formatColor(palette.light.secondaryContainer)},
    onSecondaryContainer = ${formatColor(palette.light.onSecondaryContainer)},
    tertiary = ${formatColor(palette.light.tertiary)},
    onTertiary = ${formatColor(palette.light.onTertiary)},
    tertiaryContainer = ${formatColor(palette.light.tertiaryContainer)},
    onTertiaryContainer = ${formatColor(palette.light.onTertiaryContainer)},
    error = ${formatColor(palette.light.error)},
    onError = ${formatColor(palette.light.onError)},
    errorContainer = ${formatColor(palette.light.errorContainer)},
    onErrorContainer = ${formatColor(palette.light.onErrorContainer)},
    background = ${formatColor(palette.light.background)},
    onBackground = ${formatColor(palette.light.onBackground)},
    surface = ${formatColor(palette.light.surface)},
    onSurface = ${formatColor(palette.light.onSurface)},
    surfaceVariant = ${formatColor(palette.light.surfaceVariant)},
    onSurfaceVariant = ${formatColor(palette.light.onSurfaceVariant)},
    outline = ${formatColor(palette.light.outline)}
)`;

        const darkColors = `
private val DarkColors = darkColorScheme(
    primary = ${formatColor(palette.dark.primary)},
    onPrimary = ${formatColor(palette.dark.onPrimary)},
    primaryContainer = ${formatColor(palette.dark.primaryContainer)},
    onPrimaryContainer = ${formatColor(palette.dark.onPrimaryContainer)},
    secondary = ${formatColor(palette.dark.secondary)},
    onSecondary = ${formatColor(palette.dark.onSecondary)},
    secondaryContainer = ${formatColor(palette.dark.secondaryContainer)},
    onSecondaryContainer = ${formatColor(palette.dark.onSecondaryContainer)},
    tertiary = ${formatColor(palette.dark.tertiary)},
    onTertiary = ${formatColor(palette.dark.onTertiary)},
    tertiaryContainer = ${formatColor(palette.dark.tertiaryContainer)},
    onTertiaryContainer = ${formatColor(palette.dark.onTertiaryContainer)},
    error = ${formatColor(palette.dark.error)},
    onError = ${formatColor(palette.dark.onError)},
    errorContainer = ${formatColor(palette.dark.errorContainer)},
    onErrorContainer = ${formatColor(palette.dark.onErrorContainer)},
    background = ${formatColor(palette.dark.background)},
    onBackground = ${formatColor(palette.dark.onBackground)},
    surface = ${formatColor(palette.dark.surface)},
    onSurface = ${formatColor(palette.dark.onSurface)},
    surfaceVariant = ${formatColor(palette.dark.surfaceVariant)},
    onSurfaceVariant = ${formatColor(palette.dark.onSurfaceVariant)},
    outline = ${formatColor(palette.dark.outline)}
)`;

        const fileContent = `package com.example.yourapp.ui.theme\n\nimport androidx.compose.material3.lightColorScheme\nimport androidx.compose.material3.darkColorScheme\nimport androidx.compose.ui.graphics.Color\n\n${lightColors}\n\n${darkColors}\n`;

        downloadFile('ColorScheme.kt', fileContent, 'text/plain;charset=utf-8');
        showToast('Exported to ColorScheme.kt');
    };

    const handleExportJson = (palette) => {
        const jsonContent = JSON.stringify(palette, null, 2);
        downloadFile('palette.json', jsonContent, 'application/json;charset=utf-8');
        showToast('Exported to palette.json');
    };

    const handleFavorite = (seed, buttonEl) => {
        const icon = buttonEl.querySelector('.material-icons');
        const index = favorites.indexOf(seed);

        if (index > -1) {
            favorites.splice(index, 1);
            icon.textContent = 'favorite_border';
            showToast('Removed from favorites');
        } else {
            favorites.push(seed);
            icon.textContent = 'favorite';
            showToast('Added to favorites');
        }

        localStorage.setItem('md3-favorites', JSON.stringify(favorites));
    };


    // --- Event Listeners --- //

    darkModeToggle.addEventListener('change', () => {
        document.documentElement.classList.toggle('dark-theme');
        // If a card is active, update the mockup with the new theme
        if (currentActiveCard && currentActiveCard.paletteData) {
            updateMockup(currentActiveCard.paletteData);
        }
    });

    patternList.addEventListener('click', (e) => {
        const card = e.target.closest('.pattern-card');
        if (!card) return;

        const actionBtn = e.target.closest('.action-btn');
        if (actionBtn) {
            e.stopPropagation(); // Prevent card selection when clicking a button
            const palette = card.paletteData;
            if (actionBtn.classList.contains('export-kt-btn')) {
                handleExportKt(palette);
            } else if (actionBtn.classList.contains('export-json-btn')) {
                handleExportJson(palette);
            } else if (actionBtn.classList.contains('favorite-btn')) {
                handleFavorite(palette.seed, actionBtn);
            }
            return;
        }

        // Handle card selection
        if (currentActiveCard) {
            currentActiveCard.classList.remove('active');
        }
        card.classList.add('active');
        currentActiveCard = card;

        updateMockup(card.paletteData);
    });

    const generateInitialPatterns = (count = 20) => {
        patternList.innerHTML = ''; // Clear existing patterns
        for (let i = 0; i < count; i++) {
            const seed = generateRandomHex();
            const palette = createFullPalette(seed);
            renderPatternCard(palette);
        }
        // Auto-select and preview the first card
        const firstCard = patternList.querySelector('.pattern-card');
        if (firstCard) {
            firstCard.click();
        }
    };

    generateMoreBtn.addEventListener('click', () => generateInitialPatterns());

    // --- Initial Load --- //
    generateInitialPatterns();
});