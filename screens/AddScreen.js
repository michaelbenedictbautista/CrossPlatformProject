import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'


// Firebase config
import { firebaseConfig } from '../config/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, } from 'firebase/firestore'


// Initialise the firebase app abd save reference
const FBapp = initializeApp(firebaseConfig)

// Initialise the firestore
const db = getFirestore(FBapp)


export function AddScreen(props) {

  const [ input, setInput ] = useState('')
  const [ input2, setInput2 ] = useState('')
  //const [ date, setDate ] = useState()

// // Adding data to firestore
// const addDataToFirestore = async (FSCollection) => {
  
//   let taskTitle = (input)
//   let newDate = new Date().getDate()
//   let newMonth = new Date().getMonth() + 1;
//   let newYear = new Date().getFullYear();
//   let fullDate = newDate + '/' + newMonth + '/' + newYear
//   let date = fullDate
 
//   setDate(fullDate)
  
const submitData = async ( path, taskTitle, taskDescription) => {
  let newDate = new Date().getDate()
  let newMonth = new Date().getMonth() + 1;
  let newYear = new Date().getFullYear();
  let fullDate = newDate + '/' + newMonth + '/' + newYear
  const dataObj = {title: taskTitle,  description: taskDescription, date: fullDate, status: false }
 const id = await  props.addDataToFirestore( path, dataObj )
 return id
}

useEffect( () => {
  if( !props.auth ) {
    navigation.reset( { index: 0, routes: [ {name: "Signin"} ]} )
  }  
}, [props.auth] )

useEffect( () => {
  //console.log( props.data )
}, [props.data])

const clickHandler = (data) => {
  navigation.navigate('Home', data )
}

const navigation = useNavigation();
const {onPressAdd} =props.route.params
 
  return <SafeAreaView>
    <View style={styles.header}>
      <TextInput style={styles.input}
        placeholder='Enter task here...'
        onChangeText={(value) => {
          setInput(value)
        }}
      />
    </View>

    <View style={styles.header}>
      <TextInput style={styles.input}
        placeholder='Enter description here...'
        onChangeText={(value2) => {
          setInput2(value2)
        }}
      />
    </View>


    <TouchableOpacity style={{ marginTop: 10 }}>
      <Icon.Button name="pluscircleo" style={(input.length < 3) ? styles.buttonDisabled : styles.button}
        disabled={(input.length < 3) ? true : false}
        onPress={async() => {
         const id = await submitData(`users/${props.auth.uid}/items`,input, input2)
          onPressAdd(input, input2,id)
          clickHandler(props.data)
        }}>
        <Text style={(input.length < 3) ? styles.buttonTextDisabled : styles.buttonText}>
          Add task
        </Text>
      </Icon.Button>
    </TouchableOpacity>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  input: {
    padding: 5,
    fontSize: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: 'gray',
    color: 'gray',

  },

  button: {
    backgroundColor: 'blue',
  },

  buttonTextDisabled: {
    fontSize: 20,
    backgroundColor: 'transparent',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  QrCodeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 5,
  },

  shareButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
    borderRadius: 300,
    backgroundColor: 'cyan',
  },

  shareButtonIcon: {

    color: "white",

  },

  shareButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 10,
  },

})