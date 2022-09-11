import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export function ListItem1(props) {
  return (
    <View style={styles.item}>

      <TouchableOpacity onPress={() => props.edit(props.item.id)}>
      <Text style={styles.itemNameText}>{props.item.title}</Text>
      {/* <Text style={ styles.itemDescText}>{ props.item.description }</Text> */}
      <Text style={styles.itemDateText}>{props.item.date}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.generateTouchableOp} onPress={() => props.generateQRCode(props.item.id)} >
        <Icon name="qrcode" style={styles.generateIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.removeTouchableOp} onPress={() => props.remove(props.item.id)}>
        <Icon name="delete" style={styles.trashIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.markTouchableOp} onPress={() => props.update(props.item.id)}>
        <Icon name="check" style={styles.bookmarkIcon} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.edit} onPress={() => props.edit(props.item.id)}>
        <Icon name="edit" style={styles.editIcon} />
      </TouchableOpacity> */}

    </View>

  )
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
  },

  itemNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00365C',
  },

  itemDateText: {
    fontSize: 10,
    color: '#0062A8',
  },

  itemTextDone: {
    fontSize: 40,
  },

  generateTouchableOp: {
    position: 'absolute',
    right: 90,
    justifyContent: 'center',
  },

  removeTouchableOp: {
    position: 'absolute',
    right: 50,
    justifyContent: 'center',
  },

  markTouchableOp: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
  },

  // edit: {
  //   position: 'absolute',
  //   right: 110,
  //   justifyContent: 'center',
  // },

  display: {
    position: 'absolute',
    right: 150,
    justifyContent: 'center',
  },

  trashIcon: {
    fontSize: 20,
    color: "white",
  },

  bookmarkIcon: {
    fontSize: 20,
    color: "white",
  },

  generateIcon: {
    fontSize: 20,
    color: "white",
  },

  editIcon: {
    fontSize: 20,
    color: "white",
  }

})
