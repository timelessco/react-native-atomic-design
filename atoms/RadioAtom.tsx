import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolateColors,
  interpolateNode,
  spring,
  useValue,
} from 'react-native-reanimated';
import { bodyTextStyle } from 'src/styles/textStyles';
import { tailwind } from 'tailwind';

/*
  Props Required
  1. label: string
  2. isSelected: boolean
  3. handleOnPressItem: (value) => void;
*/

interface RadioAtomProps {
  label: string;
  isSelected: boolean;
  handleOnPressItem: (value: string) => void;
  radioColor?: string;
}

const RadioAtom: React.FC<RadioAtomProps> = ({
  label = 'Label',
  isSelected = false,
  handleOnPressItem = () => null,
  radioColor = tailwind('text-blue-600').color,
}: RadioAtomProps) => {
  const animatedValue = useValue(0);
  useEffect(() => {
    if (isSelected) {
      spring(animatedValue, {
        toValue: 1,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
      }).start();
    } else {
      spring(animatedValue, {
        toValue: 0,
        mass: 1,
        damping: 25,
        stiffness: 120,
        overshootClamping: false,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
      }).start();
    }
  }, [animatedValue, isSelected]);

  return (
    <Pressable
      onPress={() => handleOnPressItem(label)}
      style={({ pressed }) => [
        styles.defaultContainerStyle,
        pressed ? tailwind('p-2 rounded-lg bg-gray-200') : tailwind('p-2'),
      ]}
    >
      <Animated.View
        style={[
          styles.defaultOuterCircleStyle,
          {
            borderColor: interpolateColors(animatedValue, {
              inputRange: [0, 1],
              outputColorRange: [tailwind('text-gray-600').color, radioColor],
            }) as unknown as string,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.defaultInnerCircleStyle,
            {
              backgroundColor: interpolateColors(animatedValue, {
                inputRange: [0, 1],
                outputColorRange: ['white', radioColor],
              }) as unknown as string,
              borderWidth: interpolateNode(animatedValue, {
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: Extrapolate.CLAMP,
              }) as unknown as number,
              borderColor: interpolateColors(animatedValue, {
                inputRange: [0, 1],
                outputColorRange: [tailwind('text-gray-600').color, 'white'],
              }) as unknown as string,
            },
          ]}
        />
      </Animated.View>
      <Text style={[bodyTextStyle.FS17, tailwind('pl-2')]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultOuterCircleStyle: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultInnerCircleStyle: {
    height: 12,
    width: 12,
    borderRadius: 12,
  },
});

export default RadioAtom;
