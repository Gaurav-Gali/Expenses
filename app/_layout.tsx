import React from 'react';
import {Stack} from "expo-router";
import "@/global.css";
import {ClerkProvider} from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

function _layout() {
    return (
        <ClerkProvider tokenCache={tokenCache}>
            <Stack screenOptions={{headerShown:false}}></Stack>
        </ClerkProvider>
    );
}

export default _layout;