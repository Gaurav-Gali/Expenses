import React from 'react';
import ScreenWrapper from "@/components/ScreenWrapper";
import {View} from "react-native";
import {SignOutButton} from "@/components/SignOutButton";

const Home = () => {
    return (
        <ScreenWrapper>
            <View>
                <SignOutButton/>
            </View>
        </ScreenWrapper>
    );
};

export default Home;