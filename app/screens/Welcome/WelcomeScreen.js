import React, {useRef, useEffect} from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import AppButton from '../../components/AppButton';
import AppColors from '../../config/AppColors';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';




function WelcomeScreen({navigation}) {

  //Lottie Animation
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    Animated.timing(animation, {toValue: 1, duration: 2000, useNativeDriver: true,}).start();
  })
  
  return (
    <AppScreen style = {styles.container}>
      
      <View style={styles.logo}>
      
        <View  style={styles.animation}>
          <LottieView 
            source={require('../../assets/lf30_editor_iwcvd5jd.json')} 
            autoPlay = {true}
            loop = {true}
            style = {{width: 300, height: 300, paddingTop: 35, }}
            progress={animation}
          
            /> 
        </View>
        
        <AppText style={styles.text}>
          Memory Catcher
        </AppText>
      </View>

      <View style={styles.buttons}>
        <AppButton 
          title="Login"
          onPress ={() => (navigation.navigate("Login", {paramMessage:""}))}
          
        />

        <AppButton 
            title="Register"
            onPress ={() => (navigation.navigate("RegisterName"))}
        /> 
      </View>
      
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    backgroundColor: AppColors.primaryColor,
  },
  logo:{
    alignItems: "center",
    backgroundColor: AppColors.secondaryColor,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 100,
    width: "80%",
  },
  animation:{
    alignItems: "center",
    height: 150,
    justifyContent: "flex-end",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    width: 200,
  },
  text:{
    fontFamily:"Zapfino",
  },
  buttons:{
    marginTop: 50,
  },
})

export default WelcomeScreen;