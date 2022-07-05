import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Image, Text, View } from 'react-native';

export default function App() {
  return (
      
    // setTimeout(() => {
    //   this.yourFunction();
    //   }, 3000);

    <View style={styles.container}>

      <Image style={styles.splash} source={require('./SplashScreen.gif')} />

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  splash: {  
    resizeMode: 'contain',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  }
    

});
