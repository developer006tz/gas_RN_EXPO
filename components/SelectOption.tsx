import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface SelectOptionProps {
  label?: string;
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  options: { label: string; value: string }[];
  error?: string | null;
  containerStyles?: string;
  pickerStyles?: string;
  labelStyles?: string;
  errorStyles?: string;
  inputStyles?: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
  error,
  containerStyles,
  pickerStyles,
  labelStyles,
  errorStyles,
  inputStyles,
}) => {
  return (
    <View className={`mb-7 ${containerStyles}`}>
      {label ? <Text className={`mb-2 ${labelStyles}`}>{label}</Text> : null}
      <View
        className={`border rounded-3xl border-sky-500 ${pickerStyles} ${
          error ? "border-red-500" : ""
        }`}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          className={`w-full min-h-[20px] ${inputStyles}`}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {error ? (
        <Text className={`text-red-500 text-left mt-2 ${errorStyles}`}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default SelectOption;
