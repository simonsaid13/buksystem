import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';
import AppTypography from '@components/atoms/AppTypography';
import { CELL_SIZE, createStyles } from '../AppCalendarRangePicker.styles';

export type DateCellState =
  | 'empty'           // no date (padding cell)
  | 'available'       // tappable
  | 'disabled'        // past or blocked
  | 'selectedStart'   // range start — teal circle, right half has range bg
  | 'selectedEnd'     // range end   — teal circle, left half has range bg
  | 'selectedRange'   // within range — full-width range bg
  | 'selectedOnly';   // single date selected (no range end yet)

type Props = {
  day: number;
  state: DateCellState;
  onPress?: () => void;
};

const CalendarDateCell: React.FC<Props> = ({ day, state, onPress }) => {
  const { tokens } = useTheme();
  const styles = createStyles(tokens);

  if (state === 'empty') {
    return <View style={styles.cellOuter} />;
  }

  const isInteractive = state === 'available';
  const labelColor = state === 'disabled' ? tokens.textDisabled : tokens.textOnCard;

  /**
   * Background fill — absolutely positioned so it spans the FULL column
   * width (flex: 1), not just the circle size. This makes range backgrounds
   * connect edge-to-edge with no gaps between cells.
   */
  const renderBackground = () => {
    if (state === 'selectedRange') {
      return (
        <View
          style={[StyleSheet.absoluteFillObject, { backgroundColor: tokens.intSecondary }]}
        />
      );
    }
    if (state === 'selectedStart') {
      // right half of the slot → range extends rightward
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '50%',
            backgroundColor: tokens.intSecondary,
          }}
        />
      );
    }
    if (state === 'selectedEnd') {
      // left half of the slot → range extends leftward
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '50%',
            backgroundColor: tokens.intSecondary,
          }}
        />
      );
    }
    return null;
  };

  /** Foreground — teal circle for selected endpoints, plain text otherwise. */
  const renderForeground = () => {
    if (
      state === 'selectedStart' ||
      state === 'selectedEnd' ||
      state === 'selectedOnly'
    ) {
      return (
        <View
          style={[
            styles.selectedCircle,
            {
              backgroundColor: tokens.intPrimary,
              borderColor: tokens.intSecondary,
            },
          ]}
        >
          <AppTypography variant="captionHighlight" color={tokens.textOnCard} align="center">
            {String(day)}
          </AppTypography>
        </View>
      );
    }

    return (
      <AppTypography variant="captionHighlight" color={labelColor} align="center">
        {String(day)}
      </AppTypography>
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.cellOuter,
        { opacity: isInteractive && pressed ? 0.6 : 1 },
      ]}
      onPress={isInteractive ? onPress : undefined}
      disabled={state === 'disabled'}
      accessible={state !== 'disabled'}
      accessibilityRole={isInteractive ? 'button' : 'none'}
      accessibilityLabel={isInteractive ? String(day) : `${day}, недоступно`}
    >
      {renderBackground()}
      {renderForeground()}
    </Pressable>
  );
};

export default CalendarDateCell;
