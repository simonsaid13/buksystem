import React, { useState } from 'react';
import type { ComponentType } from 'react';
import AppTypography from '@components/atoms/AppTypography';
import AppButton from '@components/atoms/AppButton';
import AppCalendarRangePicker from '@components/organisms/AppCalendarRangePicker';
import AppDatepickerInput from '@components/molecules/AppDatepickerInput';

// ── Stateful wrappers for calendar previews ──────────────────────────────────
// The calendar and datepicker need React state to be interactive in the DS.

const CalendarPreview: React.FC<{ initialStart?: Date; initialEnd?: Date }> = ({
  initialStart,
  initialEnd,
}) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [start, setStart] = useState<Date | undefined>(initialStart);
  const [end, setEnd] = useState<Date | undefined>(initialEnd);

  const handleDay = (date: Date) => {
    if (!start || (start && end)) { setStart(date); setEnd(undefined); }
    else { date < start ? setStart(date) : setEnd(date); }
  };

  const handlePrev = () => {
    if (month === 1) { setYear((y) => y - 1); setMonth(12); }
    else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 12) { setYear((y) => y + 1); setMonth(1); }
    else setMonth((m) => m + 1);
  };

  const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstOfDisplayMonth = new Date(year, month - 1, 1);
  const canGoPrev = firstOfDisplayMonth > firstOfCurrentMonth;

  return React.createElement(AppCalendarRangePicker, {
    year, month,
    selectedStart: start, selectedEnd: end,
    onDayPress: handleDay,
    onPrevMonth: handlePrev, onNextMonth: handleNext,
    canGoPrev, canGoNext: true,
  });
};

const DatepickerPreview: React.FC<{ initialStart?: Date; initialEnd?: Date }> = ({
  initialStart,
  initialEnd,
}) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [start, setStart] = useState<Date | undefined>(initialStart);
  const [end, setEnd] = useState<Date | undefined>(initialEnd);

  const handleDay = (date: Date) => {
    if (!start || (start && end)) { setStart(date); setEnd(undefined); }
    else { date < start ? setStart(date) : setEnd(date); }
  };

  const handlePrev = () => {
    if (month === 1) { setYear((y) => y - 1); setMonth(12); }
    else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 12) { setYear((y) => y + 1); setMonth(1); }
    else setMonth((m) => m + 1);
  };

  const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstOfDisplayMonth = new Date(year, month - 1, 1);
  const canGoPrev = firstOfDisplayMonth > firstOfCurrentMonth;

  return React.createElement(AppDatepickerInput, {
    selectedStart: start, selectedEnd: end,
    calendarProps: {
      year, month,
      onDayPress: handleDay,
      onPrevMonth: handlePrev, onNextMonth: handleNext,
      canGoPrev, canGoNext: true,
    },
  });
};

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
    id: 'app-calendar-range-picker',
    name: 'AppCalendarRangePicker',
    category: 'organisms',
    figmaPage: 'Components',
    description: 'Full date-range calendar. Tap any available date to start a selection.',
    states: [
      { label: 'Empty (no selection)', props: {} },
      {
        label: 'With range selected (20–28)',
        props: {
          initialStart: (() => { const d = new Date(); d.setDate(20); return d; })(),
          initialEnd: (() => { const d = new Date(); d.setDate(28); return d; })(),
        },
      },
      {
        label: 'Single date selected',
        props: {
          initialStart: (() => { const d = new Date(); d.setDate(20); return d; })(),
        },
      },
      { label: 'Loading skeleton', props: { isLoading: true } },
    ],
    component: CalendarPreview as ComponentType<any>,
  },
  {
    id: 'app-datepicker-input',
    name: 'AppDatepickerInput',
    category: 'molecules',
    figmaPage: 'Components',
    description: 'Pill input that expands into the range calendar. Tap to toggle open.',
    states: [
      { label: 'Default (no date)', props: {} },
      {
        label: 'With date range',
        props: {
          initialStart: (() => { const d = new Date(); d.setDate(19); return d; })(),
          initialEnd: (() => { const d = new Date(); d.setDate(21); return d; })(),
        },
      },
    ],
    component: DatepickerPreview as ComponentType<any>,
  },
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
