import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import React, { useState } from "react";

// dots-three-vertical
export function ListItem1(props) {

	const [modalVisible2, setModalVisible2] = useState(false);

	// Confirmation function prior deleting a task
	const createAlertOptiom = () =>

		Alert.alert(
			"Delete task?",
			"Are you sure you want to delete this task?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Delete cancelled"),
					style: "cancel",
				},
				{
					text: "OK", onPress: () => props.remove(props.item.id)	
				}
			]
		);

	return (		
		
			// <View style={styles.item}>
				
			// 		<TouchableOpacity onPress={() => props.edit(props.item.id)}>
			// 			<Text style={styles.itemNameText}>{props.item.title}</Text>
			// 			<Text style={styles.itemDateText}>{props.item.date}</Text>
			// 		</TouchableOpacity>

			// 		<TouchableOpacity style={styles.generateTouchableOp} onPress={() => props.generateQRCode(props.item.id)} >
			// 			<Icon name="qrcode" style={styles.generateIcon} />
			// 		</TouchableOpacity>

			// 		<TouchableOpacity style={styles.removeTouchableOp} onPress={createAlertOptiom}>
			// 			<Icon name="delete" style={styles.trashIcon} />
			// 		</TouchableOpacity>

			// 		<TouchableOpacity style={styles.markTouchableOp} onPress={() => props.update(props.item.id)}>
			// 			<Icon name="check" style={styles.bookmarkIcon} />
			// 		</TouchableOpacity>
			
			// </View>

			////MODAL///
			<View style={styles.item}>
				
					<TouchableOpacity onPress={() => props.edit(props.item.id)}>
						<Text style={styles.itemNameText}>{props.item.title}</Text>
						<Text style={styles.itemDateText}>{props.item.date}</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.generateTouchableOp} onPress={() => props.generateQRCode(props.item.id)} >
						<Icon name="qrcode" style={styles.generateIcon} />
					</TouchableOpacity>


												<Modal
													animationType="slide"
													// animationIn={'slideInLeft'}
													// animationOut={'slideOutRight'}
													transparent={true}
													visible={modalVisible2}
													onRequestClose={() => {
														Alert.alert("Modal has been closed.");
														setModalVisible2(!modalVisible2);
													}}										
												>
													
														<View style={styles.modalView}>
															
															<TouchableOpacity style={styles.removeTouchableOp} onPress={createAlertOptiom}>
																<Icon name="delete" style={styles.trashIcon}> <Text style={styles.deleteTaskText}>Delete task</Text></Icon>
																
															</TouchableOpacity>

															<TouchableOpacity style={styles.markTouchableOp} onPress={() => props.update(props.item.id)}>
																<Icon name="check" style={styles.bookmarkIcon}><Text style={styles.moveTaskText}>Move to completed task</Text></Icon> 
																
															</TouchableOpacity>

															{/* <Pressable
																style={[styles.button, styles.buttonClose]}
																onPress={() => setModalVisible2(!modalVisible2)}
															>
																<Text style={styles.textStyle}>close</Text>
															</Pressable> */}

															<TouchableOpacity style={styles.markTouchableOp} onPress={() => setModalVisible2(!modalVisible2)}>
																<Icon name="close" style={styles.bookmarkIcon}><Text style={styles.moveTaskText}>Close</Text></Icon> 
																
															</TouchableOpacity>


														</View>

													
												</Modal>
							
										<TouchableOpacity style={styles.modalTouchableOp} onPress={() => setModalVisible2(true)} >
												<Icon name="antdesign" style={styles.modalIcon} />
										</TouchableOpacity>			
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
		right: 70,
		justifyContent: 'center',
	},

	removeTouchableOp: {
		//position: 'absolute',
		right: 50,	
		//justifyContent: 'center',
		padding: 15,
		alignSelf: 'center',
	},

	markTouchableOp: {
		// position: 'absolute',
		right: 10,
		//justifyContent: 'center',
		padding: 15,
		alignSelf: 'center',
		
	},

	modalTouchableOp: {
		position: 'absolute',
		right: 20,
		//justifyContent: 'center',
	},

	moveTaskText: {
		fontSize: 15,
		
	},

	deleteTaskText: {
		// position: 'absolute',
		// rignt: 90,
		fontSize: 15,
		
	},

	// edit: {
	//   position: 'absolute',
	//   right: 110,
	//   justifyContent: 'center',
	// },

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
	},

	modalIcon: {
		fontSize: 20,
		color: "white",
	},

	// centeredView: {
  //   //backgroundColor: 'gray',
  //   padding: 22,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 4,
  //   borderColor: 'rgba(0, 0, 0, 0.1)',
	// },

	modalView: {
    marginTop:200,
		marginHorizontal: 30,
    backgroundColor: "gray",
    borderRadius: 20,
		maxHeight: 200,
    padding: 15,
		//justifyContent: 'center',
    // alignSelf: 'center',
    alignSelf: 'center',

		
		//justifyContent: 'center',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },

	

})
