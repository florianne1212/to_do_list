import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, CheckBox, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {


  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  let myHeight = 50;

  const handleAddTask = () => {
    Keyboard.dismiss();
	setTaskItems([...taskItems, task])
	setSelection(true);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const [isSelected, setSelection] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

      </View>

      <View style={styles.items}>
        {
          taskItems.map((item, index) => {
            return (
				<View style={styles.item}>
				<View style={styles.itemLeft}>
					<View > 
					<BouncyCheckbox
						size={25}
						fillColor="#188078"
						iconStyle={{ borderColor: "#188078" }}
					/>
					</View>
				</View>
				<Text style={styles.text}>{item}</Text>
				<TouchableOpacity key={index} onPress={() => completeTask(index)}>
						<MaterialIcons name="delete" size={25} color="#188078" />
				</TouchableOpacity>
				</View>
            ) 
          })
        }
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTasksWrapper}
      >
        <TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>

          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
	item: {
		margin: "auto",
		marginLeft: 10,
		maxHeight: "80%",
		width: "95%",
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
		marginBottom: 20,
		overflow: "scroll"
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    text: {
		marginTop: "auto",
		width: "90%",
		height: "auto",
		
		fontSize: "20px",
		marginRight: "20px",
       
    },
  container: {
    flex: 1,
    backgroundColor: '#188078',

  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20

  },
  sectionTitle: {
	color: '#FFFFFF',
    fontSize: 24,
	fontWeight: 'bold'
  },
  items: {
	marginTop: 30,
	marginBottom: 85,
  },
  writeTasksWrapper : {
	width: "100%",
	backgroundColor: "#188078",
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input : {
	margin: 1,
    paddingVertical: 15,
	paddingHorizontal: 15,
	height: 50,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderwidth: 1
  },
  addWrapper: {
    width: 60,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderwidth: 1
  },
  addText: {}
});

