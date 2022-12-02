import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";

const MainMenu = () => {
    const sWidth = Dimensions.get('screen').width
    const sHeight = Dimensions.get('screen').height
    const nav = useNavigation()

    return <View>
        <Pressable style={{
                position: 'absolute',
                top: sHeight/3,
                right: sWidth/2 - 50,
                backgroundColor: 'green',
                width: 100,
                height: 60,

            }} onPress={() => nav.navigate('game-screen')}>
        </Pressable>
    </View>

}

export {MainMenu}