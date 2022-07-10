import { View, Text, StyleSheet } from 'react-native'

export function ListEmpty ( props ) {
    return  (
        <View style={ styles.emptyContainer }>  
            <Text style={ styles.emptyText }>Empty List</Text>
        </View> 
    )
}

const styles = StyleSheet.create ({
    emptyContainer: {
        alignItems:'center',
    },

    emptyText: {
        fontWeight: 'bold',
    },
})
