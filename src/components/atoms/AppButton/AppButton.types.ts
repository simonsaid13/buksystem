import type { ReactNode } from 'react';

export type AppButtonVariant = 'primary' | 'secondary';

/** Matches Figma `AppButtonBig` (`large`) and `AppButtonSmall` (`small`). */
export type AppButtonSize = 'large' | 'small';

/**
 * `text` — label only (default).
 * `iconLeading` — optional leading Iconoir icon + label.
 * `priceCta` — two text segments with a dot separator (Figma “PriceCTA”).
 */
export type AppButtonLayout = 'text' | 'iconLeading' | 'priceCta';

export type AppButtonProps = {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  layout?: AppButtonLayout;
  isDisabled?: boolean;
  /** When true, shows the pressed fill without the user holding the finger down (design system / screenshots). */
  isPressed?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  /** Shown for `text` and `iconLeading` layouts. */
  children?: ReactNode;
  /** Iconoir name in PascalCase (e.g. `Plus`). Used when `layout="iconLeading"`. */
  leadingIconName?: string;
  /** Left segment when `layout="priceCta"`. */
  priceLabel?: string;
  /** Right segment when `layout="priceCta"`. */
  priceAmount?: string;
};
