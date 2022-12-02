import React from 'react'
import { View, Pressable } from 'react-native'


const StopButton = ({stopGame}) => {


    return(
        <Pressable onPress={() => stopGame()} style={{
            position: 'absolute',
            zIndex: 1,
            top: 5,
            right: 5,
            width: 40,
            height: 40,
            backgroundColor: 'red',
        }}>
        </Pressable>
            

    )
}

export {StopButton}