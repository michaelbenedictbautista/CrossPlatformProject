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
import { EditScreen } from './screens/EditScreen';
import { SignoutButton } from './components/SignoutButton';


// Firebase config
import { firebaseConfig } from './config/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, } from 'firebase/firestore'

import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged} from 'firebase/auth'

// Initialise the firebase app abd save reference
const FBapp = initializeApp(firebaseConfig)

// Initialise the firestore
const db = getFirestore(FBapp)

// Customised logo
function LogoTitle() {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require('./assets/logo.png')}
      />
      {/* <Text style = {styles.titleText}>My Signup</Text> */}
    </View>
    
  );
}

const Stack = createNativeStackNavigator()

export default function App() {

//const [auth, setAuth] =  useState(false)
const [user,setUser] = useState()

const authObj = getAuth()
  onAuthStateChanged(authObj, (user) => {
    if (user ) {
      setUser(user)
    }
    else {
      setUser(null)
    }
  })

  const register = (email, password) => {
    
    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signin = ( v)=> {
    
    signInWithEmailAndPassword(authObj, email, password)
    .then((userCredential) => setUser (userCredential.user))
    .catch((error) => console.log(error) )
    }
  


    const signout = () => {
      signOut( authObj )
      .then( () => {
        // sign out successful
      } )
      .catch( () => {
        // sign out errors
      } )
    }
      
   
// const addData = async ( FScollection, data ) => {
  //   // add data to a collection with FS generated id
  //   const ref = await addDoc( collection(db,FScollection), data )
  //   console.log( ref.id )
  // }


// Adding data to firestore
const addData = async(FSCollection) => {
    const ref = await addDoc(collection(db, "users"),  {
     name: "Mimi",
     photoImg: "MimiImg"
    });

    console.log(ref.id)
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
      
      <Stack.Screen name="Signin" options={{ title: 'My Signin' }} >
        { ( props ) => <SigninScreen {...props} signin={signin} auth={user}/> }
      </Stack.Screen>
      
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Home' }} /> */}
      <Stack.Screen name="Home" options={{headerTitle: (props) => <LogoTitle {...props} />, headerRight: ( props ) => <SignoutButton {...props} signout={signout}/>}}
      >
        { (props) => <HomeScreen {...props} auth={user} add={addData} />}
      </Stack.Screen>

      {/* headerRight: ( props ) => <SignoutButton {...props} signout={signout} /> */}




        {/* <Stack.Screen name="Home" options={{
          headerTitle: "App Home",
          headerRight: ( props ) => <SignoutButton {...props}  signout ={signout}/>
        }}>
          { (props) => <HomeScreen {...props} auth={user} add={addData}/> }
        </Stack.Screen> */}

      <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Edit Task' }} />
      
      
      
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
