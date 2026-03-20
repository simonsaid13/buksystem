export type AppCalendarRangePickerProps = {
  /** Full year, e.g. 2026 */
  year: number;
  /** Month 1–12 */
  month: number;
  /** Start of the selected range (inclusive) */
  selectedStart?: Date;
  /** End of the selected range (inclusive) */
  selectedEnd?: Date;
  /**
   * All dates before this value are disabled.
   * Defaults to today (start of today in local time).
   */
  disabledBefore?: Date;
  /**
   * Explicit list of future dates to disable (e.g. sold-out or closed days).
   * Matched by calendar day — time part is ignored.
   */
  disabledDates?: Date[];
  /** Called when a tappable date cell is pressed. */
  onDayPress: (date: Date) => void;
  /** Called when the user taps the left arrow. Wire to month navigation logic. */
  onPrevMonth?: () => void;
  /** Called when the user taps the right arrow. Wire to month navigation logic. */
  onNextMonth?: () => void;
  /** When true, the left arrow is grayed out and not tappable. */
  canGoPrev?: boolean;
  /** When true, the right arrow is grayed out and not tappable. */
  canGoNext?: boolean;
  /** When true, renders a loading skeleton instead of the date grid. */
  isLoading?: boolean;
};
