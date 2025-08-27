declare global {
    interface IMaterialDynamicColorsThemeColor {
        primary: string;
        secondary: string;
        tertiary?: string;
        onPrimary?: string;
        onSecondary?: string;
        onTertiary?: string;
        primaryContainer?: string;
        onPrimaryContainer?: string;
        secondaryContainer?: string;
        onSecondaryContainer?: string;
        tertiaryContainer?: string;
        onTertiaryContainer?: string;
        error?: string;
        onError?: string;
        errorContainer?: string;
        onErrorContainer?: string;
        background?: string;
        onBackground?: string;
        surface?: string;
        onSurface?: string;
        surfaceVariant?: string;
        onSurfaceVariant?: string;
        outline?: string;
        [key: string]: any;
    }
}
export {};
