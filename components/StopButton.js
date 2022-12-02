import React from 'react'
import { View, Pressable } from 'react-native'


const StopButton = ({stopGame}) => {


    return(
        <Pressable onPress={() => stopGame(prev => !prev)} style={{
            position: 'absolute',
            zIndex: 1,
            top: 15,
            right: 15,
            width: 60,
            height: 60,
            backgroundColor: 'red',
        }}>
        </Pressable>
            

    )
}

export {StopButton}