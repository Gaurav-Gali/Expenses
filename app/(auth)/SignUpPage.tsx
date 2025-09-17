import * as React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import ScreenWrapper from "@/components/ScreenWrapper";

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            await signUp.create({ emailAddress, password });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;
        try {
            const attempt = await signUp.attemptEmailAddressVerification({ code });
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

    if (pendingVerification) {
        return (
            <KeyboardAvoidingView
                className="flex-1 justify-center px-6 bg-slate-50"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text className="text-2xl font-semibold text-center text-zinc-900 mb-6">
                    Verify your email
                </Text>
                <TextInput
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base text-zinc-900"
                    placeholder="Enter verification code"
                    placeholderTextColor="#94a3b8"
                    value={code}
                    onChangeText={setCode}
                />
                <TouchableOpacity
                    className="w-full bg-emerald-600 rounded-xl py-4 items-center shadow"
                    onPress={onVerifyPress}
                >
                    <Text className="text-white text-lg font-semibold">Verify</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                className="flex-1 justify-center px-6"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text className="text-3xl font-bold text-center text-zinc-900 mb-8">
                    Create an Account
                </Text>

                <TextInput
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base text-zinc-900"
                    placeholder="Enter email"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />

                <TextInput
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base text-zinc-900"
                    placeholder="Enter password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    className="w-full bg-emerald-600 rounded-xl py-4 items-center shadow"
                    onPress={onSignUpPress}
                >
                    <Text className="text-white text-lg font-semibold">Continue</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-slate-600">Already have an account? </Text>
                    <Link href="/(auth)/SignInPage">
                        <Text className="text-emerald-600 font-semibold">Sign in</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
}
