import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native';
import React,{useState, useEffect, useRef} from 'react';
import { GameScreen } from './screens/GameScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainMenu } from './screens/MainMenu';

export default function App() {

   const screenWidth = Dimensions.get("screen").width
   const screenHeight = Dimensions.get("screen").height

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="mainmenue-screen" component={MainMenu} />
        <Stack.Screen name='game-screen' component={GameScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



