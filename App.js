// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ImageBackground, Image, Text, View, SafeAreaView } from 'react-native'
import { TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useRef} from 'react'
import constants from 'expo-constants'
import { ListItem } from './components/ListItem'
import { ListSeparator } from './components/ListSeparator'
import { ListEmpty } from './components/ListEmpty'
import { ListFooter } from './components/ListFooter'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from 'expo-linear-gradient';




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
  // const upcomingList = [
  //   { id: '1', name: 'First application', status: false},
  //   { id: '2', name: 'Application presentation', status: false},
  //   { id: '3', name: 'Final Application submission', status: false},
  // ]

  // const completedList = [
  //   { id: '01', name: 'Draft proposal', status: false},
  //   { id: '02', name: 'Wireframe layout', status: false},
  //   { id: '33', name: 'Mockup design', status: false},
  // ]

// Application state
const [ upListData, setUpListData ] = useState([])
const [ compListData, setCompListData ] = useState([])
const [ starting, setStarting ] = useState (true)

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

// Insert the task at the top of the list by using sort() method
const sortListUpcoming = (arr) => {
  let newSortedList = arr.sort (( item1, item2) => {
    return item2.id - item1.id
  })
  setUpListData(newSortedList)
}

// Insert the task at the top of the list by using sort() method
const sortListCompleted = (arr) => {
  let newSortedList = arr.sort (( item1, item2) => {
    return item2.id - item1.id
  })
  setCompListData(newSortedList)
}

 /*useEffect Hook is use when there are changes in the object 
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
  //console.log ('Pressed'); // Testing only
  
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

// Function declaration and definition to delete task from upListData
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
    setUpListData(newList2)
    
    //setUpListData(newList)

    setMarkedItem(newUpdatedItem)
    let newCompletedList = compListData.concat( newUpdatedItem )
    
    setCompListData(newCompletedList)
   }

// // Function declaration and definition to mark task as done
// const updateStatus = (itemId) => {
//   let newItem1 = []
//   let newList = upListData.map ( (item) => {
//    if (item.id === itemId) {
    
//      return newItem1 = { id: item.id, name: item.name, status: true
      
//     }
//    }
//      else {
//        return item
//      }
//    })

//    let newCompList = compListData.concat( newItem1 )
//      setCompListData(newCompList)
  
//    }


// Function to render list of items in the array
const renderItem = ({item}) => (
  // First method of rendering
  // <View style={ [styles.listItem, styles.listBackground] }>
  //   <Text style={styles.listText}> {item.name} </Text> 
  //   <Text style={styles.listText}> {item.id} </Text> 
  // </View>

  // Second method of rendering
  <ListItem item={item} remove={ deleteItem } update= {updateStatus} /> 
 
  )


  const Init = () => {
    setInput('')
    //setMarkedItem({deleteItem }) 
  }


  return (
    
    <View style={styles.container}>
      
      <View>
        <LinearGradient 
        colors={['blue', 'cyan']} 
        start={{ x: 1, y: 1 }}  
        end={{ x: 0, y: 0 }}
        style={styles.box} />
      </View>

      <View style = {styles.header}>
        <TextInput  style = {styles.input} 
          placeholder ='Enter task here...' 
          onChangeText={ (value) => setInput(value) }
          ref = {txtInput}
        />
        
        {/* <TouchableOpacity 
          style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          disabled = { (input.length < 3) ? true : false }
          onPress={ () => {addItem(), Init()}}
          
        >
    
        <Text style= { (input.length < 3) ? styles.buttonTextDisabled : styles.buttonText}> 
          Add 
        </Text>
        </TouchableOpacity> */}

      </View>
  
    
      <TouchableOpacity>   
        <Icon.Button name="pluscircleo" style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          disabled = { (input.length < 3) ? true : false }
          onPress={ () => {addItem(), Init()}}>
          <Text style={ (input.length < 3) ? styles.buttonTextDisabled : styles.buttonText}>
            Add task
          </Text>
        </Icon.Button>
      </TouchableOpacity>

        <View style={styles.upcomingScreenContainer}>  
          <Text style={styles.upcomingScreen}> Upcoming task </Text>
        </View>

      <FlatList 
        data={upListData}
        keyExtractor={ (item)  => item.id }
        renderItem=  {renderItem}
        ItemSeparatorComponent={ ListSeparator }
        //extraData={[getCurrentDate, status]}
        ListEmptyComponent= { ListEmpty } // For no items in the list
        ListFooterComponent= { ListFooter }// call the ListComponent component

        // Overriding method
        // ListFooterComponent={ <ListFooter text="End of task list" />}
  
      />

      <View style={styles.completedScreenContainer}>  
          <Text style={styles.completedScreen}> Completed task </Text>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}> Recently completed task </Text>
          <Text style={{fontSize: 10}}> {markedItem.name} </Text>
      </View>

      <FlatList 
        data={compListData}
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
    justifyContent: 'center',
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

});
