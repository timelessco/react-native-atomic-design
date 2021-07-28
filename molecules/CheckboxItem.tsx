import React from 'react';
import { Pressable, Text } from 'react-native';
import { bodyTextStyle } from 'src/styles/textStyles';
import { tailwind } from 'tailwind';
import CheckboxAtom from '../atoms/CheckboxAtom';

interface CheckboxItemProps {
  isChecked: boolean;
  label: string;
  handleOnPressItem: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  isChecked,
  label = '',
  handleOnPressItem,
}: CheckboxItemProps) => {
  return (
    <Pressable
      onPress={handleOnPressItem}
      style={({ pressed }) => [
        pressed
          ? tailwind(
              'flex flex-row items-center justify-between px-2 py-2 mx-2 my-2 rounded-lg bg-gray-200',
            )
          : tailwind('flex flex-row items-center justify-between mx-4 my-4'),
      ]}
    >
      <Text style={[bodyTextStyle.FS18]}>{label}</Text>
      <CheckboxAtom isChecked={isChecked} />
    </Pressable>
  );
};

export default CheckboxItem;
