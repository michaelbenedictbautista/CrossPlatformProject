// Imported froim react
import { useState, useEffect } from 'react'

// Imported froim react-native
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';

export function EditScreen() {

  // function to observe for changes
  useEffect(() => {

    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var hours = new Date().getHours()
    var mins = new Date().getMinutes()
    var sec = new Date().getSeconds()
    setcurrentDate(
      date + '/' + month + '/' + year + '/' + hours + ':' + mins + ':' + sec
    )
    return () => {
    }

  }, [])

  return (

    <View style={styles.container}>

      <View style={styles.iconBackground}>
        <TouchableOpacity>
          <Image

            style={styles.backImage}

            source={require("../images/back.png")} />
        </TouchableOpacity>

        <Text style={{
          fontSize: 18
        }}>Create new task</Text>
        <TouchableOpacity>
          <Image
            style={styles.deleteImage}
            source={require("../images/delete.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.text

          }>Title</Text>
        </View><View style={{
          padding: 10
        }}>
          <TextInput style={styles.titleInput}
            placeholder='Wireframe Crossplatform project' />
        </View>

        <Text style={styles.text

        }>Due date</Text><View style={{
          padding: 10
        }}>
          <Text style={styles.dateInput}>

            {currentDate}
            <TouchableOpacity style={{
              position: 'absolute',
              right: 20,
              top: 22,
            }}>
              <Image style={styles.calendarIcon}

                source={require("../images/calendar.png")} />
            </TouchableOpacity>
          </Text>
        </View>

        <Text style={styles.text

        }>Description
        </Text><View>
          <TextInput style={styles.desInput}
            placeholder='Finish wireframe for to do list app' />

        </View>


        <View style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 10
        }}>

          <TouchableOpacity style={styles.cancelButton}>
            <Text>Cancel</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={{ color: '#FFF' }}>Save</Text>
          </TouchableOpacity>

        </View>


        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text>Go to Sign up</Text>
        </TouchableOpacity>


      </ScrollView>

      <View style={{
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>

        <View style={styles.navBackground}>
          <TouchableOpacity style={styles.navFormat}>
            <Image style={styles.navIcon}
              source={require("../images/home.png")}
            />
            <Text style={styles.navText}>
              Home
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.navFormat}>
            <Image style={styles.navAddIcon}
              source={require("../images/addTask.png")}
            />

            <Text style={styles.navAddText}>
              Add Task

            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.navFormat}>
            <Image style={styles.navIcon}
              source={require("../images/notification.png")}
            />

            <Text style={styles.navText}>
              Notification

            </Text>

          </TouchableOpacity>
        </View>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  iconBackground: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10

  },

  text: {
    paddingLeft: 10,
    fontSize: 18
  },

  backImage: {
    width: 17,
    height: 13,
    resizeMode: 'cover'
  },

  deleteImage: {
    width: 16,
    height: 16,
    resizeMode: 'cover'
  },

  titleInput: {
    height: 40,
    backgroundColor: '#F5F5FB',
    padding: 10,
    borderRadius: 5
  },
  dateInput: {
    height: 40,
    backgroundColor: '#F5F5FB',
    padding: 10,
    borderRadius: 5,
    position: 'relative'
  },

  desInput: {
    height: 100,
    backgroundColor: '#F5F5FB',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5

  },
  cancelButton: {
    paddingVertical: 5,
    height: 30,
    borderRadius: 15,
    borderColor: '#333',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginRight: 50
  },

  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#313DDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80

  },

  qrCodeButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#313DDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },

  navBackground: {
    backgroundColor: '#eee',
    height: 60,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  navIcon: {
    resizeMode: 'cover',
    width: 20,
    height: 20,
    marginBottom: 5
  },

  navText: {
    fontSize: 12,
    color: '#444'
  },
  navFormat: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navAddIcon: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    marginBottom: 60

  },
  navAddText: {
    fontSize: 14,
    color: '#444',
    position: 'absolute',
    transform: [{ translateX: 0 }, { translateY: 10 }],
    textAlign: 'center'
  },

  calendarIcon: {
    resizeMode: 'cover',
    width: 18,
    height: 18,
    marginLeft: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
