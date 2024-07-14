import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
  Image
} from "react-native";
import { icons } from "../constants";


interface InputWithErrorProps extends TextInputProps {
  error?: string;
  containerStyles?: string;
  inputStyles?: string;
  errorStyles?: string;
  secureTextEntry?: boolean;
}

const InputWithError: React.FC<InputWithErrorProps> = ({
  error,
  containerStyles,
  inputStyles,
  errorStyles,
  secureTextEntry,
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${containerStyles}`}>
      <TextInput
        className={`border w-full rounded-3xl min-h-[10px] p-3 ${inputStyles} ${
          error ? "border-red-500" : "border-sky-500"
        }`}
        secureTextEntry={secureTextEntry && !showPassword}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3"
        >
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6 text-primary"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {error ? (
        <Text className={`text-red-500 text-left mt-2 ${errorStyles}`}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default InputWithError;
