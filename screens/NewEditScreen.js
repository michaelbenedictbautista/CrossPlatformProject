// Imported from react framework
import React, { useState, useEffect } from 'react';

// Imported from react native framework
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

// External lib
import Icon from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from 'expo-linear-gradient'

export function NewEditScreen(props) {
  const navigation = useNavigation();
  const { onPressSave } = props.route.params
  const [input, setInput] = useState(props.route.params.value?.title)
  const [input2, setInput2] = useState(props.route.params.value?.description)

  // function to submit edited task to firestores
  const submitEditedData = (path, taskTitle, taskDescription) => {
    // const dataObj = { ...props.route.params.value, title: taskTitle, description: taskDescription }
    const dataObj = { ...props.route.params.value, title: taskTitle, description: taskDescription }
    props.editDataToFirestore(path, dataObj)
  }

  return (

    <KeyboardAvoidingView style={styles.safeAreaViewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : -999999} >

      <LinearGradient
        style={styles.box}
        colors={['blue', 'cyan']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      />

      <View style={styles.header}>
        <Text style={styles.textInputLabel}>Title</Text>
        <TextInput style={styles.input}
          autoCorrect={false}
          maxLength={20}
          onChangeText={(value) => {
            setInput(value)
          }}
          value={input}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.textInputLabel}>Description</Text>
        <TextInput style={styles.input2}
          autoCorrect={false}
          multiline={true}
          maxLength={300}
          onChangeText={(value2) => {
            setInput2(value2)
          }}
          value={input2}
        />
      </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={(input.length < 3 || input2.length < 3) ? styles.saveButtonDisabled : styles.saveButton}
            disabled={(input.length < 3 || input2.length < 3) ? true : false}
            onPress={() => {
              onPressSave(props.route.params.value, input, input2), submitEditedData(`users/${props.auth.uid}/items`, input, input2)
              navigation.goBack()
            }}>
            <Icon style={(input.length < 3 || input2.length < 3) ? styles.saveButtonIconDisabled : styles.saveButtonIcon} name="save" />
            <Text style={(input.length < 3 || input2.length < 3) ? styles.saveButtonTextStyleDisabled : styles.saveButtonTextStyle}>
              Save
            </Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({

  safeAreaViewContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  box: {
    position: 'absolute',
    width: '100%',
    height: 1200,
    opacity: 0.8,
  },

  input: {
    backgroundColor: '#B3E0F2',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    //marginBottom: 15,
    padding: 10,
    fontSize: 12,
  },

  input2: {
    backgroundColor: '#B3E0F2',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 10,
    fontSize: 12,
    height: 80,
  },

  header: {
    // width: 300,
    padding: 10,
    //marginBottom: 15,
  },

  textInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  // button: {
  //   backgroundColor: '#313cdf',
  // },

  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
    marginBottom: 40,
    padding: 5,
    borderRadius: 300,
    backgroundColor: '#313cdf',
    width: 150,
    borderWidth: 1,
    borderColor: "white"
  },

  saveButtonDisabled: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
    marginBottom: 40,
    padding: 5,
    borderRadius: 300,
    backgroundColor: 'gray',
    width: 150,
    borderWidth: 1,
    borderColor: "black"
  },

  saveButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    padding: 5,
  },

  saveButtonTextStyleDisabled: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    padding: 5,
  },

  saveButtonIcon: {
    color: "white",
    fontSize: 20,
  },

  saveButtonIconDisabled: {
    color: "black",
    fontSize: 20,
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }

})