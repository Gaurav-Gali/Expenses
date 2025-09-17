import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function SplashScreen() {
    const router = useRouter();
    const { isSignedIn, isLoaded } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;

        const timer = setTimeout(() => {
            if (isSignedIn) {
                router.replace('/(screens)/Home');
            } else {
                router.replace('/(auth)/Welcome');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isLoaded, isSignedIn]);

    return (
        <ScreenWrapper>
            <View className="flex-1 gap-1 items-center justify-center">
                <Text className="text-5xl font-semibold text-emerald-600">
                    Expenses
                </Text>
                <Text className="text-zinc-600">
                    “Save smart, spend wiser.”
                </Text>
            </View>
        </ScreenWrapper>
    );
}
