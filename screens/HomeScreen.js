import { useState, useEffect, useRef } from 'react'

import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, Share } from 'react-native'

/// Components
import { ListItem } from '../components/ListItem'
import { ListSeparator } from '../components/ListSeparator'
import { ListEmpty } from '../components/ListEmpty'
import { ListFooter }  from '../components/ListFooter'

// External Lib
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LinearGradient}  from 'expo-linear-gradient'
import QRCode from 'react-native-qrcode-svg'
import constants from 'expo-constants'
import Icon from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'

export function HomeScreen( props ) {
  const navigation = useNavigation();

  useEffect( () => {
    if( !props.auth ) {
      navigation.reset( { index: 0, routes: [ {name: "Signup"} ]} )
    }  
  }, [props.auth] )



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
  const [ upListData, setUpListData ] = useState([])
  const [ compListData, setCompListData ] = useState([])
  const [ starting, setStarting ] = useState (true)
  const [ qrvalue, setQrvalue ] = useState('');
  const [ qrValueDate, setQrValueDate ] = useState('');


  // getters and setters for task done
  const [ markedItem, setMarkedItem ] = useState([])

  // using reference to implement the clear() method
  const txtInput = useRef()

  // Set input to empty string as a default state
  const [input, setInput] = useState('')

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
    let newSortedList = arr.sort (( item1, item2) => {
      return item2.id - item1.id
    })
    setUpListData(newSortedList)
  }

  // Insert the task at the top of the compListData by using sort() method
  const sortListCompleted = (arr) => {
    let newSortedList = arr.sort (( item1, item2) => {
      return item2.id - item1.id
    })
    setCompListData(newSortedList)
  }

  /* UseEffect Hook is use when there are changes in the object 
  declared inside the scope of the function itself*/
  useEffect( () => {
    sortListUpcoming(upListData)
    saveData()
    }, 
    [ upListData] )

  useEffect( () => {
    sortListCompleted(compListData)
    saveData()
    }, 
    [ compListData] )

  useEffect (() => {
    if (starting) {
      loadData()
      setStarting (false)
    }
  })


  /*Function declaration and definition to add input value to the upListData
  adding item to our upcoming list data*/
  const addItem = () => {

    // We use Timestamp to generate unique ID
    let newId = new Date().getTime()
    let newDate = new Date().getDate()
    let newMonth = new Date().getMonth() + 1;
    let newYear = new Date().getFullYear();
    let fullDate = newDate + '/' + newMonth + '/' + newYear
    let newItem = {id: newId, name: input, date: fullDate, status: false}
    let newList = upListData.concat( newItem )
    setUpListData(newList)
    txtInput.current.clear() // clear textbox after hitting the add button
  }

  // Function declaration and definition to delete task from upListData and compListData
  const deleteItem= ( itemId ) => {
    
    // find the item id as key then remove the value using filter() method
    const newList = upListData.filter( (item) => {
      if( item.id !== itemId ) {
        return item
      }
    })
    setUpListData( newList )

    const newListCompleted = compListData.filter( (item) => {
      if( item.id !== itemId ) {
        return item
      }
    })
    setCompListData( newListCompleted )
  }


  // Function declaration and definition to mark task as done
  const updateStatus = (itemId) => {
    let newUpdatedItem = ([])
    upListData.map ( (item) => {
    if (item.id === itemId) {
      return newUpdatedItem = { id: item.id, name: item.name, date: item.fullDate, status: true }
    }
      else {
        return item
      }
    })

    let newList2 = upListData.filter ((item) => {
    if (item.id !== itemId) { 
      return item
    }
    
    })
      // re-render uplistaData
      setUpListData(newList2)
      
      // set status as mark
      setMarkedItem(newUpdatedItem)
      let newCompletedList = compListData.concat( newUpdatedItem )
      
      // re-render compListData
      setCompListData(newCompletedList)
  }

// Function to generate QR code
const generateCode = (itemId) => {
  let newGeneratedItem = ([])
  upListData.map ((item) => {
    if (item.id === itemId) {
      return newGeneratedItem = { id: item.id, name: item.name, date: item.date, status: true }
    }
    else {
      return item
    }
  })
  setQrvalue( newGeneratedItem.name)
  setQrValueDate( newGeneratedItem.date )

}

// const indentSpacing =()=> {
//   let indent = concat( newItem )
//   let newList = upListData.concat( newItem )
// }


// Function to share QR code
let myQRCode = useRef();
const shareQRCode = () => {
  myQRCode.toDataURL((dataURL) => {
    console.log(dataURL);
    let shareImageBase64 = {
      title: 'React Native',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    Share.share(shareImageBase64).catch((error) => console.log(error));
  });
};

  // Function to render list of items in the array
  const renderItem = ({item}) => (
    // rendering our list of items(tasks)
    <ListItem item={item} remove={ deleteItem } update= {updateStatus} generateQRCode = {generateCode} /> 
  )

   // initialise function to set variable to desired useState.
   const Init = () => {
    setInput('')
    setQrvalue('')
    setQrValueDate('')
    
  }

  
    
  return (

    <View style={styles.homeContainer}>
      
       <LinearGradient 
        style={styles.box}
        colors={['blue', 'cyan']} 
        start={{ x: 1, y: 1 }}  
        end={{ x: 0, y: 0 }}
        />
      
      <View style={styles.QrCodeContainer}>
      
        <QRCode
          getRef={(ref) => (myQRCode = ref)}

          //QR code value
          // value={qrvalue ? qrvalue : 'NA'}
          value={[qrvalue, qrValueDate]}
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
        {/* Function button to share generated task */}
        <TouchableOpacity
          style={styles.shareButtonStyle}
          onPress={shareQRCode}>
          <Icon style={styles.shareButtonIcon} name="save"/>
          <Text style={styles.shareButtonTextStyle}>
            Share QR code
          </Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView>
      <View style = {styles.header}>
        <TextInput  style = {styles.input} 
          placeholder ='Enter task here...' 
          onChangeText={ (value) => setInput(value) }
          ref = {txtInput}
         />
      </View>

      <TouchableOpacity>   
        <Icon.Button name="pluscircleo" style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          disabled = { (input.length < 3) ? true : false }
          onPress={ () => {addItem(), props.add(), Init()}}>
        <Text style={ (input.length < 3) ? styles.buttonTextDisabled : styles.buttonText}>
          Add task
        </Text>
        </Icon.Button>
      </TouchableOpacity>

      <View style={styles.upcomingScreenContainer}>  
          <Text style={styles.upcomingScreen}> Upcoming task </Text>
      </View>
      <FlatList 
        data={upListData} // this holds th data for upListData
        keyExtractor={ (item)  => item.id } // definitive id fthat will serve as a key for an item
        renderItem=  {renderItem} // render all property of an item
        ItemSeparatorComponent={ ListSeparator } // separator for each tasks
        ListEmptyComponent= { ListEmpty } // For no items in the list
        ListFooterComponent= { ListFooter }// call the ListComponent component
      />

      <View style={styles.completedScreenContainer}>  
          <Text style={styles.completedScreen}> Completed task </Text>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}> Recently completed task </Text>
          <Text style={{fontSize: 10}}> {markedItem.name} </Text>
      </View>

      <FlatList 
        data={compListData} // this holds th data for upListData
        keyExtractor={ (item)  => item.id }
        renderItem=  {renderItem}
        ItemSeparatorComponent={ ListSeparator }
        ListEmptyComponent= { ListEmpty } // For no items in the list
        ListFooterComponent={ <ListFooter text="This is the end of task list" />}
      />

      </SafeAreaView> 
    </View>
  )
}

const styles = StyleSheet.create( {
  homeContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: constants.statusBarHeight,
    //backgroundColor: '#0bcdd4',

  },

  generateShareContainerEnabled: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
  },

  generateShareContainerDisabled: {
    flex:0,
  },

  box: {
        position: 'absolute',
        width: '100%',
        height: 800,
        opacity: 0.8,
      },

  upcomingScreenContainer: {
    alignItems: 'center', 
    margin: 5,
  },

  upcomingScreen: {
    fontSize: 18,
    fontWeight: 'bold',
    padding:5, 
    margin: 10,
  },

  completedScreenContainer: {
    alignItems: 'center', 
    margin: 5,
  },

  completedScreen: {
    fontSize: 18,
    fontWeight: 'bold',
    padding:5, 
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
    padding: 5,
    marginTop: 5,
  },

  shareButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
    borderRadius: 300,
    backgroundColor: 'cyan',
  },

  shareButtonIcon: {
    
    color:"white",
    
  },

  shareButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 10,
  },

  
   

} )