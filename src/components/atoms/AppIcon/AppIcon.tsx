import React from 'react';
import * as IconoirIcons from 'iconoir-react-native';
import useTheme from '@hooks/useTheme';
import type { AppIconProps } from './AppIcon.types';

/**
 * AppIcon
 * Unified icon component for the entire app.
 * Wraps both Iconoir icons and custom Bukovel SVG icons.
 * Never import icon libraries directly in feature components — always use AppIcon.
 *
 * Iconoir names: use PascalCase (e.g. 'ArrowRight', 'Search', 'XmarkCircle')
 * Custom icons: use PascalCase matching files in src/assets/icons/custom/
 *
 * Usage:
 * <AppIcon name="Search" size={24} color={tokens.iconOnCard} />
 * <AppIcon name="ArrowRight" size={20} color={tokens.iconOnInt} />
 */
const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color,
  strokeWidth = 1.5,
  isDecorative = false,
}) => {
  const { tokens } = useTheme();
  const iconColor = color ?? tokens.iconOnCard;

  // Try Iconoir first
  const IconoirComponent = (IconoirIcons as Record<string, React.ComponentType<any>>)[name];

  if (IconoirComponent) {
    return (
      <IconoirComponent
        width={size}
        height={size}
        color={iconColor}
        strokeWidth={strokeWidth}
        accessible={!isDecorative}
        accessibilityLabel={isDecorative ? undefined : name}
      />
    );
  }

  // Custom icon placeholder — log a warning in development
  if (__DEV__) {
    console.warn(
      `AppIcon: "${name}" not found in Iconoir. ` +
      `If this is a custom Bukovel icon, add the SVG component to src/assets/icons/custom/.`
    );
  }

  return null;
};

export default AppIcon;
