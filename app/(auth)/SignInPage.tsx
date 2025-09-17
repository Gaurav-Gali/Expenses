import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function SignInPage() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSignInPress = async () => {
        if (!isLoaded) return;
        try {
            const attempt = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (attempt.status === 'complete') {
                await setActive({ session: attempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(attempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                className="flex-1 justify-center px-6 "
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text className="text-3xl font-semibold text-zinc-900 text-center mb-8">
                    Sign in to continue
                </Text>

                {/* Email */}
                <TextInput
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base leading-6 text-zinc-900"
                    placeholder="Email"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />


                {/* Password */}
                <TextInput
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base text-zinc-900"
                    placeholder="Password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Sign-In Button */}
                <TouchableOpacity
                    className="w-full bg-emerald-600 rounded-xl py-4 items-center shadow"
                    onPress={onSignInPress}
                >
                    <Text className="text-white text-lg font-semibold">Continue</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View className="flex-row justify-center mt-6">
                    <Text className="text-slate-600">Don’t have an account? </Text>
                    <Link href="/(auth)/SignUpPage">
                        <Text className="text-emerald-600 font-semibold">Sign up</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
}
