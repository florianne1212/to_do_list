import React from "react";
import { View } from "react-native";
import styled from "styled-components/native"; 

export default function TOdoList({item}) {
	return(
		<ComponentContainer>
			<ListContainer>
				<View>
					<TextItem>{item.value}</TextItem>
				</View>
			</ListContainer>
		</ComponentContainer>
	);
}

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-right: 20px;
  padding: 10px;

`;
