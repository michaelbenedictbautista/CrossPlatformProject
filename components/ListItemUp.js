import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import React, { useState } from "react";

export function ListItemUp(props) {

	const [modalVisible, setModalVisible] = useState(false);

	// Confirmation function prior deleting a task
	const confirmDelete = () =>

		Alert.alert(
			"Delete task?",
			"Are you sure you want to delete this task?",
			[
				{
					text: "Cancel",
					onPress: () => {
						setModalVisible(false)
					},
					style: "cancel",
				},
				{
					text: "OK", onPress: () => props.remove(props.item.id),
				},
			]
		);

	// Confirmation function prior moving a task
	const confirmMoveToCompletedTask = () =>

		Alert.alert(
			"Move task?",
			"Are you sure you want to move this to completed task?",
			[
				{
					text: "Cancel",
					onPress: () => {
						setModalVisible(false)
					},
					style: "cancel",
				},
				{
					text: "OK", onPress: () => props.update(props.item.id),
				},
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

		// Create modal view for option delete and move
		<View style={styles.item}>

			{/* <TouchableOpacity onPress={() => props.edit(props.item.id)}>
						<Text style={styles.itemNameText}>{props.item.title}</Text>
						<Text style={styles.itemDateText}>{props.item.date}</Text>
					</TouchableOpacity> */}
			<View style={{ flexWrap: 'wrap' }}>
				<Text style={styles.itemNameText} onPress={() => props.edit(props.item.id)}>{props.item.title}</Text>
				<Text style={styles.itemDateText} onPress={() => props.edit(props.item.id)}>{props.item.date}</Text>
			</View>

			<TouchableOpacity style={styles.generateTouchableOp} onPress={() => props.generateQRCode(props.item.id)} >
				<Icon name="qrcode" style={styles.generateIcon} />
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>

				<View style={styles.modalViewContainer}>
					<View style={styles.modalView}>

						{/* <TouchableOpacity style={styles.removeTouchableOp} onPress={confirmDelete}>
							<Icon name="delete" style={styles.trashIcon}><Text style={styles.deleteTaskText}>     Delete task</Text></Icon>
						</TouchableOpacity> */}

						<TouchableOpacity
							style={styles.removeTouchableOp}
							onPress={confirmDelete}>
							<Icon style={styles.trashIcon} name="delete" />
							<Text style={styles.deleteTaskText}>Delete task</Text>
						</TouchableOpacity>


						<View style={{ backgroundColor: 'gray', height: .5, marginHorizontal: 20 }}></View>


						{/* <TouchableOpacity style={styles.markTouchableOp} onPress={confirmMoveToCompletedTask}>
							<Icon name="check" style={styles.bookmarkIcon}><Text style={styles.moveTaskText}>     Move to 'Completed task'</Text></Icon>
						</TouchableOpacity> */}

						<TouchableOpacity
							style={styles.markTouchableOp}
							onPress={confirmMoveToCompletedTask}>
							<Icon style={styles.bookmarkIcon} name="check" />
							<Text style={styles.moveTaskText}>Move to Completed task</Text>
						</TouchableOpacity>

						<View style={{ backgroundColor: 'gray', height: .5, marginHorizontal: 20 }}></View>

						<TouchableOpacity style={styles.closeTouchableOp} onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.closeText}>close</Text>
						</TouchableOpacity>

					</View>
				</View>

			</Modal>

			<TouchableOpacity style={styles.modalTouchableOp} onPress={() => setModalVisible(true)} >
				<Icon name="edit" style={styles.modalIcon} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		paddingVertical: 8,
		paddingHorizontal: 20,
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

	modalTouchableOp: {
		position: 'absolute',
		right: 20,
		//justifyContent: 'center',
	},

	removeTouchableOp: {
		//position: 'absolute',
		//right: 50,
		justifyContent: 'center',
		padding: 15,
		alignContent: 'flex-start',


		flexDirection: 'row',
		alignItems: 'center',
	},

	markTouchableOp: {
		// position: 'absolute',
		//right: -6,
		justifyContent: 'center',
		padding: 15,
		//alignSelf: 'center',
		alignContent: 'flex-start',


		flexDirection: 'row',
		alignItems: 'center',
	},

	// closeTouchableOp: {
	// 	right: 1,
	// 	justifyContent: 'center',
	// 	padding: 15,
	// 	alignSelf: 'center',
	// },

	closeTouchableOp: {
		//right: 1,
		justifyContent: 'center',
		padding: 20,
		//alignSelf: 'center',
		alignContent: 'center',

		borderRadius: 300,
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'white',
		shadowColor: 'rgba(200, 200, 200, 1)',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0,
		shadowRadius: 5,


		alignSelf: 'center',
	},

	generateIcon: {
		fontSize: 20,
		color: "white",
	},

	modalIcon: {
		fontSize: 20,
		color: "white",
	},

	trashIcon: {
		fontSize: 20,
	},

	bookmarkIcon: {
		fontSize: 20,
		// marginEnd: 20,
	},

	closeIcon: {
		fontSize: 20,
		marginEnd: 20,
	},

	// deleteTaskText: {
	// 	fontSize: 15,
	// 	fontWeight: 'bold',
	// 	// marginHorizontal: 10,
	// },


	deleteTaskText: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'black',
		marginStart: 20,
	},

	// moveTaskText: {
	// 	fontSize: 15,
	// 	fontWeight: 'bold',
	// 	// margin: 5,
	// },


	moveTaskText: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'black',
		marginStart: 20,
	},

	closeText: {
		fontSize: 15,
		//fontWeight: 'bold',
		//margin: 5,

	},

	modalViewContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		margin: 10,




	},

	modalView: {
		padding: 5,
		// backgroundColor: '#94D1FA',
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,

		alignItems: 'flex-start',
	},

	// 	modalView: {
	//    marginTop:200,
	// 		marginHorizontal: 30,
	//    backgroundColor: "gray",
	//    borderRadius: 20,
	// 		maxHeight: 200,
	//    padding: 15,
	//    alignSelf: 'center',
	// 		justifyContent: 'center',
	//    shadowColor: "#000",
	//    shadowOffset: {
	//       width: 0,
	//       height: 2
	//     },
	//    shadowOpacity: 0.25,
	//    shadowRadius: 4,
	//    elevation: 5
	//   },

})
