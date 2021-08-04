import React, { useEffect } from 'react';
import { Pressable, StyleSheet, ViewProps } from 'react-native';
import Animated, { interpolateColors, spring, useValue } from 'react-native-reanimated';
import { tailwind } from 'tailwind';

interface SwitchAtomProps {
  handleOnPress: () => void;
  value: boolean;
  thumbColor?: string;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
}

const SwitchAtom: React.FC<SwitchAtomProps> = ({
  handleOnPress,
  value,
  thumbColor = 'white',
  activeTrackColor = tailwind('text-blue-600').color,
  inActiveTrackColor = tailwind('text-gray-200').color,
}: SwitchAtomProps) => {
  const circleTranslateValue = useValue(0);

  // Let us interpolate the background color too !
  const interpolatedBackgroundColor: ViewProps['style'] = {
    backgroundColor: interpolateColors(circleTranslateValue, {
      inputRange: [0, 21],
      outputColorRange: [inActiveTrackColor, activeTrackColor],
    }) as unknown as string,
  };

  useEffect(() => {
    if (value) {
      spring(circleTranslateValue, {
        toValue: 21,
        mass: 1,
        damping: 20,
        stiffness: 125,
        overshootClamping: false,
        restSpeedThreshold: 0.0001,
        restDisplacementThreshold: 0.0001,
      }).start();
    } else {
      spring(circleTranslateValue, {
        toValue: 0,
        mass: 1,
        damping: 20,
        stiffness: 125,
        overshootClamping: false,
        restSpeedThreshold: 0.0001,
        restDisplacementThreshold: 0.0001,
      }).start();
    }
  }, [circleTranslateValue, value]);

  return (
    <Pressable onPress={handleOnPress}>
      <Animated.View style={[styles.containerStyle, interpolatedBackgroundColor]}>
        <Animated.View
          style={[
            styles.circleStyle,
            { backgroundColor: thumbColor },
            styles.circleShadow,
            {
              transform: [{ translateX: circleTranslateValue }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // Size or Dimensions of the switch
    width: 50,
    padding: 2,
    borderRadius: 36.5,
  },
  circleStyle: {
    // Values to form a circle inside
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  circleShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default SwitchAtom;
