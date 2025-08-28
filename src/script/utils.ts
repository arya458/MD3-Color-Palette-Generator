import type { Palette } from './types.js';

export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function showToast(toastElement: HTMLElement, msg: string): void {
  toastElement.textContent = msg;
  toastElement.classList.add('show');
  setTimeout(() => toastElement.classList.remove('show'), 3000);
}

export function handleExportJson(palette: Palette, toastElement: HTMLElement): void {
  downloadFile('palette.json', JSON.stringify(palette, null, 2), 'application/json;charset=utf-8');
  showToast(toastElement, 'Exported palette.json');
}

export function handleExportKt(palette: Palette, toastElement: HTMLElement): void {
  const formatColor = (hex: string) => `Color(0xFF${hex.substring(1)})`;

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

  const fileContent = `package com.example.yourapp.ui.theme

import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.ui.graphics.Color

${lightColors}

${darkColors}
`;

  downloadFile('ColorScheme.kt', fileContent, 'text/plain;charset=utf-8');
  showToast(toastElement, 'Exported to ColorScheme.kt');
}

export function handleExportJs(palette: Palette, toastElement: HTMLElement): void {
  const content = `
export const lightColors = {
  primary: "${palette.light.primary}",
  onPrimary: "${palette.light.onPrimary}",
  primaryContainer: "${palette.light.primaryContainer}",
  onPrimaryContainer: "${palette.light.onPrimaryContainer}",
  secondary: "${palette.light.secondary}",
  onSecondary: "${palette.light.onSecondary}",
  secondaryContainer: "${palette.light.secondaryContainer}",
  onSecondaryContainer: "${palette.light.onSecondaryContainer}",
  tertiary: "${palette.light.tertiary}",
  onTertiary: "${palette.light.onTertiary}",
  tertiaryContainer: "${palette.light.tertiaryContainer}",
  onTertiaryContainer: "${palette.light.onTertiaryContainer}",
  error: "${palette.light.error}",
  onError: "${palette.light.onError}",
  errorContainer: "${palette.light.errorContainer}",
  onErrorContainer: "${palette.light.onErrorContainer}",
  background: "${palette.light.background}",
  onBackground: "${palette.light.onBackground}",
  surface: "${palette.light.surface}",
  onSurface: "${palette.light.onSurface}",
  surfaceVariant: "${palette.light.surfaceVariant}",
  onSurfaceVariant: "${palette.light.onSurfaceVariant}",
  outline: "${palette.light.outline}"
};

export const darkColors = {
  primary: "${palette.dark.primary}",
  onPrimary: "${palette.dark.onPrimary}",
  primaryContainer: "${palette.dark.primaryContainer}",
  onPrimaryContainer: "${palette.dark.onPrimaryContainer}",
  secondary: "${palette.dark.secondary}",
  onSecondary: "${palette.dark.onSecondary}",
  secondaryContainer: "${palette.dark.secondaryContainer}",
  onSecondaryContainer: "${palette.dark.onSecondaryContainer}",
  tertiary: "${palette.dark.tertiary}",
  onTertiary: "${palette.dark.onTertiary}",
  tertiaryContainer: "${palette.dark.tertiaryContainer}",
  onTertiaryContainer: "${palette.dark.onTertiaryContainer}",
  error: "${palette.dark.error}",
  onError: "${palette.dark.onError}",
  errorContainer: "${palette.dark.errorContainer}",
  onErrorContainer: "${palette.dark.onErrorContainer}",
  background: "${palette.dark.background}",
  onBackground: "${palette.dark.onBackground}",
  surface: "${palette.dark.surface}",
  onSurface: "${palette.dark.onSurface}",
  surfaceVariant: "${palette.dark.surfaceVariant}",
  onSurfaceVariant: "${palette.dark.onSurfaceVariant}",
  outline: "${palette.dark.outline}"
};
`;
  downloadFile('palette.js', content, 'application/javascript;charset=utf-8');
  showToast(toastElement, 'Exported palette.js');
}

export function handleExportTs(palette: Palette, toastElement: HTMLElement): void {
  const content = `
export interface ColorScheme {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
}

export const lightColors: ColorScheme = {
  primary: "${palette.light.primary}",
  onPrimary: "${palette.light.onPrimary}",
  primaryContainer: "${palette.light.primaryContainer}",
  onPrimaryContainer: "${palette.light.onPrimaryContainer}",
  secondary: "${palette.light.secondary}",
  onSecondary: "${palette.light.onSecondary}",
  secondaryContainer: "${palette.light.secondaryContainer}",
  onSecondaryContainer: "${palette.light.onSecondaryContainer}",
  tertiary: "${palette.light.tertiary}",
  onTertiary: "${palette.light.onTertiary}",
  tertiaryContainer: "${palette.light.tertiaryContainer}",
  onTertiaryContainer: "${palette.light.onTertiaryContainer}",
  error: "${palette.light.error}",
  onError: "${palette.light.onError}",
  errorContainer: "${palette.light.errorContainer}",
  onErrorContainer: "${palette.light.onErrorContainer}",
  background: "${palette.light.background}",
  onBackground: "${palette.light.onBackground}",
  surface: "${palette.light.surface}",
  onSurface: "${palette.light.onSurface}",
  surfaceVariant: "${palette.light.surfaceVariant}",
  onSurfaceVariant: "${palette.light.onSurfaceVariant}",
  outline: "${palette.light.outline}"
};

export const darkColors: ColorScheme = {
  primary: "${palette.dark.primary}",
  onPrimary: "${palette.dark.onPrimary}",
  primaryContainer: "${palette.dark.primaryContainer}",
  onPrimaryContainer: "${palette.dark.onPrimaryContainer}",
  secondary: "${palette.dark.secondary}",
  onSecondary: "${palette.dark.onSecondary}",
  secondaryContainer: "${palette.dark.secondaryContainer}",
  onSecondaryContainer: "${palette.dark.onSecondaryContainer}",
  tertiary: "${palette.dark.tertiary}",
  onTertiary: "${palette.dark.onTertiary}",
  tertiaryContainer: "${palette.dark.tertiaryContainer}",
  onTertiaryContainer: "${palette.dark.onTertiaryContainer}",
  error: "${palette.dark.error}",
  onError: "${palette.dark.onError}",
  errorContainer: "${palette.dark.errorContainer}",
  onErrorContainer: "${palette.dark.onErrorContainer}",
  background: "${palette.dark.background}",
  onBackground: "${palette.dark.onBackground}",
  surface: "${palette.dark.surface}",
  onSurface: "${palette.dark.onSurface}",
  surfaceVariant: "${palette.dark.surfaceVariant}",
  onSurfaceVariant: "${palette.dark.onSurfaceVariant}",
  outline: "${palette.dark.outline}"
};
`;
  downloadFile('palette.ts', content, 'application/typescript;charset=utf-8');
  showToast(toastElement, 'Exported palette.ts');
}

export function handleExportLaravel(palette: Palette, toastElement: HTMLElement): void {
  const content = `<?php
return [
    'light' => [
        'primary' => '${palette.light.primary}',
        'onPrimary' => '${palette.light.onPrimary}',
        'primaryContainer' => '${palette.light.primaryContainer}',
        'onPrimaryContainer' => '${palette.light.onPrimaryContainer}',
        'secondary' => '${palette.light.secondary}',
        'onSecondary' => '${palette.light.onSecondary}',
        'secondaryContainer' => '${palette.light.secondaryContainer}',
        'onSecondaryContainer' => '${palette.light.onSecondaryContainer}',
        'tertiary' => '${palette.light.tertiary}',
        'onTertiary' => '${palette.light.onTertiary}',
        'tertiaryContainer' => '${palette.light.tertiaryContainer}',
        'onTertiaryContainer' => '${palette.light.onTertiaryContainer}',
        'error' => '${palette.light.error}',
        'onError' => '${palette.light.onError}',
        'errorContainer' => '${palette.light.errorContainer}',
        'onErrorContainer' => '${palette.light.onErrorContainer}',
        'background' => '${palette.light.background}',
        'onBackground' => '${palette.light.onBackground}',
        'surface' => '${palette.light.surface}',
        'onSurface' => '${palette.light.onSurface}',
        'surfaceVariant' => '${palette.light.surfaceVariant}',
        'onSurfaceVariant' => '${palette.light.onSurfaceVariant}',
        'outline' => '${palette.light.outline}',
    ],
    'dark' => [
        'primary' => '${palette.dark.primary}',
        'onPrimary' => '${palette.dark.onPrimary}',
        'primaryContainer' => '${palette.dark.primaryContainer}',
        'onPrimaryContainer' => '${palette.dark.onPrimaryContainer}',
        'secondary' => '${palette.dark.secondary}',
        'onSecondary' => '${palette.dark.onSecondary}',
        'secondaryContainer' => '${palette.dark.secondaryContainer}',
        'onSecondaryContainer' => '${palette.dark.onSecondaryContainer}',
        'tertiary' => '${palette.dark.tertiary}',
        'onTertiary' => '${palette.dark.onTertiary}',
        'tertiaryContainer' => '${palette.dark.tertiaryContainer}',
        'onTertiaryContainer' => '${palette.dark.onTertiaryContainer}',
        'error' => '${palette.dark.error}',
        'onError' => '${palette.dark.onError}',
        'errorContainer' => '${palette.dark.errorContainer}',
        'onErrorContainer' => '${palette.dark.onErrorContainer}',
        'background' => '${palette.dark.background}',
        'onBackground' => '${palette.dark.onBackground}',
        'surface' => '${palette.dark.surface}',
        'onSurface' => '${palette.dark.onSurface}',
        'surfaceVariant' => '${palette.dark.surfaceVariant}',
        'onSurfaceVariant' => '${palette.dark.onSurfaceVariant}',
        'outline' => '${palette.dark.outline}',
    ],
];
`;
  downloadFile('palette.php', content, 'application/php;charset=utf-8');
  showToast(toastElement, 'Exported palette.php');
}

export function handleExportReact (palette: Palette, toastElement: HTMLElement): void {
    const content = `
export const lightColors = {
  primary: "${palette.light.primary}",
  onPrimary: "${palette.light.onPrimary}",
  primaryContainer: "${palette.light.primaryContainer}",
  onPrimaryContainer: "${palette.light.onPrimaryContainer}",
  secondary: "${palette.light.secondary}",
  onSecondary: "${palette.light.onSecondary}",
  secondaryContainer: "${palette.light.secondaryContainer}",
  onSecondaryContainer: "${palette.light.onSecondaryContainer}",
  tertiary: "${palette.light.tertiary}",
  onTertiary: "${palette.light.onTertiary}",
  tertiaryContainer: "${palette.light.tertiaryContainer}",
  onTertiaryContainer: "${palette.light.onTertiaryContainer}",
  error: "${palette.light.error}",
  onError: "${palette.light.onError}",
  errorContainer: "${palette.light.errorContainer}",
  onErrorContainer: "${palette.light.onErrorContainer}",
  background: "${palette.light.background}",
  onBackground: "${palette.light.onBackground}",
  surface: "${palette.light.surface}",
  onSurface: "${palette.light.onSurface}",
  surfaceVariant: "${palette.light.surfaceVariant}",
  onSurfaceVariant: "${palette.light.onSurfaceVariant}",
  outline: "${palette.light.outline}"
};

export const darkColors = {
  primary: "${palette.dark.primary}",
  onPrimary: "${palette.dark.onPrimary}",
  primaryContainer: "${palette.dark.primaryContainer}",
  onPrimaryContainer: "${palette.dark.onPrimaryContainer}",
  secondary: "${palette.dark.secondary}",
  onSecondary: "${palette.dark.onSecondary}",
  secondaryContainer: "${palette.dark.secondaryContainer}",
  onSecondaryContainer: "${palette.dark.onSecondaryContainer}",
  tertiary: "${palette.dark.tertiary}",
  onTertiary: "${palette.dark.onTertiary}",
  tertiaryContainer: "${palette.dark.tertiaryContainer}",
  onTertiaryContainer: "${palette.dark.onTertiaryContainer}",
  error: "${palette.dark.error}",
  onError: "${palette.dark.onError}",
  errorContainer: "${palette.dark.errorContainer}",
  onErrorContainer: "${palette.dark.onErrorContainer}",
  background: "${palette.dark.background}",
  onBackground: "${palette.dark.onBackground}",
  surface: "${palette.dark.surface}",
  onSurface: "${palette.dark.onSurface}",
  surfaceVariant: "${palette.dark.surfaceVariant}",
  onSurfaceVariant: "${palette.dark.onSurfaceVariant}",
  outline: "${palette.dark.outline}"
};
`;
    downloadFile('palette.react.js', content, 'application/javascript;charset=utf-8');
    showToast(toastElement, 'Exported palette.react.js');
};

export function handleExportBlazor (palette: Palette, toastElement: HTMLElement): void {
    const formatColor = (hex: string) => hex.toUpperCase();

    const content = `
public static class Palette
{
    public static readonly Dictionary<string, string> LightColors = new Dictionary<string, string>()
    {
        {"Primary", "${formatColor(palette.light.primary)}"},
        {"OnPrimary", "${formatColor(palette.light.onPrimary)}"},
        {"PrimaryContainer", "${formatColor(palette.light.primaryContainer)}"},
        {"OnPrimaryContainer", "${formatColor(palette.light.onPrimaryContainer)}"},
        {"Secondary", "${formatColor(palette.light.secondary)}"},
        {"OnSecondary", "${formatColor(palette.light.onSecondary)}"},
        {"SecondaryContainer", "${formatColor(palette.light.secondaryContainer)}"},
        {"OnSecondaryContainer", "${formatColor(palette.light.onSecondaryContainer)}"},
        {"Tertiary", "${formatColor(palette.light.tertiary)}"},
        {"OnTertiary", "${formatColor(palette.light.onTertiary)}"},
        {"TertiaryContainer", "${formatColor(palette.light.tertiaryContainer)}"},
        {"OnTertiaryContainer", "${formatColor(palette.light.onTertiaryContainer)}"},
        {"Error", "${formatColor(palette.light.error)}"},
        {"OnError", "${formatColor(palette.light.onError)}"},
        {"ErrorContainer", "${formatColor(palette.light.errorContainer)}"},
        {"OnErrorContainer", "${formatColor(palette.light.onErrorContainer)}"},
        {"Background", "${formatColor(palette.light.background)}"},
        {"OnBackground", "${formatColor(palette.light.onBackground)}"},
        {"Surface", "${formatColor(palette.light.surface)}"},
        {"OnSurface", "${formatColor(palette.light.onSurface)}"},
        {"SurfaceVariant", "${formatColor(palette.light.surfaceVariant)}"},
        {"OnSurfaceVariant", "${formatColor(palette.light.onSurfaceVariant)}"},
        {"Outline", "${formatColor(palette.light.outline)}"}
    };

    public static readonly Dictionary<string, string> DarkColors = new Dictionary<string, string>()
    {
        {"Primary", "${formatColor(palette.dark.primary)}"},
        {"OnPrimary", "${formatColor(palette.dark.onPrimary)}"},
        {"PrimaryContainer", "${formatColor(palette.dark.primaryContainer)}"},
        {"OnPrimaryContainer", "${formatColor(palette.dark.onPrimaryContainer)}"},
        {"Secondary", "${formatColor(palette.dark.secondary)}"},
        {"OnSecondary", "${formatColor(palette.dark.onSecondary)}"},
        {"SecondaryContainer", "${formatColor(palette.dark.secondaryContainer)}"},
        {"OnSecondaryContainer", "${formatColor(palette.dark.onSecondaryContainer)}"},
        {"Tertiary", "${formatColor(palette.dark.tertiary)}"},
        {"OnTertiary", "${formatColor(palette.dark.onTertiary)}"},
        {"TertiaryContainer", "${formatColor(palette.dark.tertiaryContainer)}"},
        {"OnTertiaryContainer", "${formatColor(palette.dark.onTertiaryContainer)}"},
        {"Error", "${formatColor(palette.dark.error)}"},
        {"OnError", "${formatColor(palette.dark.onError)}"},
        {"ErrorContainer", "${formatColor(palette.dark.errorContainer)}"},
        {"OnErrorContainer", "${formatColor(palette.dark.onErrorContainer)}"},
        {"Background", "${formatColor(palette.dark.background)}"},
        {"OnBackground", "${formatColor(palette.dark.onBackground)}"},
        {"Surface", "${formatColor(palette.dark.surface)}"},
        {"OnSurface", "${formatColor(palette.dark.onSurface)}"},
        {"SurfaceVariant", "${formatColor(palette.dark.surfaceVariant)}"},
        {"OnSurfaceVariant", "${formatColor(palette.dark.onSurfaceVariant)}"},
        {"Outline", "${formatColor(palette.dark.outline)}"}
    };
}
`;
    downloadFile('palette.cs', content, 'text/plain;charset=utf-8');
    showToast(toastElement, 'Exported Palette.cs');
};
