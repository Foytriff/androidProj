import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Bird } from "../components/Bird";
import React, {useState, useEffect, useRef} from "react";
import { Obstacle } from "../components/Obstacle";
import { StopButton } from "../components/StopButton";
import {sendToDb, findAll, saveToDb} from "../server"


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const GameScreen = () => {
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

  const [stopGame, setStopGame] = useState(false)

  const gameTimer = useRef()
  const OTL = useRef()
  const OTL2 = useRef()
  //const test = [gameTimer, obstaclesLeft, obstaclesLeft2]

  useEffect(() => {

    if(stopGame){
      clearInterval(OTL.current)
      clearInterval(OTL2.current)
      clearInterval(gameTimer.current)
      saveScore()
    }

    if(!stopGame){
        setBirdBottom(prev => prev)
        setObstaclesLeft(prev => prev)
        setObstaclesLeft2(prev => prev)
    }

  }, [stopGame])


  const saveScore = async () => {
    console.log("send to db")
    const temp = {name: "Gustav", value: score}
    await saveToDb(temp)
    findAll().then(res => console.log(res))
    //saveScore({name: "Gustav", score: score})
    //findAll().then(res => console.log(res))
  }

  useEffect(() => {
    if (birdBottom > 0){
      gameTimer.current = setInterval(() => {
          setBirdBottom(prev => prev - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimer.current)
      }

    }
  },[birdBottom])

  useEffect(() => {
    if (obstaclesLeft > -oWidth){
      OTL.current = setInterval(() => {
          setObstaclesLeft(prev => prev - obstSpeed)
      }, 30)
      
    return () => {
      clearInterval(OTL.current)
    }

    } else {
      setObstaclesLeft(screenWidth)
      setObstOffset(- Math.random() * (screenHeight/2 - oGap))
      setScore(prev => prev + 1)
    }


  },[obstaclesLeft])


  useEffect(() => {
    if (obstaclesLeft2 > -oWidth){
      OTL2.current = setInterval(() => {
          setObstaclesLeft2(prev => prev - obstSpeed)
      }, 30)
      
      return () => {
        clearInterval(OTL2.current)
      }

    } else {
      setObstaclesLeft2(screenWidth)
      setObstOffset2((-100 + (Math.random() * (screenHeight/2 - oGap))))
      setScore(prev => prev + 1)
    }
    
  }, [obstaclesLeft2])


  // check for collissions
  


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


  return <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>

      <StopButton stopGame={setStopGame}/>
      <Text style={{position: 'absolute', top: 25, zIndex: 1}}>score: {score}</Text>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>
        <Obstacle width={oWidth} height={oHeight} gap={oGap} obstaclesLeft={obstaclesLeft} offset={obstOffset}/>
        <Obstacle width={oWidth} height={oHeight} gap={oGap} obstaclesLeft={obstaclesLeft2} offset={obstOffset2} />
        <StatusBar style="auto" />

      </View>
    </TouchableWithoutFeedback>
   
  
}

export {GameScreen}