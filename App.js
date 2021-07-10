import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, CheckBox, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';


export default function App() {

  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
	setTaskItems([...taskItems, task])
	setSelection(false);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const [isSelected, setSelection] = useState(false);

  const handleOnChange = () => {
    setSelection(!isSelected)
  };

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
						<CheckBox
							value={isSelected}
							onValueChange={setSelection}
							onPress={() => handleOnChange()}
							style={styles.checkbox}
						/> 
					</View>
					<Text style={styles.text}>{item}</Text>
				</View>
				<TouchableOpacity key={index} onPress={() => completeTask(index)}>
						<MaterialIcons name="delete" sizr={50} color="#188078" />
				</TouchableOpacity>
				{/* <View style={styles.circular}></View> */}
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
		height: 50,
		width: "95%",
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
		marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    text: {
		margin: 10,
        maxWidth: '60%'
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
  },
  writeTasksWrapper : {
    position: "absolute",
    bottom: 60,
	with: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input : {
	margin: 10,
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

