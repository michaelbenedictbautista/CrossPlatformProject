import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import { ImageBackground } from 'react-native-web'

export function ListFooter ( props ) {
    return (
        <View>  
            <Text style ={styles.text}>{props.text} </Text>
        </View>
    )
        
  

}
const styles = StyleSheet.create({
    text: {
     
      backgroundColor: '#0bcdd4',
      //alignItems: 'center',
      justifyContent: 'center',
    },
});