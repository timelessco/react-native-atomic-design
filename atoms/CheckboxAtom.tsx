import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tailwind } from 'tailwind';

interface CheckboxAtomProps {
  isChecked: boolean;
  filledColor?: string;
}

const CheckboxAtom: React.FC<CheckboxAtomProps> = ({
  isChecked,
  filledColor = 'black',
}: CheckboxAtomProps) => {
  const borderColor = tailwind('text-gray-600').color; // The border color when not checked
  return (
    <View
      style={[
        styles.defaultContainerStyle,
        {
          backgroundColor: isChecked ? filledColor : 'white',
          borderColor: isChecked ? filledColor : borderColor,
        },
      ]}
    >
      <View style={[styles.defaultTickStyle, { borderColor: isChecked ? 'white' : 'white' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    // Size of checkbox
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: tailwind('text-gray-600').color,
  },
  defaultTickStyle: {
    // Size of the tick
    width: 6,
    height: 12,
    // we dont need the full box, so we take two sides of it
    borderBottomWidth: 1.8,
    borderRightWidth: 1.8,
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
    // position the tick
    marginLeft: 8,
    marginTop: 4,
  },
});

export default CheckboxAtom;
