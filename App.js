// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ImageBackground, Image, Text, View } from 'react-native'
import { TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useState } from 'react'
import constants from 'expo-constants'
import { ListTask } from './components/ListTask'



export default function App() {

  const upcomingList = [
    { id: '1', name: 'First application', status: false},
    { id: '2', name: 'Application p[resentation', status: false},
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

// Set input to empty string as a default state
const [input, setInput] = useState('')

/*Function declaration and definition to add input value to the upListData 
adding item to our upcoming list data*/

const addTask = () => {
  //console.log ('Pressed'); // Testing only
  // Timestamp to generate unique ID
  let newId = new Date().getTime()
  let newTask = {id: newId, name: input, status: false}
  let newList = upListData.concat( newTask )
  setUpListData(newList)
  
}

// Function to render list item
const renderItem = ({item}) => (
  // <View style={ [styles.listItem, styles.listBackground] }>
  //   <Text style={styles.listText}> {task.name} </Text>   
  // </View>
  <ListTask item = {item} />
)

  return (
    <View style={styles.container}>

      <View style = {styles.header}>
        <TextInput  style = {styles.input} onChangeText={ (value) => setInput(value) }/>
        <TouchableOpacity 
          style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          onPress={ () => addTask()} 
          // onChangeText= { () =>setInput('')}
          disabled = { (input.length < 3) ? true : false }>
    
          <Text style= {(input.length < 3) ? styles.buttonTextDisabled : styles.button}> Add </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={upListData}
        keyExtractor={ (task)  => task.id }
        renderItem=  {renderItem}
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
