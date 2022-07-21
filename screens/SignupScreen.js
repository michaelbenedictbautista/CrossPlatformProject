import {useState, useEffect} from 'react'

import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'

export function SignupScreen( {navigation} ) {

  // Declaring UseState for both email and password
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [Password, setPassword] = useState()
  const [validPassowrd, setValidPassword] = useState(false)

  //function to validate email
  const validateEmail = ( emailStr ) => {
    // check if email contains '@' symbol
    const atIndex = emailStr.indexOf('@')
    if( atIndex > 0 ) {
      return true
    }
    else {
      return false
    }
  }

  const validatePassword = (passwordStr) => {
    const passLength = passwordStr.length

  }

  useEffect( () => {
    console.log( validateEmail( email ) )
    if ( validateEmail( email ) ) {
      setValidEmail( true )
    }
  }, [email] )

  return (
    <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
    
    <Text style = {styles.signUpTitle}>Welcome to Sign up page</Text>

    {/* Wrap the TextIput elements to View */}
    <View style = {styles.signupForm}>
      
      <Text style = {styles.label}>Email</Text>
      <TextInput style = {styles.input} onChangeText = { (value) => setEmail(value)}/>

      <Text style = {styles.label}>Password</Text>
      <TextInput style = {styles.input} secureTextEntry={true} onChangeText={ (value) => setPassword (value) }/>

      <TouchableOpacity style= {styles.button} o>
          <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

    </View>


    <TouchableOpacity onPress={ () => navigation.navigate('Signin')}>
        <Text>Go to Sign in</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={ () => navigation.navigate('Home', {name: 'Custom Home header'})}>
        <Text>Go to Home</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create( {

  signupView: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpTitle: {
    marginBottom: 15,
    
  },

  signupForm: {
    backgroundColor: 'gray',
    width: 300,
    padding: 10,
    marginBottom: 15,
  },

  label: {
    marginVertical: 10,
  },

  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
  },

  form: {
    justifyContent: 'flex-start',
  },

  button: {
    backgroundColor: 'cyan',
    alignItems: 'center',
    padding: 10,
    borderRadius: 300,
  },

  buttonText: {
    fontWeight: 'bold',
  },

} ) 
