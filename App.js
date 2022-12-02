import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native';
import { Bird } from './components/Bird';
import React,{useState, useEffect} from 'react';
import { Obstacle } from './components/Obstacle';
import { StopButton } from './components/StopButton';


export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth/2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)

  const [obstOffset, setObstOffset] = useState(0)
  const [obstOffset2, setObstOffset2] = useState(0)

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeft2, setObstaclesLeft2] = useState(screenWidth + screenWidth/2 + 30)

  const [score, setScore] = useState(0)
  // bird vals
  const gravity = 8
  //obstvals
  const oWidth = 50
  const oHeight = screenHeight
  const oGap = 200
  const obstSpeed = 5

  let gameTimer
  let obstaclesLeftTimer
  let obstaclesLeftTimer2

  const gameOver = () => {
    console.log("ballonger!")
    clearInterval(gameTimer)
    clearInterval(obstaclesLeftTimer)
    clearInterval(obstaclesLeftTimer2)
  }


  useEffect(() => {
    if (birdBottom > 0){
      gameTimer = setInterval(() => {
          setBirdBottom(prev => prev - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimer)
      }

    }
  },[birdBottom])

  useEffect(() => {
    if (obstaclesLeft > -oWidth){
      obstaclesLeftTimer = setInterval(() => {
          setObstaclesLeft(prev => prev - obstSpeed)
      }, 30)
      
    return () => {
      clearInterval(obstaclesLeftTimer)
    }

    } else {
      setObstaclesLeft(screenWidth)
      setObstOffset(- Math.random() * (screenHeight/2 - oGap))
      setScore(prev => prev + 1)
    }


  },[obstaclesLeft])


  useEffect(() => {
    if (obstaclesLeft2 > -oWidth){
      obstaclesLeftTimer2 = setInterval(() => {
          setObstaclesLeft2(prev => prev - obstSpeed)
      }, 30)
      
      return () => {
        clearInterval(obstaclesLeftTimer2)
      }

    } else {
      setObstaclesLeft2(screenWidth)
      setObstOffset2((-100 + (Math.random() * (screenHeight/2 - oGap))))
      setScore(prev => prev + 1)
    }
    
  },[obstaclesLeft2])


  // check for collissions
  useEffect(() =>{

  })


  const [birdHurtBox, setBirdHurtBox] = useState()


  const jump = () => {
    
    setBirdBottom(prev => 
      { if (prev + 40 >= screenHeight){
        return screenHeight
      } else {
          return (prev + 40)
      }
    }
      )
  }


  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>

      <StopButton stopGame={gameOver}/>
      <Text style={{position: 'absolute', top: 25, zIndex: 1}}>score: {score}</Text>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>
        <Obstacle width={oWidth} height={oHeight} gap={oGap} obstaclesLeft={obstaclesLeft} offset={obstOffset}/>
        <Obstacle width={oWidth} height={oHeight} gap={oGap} obstaclesLeft={obstaclesLeft2} offset={obstOffset2} />
        <StatusBar style="auto" />

      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
