import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";


export default function AddInput({submitHandler}) {

	const [task, setTask] = useState("");

	return(
		<ComponentContainer>
			<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
			<InputContainer>
				<Textadd placeholder={"Write a task"} onChangeText={text => setTask(text)} />
			</InputContainer>
			<SubmitButton 
					onPress={() => {
						setTask(submitHandler(task));
					}}
			>
					<Text>+</Text>
			</SubmitButton>

			</KeyboardAvoidingView>
		</ComponentContainer>
	)
}

const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Textadd = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;
