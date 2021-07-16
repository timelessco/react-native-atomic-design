import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextStyle, ViewProps } from 'react-native';
import { bodyTextStyle } from 'src/styles/textStyles';
import { tailwind } from 'tailwind';
/*
  List of props required
  1. buttonText
  2. handleOnPress
  3. isLoading
  4. disabled
  5. buttonStyle - which overrides the default styles
  6. textStyle - which overrides the default text styles
  7. variant - 'primary' | 'secondary' | 'outline' | 'ghost'
*/

interface ButtonAtomProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  buttonText: string; // Button Text
  handleOnPress: () => void; // Callback onPress of button
  isLoading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewProps['style'] | null;
  pressedButtonStyle?: ViewProps['style'] | null;
  textStyle?: TextStyle | null;
  indicatorColor?: string;
  indicatorSize?: 'small' | 'large' | number;
  disabledStyle?: ViewProps['style'] | null;
  disabledTextStyle?: TextStyle | null;
}

const ButtonAtom: React.FC<ButtonAtomProps> = ({
  isLoading = false,
  disabled = false,
  textStyle = null,
  buttonStyle = null,
  pressedButtonStyle = null,
  variant = 'primary',
  buttonText,
  handleOnPress,
  indicatorColor = 'white',
  indicatorSize = 20.25,
  disabledStyle = null,
  disabledTextStyle = null,
}) => {
  const finalButtonStyle = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.defaultContainerStyle;
      case 'secondary':
        return styles.secondaryButtonContainerStyle;
      case 'outline':
        return styles.outlineButtonContainerStyle;
      case 'ghost':
        return styles.ghostButtonContainerStyle;
      default:
        return styles.defaultContainerStyle;
    }
  }, [variant]);
  const pressedFinalButtonStyle = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.pressedDefaultContainerStyle;
      case 'secondary':
        return styles.pressedSecondaryContainerStyle;
      case 'outline':
        return styles.pressedOutlineContainerStyle;
      case 'ghost':
        return styles.pressedGhostButtonContainerStyle;
      default:
        return styles.pressedDefaultContainerStyle;
    }
  }, [variant]);
  const finalTextStyle = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.defaultTextStyle;
      case 'secondary':
        return styles.secondaryTextStyle;
      case 'outline':
        return styles.outlineTextStyle;
      case 'ghost':
        return styles.ghostTextStyle;
      default:
        return styles.defaultTextStyle;
    }
  }, [variant]);
  return (
    <Pressable
      disabled={disabled}
      onPress={handleOnPress}
      style={({ pressed }) => [
        pressed
          ? [pressedFinalButtonStyle, pressedButtonStyle]
          : disabled
          ? [styles.defaultDisabledStyle, disabledStyle]
          : [finalButtonStyle, buttonStyle],
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} size={indicatorSize} />
      ) : (
        <Text
          style={[
            bodyTextStyle.FS17_MEDIUM,
            finalTextStyle,
            textStyle,
            disabled ? styles.defaultDisabledTextStyle : {},
          ]}
        >
          {buttonText}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Disabled Styles
  defaultDisabledStyle: tailwind('bg-gray-200 px-4 py-3 rounded-lg'),
  defaultDisabledTextStyle: tailwind('text-gray-500 text-center'),
  // Default or Primary Button Styles
  defaultContainerStyle: tailwind('bg-black px-4 py-3 rounded-lg'),
  defaultTextStyle: tailwind('text-white text-center'),
  pressedDefaultContainerStyle: tailwind('bg-gray-800 px-4 py-3 rounded-lg'),
  // Secondary Button Styles
  secondaryButtonContainerStyle: tailwind('bg-gray-300 px-4 py-3 rounded-lg'),
  secondaryTextStyle: tailwind('text-black text-center'),
  pressedSecondaryContainerStyle: tailwind('bg-gray-400 px-4 py-3 rounded-lg'),
  // Outline Button Styles
  outlineButtonContainerStyle: tailwind('border border-gray-600 px-4 py-3 rounded-lg'),
  outlineTextStyle: tailwind('text-black text-center'),
  pressedOutlineContainerStyle: tailwind('border border-black px-4 py-3 rounded-lg'),
  // Ghist Button Styles
  ghostButtonContainerStyle: tailwind('px-4 py-3 rounded-lg'),
  ghostTextStyle: tailwind('text-black text-center'),
  pressedGhostButtonContainerStyle: tailwind('px-4 bg-gray-200 py-3 rounded-lg'),
});

export default ButtonAtom;
