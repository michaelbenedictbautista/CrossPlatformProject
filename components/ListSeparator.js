import { View, StyleSheet } from 'react-native'

export function ListSeparator(props) {
  return (
    <View style={styles.separator}></View>
  )
}

const styles = StyleSheet.create({
  separator: {
    // padding: 1,
    backgroundColor: 'gray',
    height: .5,
    marginHorizontal: 30,
    marginTop: 10,
  }
})