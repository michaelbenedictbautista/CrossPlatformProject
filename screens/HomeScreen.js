import { useState, useEffect, useRef, useCallback } from 'react'

import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, Share, Alert, Modal, } from 'react-native'
import { LogBox } from 'react-native'
import { SafeAreaView, ScrollView } from 'react-native'

// Components
// import { ListItem1 } from '../components/ListItem1'
// import { ListItem2 } from '../components/ListItem2'
import { ListItemUp } from '../components/ListItemUp'
import { ListItemComp } from '../components/ListItemComp'
import { ListSeparator } from '../components/ListSeparator'

// External Lib
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/AntDesign'

export function HomeScreen(props) {

  const navigation = useNavigation();

  // Navigate user to Sigin screen after Sign out.
  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
    }
  }, [props.auth])


  // Get data from firestore by using the getData function
  const displayData = (path) => {
    props.getDataFromFirestore(path)
  }

  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...'])

  // Ignore all log notifications:
  LogBox.ignoreAllLogs()

  // Local storage
  const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,

  });

  // Application state
  const [upListData, setUpListData] = useState([])
  const [compListData, setCompListData] = useState([])
  const [starting, setStarting] = useState(true)
  const [qrvalue, setQrvalue] = useState('');
  const [qrValueDate, setQrValueDate] = useState('');
  const [qrValueDescription, setQrValueDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // getters and setters for task done
  const [markedItem, setMarkedItem] = useState([])

  // Display all items 
  const displayAllObjectItems = () => {
    (displayData(`users/${props.auth.uid}/items/`))
    if (props.data) {
      const cacheUpList = []
      const cacheComList = []
      props.data.map(item => {
        if (item.status) {
          cacheComList.push(item)
        } else {
          cacheUpList.push(item)
        }
      })
      setUpListData(cacheUpList)
      setCompListData(cacheComList)
    }
  }

  // Function definition and declaration for saving and loading data from local storage
  const saveData = () => {
    storage.save({
      key: 'localListData', // Note: Do not use underscore("_") in key!
      data: JSON.stringify(upListData, compListData)
    });
  }

  const loadData = () => {
    storage
      .load({
        key: 'localListData',
      })
      .then((data) => {
        setUpListData(JSON.parse(data)),
          setCompListData(JSON.parse(data))
      })
  }

  // Insert the task at the top of the upListData by using sort() method
  const sortListUpcoming = (arr) => {
    let newSortedList = arr.sort((item1, item2) => {
      return item2.id - item1.id
    })
    setUpListData(newSortedList)
  }

  // Insert the task at the top of the compListData by using sort() method
  const sortListCompleted = (arr) => {
    let newSortedList = arr.sort((item1, item2) => {
      return item2.id - item1.id
    })
    setCompListData(newSortedList)
  }

  /* UseEffect Hook is use when there are changes in the object 
  declared inside the scope of the function itself*/
  useEffect(() => {
    sortListUpcoming(upListData)
    saveData()
  },
    [upListData])

  useEffect(() => {
    sortListCompleted(compListData)
    saveData()
  },
    [compListData])

  useEffect(() => {
    if (starting) {
      loadData()
      setStarting(false)
    }
  })

  /*Function declaration and definition to add input value to the upListData
   adding item to our upcoming list data*/
  const addItem = (input, input2, id) => {
    let newDate = new Date().getDate()
    let newMonth = new Date().getMonth() + 1;
    let newYear = new Date().getFullYear();
    let fullDate = newDate + '/' + newMonth + '/' + newYear
    let newItem = { id: id, title: input, description: input2, date: fullDate, status: false }
    let newList = upListData.concat(newItem)
    setUpListData(newList)
  }

  // Function declaration and definition to delete task from upListData and compListData
  const deleteItem = (itemId) => {
    // find the item id as key then remove the value using filter() method
    const newList = upListData.filter((item) => {
      if (item.id !== itemId) {
        
        return item
      }
      props.deleteDataToFirestore(`users/${props.auth.uid}/items/`, item)
    })
    setUpListData(newList)

  }

  const deleteItem2 = (itemId) => {
    // find the item id as key then remove the value using filter() method
    const newListCompleted = compListData.filter((item) => {
      if (item.id !== itemId) {
        
        return item
      }
      props.deleteDataToFirestore(`users/${props.auth.uid}/items/`, item)
    })
    setCompListData(newListCompleted)
  }


  // Function declaration and definition to edit task from upListData
  const editItem = (itemId) => {
    const newList = upListData.filter((item) => {
      return item.id === itemId
    })
    const newCompList = compListData.filter((item) => {
      return item.id === itemId
    })

    let isComp = newCompList.length > 0

    navigation.push("Edit", {
      value: isComp ? newCompList[0] : newList[0],
      //value: isComp ? [newCompList[0].title newCompList[0].description]: newList[0].title,
      onPressSave: (item1, value, value2) => {
        //  addItem(value), props.add(), Init()
        if (item1.status) {
          const newList = compListData.map(item => {
            if (item.id === itemId) {
              return { ...item, title: value, description: value2 }
            }
            return item
          })
          setCompListData(newList)
        } else {
          const newList = upListData.map(item => {
            if (item.id === itemId) {
              return { ...item, title: value, description: value2 }
            }
            return item
          })
          setUpListData(newList)
        }
      }
    })

  }

  // Function declaration and definition to mark Upcomingtask as done
  const updateStatus = (itemId) => {
    let newUpdatedItem = ([])
    upListData.map((item) => {
      if (item.id === itemId) {
        return newUpdatedItem = { ...item, status: true }
      }
      else {
        return item
      }
    })

    let newList2 = upListData.filter((item) => {
      if (item.id !== itemId) {
        return item
      }
    })
    // re-render uplistaData
    setUpListData(newList2)
    console.log("newUpdatedItem===", newUpdatedItem);
    //
    props.changeDataStatusToFirestore(`users/${props.auth.uid}/items/`, newUpdatedItem)
    // set status as mark
    setMarkedItem(newUpdatedItem)
    let newCompletedList = compListData.concat(newUpdatedItem)
    // re-render compListData
    setCompListData(newCompletedList)
  }

  // Function declaration and definition to mark CompletedTask as done
  const updateStatus2 = (itemId) => {
    let newUpdatedItem = ([])
    compListData.map((item) => {
      if (item.id === itemId) {
        return newUpdatedItem = { ...item, status: false }
      }
      else {
        return item
      }
    })

    let newList2 = compListData.filter((item) => {
      if (item.id !== itemId) {
        return item
      }
    })
    // re-render uplistaData
    setCompListData(newList2)
    console.log("newUpdatedItem===", newUpdatedItem);
    //
    props.changeDataStatusToFirestore(`users/${props.auth.uid}/items/`, newUpdatedItem)
    // set status as mark
    setMarkedItem(newUpdatedItem)
    let newCompletedList = upListData.concat(newUpdatedItem)
    // re-render compListData
    setUpListData(newCompletedList)
  }



  // Function to generate QR code
  const generateCode = (itemId) => {
    setModalVisible(true)
    let newGeneratedItem = ([])
    upListData.map((item) => {
      if (item.id === itemId) {
        return newGeneratedItem = { id: item.id, title: item.title, description: item.description, date: item.date, status: true }
      }
      else {
        return item
      }
    })
    setQrvalue(newGeneratedItem.title)
    setQrValueDate(newGeneratedItem.date)
    setQrValueDescription(newGeneratedItem.description)
  }

  const generateCode2 = (itemId) => {
    setModalVisible(true)
    let newGeneratedItem2 = ([])
    compListData.map((item) => {
      if (item.id === itemId) {
        return newGeneratedItem2 = { id: item.id, title: item.title, description: item.description, date: item.date, status: true }
      }
      else {
        return item
      }
    })
    setQrvalue(newGeneratedItem2.title)
    setQrValueDate(newGeneratedItem2.date)
    setQrValueDescription(newGeneratedItem2.description)
  }

  // Function to share QR code
  let myQRCode = useRef();
  const shareQRCode = () => {
    myQRCode.toDataURL((dataURL) => {
      //console.log(dataURL);
      let shareImageBase64 = {
        title: 'React Native',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'Share Link', //  for email
      };
      Share.share(shareImageBase64).catch((error) => console.log(error));
    });
  };

  // Function to render upcominglist of items in the array
  const renderItem = ({ item }) => (
    // rendering our list of items(tasks)
    <ListItemUp item={item} remove={deleteItem}
      update={updateStatus} generateQRCode={generateCode}
      edit={editItem}
    />
  )

  // Function to render completedlist of items in the array
  const renderItem2 = ({ item }) => (
    // rendering our list of items(tasks)
    <ListItemComp item={item} remove={deleteItem2}
      update={updateStatus2} generateQRCode={generateCode2}
      edit={editItem}
    />
  )

  // initialise function to set variable to desired useState.
  const Init = useCallback(() => {
    // setInput('')
    setQrvalue('')
    setQrValueDate('')
    setQrValueDescription('')
  }, [])

  return (

    <View style={styles.homeContainer}>

      <LinearGradient
        style={styles.box}
        colors={['blue', 'cyan']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} >

        <View style={styles.QrCodeContainer}>
          <View style={styles.modalView}>

            <QRCode
              getRef={(ref) => (myQRCode = ref)}

              //QR code value function
              // value={qrvalue ? qrvalue : 'NA'}
              value={[qrvalue, '\n', qrValueDescription, '\n', qrValueDate]}
              //size of QR Code
              size={150}
              //Color of the QR Code (Optional)
              color="black"
              //Background Color of the QR Code
              backgroundColor="white"
              logo={require('../assets/logo.png')}
              logoSize={15}
              logoMargin={4}
              justifyContent='center'
            />

            <TouchableOpacity
              style={styles.shareButtonStyle}
              onPress={shareQRCode}>
              <Icon style={styles.shareButtonIcon} name="save" />
              <Text style={styles.shareButtonTextStyle}>
                Save QR code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // style={[styles.button, styles.buttonClose]}
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonCloseTextStyle}>close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <ScrollView>

      <View style={styles.upcomingScreenContainer}>
        <Text style={styles.upcomingScreen}>Upcoming task</Text>
      </View>

      <FlatList
          data={upListData} // this holds th data for upListData
          keyExtractor={(item) => item.id} // definitive id fthat will serve as a key for an item
          renderItem={renderItem} // render all property of an item
        />

      < ListSeparator></ListSeparator>

      <View style={styles.completedScreenContainer}>
        <Text style={styles.completedScreen}>Completed task</Text>
      </View>

      <FlatList
          data={compListData} // this holds th data for upListData
          keyExtractor={(item) => item.id}
          renderItem={renderItem2}
        />

      < ListSeparator></ListSeparator>

        <View style={styles.refreshContainer}>
          <TouchableOpacity style={styles.refreshButton}
            onPress={() => displayAllObjectItems()} >
            <Icon style={styles.refreshIcon} name="reload1" />
            <Text style={styles.refreshText}>
              Refresh list
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
       
      <View style={{
        alignItems: 'center',
        //paddingHorizontal: 10,
      }}>

        <View style={styles.navBackground}>

          <TouchableOpacity style={styles.navFormat}
            onPress={() => {
              navigation.navigate('Home')
            }}>
            <Icon style={styles.homeIcon} name="home" />            
          </TouchableOpacity>


          <TouchableOpacity style={styles.navFormat}
            onPress={() => {
              navigation.push("Add", {
                onPressAdd: (value, value2, id) => {
                  // addItem(value), props.add(), Init()
                  addItem(value, value2, id), Init()
                }
              })
            }}>
            <Icon style={styles.addIcon} name="pluscircle" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navFormat}>
            <Icon style={styles.notificationIcon} name="notification" />
          </TouchableOpacity>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  homeContainer: {
    flex: 1,
  },

  generateShareContainerEnabled: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
  },

  generateShareContainerDisabled: {
    flex: 0,
  },

  box: {
    position: 'absolute',
    width: '100%',
    height: 1200,
    opacity: 0.8,
  },

  upcomingScreenContainer: {
    alignItems: 'center',
    margin: 5,
  },

  upcomingScreen: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    margin: 10,
  },

  completedScreenContainer: {
    alignItems: 'center',
    margin: 5,
  },

  completedScreen: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    margin: 10,
  },

  input: {
    padding: 5,
    fontSize: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: 'gray',
    color: 'gray',

  },

  button: {
    backgroundColor: 'blue',
  },

  buttonTextDisabled: {
    fontSize: 20,
    backgroundColor: 'transparent',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  QrCodeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },

  modalView: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
		shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },

  shareButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 300,
    backgroundColor: '#313cdf',
  },

  shareButtonIcon: {
    fontSize: 20,
    color: "white",
  },

  shareButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },

  buttonClose: {
    borderRadius: 300,
    alignItems: 'center',
    padding: 10,
    //borderColor: 'gray',
    // borderWidth: 0.5,
    // marginVertical: 1,

    backgroundColor: 'white',
    shadowColor: 'rgba(200, 200, 200, 1)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 10,
  },

  buttonCloseTextStyle: {
    fontSize: 15,
  },

  navBackground: {
    backgroundColor: '#eee',
    height: 70,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },

  navFormat: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  navText: {
    fontSize: 12,
    color: '#444'
  },

  homeIcon: {
    color: "black",
    fontSize: 25,
  },

  addIcon: {
    color: "#313cdf",
    fontSize: 35,
  },

  notificationIcon: {
    color: "black",
    fontSize: 25,
  },

  displayAllObjectItemsText: {
    textAlign: 'center',
    margin: 10,

  },

  refreshContainer: {
    alignItems: 'center',
  },

  refreshButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 300,
    backgroundColor: '#313cdf',
    width: 150,
    borderWidth: 1,
    borderColor: "white"
  },

  refreshIcon: {
    color: "white",
    fontSize: 20,
  },

  refreshText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    padding: 5,
  },

})