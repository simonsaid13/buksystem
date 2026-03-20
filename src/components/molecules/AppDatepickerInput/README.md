# AppDatepickerInput

Pill-shaped date range input from Figma `DatepickerInput`. Tapping the pill toggles the `AppCalendarRangePicker` open and closed — the component handles this internally.

## States

| State | When it shows |
|-------|---------------|
| Default | No date selected; gray placeholder text, `Calendar` icon |
| With date | Range text visible e.g. "20–28 березня 2026", `Calendar` icon |
| Active | Pill has pressed fill; `CalendarArrowDown` icon; calendar visible below |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `placeholder` | `string` | `'Оберіть дату'` | Shown when no range is selected |
| `selectedStart` | `Date?` | — | Controls text and calendar selection |
| `selectedEnd` | `Date?` | — | Controls text and calendar selection |
| `calendarProps` | `Omit<AppCalendarRangePickerProps, 'selectedStart' \| 'selectedEnd'>` | required | All calendar navigation props |

## Figma

[DatepickerInput](https://www.figma.com/design/zkYQ9A5rFi1V9fBR5BvBgg/Bukovel--Components?node-id=1029-232)

## Usage

```tsx
const [start, setStart] = useState<Date>();
const [end, setEnd] = useState<Date>();
const [year, setMonth] = useState(new Date().getFullYear());
const [month, setMonthNum] = useState(new Date().getMonth() + 1);

const handleDayPress = (date: Date) => {
  if (!start || (start && end)) {
    setStart(date);
    setEnd(undefined);
  } else {
    date < start ? setStart(date) : setEnd(date);
  }
};

<AppDatepickerInput
  selectedStart={start}
  selectedEnd={end}
  calendarProps={{
    year,
    month,
    onDayPress: handleDayPress,
    onPrevMonth: () => { /* go back */ },
    onNextMonth: () => { /* go forward */ },
    canGoPrev: false,
    canGoNext: true,
  }}
/>
```
