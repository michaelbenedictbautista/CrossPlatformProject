// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image} from 'react-native'
import { useState, useEffect } from 'react';


// Import for Navigation Container and Native Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens for this app
import { HomeScreen } from './screens/HomeScreen';
import { SigninScreen } from './screens/SigninScreen';
import { SignupScreen } from './screens/SignupScreen';
import { SignoutButton } from './screens/SignupScreen';


// Firebase config
import { firebaseConfig } from './config/config';
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// Initialise the app
initializeApp(firebaseConfig)

function LogoTitle() {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require('./assets/logo.png')}
      />
      <Text style = {styles.titleText}>My Signup</Text>
    </View>
    
  );
}

const Stack = createNativeStackNavigator()

export default function App() {

//const [auth, setAuth] =  useState(false)
const [user,setUser] = useState()

  const register = (email, password) => {
    const authObj = getAuth()
    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#94D1FA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
       {/* // Passing addtional props we  */}
      {/* <Stack.Screen name="Signup" component={SignupScreen} options={{  headerTitle: (props) => <LogoTitle {...props}/> }} /> */}
      
      <Stack.Screen name="Signup"  options={{  headerTitle: (props) => <LogoTitle {...props}/> }}>
          { ( props ) => <SignupScreen {...props} signup={register} auth={user}/> }
        </Stack.Screen>
      
      
      {/* <Stack.Screen name="Signup">
          { ( props) => <SignupScreen {...props} signup={register} auth={user}/> }
        </Stack.Screen> */}
      
      <Stack.Screen name="Signin" component={SigninScreen} options={{ title: 'My Signin' }} />

      
      {/* <Stack.Screen name="Home" component={HomeScreen} options= {({route}) => ( {title: route.params.name})} /> */}
      
      
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Home' }} />
      {/* <Stack.Screen name="Home" options={{  headerTitle: (props) => <LogoTitle {...props}/> }}>
      {(props) => <Home {...props} auth={user} />}
      </Stack.Screen> */}
      
    </Stack.Navigator>
  </NavigationContainer>
);
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginBottom:1,
    padding: 1,
    
  },

  logoImage: {
    width: 40, 
    height: 40,
    marginRight: 5,
    resizeMode: 'contain',
  },

  titleText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
  }

});
