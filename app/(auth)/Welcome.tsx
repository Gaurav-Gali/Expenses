import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import {Image} from "expo-image";

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View className="flex-1 justify-center items-center px-6">
                <Image
                    source={require('@/assets/welcome.png')}
                    style={{ width: 300, height: 300, resizeMode: 'contain' }}
                />
                <Text className="text-zinc-950 text-4xl font-semibold mt-6">
                    Welcome to <Text className={"text-emerald-600"}>Expenses</Text>
                </Text>
            </View>

            <View className="bg-slate-50 rounded-t-3xl p-6 pb-10 shadow-md">
                <Text className="text-zinc-700 text-center mb-4 text-base">
                    Discover a smarter way to manage your tasks and stay productive.
                    Our app helps you organize, track, and achieve your goals effortlessly.
                </Text>

                <TouchableOpacity
                    className="bg-emerald-600 py-4 rounded-2xl"
                    onPress={() => router.push('/(auth)/SignInPage')}
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;
