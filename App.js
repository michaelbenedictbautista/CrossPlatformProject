// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useState, useEffect } from 'react';


// Import for Navigation Container and Native Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens for this app
import { HomeScreen } from './screens/HomeScreen';
import { SigninScreen } from './screens/SigninScreen';
import { SignupScreen } from './screens/SignupScreen';
import { EditScreen } from './screens/EditScreen';
import { NewEditScreen } from './screens/NewEditScreen';
import { SignoutButton } from './components/SignoutButton';
import { AddScreen } from './screens/AddScreen';


// Firebase config
import { firebaseConfig } from './config/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, 
        collection, 
        addDoc, 
        updateDoc, 
        query, 
        onSnapshot,
        doc
      } from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

// Initialise the firebase app abd save reference
const FBapp = initializeApp(firebaseConfig)

// Initialise the firestore
const db = getFirestore(FBapp)

// Customised logo
const LogoTitle = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require('./assets/logo.png')}
      />
      {/* <Text style = {styles.titleText}>Sign up</Text> */}
    </View>

  );
}


const Stack = createNativeStackNavigator()

export default function App() {

  // Store state of user
  const [user, setUser] = useState()
  
  // Store state of data
  const [appData, setAppData] =useState()

  // Verify user
 

  const register = (email, password) => {

    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signin = (email, password) => {

    signInWithEmailAndPassword(authObj, email, password)
    .then((userCredential) => setUser(userCredential.user))
    .catch((error) => console.log(error))
  }

  const signout = () => {
    signOut(authObj)
      .then(() => setUser(null))
      .catch((error) => console.log(error))
  }


  // Adding data/document to firestore
  const addDataToFirestore = async ( FScollection, data ) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db,FScollection), data )
    return ref.id
  }

  // Get data/document from firestore
  const getDataFromFirestore = ( FScollection ) => {
    const FSquery = query( collection( db, FScollection ) )
    const unsubscribe = onSnapshot( FSquery, ( querySnapshot ) => {
      let FSdata = []
      querySnapshot.forEach( (doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setAppData( FSdata )
    })
  }
 
  const editDataToFirestore = async ( FScollection, data, ) => {
    // edit data to a collection with FS generated id
    const frankDocRef = doc(db, FScollection, data.id);
    const ref = await updateDoc(frankDocRef, data)
    console.log( ref.id )
  }

  const changeDataStatusToFirestore= async ( FScollection, data ) => {
    // edit data to a collection with FS generated id
    const frankDocRef = doc(db, FScollection, data.id);
    const ref = await updateDoc(frankDocRef, data)
  
  }

  const authObj = getAuth()
  onAuthStateChanged(authObj, (user) => {
    if (user) {
      setUser(user)
      if (!appData) {
        getDataFromFirestore(`users/${user.uid}/items`)
      }
    }
    else {
      setUser(null)
    }
  })

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

        <Stack.Screen name="Signup" options={{ headerLeft: (props) => <LogoTitle {...props} />,
          title: "Sign up", headerTintColor: '#000' }} >

          {(props) => <SignupScreen {...props} signup={register} auth={user} />}
        </Stack.Screen>


        <Stack.Screen name="Signin" options={{ headerLeft: (props) => <LogoTitle {...props} />,
          title: "Log in", headerTintColor: '#000' }} >

          {(props) => <SigninScreen {...props} signin={signin} auth={user} />}
        </Stack.Screen>

        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Home' }} /> */}
        <Stack.Screen name="Home" options={{ headerLeft: (props) => <LogoTitle {...props} />,
          title: "Home", headerTintColor: '#000',
          headerRight: (props) => <SignoutButton {...props} signout={signout} />,
        }}
        
        >
          {/* {(props) => <HomeScreen {...props} auth={user} add={addData} />} */}
          {(props) => <HomeScreen {...props} auth={user} addDataToFirestore={addDataToFirestore} data={appData} getDataFromFirestore={getDataFromFirestore} changeDataStatusToFirestore={changeDataStatusToFirestore} />}
        </Stack.Screen>

        {/* <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Add Task' }} /> */}
        <Stack.Screen name="Add" options={{ title: 'Create new task', headerTintColor: '#000' }} >
        {(props) => <AddScreen {...props}  auth={user} data={appData} addDataToFirestore={addDataToFirestore} />}
        </Stack.Screen>

         {/* <Stack.Screen name="Edit" component={NewEditScreen} options={{ title: 'Edit Task' }} /> */}
        <Stack.Screen name="Edit" options={{ title: 'Task details', headerTintColor: '#000' }} >
        {(props) => <NewEditScreen {...props}  auth={user} data={appData} editDataToFirestore={editDataToFirestore} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // logoContainer: {
  //   flex: 1,
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  //   // justifyContent: 'flex-start',
  //   // marginBottom: 1,
  //   // padding: 1,  
  // },

  logoImage: {
    width: 40,
    height: 40,
    marginRight: 5,
    resizeMode: 'contain',
  },

  titleText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
    marginStart: 60,
    
  }

});
