import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Task(props, { index , completeTask }) {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.text}>{props.text}</Text>
            </View>
			<IconContainer key={index} onPress={() => completeTask(index)}>
					<MaterialIcons name="delete" sizr={24} color="#ce4257" />
			</IconContainer>
            {/* <View style={styles.circular}></View> */}
        </View>
       
    );
}

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    text: {
        maxWidth: '80%'


    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,

    },
});