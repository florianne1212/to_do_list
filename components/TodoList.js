import React from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components/native"; 

export default function TOdoList({item, deleteItem}) {
	return(
		<ComponentContainer>
			<ListContainer>
				<CirlceContainer>
					<Entypo name="circle" size={20} color ="#ce4257"/>
				</CirlceContainer>
				<View>
					<TextItem>{item.value}</TextItem>
				</View>
				<IconContainer onPress={() => deleteItem(item.key)}>
					<MaterialIcons name="delete" sizr={24} color="#ce4257" />
				</IconContainer>
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

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;
  border-radius: 10px;
  width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;