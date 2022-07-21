import { Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native'

export function SigninScreen( {navigation} ) {
  return (
    <View style={styles.signinView}>
      <Text>Welcome to Sign in page</Text>
      <TouchableOpacity onPress={ () => navigation.navigate('Signup')}>
        <Text>Go to back Sign up</Text>
    </TouchableOpacity>
    {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  )
}

const styles = StyleSheet.create( {
  signinView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} ) 