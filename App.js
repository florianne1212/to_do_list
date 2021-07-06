// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, StatusBar, FlatList, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import styled from "styled-components/native";
import AddInput from './components/AddInput';
import TodoList from './components/TodoList';

export default function App() {

  const [data, setData] = useState([]);

  const submitHandler = (value) => {
	  setData((prevTodo) => {
		  return[
			  {
				  value: value,
				  key: Math.random().toString(),
			  },
			  ...prevTodo,
		  ];
	  });
  }

  return (
	<ComponentContainer>
		<View>
			<StatusBar barStyle="light-content"
				backgroundColor="#ce4257"/>
		</View>

		<View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.key}
				renderItem={({item})=>(
					<TodoList item={item} />
				)}
			/>
			<View>
				<AddInput submitHandler={submitHandler} />
			</View>
		</View>
	</ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: #ce4257;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
