import type { ComponentType } from 'react';
import AppTypography from '@components/atoms/AppTypography';
import AppButton from '@components/atoms/AppButton';

export type DSCategory = 'atoms' | 'molecules' | 'organisms';

export interface DSStateEntry {
  /** Human-readable label for this state in the preview */
  label: string;
  /** Props to pass to the component for this state */
  props: Record<string, any>;
}

export interface DSComponentEntry {
  /** Unique kebab-case ID */
  id: string;
  /** Display name — same as component name */
  name: string;
  category: DSCategory;
  /** Figma page this component belongs to */
  figmaPage?: string;
  /** 1-line description */
  description?: string;
  /** All states/variants to preview */
  states: DSStateEntry[];
  component: ComponentType<any>;
}

const noopPress = () => {};

/**
 * Figma matrix for AppButton: AppButtonBig + AppButtonSmall
 * size (2) × option (2) × state (3) × type (3) = 36 cells.
 * `isPressed` is used so “Pressed” appears in the list without holding the finger down.
 */
function buildAppButtonFigmaMatrix(): DSStateEntry[] {
  const sizes = ['large', 'small'] as const;
  const variants = ['primary', 'secondary'] as const;
  const interactionStates = [
    { name: 'default', isDisabled: false, isPressed: false },
    { name: 'pressed', isDisabled: false, isPressed: true },
    { name: 'disabled', isDisabled: true, isPressed: false },
  ] as const;
  const layouts = [
    { layout: 'text' as const, label: 'text' },
    { layout: 'iconLeading' as const, label: 'icon' },
    { layout: 'priceCta' as const, label: 'priceCta' },
  ];

  const entries: DSStateEntry[] = [];

  for (const size of sizes) {
    const sizeLabel = size === 'large' ? 'Large' : 'Small';
    for (const variant of variants) {
      for (const istate of interactionStates) {
        for (const { layout, label: layoutLabel } of layouts) {
          const label = `${sizeLabel} · ${variant} · ${istate.name} · ${layoutLabel}`;

          const props: Record<string, any> = {
            size,
            variant,
            layout,
            isDisabled: istate.isDisabled,
            isPressed: istate.isPressed,
          };

          if (layout === 'text' || layout === 'iconLeading') {
            props.children = 'ButtonText';
          }
          if (layout === 'iconLeading') {
            props.leadingIconName = 'Plus';
          }
          if (layout === 'priceCta') {
            props.priceLabel = 'Оплатити частинами';
            props.priceAmount = '1 600 ₴';
          }

          if (!istate.isDisabled) {
            props.onPress = noopPress;
          }

          entries.push({ label, props });
        }
      }
    }
  }

  return entries;
}

/**
 * Component registry — auto-maintained by Cursor rules.
 * Updated every time a component is created, renamed, or gets new states.
 * Figma: see individual component READMEs for Figma links.
 */
export const componentRegistry: DSComponentEntry[] = [
  {
    id: 'app-button',
    name: 'AppButton',
    category: 'atoms',
    figmaPage: 'Components',
    description: 'Primary / secondary pill buttons (AppButtonBig + AppButtonSmall).',
    states: [
      ...buildAppButtonFigmaMatrix(),
      { label: 'Extra · loading', props: { isLoading: true, children: 'Зачекайте' } },
      {
        label: 'Extra · text · long (DE)',
        props: { children: 'Skipass buchen und Ausrüstung leihen', onPress: noopPress },
      },
      {
        label: 'Extra · text · wrap test',
        props: {
          children: 'Забронювати лижний підйомник на завтра вранці для всієї родини',
          onPress: noopPress,
        },
      },
    ],
    component: AppButton,
  },
  {
    id: 'app-typography',
    name: 'AppTypography',
    category: 'atoms',
    figmaPage: 'Styles',
    description: 'Typography atom. All text in the app uses this component.',
    states: [
      { label: 'Number 1', props: { variant: 'number1', children: '1 234' } },
      { label: 'Display 1', props: { variant: 'display1', children: 'Bukovel' } },
      { label: 'Display 2', props: { variant: 'display2', children: 'Ski & Snowboard' } },
      { label: 'Title 1', props: { variant: 'title1', children: 'Бронювання' } },
      { label: 'Title 2', props: { variant: 'title2', children: 'Готелі та апартаменти' } },
      { label: 'Title 3', props: { variant: 'title3', children: 'Розклад підйомників' } },
      { label: 'Body 1 Highlight', props: { variant: 'body1Highlight', children: 'Ліфт відкритий щодня' } },
      { label: 'Body 1', props: { variant: 'body1', children: 'Найбільший гірськолижний курорт України' } },
      { label: 'Body 2 Highlight', props: { variant: 'body2Highlight', children: 'Деталі маршруту' } },
      { label: 'Body 2', props: { variant: 'body2', children: 'Траса для початківців та досвідчених' } },
      { label: 'Caption Highlight', props: { variant: 'captionHighlight', children: 'Статус: активний' } },
      { label: 'Caption Regular', props: { variant: 'captionRegular', children: 'Оновлено 18 березня 2026' } },
      { label: 'Caption Label', props: { variant: 'captionLabel', children: 'Категорія' } },
      { label: 'CTA Large', props: { variant: 'ctaLarge', children: 'Забронювати' } },
      { label: 'CTA Regular', props: { variant: 'ctaRegular', children: 'Детальніше' } },
      { label: 'CTA Small', props: { variant: 'ctaSmall', children: 'Фільтр' } },
      // Multi-language stress tests
      { label: 'Body 1 — long (DE)', props: { variant: 'body1', children: 'Größter Ski- und Snowboard-Resort der Ukraine' } },
      { label: 'Body 1 — wrap test', props: { variant: 'body1', children: 'Забронювати лижний підйомник на завтра вранці для всієї родини' } },
      { label: 'Title 1 — long (DE)', props: { variant: 'title1', children: 'Skipass-Buchung und Ausrüstungsverleih' } },
    ],
    component: AppTypography,
  },
];
