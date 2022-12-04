import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { findAll } from "../server";

const MainMenu = () => {
    const sWidth = Dimensions.get('screen').width
    const sHeight = Dimensions.get('screen').height
    const nav = useNavigation()

    const [hsLoaded,setHsLoaded] = useState(false)
    const [hses, setHses] = useState()

    useEffect(() => {
        findAll().then(res => {
            setHses(res.map(sc => <View>
                <Text>{sc.name}</Text>
                <Text>{sc.value}</Text>
            </View>))
            setHsLoaded(true)
        })
    }, [])

    const HighScores = () => {
       
        if (!hsLoaded) return <Text>Loading scores</Text>

        return <View>{hses}</View>
    }

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
        <View><HighScores /></View>
    </View>

}

export {MainMenu}