import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { images } from "../constants";
import Loader from '../components/Loader'
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;

    return (
        <SafeAreaView className="bg-white h-full">
            <Loader isLoading={loading} />

            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View className="w-full flex justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-52 h-52"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-black font-bold text-center">
                            Discover Baguio with{"\n"}
                            <Text className="text-secondary-200">BaguioSphere</Text>
                        </Text>
                    </View>


                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => router.push("/sign-in")}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default Welcome;