import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { register } from "@/services/routes";
import { router } from "expo-router";
import { getToken, saveToken, getUser } from "@services/helpers";
import InputWithError from "@components/InputWithError";
import FullButton from "@/components/FullButton";
import SelectOption from "@components/SelectOption";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    user_type: "",
    password: "",
  });

  const userTypes = [
    { label: "__select role__", value: "" },
    { label: "Supplier", value: "supplier" },
    { label: "Customer", value: "client" },
  ];

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [isSubmitting, setisSubmitting] = useState(false);

  const handleRegister = async () => {
    setErrors({ name: "", email: "", phone: "", user_type: "", password: "" });
    setLoading(true);
    try {
      const RegisterData = { name, email, phone, user_type, password };
      const response = await register(RegisterData);
      const { user, access_token } = response;
      await saveToken(access_token, user);
      const token = await getToken();
      setLoading(false);
      if (user.user_type == "supplier") {
        // Navigate to supplier Dashboard
      } else {
        // navigate to client Dashboard
      }
    } catch (error: any) {
      setLoading(false);
      handleErrors(error.body?.errors);
      if (error.body?.message || error.body?.error) {
        showToast(error.body.message || error.body.error);
      } else {
        showToast(`An unexpected error occurred: ${error.message}`);
      }
      console.log(error); //TODO Only for debugging, i will remove in production
    }
  };

  const handleErrors = (errorObject: any) => {
    if (errorObject) {
      setErrors({
        name: errorObject.name ? errorObject.name[0] : "",
        email: errorObject.email ? errorObject.email[0] : "",
        phone: errorObject.phone ? errorObject.phone[0] : "",
        user_type: errorObject.user_type ? errorObject.user_type[0] : "",
        password: errorObject.password ? errorObject.password[0] : "",
      });
    }
  };
  const hasErrors = Object.values(errors).some((error) => error !== "");

  return (
    <SafeAreaView className="bg-light h-full">
      <ScrollView contentContainerStyle={{ height: hasErrors ? "110%" : "100%" }}>
        <View className="w-full justify-start min-h-[100vh] px-4">
          <View className="w-[200px] h-[170px] mx-auto justify-center items-center">
            <Image
              source={images.mtungi}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="color-primary text-center font-psemibold text-[22px]">
              Register
            </Text>
          </View>
          <InputWithError
            placeholder="Name"
            value={name}
            onChangeText={setName}
            error={errors.name}
            inputStyles="mb-3"
          />
          <InputWithError
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            inputStyles="mb-3"
          />
          <InputWithError
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            error={errors.phone}
            inputStyles="mb-3"
          />
          <SelectOption
            selectedValue={user_type}
            onValueChange={(itemValue) => setUserType(itemValue)}
            options={userTypes}
            error={errors.user_type}
            inputStyles="mb-3"
          />
          <InputWithError
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry={true}
            inputStyles="mb-3"
          />

          <FullButton
            title="Register"
            handlePress={() => handleRegister()}
            containerStyles="w-full mt-4 bg-sky-500"
            textStyles="text-light"
            isLoading={isSubmitting}
          />
          {loading && <ActivityIndicator size="large" color="#0284c7" />}
          <View className="text-center mx-auto">
            <Text>-OR-</Text>
          </View>

          <FullButton
            title="Login"
            handlePress={() => router.push("/login")}
            containerStyles="w-full mt-2"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
