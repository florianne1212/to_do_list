import { MaterialIcons } from "@expo/vector-icons";
import uuidv1 from 'uuid/v1';
import React, { Component } from 'react'
import { StyleSheet, Text, View,ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, FlatList  } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash'

export class  HomeTodo extends Component {


	state = {
		todos: {},
		isDataReady: false,
		filter: 'Todo',
		text: ''
	}

	componentDidMount = () => {
		this.loadTodos()
	}

	onChangeText = text => {
		this.setState({ task: text })
	}

	loadTodos = async () => {
		try {
			const getTodos = await AsyncStorage.getItem('todos')
			const parsedTodos = JSON.parse(getTodos)
			this.setState({ isDataReady: true, todos: parsedTodos || {} })
		} catch (err) {
			alert('Application Error. Cannot load data.')
		}
	}

	addTodo = newTask => {
		//debugger
		const newTodoItem = this.state.task

		if (newTodoItem !== '') {
			this.setState(prevState => {
				const ID = uuidv1()
				const newToDoObject = {
					[ID]: {
						id: ID,
						isChecked: false,
						textValue: newTodoItem,
						createdAt: Date.now()
					}
				}
				const newState = {
					...prevState,
					todos: {
						...prevState.todos,
						...newToDoObject
					}
				}
				this.saveTodos(newState.todos)
				return { ...newState }
			})
		}
	}

	deleteTodo = id => {
		this.setState(prevState => {
			const todos = prevState.todos
			delete todos[id]
			const newState = {
				...prevState,
				...todos
			}
			this.saveTodos(newState.todos)
			return { ...newState }
		})
	}

	inCompleteTodo = id => {
		this.setState(prevState => {
			const newState = {
				todos: {
					...prevState.todos,
					[id]: {
						...prevState.todos[id],
						isChecked: false
					}
				}
			}
			this.saveTodos(newState.todos)
			return { ...newState }
		})
	}

	completeTodo = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				todos: {
					...prevState.todos,
					[id]: {
						...prevState.todos[id],
						isChecked: true
					}
				}
			}
			this.saveTodos(newState.todos)
			return { ...newState }
		})
	}


	saveTodos = newToDos => {
		const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos))
	}

	onPressFab = () => {
		this.props.navigation.navigate('AddTask', {
			saveItem: this.addTodo
		})
	}

	filteredItems = () => {
		return this.state.todos
	}

	toggleItem = (id, checked) => {
		if (checked) {
			this.inCompleteTodo(id)
		} else {
			this.completeTodo(id)
		}
	}

  render() {
		return (
		<View style={styles.container}>
		<View style={styles.tasksWrapper}>
			<Text style={styles.sectionTitle}>Today's tasks</Text>

		</View>

		<FlatList
					data={_.values(this.filteredItems())}
					contentContainerStyle={styles.content}
					renderItem={row => {
						return (

							<View style={styles.item}>
							<View style={styles.itemLeft}>
							 	<View > 
							 	<BouncyCheckbox
							 		size={25}
							 		fillColor="#188078"
									iconStyle={{ borderColor: "#188078" }}
									onPress={() => this.toggleItem(row.item.id, row.item.isChecked)}
									isChecked={row.item.isChecked}
							 	/>
							 	</View>
							</View>
							<Text style={styles.text}>{row.item.textValue}</Text>
							<TouchableOpacity onPress={() => this.deleteTodo(row.item.id)}>
							 		<MaterialIcons name="delete" size={25} color="#188078" />
							</TouchableOpacity>
							</View>
						)
					}}
					keyExtractor={item => item.id}
		/>
		<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.writeTasksWrapper}
		>
			<TextInput style={styles.input} placeholder={"Write a task"} value={this.state.task} onChangeText={this.onChangeText} />

			<TouchableOpacity onPress={this.addTodo}>
			<View style={styles.addWrapper}>
				<Text style={styles.addText}>+</Text>

			</View>
			</TouchableOpacity>

		</KeyboardAvoidingView>
		</View>
	);
	}
}

const styles = StyleSheet.create({
	item: {
		margin: "auto",
		marginLeft: 10,
		maxHeight: "80%",
		width: "95%",
		maxWidth: "95%",
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
		width: "75%",
		height: "auto",
		fontSize: 20,
		marginRight: 20
    },
	container: {
		flex: 1,
		overflow: "scroll",
		backgroundColor: '#188078',
	
	  },
	  tasksWrapper: {
		paddingTop: 60,
		paddingHorizontal: 20
	
	  },
	  sectionTitle: {
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20
	  },
	  items: {
		marginTop: 30,
		marginBottom: 85,
	  },
	  writeTasksWrapper : {
		width: "100%",
		backgroundColor: "#188078",
		position: "absolute",
		height: 90,
		bottom: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	  },
	  input : {
		margin: 1,
		marginBottom: 5,
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
		marginBottom: 5,
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

export default HomeTodo