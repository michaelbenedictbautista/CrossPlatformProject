import { View, Text, StyleSheet } from 'react-native'

export function ListEmpty ( props ) {
    return  (
        <View style={ styles.listEmptyContainer }>  
            <Text style={ styles.listEmptyText }>Empty List</Text>
        </View>
        
    )

}

const styles = StyleSheet.create ({
    listEmptyContainer: {
        alignItems:'center',
    },

    listEmptyText: {
        fontWeight: 'bold',
        
    },
})
