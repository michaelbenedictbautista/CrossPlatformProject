import { View, Text, StyleSheet } from 'react-native'

export function ListSeparator ( props ) {
  return (
    <View style={ styles.separator }></View>
  )
}

const styles = StyleSheet.create({
  separator: {
    padding: 1,
    backgroundColor: 'gray',
  }
})