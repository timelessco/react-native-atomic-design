import React from 'react';
import { View } from 'react-native';
import { tailwind } from 'tailwind';
import RadioAtom from '../atoms/RadioAtom';
/*
  Props List
  1. radioItems: Array of items
  2. selectedValue: A value from above array
  3. handleOnPressRadioItem: (value: string) => void
*/
interface RadioGroupProps {
  radioItems: string[];
  selectedValue: string;
  handleOnPressRadioItem: (value: string) => void;
  radioColor?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  radioItems,
  selectedValue,
  handleOnPressRadioItem,
  radioColor,
}: RadioGroupProps) => {
  return (
    <View style={tailwind('mx-4')}>
      {radioItems.map((item) => {
        return (
          <RadioAtom
            key={item}
            label={item}
            handleOnPressItem={handleOnPressRadioItem}
            isSelected={selectedValue === item}
            radioColor={radioColor}
          />
        );
      })}
    </View>
  );
};

export default RadioGroup;
