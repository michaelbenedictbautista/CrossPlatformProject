import { View, Text } from 'react-native'

export function ListTask ( props ) {
    return (
        <View>
            <Text>{ props.item.name} </Text>
        </View>

    )

}