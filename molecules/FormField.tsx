import React from 'react';
import {
  NativeSyntheticEvent,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewProps,
} from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { bodyTextStyle } from 'src/styles/textStyles';
import { tailwind } from 'tailwind';

/* Props for FormField */

interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  handleOnChangeText: React.Dispatch<React.SetStateAction<string>>;

  // Optional Props
  labelStyle?: TextStyle | TextStyle[] | undefined; // Overrides the default styles
  textInputProps?: TextInputProps; // Overrides the default props
  formFieldContainerStyle?: ViewProps['style']; // Overrides the default styles
  textInputStyle?: TextInputProps['style']; // overrides the default styles of TextInput
  inputRef?: React.Ref<TextInput> | undefined;

  // Optional callbacks
  handleOnSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  onFocusCallback?: () => void;
  onBlurCallback?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label = 'Label',
  placeholder = 'Placeholder',
  value,
  handleOnChangeText,
  labelStyle,
  textInputProps,
  formFieldContainerStyle,
  textInputStyle,
  handleOnSubmitEditing,
  onFocusCallback = () => null,
  onBlurCallback = () => null,
  inputRef,
}: FormFieldProps) => {
  const handleFocusCallback = () => {
    onFocusCallback();
  };

  const handleBlurCallback = () => {
    onBlurCallback();
  };

  return (
    <View style={[styles.defaultFormFieldContainer, formFieldContainerStyle]}>
      <Text style={[bodyTextStyle.FS14, styles.defaultLabelStyle, labelStyle]}>{label}</Text>
      <TextInput
        ref={inputRef}
        style={[bodyTextStyle.FS18, tailwind('border-b border-gray-200 pb-3'), textInputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChangeText}
        onSubmitEditing={handleOnSubmitEditing}
        onFocus={handleFocusCallback}
        onBlur={handleBlurCallback}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultFormFieldContainer: tailwind('p-4'),
  defaultLabelStyle: tailwind('pb-4'),
});

export default FormField;
