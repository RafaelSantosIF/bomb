import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

const list = []

export function BuyList() {
    if (list.length == 0){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Nada na lista ainda</Text>
                <Text style={styles.text}>Escreva o primeiro item na barra abaixo. Fica salvo no aparelho, mesmo sem internet!</Text>
            </View>        
        );
    }    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '85%',  
      },
      title: {
        fontSize: 25,
        fontWeight: 700,
        color: colors.text
      },
      text: {
        fontSize: 17,
        fontWeight: 400,
        color: colors.text2
      },
});