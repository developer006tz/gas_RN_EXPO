import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import React,{useState,useEffect} from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FullButton from "@/components/FullButton";
import { useGlobalContext } from "../services/GlobalProvider";

const index = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-light h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <View className="w-[300px] h-[270px] justify-center items-center">
            <Image
              source={images.mtungi}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View className="relative mt-5 w-full">
            <View className="border-sky-500 bg-primary border rounded-[20px] flex justify-center items-center p-4">
              <Text className="text-light text-[26px] font-bold-200 text-center">
                Multi- Agent gas
              </Text>
            </View>
          </View>
          <View className="mt-[20px]"></View>

          <View className="py-5 w-full">
            <FullButton
              title="Login"
              handlePress={() => router.push("/login")}
              containerStyles="w-full mt-4"
            />
            <Text className="text-center text-primary text-xl ">-OR-</Text>
            <FullButton
              title="Register"
              handlePress={() => router.push("/register")}
              containerStyles="w-full"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#0284c7" style="light"></StatusBar>
    </SafeAreaView>
  );
};

export default index;
