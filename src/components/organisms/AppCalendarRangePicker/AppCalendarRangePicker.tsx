import React, { useMemo } from 'react';
import { View } from 'react-native';
import useTheme from '@hooks/useTheme';
import AppTypography from '@components/atoms/AppTypography';
import AppIcon from '@components/atoms/AppIcon';
import { Pressable } from 'react-native';
import { spacing } from '@theme/spacing';
import { createStyles } from './AppCalendarRangePicker.styles';
import CalendarDateCell, { type DateCellState } from './components/CalendarDateCell';
import type { AppCalendarRangePickerProps } from './AppCalendarRangePicker.types';

/** Ukrainian weekday abbreviations — Mon first (ISO week). */
const DAY_LABELS = ['П', 'В', 'С', 'Ч', 'П', 'С', 'Н'];

/** Ukrainian month names in nominative case. */
const MONTH_NAMES = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/**
 * Returns 0 (Mon) – 6 (Sun) for a Date (ISO weekday order).
 * JS getDay() returns 0=Sun, so we shift it.
 */
function isoWeekday(d: Date): number {
  return (d.getDay() + 6) % 7;
}

/**
 * Builds a 6-row × 7-col grid of date numbers (or null for padding cells)
 * for the given year/month.
 */
function buildGrid(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startOffset = isoWeekday(firstDay); // how many empty cells at the start

  const cells: (number | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

/**
 * AppCalendarRangePicker
 * Full date-range calendar organism from Figma `DateRange/Selected`.
 * Manages its own display grid; the parent controls which dates are
 * selected/disabled and handles navigation.
 *
 * Usage:
 * <AppCalendarRangePicker
 *   year={2026} month={3}
 *   selectedStart={start} selectedEnd={end}
 *   onDayPress={(date) => handlePick(date)}
 *   onPrevMonth={goBack} onNextMonth={goForward}
 *   canGoPrev={canGoPrev} canGoNext={true}
 * />
 */
const AppCalendarRangePicker: React.FC<AppCalendarRangePickerProps> = ({
  year,
  month,
  selectedStart,
  selectedEnd,
  disabledBefore,
  disabledDates = [],
  onDayPress,
  onPrevMonth,
  onNextMonth,
  canGoPrev = true,
  canGoNext = true,
  isLoading = false,
}) => {
  const { tokens } = useTheme();
  const styles = createStyles(tokens);

  const threshold = useMemo(
    () => startOfDay(disabledBefore ?? new Date()),
    [disabledBefore],
  );

  const disabledSet = useMemo(
    () => disabledDates.map((d) => startOfDay(d).getTime()),
    [disabledDates],
  );

  const grid = useMemo(() => buildGrid(year, month), [year, month]);

  const getCellState = (day: number): DateCellState => {
    const date = new Date(year, month - 1, day);
    const dateTime = startOfDay(date).getTime();

    if (dateTime < threshold.getTime()) return 'disabled';
    if (disabledSet.includes(dateTime)) return 'disabled';

    if (selectedStart && selectedEnd) {
      if (isSameDay(date, selectedStart)) return 'selectedStart';
      if (isSameDay(date, selectedEnd)) return 'selectedEnd';
      if (date > selectedStart && date < selectedEnd) return 'selectedRange';
    } else if (selectedStart && !selectedEnd) {
      if (isSameDay(date, selectedStart)) return 'selectedOnly';
    }

    return 'available';
  };

  return (
    <View style={styles.container}>
      {/* Month navigation header */}
      <View style={styles.header}>
        <Pressable
          onPress={canGoPrev ? onPrevMonth : undefined}
          disabled={!canGoPrev}
          style={styles.arrowButton}
          accessibilityRole="button"
          accessibilityLabel="Попередній місяць"
          accessibilityState={{ disabled: !canGoPrev }}
        >
          <AppIcon
            name="NavArrowLeft"
            size={20}
            color={canGoPrev ? tokens.iconOnCard : tokens.iconDisabled}
            strokeWidth={1.5}
          />
        </Pressable>

        <AppTypography
          variant="body2Highlight"
          color={tokens.textOnCard}
          align="center"
          style={styles.headerTitle}
        >
          {MONTH_NAMES[month - 1]} {year} р.
        </AppTypography>

        <Pressable
          onPress={canGoNext ? onNextMonth : undefined}
          disabled={!canGoNext}
          style={styles.arrowButton}
          accessibilityRole="button"
          accessibilityLabel="Наступний місяць"
          accessibilityState={{ disabled: !canGoNext }}
        >
          <AppIcon
            name="NavArrowRight"
            size={20}
            color={canGoNext ? tokens.iconOnCard : tokens.iconDisabled}
            strokeWidth={1.5}
          />
        </Pressable>
      </View>

      {/* Weekday header */}
      <View style={styles.weekRow}>
        {DAY_LABELS.map((label, i) => (
          <View key={i} style={styles.weekCell}>
            <AppTypography
              variant="captionHighlight"
              color={tokens.textOnCardSecondary}
              align="center"
            >
              {label}
            </AppTypography>
          </View>
        ))}
      </View>

      {/* Date grid or loading skeleton */}
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <View key={rowIdx} style={[styles.dateRow, { gap: spacing.tiny }]}>
              {Array.from({ length: 7 }).map((__, colIdx) => (
                <View
                  key={colIdx}
                  style={[
                    styles.skeletonCell,
                    { backgroundColor: tokens.intSecondary, opacity: 0.5 },
                  ]}
                />
              ))}
            </View>
          ))}
        </>
      ) : (
        grid.map((week, rowIdx) => (
          <View key={rowIdx} style={styles.dateRow}>
            {week.map((day, colIdx) =>
              day === null ? (
                <View key={colIdx} style={{ flex: 1 }} />
              ) : (
                <CalendarDateCell
                  key={colIdx}
                  day={day}
                  state={getCellState(day)}
                  onPress={() => onDayPress(new Date(year, month - 1, day))}
                />
              ),
            )}
          </View>
        ))
      )}
    </View>
  );
};

export default AppCalendarRangePicker;
