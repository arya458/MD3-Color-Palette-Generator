import type { Palette, PatternCardElement } from './types.js';
import {
  handleExportKt,
  handleExportJson,
  handleExportJs,
  handleExportTs,
  handleExportLaravel,
  handleExportReact,
  handleExportBlazor
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const patternList = document.getElementById('pattern-list');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const generateMoreBtn = document.getElementById('generate-more-btn');
  const toast = document.getElementById('toast-notification');
  let currentActiveCard: PatternCardElement | null = null;
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/MD3-Color-Palette-Generator/sw.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.error('Service Worker registration failed:', err));
    });
  }
  const generateRandomHex = () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`;

  // ✅ New: Update text color based on current theme and palette
  const updateCardTextColor = (palette: Palette, theme: 'light' | 'dark') => {
    const color = palette[theme].onSurface;
    document.querySelectorAll('.pattern-card').forEach((card) => {
      (card as HTMLElement).style.color = color;
    });
  };

  const renderPatternCard = (palette: Palette): void => {
    const card = document.createElement('div') as PatternCardElement;
    card.className = 'pattern-card';
    card.dataset.seed = palette.seed;
    card.paletteData = palette;
    card.innerHTML = `
      <div class="pattern-colors">
        <div class="color-tile" style="background-color:${palette.light.primary}"></div>
        <div class="color-tile" style="background-color:${palette.light.secondary}"></div>
        <div class="color-tile" style="background-color:${palette.light.tertiary}"></div>
      </div>
      <div class="pattern-info">
        <div style="display:flex; flex-direction:column;">
          <span class="seed-color">Color light: ${palette.light.primary}</span>
          <span class="seed-color">Color dark: ${palette.dark.primary}</span>
        </div>
        <div class="pattern-actions">
          <button class="action-btn download-btn" type="button" data-bs-toggle="modal" data-bs-target="#downloadModal">
            <i class="material-icons">download</i>
          </button>
        </div>
      </div>
    `;
    patternList!.appendChild(card);
  };

  const updateMockup = (palette: Palette): void => {
    const theme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
    const colors = palette[theme];
    for (const [key, value] of Object.entries(colors)) {
      const property = `--md-sys-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      document.documentElement.style.setProperty(property, value);
    }

    // ✅ Also update text color of all cards
    updateCardTextColor(palette, theme);
  };

  darkModeToggle?.addEventListener('change', () => {
    document.documentElement.classList.toggle('dark-theme');
    if (currentActiveCard) updateMockup(currentActiveCard.paletteData);
  });

  patternList!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest('.pattern-card') as PatternCardElement | null;
    if (!card) return;

    const actionBtn = target.closest('.action-btn') as HTMLElement | null;
    if (actionBtn) {
      e.stopPropagation();
      const palette = card.paletteData;
      if (actionBtn.classList.contains('export-kt-btn')) handleExportKt(palette, toast!);
      else if (actionBtn.classList.contains('export-json-btn')) handleExportJson(palette, toast!);
      else if (actionBtn.classList.contains('export-js-btn')) handleExportJs(palette, toast!);
      else if (actionBtn.classList.contains('export-ts-btn')) handleExportTs(palette, toast!);
      else if (actionBtn.classList.contains('export-laravel-btn')) handleExportLaravel(palette, toast!);
      else if (actionBtn.classList.contains('export-react-btn')) handleExportReact(palette, toast!);
      else if (actionBtn.classList.contains('export-blazor-btn')) handleExportBlazor(palette, toast!);
      return;
    }

    currentActiveCard?.classList.remove('active');
    card.classList.add('active');
    currentActiveCard = card;
    updateMockup(card.paletteData);
  });

  // Modal export buttons
  document.querySelector('.export-kt-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportKt(currentActiveCard.paletteData, toast!);
  });

  document.querySelector('.export-json-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportJson(currentActiveCard.paletteData, toast!);
  });

  document.querySelector('.export-js-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportJs(currentActiveCard.paletteData, toast!);
  });

  document.querySelector('.export-ts-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportTs(currentActiveCard.paletteData, toast!);
  });

  document.querySelector('.export-laravel-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportLaravel(currentActiveCard.paletteData, toast!);
  });

  document.querySelector('.export-react-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportReact(currentActiveCard.paletteData, toast!);
  });

  document.querySelector('.export-blazor-btn')?.addEventListener('click', () => {
    if (currentActiveCard) handleExportBlazor(currentActiveCard.paletteData, toast!);
  });

  const generateInitialPatterns = async (count = 20) => {
    patternList!.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const seed = generateRandomHex();
      // @ts-ignore
      const palette = await materialDynamicColors(seed);
      renderPatternCard(palette);
    }

    const firstCard = patternList!.querySelector('.pattern-card') as PatternCardElement | null;
    if (firstCard) {
      firstCard.click();

      // ✅ Update text color after cards rendered
      const theme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
      updateCardTextColor(firstCard.paletteData, theme);
    }
  };

  generateMoreBtn?.addEventListener('click', () => generateInitialPatterns());

  generateInitialPatterns();
});
