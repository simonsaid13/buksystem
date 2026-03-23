import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import useTheme from '@hooks/useTheme';
import AppTypography from '@components/atoms/AppTypography';
import AppIcon from '@components/atoms/AppIcon';
import AppCalendarRangePicker from '@components/organisms/AppCalendarRangePicker';
import { createStyles } from './AppDatepickerInput.styles';
import type { AppDatepickerInputProps } from './AppDatepickerInput.types';

const UA_MONTH_GENITIVE = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня',
];

function formatRange(start?: Date, end?: Date): string | null {
  if (!start) return null;
  const startStr = `${start.getDate()} ${UA_MONTH_GENITIVE[start.getMonth()]}`;
  if (!end || end.getTime() === start.getTime()) {
    return `${startStr} ${start.getFullYear()}`;
  }
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const endStr = sameMonth
    ? String(end.getDate())
    : `${end.getDate()} ${UA_MONTH_GENITIVE[end.getMonth()]}`;
  return `${startStr}–${endStr} ${end.getFullYear()}`;
}

/**
 * AppDatepickerInput
 * Pill-shaped date range input from Figma `DatepickerInput`.
 * Tapping the pill toggles the calendar open/closed.
 * The component manages its own open state — no external control needed.
 *
 * Usage:
 * <AppDatepickerInput
 *   selectedStart={start}
 *   selectedEnd={end}
 *   calendarProps={{ year, month, onDayPress, onPrevMonth, onNextMonth, canGoPrev }}
 * />
 */
const AppDatepickerInput: React.FC<AppDatepickerInputProps> = ({
  placeholder = 'Оберіть дату',
  selectedStart,
  selectedEnd,
  calendarProps,
}) => {
  const { tokens } = useTheme();
  const styles = createStyles(tokens);

  const [isOpen, setIsOpen] = useState(false);

  const hasDate = !!selectedStart;
  const rangeText = formatRange(selectedStart, selectedEnd);
  const displayText = rangeText ?? placeholder;
  const textColor = hasDate ? tokens.textOnCard : tokens.textOnCardSubtle;

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        accessibilityRole="button"
        accessibilityLabel={hasDate ? `Обраний діапазон: ${displayText}` : placeholder}
        accessibilityState={{ expanded: isOpen }}
        style={({ pressed }) => [
          styles.pill,
          isOpen || pressed ? styles.pillActive : styles.pillDefault,
        ]}
      >
        <AppIcon
          name={isOpen ? 'CalendarArrowDown' : 'Calendar'}
          size={24}
          color={tokens.iconOnCardSubtle}
          strokeWidth={1.5}
        />
        <AppTypography
          variant="ctaRegular"
          color={textColor}
          style={styles.pillText}
        >
          {displayText}
        </AppTypography>
      </Pressable>

      {isOpen && (
        <View style={styles.calendarPanel}>
          <AppCalendarRangePicker
            {...calendarProps}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
          />
        </View>
      )}
    </View>
  );
};

export default AppDatepickerInput;
