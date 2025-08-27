declare const MaterialColorUtilities: {
    materialDynamicColors: (seed: string) => Promise<any>;
};
interface MaterialColorPalette {
    seed: string;
    light: Record<string, string>;
    dark: Record<string, string>;
}
interface PatternCardElement extends HTMLDivElement {
    paletteData: MaterialColorPalette;
}
