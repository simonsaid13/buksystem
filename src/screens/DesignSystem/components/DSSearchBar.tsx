import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const DSSearchBar: React.FC<Props> = ({ value, onChangeText }) => {
  const { tokens } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: tokens.bgOnSurface, borderColor: tokens.strokeOnSurface }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search components..."
        placeholderTextColor={tokens.textDisabled}
        style={[styles.input, { color: tokens.textOnCard }]}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.large,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bukovel_Regular',
  },
});

export default DSSearchBar;
