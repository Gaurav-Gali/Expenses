import React from 'react';
import {Dimensions, Platform, View} from "react-native";

const {height} = Dimensions.get("window");

const ScreenWrapper = ({children}:{children:React.ReactNode}) => {
    let paddingTop = Platform.OS === "ios" ? height*0.06 : 50;
    return (
        <View className={"bg-white h-screen"} style={{paddingTop:paddingTop}}>
            {children}
        </View>
    );
};

export default ScreenWrapper;