import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export const SignOutButton = () => {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace('/');
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <TouchableOpacity
            onPress={handleSignOut}
            className="max-w-full m-3 bg-emerald-600 rounded-xl py-3 items-center justify-center shadow-md
                 border border-emerald-700 active:bg-emerald-700 active:opacity-90"
        >
            <Text className="text-white text-lg font-semibold">
                Sign Out
            </Text>
        </TouchableOpacity>
    );
};
