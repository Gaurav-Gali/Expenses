import React, {useEffect} from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import {useRouter} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

function SplashScreen() {
    const router = useRouter();
    const {isSignedIn} = useAuth();

    useEffect(() => {
        if (isSignedIn) {
            router.push('/(screens)/Home')
        } else {
            setTimeout(() => {
                router.push("/(auth)/Welcome");
            },0)
        }
    },[]);

    return (
        <ScreenWrapper>
            <View className="flex-1 gap-1 items-center justify-center">
                <Text className="text-5xl font-semibold text-emerald-600">
                    Expenses
                </Text>
                <Text className={"text-zinc-600"}>
                    “Save smart, spend wiser.”
                </Text>
            </View>
        </ScreenWrapper>
    );
}

export default SplashScreen;
