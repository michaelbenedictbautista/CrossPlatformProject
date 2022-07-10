import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export function ListItem ( props ) {
    return (
    <View style={ styles.item }>
      
      <Text style={ styles.itemNameText}>{ props.item.name }</Text>
      <Text style={ styles.itemDateText}>{ props.item.date }</Text>
      
      <TouchableOpacity style={ styles.removeTouchableOp } 
        onPress={ () => props.remove(props.item.id) }
      >
      < Icon name="delete" style={ styles.trashIcon } />
      
      {/*   For more setting (Edit, Delete, Mark as done)   
      <Icon.Button name="trash-o" backgroundColor="transparent" >
        <Text > delete</Text>
      </Icon.Button>
       */}
       
      </TouchableOpacity>


      <TouchableOpacity style={ styles.markTouchableOp} 
        onPress={ () => props.update(props.item.id) }
      >
      < Icon name="check" style={ styles.bookmarkIcon } />
      </TouchableOpacity>

    </View>

    )

}

const styles = StyleSheet.create({
    item: {
      padding: 5,
      flex: 1,
      justifyContent: 'center',
    },

    itemNameText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00365C',
    },

    itemDateText: {
      fontSize: 14,
      color: '#0062A8',
    },

    itemTextDone: {
        fontSize: 40,
    },

    removeTouchableOp: { 
      position: 'absolute',
      right: 20,
      justifyContent: 'center',
    },

    markTouchableOp: {
      position: 'absolute',
      right: 50,
      justifyContent: 'center',
    }, 

    trashIcon: {
      fontSize:20,
      color:"white",
    },

    bookmarkIcon: {
      fontSize:20,
      color:"white",
    },

  })
