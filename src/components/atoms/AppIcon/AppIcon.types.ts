/**
 * Custom Bukovel-specific icon names (ski resort icons).
 * SVG files live in src/assets/icons/custom/.
 * Add new names here as custom icons are added.
 */
export type CustomIconName =
  | 'Gondola'
  | 'SkiLift'
  | 'SkiSlope'
  | 'Snowpark'
  | 'SkiPass'
  | 'Resort';

export type AppIconSize = 16 | 20 | 24 | 32;

export type AppIconProps = {
  /** Icon name — Iconoir kebab-case names are converted to PascalCase automatically */
  name: string;
  /** Icon size in px. Standard sizes: 16 (tight UI), 20 (inline), 24 (default), 32 (feature) */
  size?: AppIconSize;
  /** Icon color. Defaults to tokens.iconOnCard */
  color?: string;
  /** Stroke width. Default 1.5 */
  strokeWidth?: number;
  /** Set to true for purely decorative icons that should be ignored by screen readers */
  isDecorative?: boolean;
};
