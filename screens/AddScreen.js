// components from react
import React, { useState, useEffect } from 'react';

// components from react native
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

//External Lib
import Icon from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from 'expo-linear-gradient'

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

const submitData = async ( path, taskTitle, taskDescription) => {
  let newDate = new Date().getDate()
  let newMonth = new Date().getMonth() + 1;
  let newYear = new Date().getFullYear();
  let fullDate = newDate + '/' + newMonth + '/' + newYear
  const dataObj = {title: taskTitle,  description: taskDescription, date: fullDate, status: false }
 const id = await  props.addDataToFirestore( path, dataObj )
 return id
}

// observe for changes
useEffect( () => {
  if( !props.auth ) {
    navigation.reset( { index: 0, routes: [ {name: "Signin"} ]} )
  }  
}, [props.auth] )

// observe for changes
useEffect( () => {
  //console.log( props.data )
}, [props.data])

// transfer data and navigate to home
const clickHandler = (data) => {
  navigation.navigate('Home', data )
}

//use of props navigation and route params
const navigation = useNavigation();
const {onPressAdd} =props.route.params
 
  return <SafeAreaView style={styles.safeAreaViewContainer}>
    <LinearGradient
      style={styles.box}
      colors={['blue', 'cyan']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    />

    <View style={styles.header}>
      <Text style = {styles.textInputLabel}>Title</Text>
        <TextInput style={styles.input}
          placeholder='Enter task title here...'
          onChangeText={(value) => {
            setInput(value)
          }}
        />
    </View>

    <View style={styles.header}>
      <Text style = {styles.textInputLabel}>Description</Text>
        <TextInput style={styles.input}
          placeholder='Enter description here...'
          multiline={true}
          onChangeText={(value2) => {
            setInput2(value2)
          }}
        />
    </View>
    
      <TouchableOpacity style={(input.length < 3 || input2.length < 3) ? styles.addButtonDisabled : styles.addButton}
        disabled = { (input.length < 3 || input2.length < 3) ? true : false }
        onPress={async() => {
          const id = await submitData(`users/${props.auth.uid}/items`,input, input2)
          onPressAdd(input, input2,id)
          clickHandler(props.data)
        }}>
        <Icon style={(input.length < 3 || input2.length < 3) ? styles.addButtonIconDisabled: styles.addButtonIcon} name="pluscircle" />
        <Text style={(input.length < 3 || input2.length < 3) ? styles.addButtonTextStyleDisabled: styles.addButtonTextStyle}>
          Add
        </Text>
      </TouchableOpacity>

  </SafeAreaView>
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    position: 'absolute',
    width: '100%',
    height: 900,
    opacity: 0.8,
  },

  input: {
    backgroundColor: '#B3E0F2',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 15,
    padding: 10,
    fontSize: 12,
  },

  header: {
    width: 300,
    padding: 5,
    marginBottom: 15,
  },

  textInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,  
  },

  button: {
    backgroundColor: '#313cdf',
  },

  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 300,
    backgroundColor: '#313cdf',
    width: 150,
    borderWidth: 1,
    borderColor: "white"
  },

  addButtonDisabled: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 300,
    backgroundColor: 'gray',
    width: 150,
    borderWidth: 1,
    borderColor: "black"
  },

  addButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    padding: 5,     
  },

  addButtonTextStyleDisabled: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    padding: 5, 
  },

  addButtonIcon: {     
    color:"white",
    fontSize: 20,
  },

  addButtonIconDisabled: {     
    color:"black", 
    fontSize: 20,    
  },

})