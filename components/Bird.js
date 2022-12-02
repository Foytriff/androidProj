import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Bird = ({birdBottom, birdLeft}) => {

    const birdWidth = 90;
    const birdHeight = 50;

    

    const styles = StyleSheet.create({
        container: {
          paddingTop: 50,
        },
        tinyLogo: {
          width: 50,
          height: 50,
        },
        logo: {
          width: 66,
          height: 58,
        },
      });

    return( 
      <Image
        style={{
            position: 'absolute',
            zIndex: 2,
            width: birdWidth,
            height: birdHeight,
            bottom: birdBottom - (birdHeight/2),
            left: birdLeft - (birdWidth/2),
    
        }}
        source={require('./Duck_2.png')}
      />
    )

}

export {Bird}