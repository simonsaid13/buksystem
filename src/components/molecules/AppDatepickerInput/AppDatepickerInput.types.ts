import type { AppCalendarRangePickerProps } from '@components/organisms/AppCalendarRangePicker';

export type AppDatepickerInputProps = {
  /** Placeholder shown when no date has been selected. */
  placeholder?: string;
  /** Start of the chosen range, controls the `withDate` visual. */
  selectedStart?: Date;
  /** End of the chosen range. */
  selectedEnd?: Date;
  /**
   * All calendar navigation and selection props are forwarded to
   * `AppCalendarRangePicker` when the picker is open.
   */
  calendarProps: Omit<AppCalendarRangePickerProps, 'selectedStart' | 'selectedEnd'>;
};
