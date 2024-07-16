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
}

const InputWithError: React.FC<InputWithErrorProps> = ({
  error,
  containerStyles,
  inputStyles,
  errorStyles,
  ...props
}) => {
  return (
    <View className="w-full">
      <TextInput
        className={`border-2 w-full text-[16px] rounded-3xl min-h-[10px] text-sky-100 p-3 border-sky-200  ${
          error ? "border-red-500 bg-red-200" : "border-sky-500 bg-sky-500"
        }`}
        placeholder="Search for Gas..."
        placeholderTextColor={"sky-200"}
        {...props}
      />

        <TouchableOpacity
          className="absolute right-3 top-10"
        >
          <Image
            source={icons.search}
            className="w-5 h-5"
            tintColor="#0018"
            resizeMode="contain"
          />
        </TouchableOpacity>

      {error ? (
        <Text className={`text-red-500 text-left mt-2 ${errorStyles}`}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default InputWithError;
