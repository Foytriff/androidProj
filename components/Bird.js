import React from "react";
import { View } from "react-native";

const Bird = ({birdBottom, birdLeft}) => {

    const birdWidth = 50;
    const birdHeight = 50;

    return(
        <View style={{
            borderRadius: '50%',
            position: 'absolute',
            backgroundColor: 'blue',
            width: birdWidth,
            height: birdHeight,
            bottom: birdBottom - (birdHeight/2),
            left: birdLeft - (birdWidth/2),

        }}/>
    )

}

export {Bird}