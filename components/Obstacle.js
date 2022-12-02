import React from "react";
import { View } from "react-native";

const Obstacle = ({width, height, gap, obstaclesLeft, offset}) => {


    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: 'green',
                width: width,
                height: height,
                left: obstaclesLeft,
                bottom: height/2 + gap + offset
            }}
            />
            <View style={{
                
                position: 'absolute',
                backgroundColor: 'yellow',
                width: width,
                height: height,
                left: obstaclesLeft,
                bottom: -height/2 + offset
            }}
            />    
        </>
    )
}

export {Obstacle}