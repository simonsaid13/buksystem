# AppCalendarRangePicker

Full date-range calendar organism from Figma `DateRange/Selected`. Renders a month view with a 7-column grid (Mon–Sun), a navigable month header, and seven distinct visual cell states for range selection.

The component is purely display-driven — the parent controls which dates are selected and passes navigation callbacks. No date state is stored inside the component.

## Cell states

| State | When it appears |
|-------|-----------------|
| `empty` | Padding cell before the 1st or after the last of the month |
| `available` | Tappable date within the allowed range |
| `disabled` | Before `disabledBefore`, or listed in `disabledDates` |
| `selectedStart` | Matches `selectedStart`; teal circle, right half has range fill |
| `selectedEnd` | Matches `selectedEnd`; teal circle, left half has range fill |
| `selectedRange` | Between start and end; full-width soft blue fill |
| `selectedOnly` | `selectedStart` set, no `selectedEnd` yet; plain teal circle |

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `year` | `number` | required | e.g. `2026` |
| `month` | `number` | required | 1–12 |
| `selectedStart` | `Date?` | — | Range start |
| `selectedEnd` | `Date?` | — | Range end |
| `disabledBefore` | `Date?` | today | All earlier dates disabled |
| `disabledDates` | `Date[]` | `[]` | Specific blocked dates |
| `onDayPress` | `(date: Date) => void` | required | Tap handler |
| `onPrevMonth` | `() => void` | — | |
| `onNextMonth` | `() => void` | — | |
| `canGoPrev` | `boolean` | `true` | Grays/disables left arrow |
| `canGoNext` | `boolean` | `true` | Grays/disables right arrow |
| `isLoading` | `boolean` | `false` | Shows skeleton grid |

## Figma

[DateRangeComponent](https://www.figma.com/design/zkYQ9A5rFi1V9fBR5BvBgg/Bukovel--Components?node-id=1038-525)

## Usage

```tsx
const [start, setStart] = useState<Date>();
const [end, setEnd] = useState<Date>();
const [year, setYear] = useState(2026);
const [month, setMonth] = useState(3);

const handleDayPress = (date: Date) => {
  if (!start || (start && end)) {
    setStart(date);
    setEnd(undefined);
  } else {
    if (date < start) { setStart(date); setEnd(undefined); }
    else setEnd(date);
  }
};

<AppCalendarRangePicker
  year={year} month={month}
  selectedStart={start} selectedEnd={end}
  onDayPress={handleDayPress}
  onPrevMonth={() => { /* decrement month */ }}
  onNextMonth={() => { /* increment month */ }}
  canGoPrev={month > new Date().getMonth() + 1}
  canGoNext={true}
/>
```
