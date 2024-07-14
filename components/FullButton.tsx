import { TouchableOpacity, Text } from "react-native";
import React from "react";
interface FullButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const FullButton: React.FC<FullButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`border text-xl border-sky-500 min-h-[62px] justify-center rounded-[20px] ${containerStyles} 
      ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text
        className={`text-center   text-xl text-primary font-psemibold ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FullButton;
