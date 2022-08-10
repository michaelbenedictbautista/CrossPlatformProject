import React, { useCallback, useState,useEffect } from 'react';
import { SafeAreaView ,StyleSheet,View,TextInput,TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

export function NewEditScreen( props ) {
    const navigation = useNavigation();
    const {onPressSave } =props.route.params
    const [input, setInput] = useState(props.route.params.value)
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

      <TouchableOpacity style={{marginTop:10}}>   
        <Icon.Button name="pluscircleo" style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          disabled = { (input.length < 3) ? true : false }
          onPress={()=>{
            onPressSave(input)
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