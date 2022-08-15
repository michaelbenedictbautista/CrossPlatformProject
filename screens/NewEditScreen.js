import React, { useCallback, useState,useEffect } from 'react';
import { SafeAreaView ,StyleSheet,View,TextInput,TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'



export function NewEditScreen( props ) {
    const navigation = useNavigation();
    const {onPressSave } =props.route.params
    const [input, setInput] = useState(props.route.params.value)
    const [input2, setInput2] = useState(props.route.params.value2)
    //const [storedDate, setStoredDate] = useState(props.route.params.value3)


    const submitEditedData = ( path, taskTitle, taskDescription) => {
      // let newDate = new Date().getDate()
      // let newMonth = new Date().getMonth() + 1;
      // let newYear = new Date().getFullYear();
      // let fullDate = newDate + '/' + newMonth + '/' + newYear
      const dataObj = {title: taskTitle,  description: taskDescription }
      props.editDataToFirestore( path, dataObj )
    }

    return <SafeAreaView>

      <View style = {styles.header}>
        <TextInput  style = {styles.input} 
          placeholder ='Enter task here...' 
          onChangeText={ (value) => {
            setInput(value)
            // onValueChange(value)
          } }
          value={input}
        />
      </View>

      <View style = {styles.header}>
          <TextInput  style = {styles.input} 
            placeholder ='Enter description here...' 
            onChangeText={ (value2) => {
              setInput2(value2)
              // onValueChange(value)
            } }
            value={input2}
          />
      </View>

      <TouchableOpacity style={{marginTop:10}}>   
        <Icon.Button name="pluscircleo" style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          disabled = { (input.length < 3) ? true : false }
          onPress={()=>{
            // submitData(`users/${props.auth.uid}/items`,input, input2),
            onPressSave(input, input2), submitEditedData(`users/${props.auth.uid}/items`,input, input2)
            navigation.goBack()
          }}>
        <Text style={ (input.length < 3) ? styles.buttonTextDisabled : styles.buttonText}>
          Save task
        </Text>
        </Icon.Button>
      </TouchableOpacity>
    </SafeAreaView>
}
const styles = StyleSheet.create( {
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
        
        color:"white",
        
      },
    
      shareButtonTextStyle: {
        fontWeight: 'bold',
        fontSize: 10,
      },
    
})