import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { login } from "@/services/routes";
import { router } from "expo-router";
import { getToken, saveToken } from "@services/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToast } from "@services/helpers";
import FullButton from "@/components/FullButton";
import { images } from "@/constants";
import InputWithError from "@components/InputWithError";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    try {
      const response = await login(email, password);
      const { user, access_token } = response;
      await saveToken(access_token, user);
      const token = await getToken();
      setLoading(false);
      if (user.user_type == "supplier") {
        router.push("/screen/supplier_dashboard");
      } else {
        // showToast(`${user.name} Loged in as Customer`);
        router.push('/home')
      }
    } catch (error: any) {
      setLoading(false);
      if (error.body && error.body.errors) {
        const errors = error.body.errors;
        if (errors.email) {
          setEmailError(errors.email[0]);
        }
        if (errors.password) {
          setPasswordError(errors.password[0]);
        }
      }
      if (error.body && (error.body.message || error.body.error)) {
        showToast(error.body.message || error.body.error);
      } else {
        showToast(`An unexpected error occurred: ${error.message}`);
      }
      console.log(error); //TODO Only for debugging, i will remove in production
    }
  };

  return (
    <SafeAreaView className="bg-light h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center min-h-[85vh] px-4">
          <View className="w-[200px] h-[170px] mx-auto justify-center items-center">
            <Image
              source={images.mtungi}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="color-primary text-center font-psemibold text-[22px]">
              Login
            </Text>
          </View>
          <InputWithError
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            inputStyles="mb-3"
          />
          <InputWithError
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            secureTextEntry
          />
          <FullButton
            title="Login"
            handlePress={() => handleLogin()}
            containerStyles="w-full mt-4 bg-sky-500"
            textStyles="text-light"
          />
          {loading && <ActivityIndicator size="large" color="#0284c7" />}
          <View className="text-center mx-auto">
            <Text>-OR-</Text>
          </View>

          <FullButton
            title="Register"
            handlePress={() => router.push("/register")}
            containerStyles="w-full mt-2"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
