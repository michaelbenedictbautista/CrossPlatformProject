// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ImageBackground, Image, Text, View } from 'react-native'
import { TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useRef} from 'react'
import constants from 'expo-constants'
import { ListItem } from './components/ListItem'
import { ListSeparator } from './components/ListSeparator'
import { ListEmpty } from './components/ListEmpty'
import { ListFooter } from './components/ListFooter'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function App() {

  // Local storage for saving and loading state
  const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,
  
    /* Use AsyncStorage for RN apps, or window.localStorage for web apps.
    If storageBackend is not set, data will be lost after reload.*/
    storageBackend: AsyncStorage, // for web: window.localStorage
  
    /*expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // we set the the deualtExpiration to null*/
    defaultExpires: null,
  
    // enable cache data in our memory
    enableCache: true,
  
  });


// Hard coded task
  const upcomingList = [
    { id: '1', name: 'First application', status: false},
    { id: '2', name: 'Application presentation', status: false},
    { id: '3', name: 'Final Application submission', status: false},
  ]

  const completedList = [
    { id: '01', name: 'Draft proposal', status: false},
    { id: '02', name: 'Wireframe layout', status: false},
    { id: '33', name: 'Mockup design', status: false},
  ]

// Application state
const [upListData, setUpListData] = useState(upcomingList)
const [compListData, setCompListData] = useState(completedList)
const [ starting, setStarting ] = useState ( true)

// using reference to implement the clear() method
const txtInput = useRef()

// Set input to empty string as a default state
const [input, setInput] = useState('')


// Function definition and declaration for saving and loading data from local storage
const saveData = () => {
  storage.save({
    key: 'localListData', // Note: Do not use underscore("_") in key!
    data: JSON.stringify(upListData)
  });  
}

const loadData = () => {
storage
.load({
  key: 'localListData',
})
  .then((data) => {
    setUpListData(JSON.parse(data))
  })
}

// Insert the task at the top of the list by using sort() method
const sortList = (arr) => {
  let newSortedList = arr.sort (( item1, item2) => {
    return item2.id - item1.id
  })
  setUpListData(newSortedList)
}

 /*useEffect Hook is use when there are changes in the object 
 declared inside the scope of the function itself*/
 useEffect( () => {
  sortList(upListData)
  saveData()
  }, 
  [ upListData] )


useEffect (() => {
  if (starting) {
    loadData()
    setStarting (false)
  }
})

// This function determine an update tou our array.
const updateStatus = (itemID) => {
  let newList = upListData.map ( (item) => {
   if (item.id === itemID) {
     return { id: item.id, name: item.name, status: true}
   }
     else {
       return item
     }
   })
     setUpListData (newList)
   }


/*Function declaration and definition to add input value to the upListData 
adding item to our upcoming list data*/
const addItem = () => {
  //console.log ('Pressed'); // Testing only
  // Timestamp to generate unique ID
  let newId = new Date().getTime()
  let newItem = {id: newId, name: input, status: false}
  let newList = upListData.concat( newItem )
  setUpListData(newList)
  txtInput.current.clear()
}


/*Function declaration and definition to delete input value to the upListData 
adding item to our upcoming list data*/ 
const deleteItem = ( itemId ) => {
  // find the item id
  // remove item with the id from array (ListData)
  const newList = upListData.filter( (item) => {
    if( item.id !== itemId ) {
      return item
    }
  })
  // setListData( new array )
  setUpListData( newList )
}



// Function to render list item
const renderItem = ({item}) => (
  // <View style={ [styles.listItem, styles.listBackground] }>
  //   <Text style={styles.listText}> {task.name} </Text>   
  // </View>
  <ListItem item={item} remove={ deleteItem } update= {updateStatus} />
  )

  return (
    <View style={styles.container}>

      <View style = {styles.header}>
        <TextInput  style = {styles.input} 
          onChangeText={ (value) => setInput(value) }
          ref = {txtInput}
        />
        
        <TouchableOpacity 
          style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          onPress={ () => addItem()} 
          disabled = { (input.length < 3) ? true : false }
        >
    
        <Text style= {(input.length < 3) ? styles.buttonTextDisabled : styles.button}> Add </Text>
        </TouchableOpacity>

      </View>

      <FlatList 
        data={upListData}
        keyExtractor={ (item)  => item.id }
        renderItem=  {renderItem}
        ItemSeparatorComponent={ ListSeparator }
        ListEmptyComponent= { ListEmpty } // For no items in the list
        ListFooterComponent={ <ListFooter text="This is the end of task list" />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: constants.statusBarHeight,
    backgroundColor: '#0bcdd4',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    
  },
  listItem: {
    padding: 10,
  },
 ////=========to be modified======////
  listText: {
    fontSize: 20,
  },

  listBackground: {
    backgroundColor: 'white',
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

  button: {
    backgroundColor: '#00ff00',
    padding: 5,
  },

  buttonText: {
    fontSize: 20,
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },

  buttonTextDisabled: {
    backgroundColor: '#ccc',
  }
});
