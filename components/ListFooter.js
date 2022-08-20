import { View, Text, StyleSheet } from 'react-native'

export function ListFooter(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> End of task list </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    text: {
        fontSize: 12,
    },

});