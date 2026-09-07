import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";

export default function BuyList() {
  const [list, setList] = useState([
    { id: '1', name: 'Arroz', quantity: 5, unit: 'kg', completed: false },
    { id: '2', name: 'Feijão', quantity: 3, unit: 'kg', completed: false },
    { id: '3', name: 'Macarrão', quantity: 2, unit: 'pct', completed: false },
  ]);

  const [list2, setList2] = useState([]);

  if (list.length === 0 && list2.length === 0) {
      return (
          <View style={styles.container}>
              <Image source={require('../../assets/images/cart.png')} style={styles.image} />
              <Text style={styles.title}>Nada na lista ainda</Text>
              <Text style={styles.text}>Escreva o primeiro item na barra abaixo. Fica salvo no aparelho, mesmo sem internet!</Text>
          </View>        
      );
  }
    
  return (
    <FlatList
        data={list}
        renderItem={({ item }) => (
            <View style={styles.itemCard}>
                <Pressable
                  style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
                  onPress={() => setList(currentList => currentList.map(listItem =>
                    listItem.id === item.id
                      ? { ...listItem, completed: !listItem.completed }
                      : listItem
                  ))}
                >
                  {item.completed && <Text style={styles.checkboxText}>✔</Text>}
                </Pressable>                     
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{item.quantity} {item.unit}</Text>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => setList(currentList => currentList.filter(listItem => listItem.id !== item.id))}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </Pressable>
            </View>
            )}
    />
  );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        width: '95%',  
        alignSelf: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.bg
      },
      image: {
        width: 100,
        height: 100,
        marginBottom: spacing.sm
      },
      title: {
        fontSize: 25,
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.sm
      },
      text: {
        fontSize: 17,
        fontWeight: 400,
        color: colors.text2,
        textAlign: 'center',
      },
      checkbox: {
        width: 26,
        height: 26,
        borderWidth: 2,
        borderColor: colors.text,
        backgroundColor: colors.surface,
        marginRight: 6,
        borderRadius: 999
      },
      checkboxCompleted: {
        backgroundColor: colors.acc,
        borderColor: colors.acc,
      },
      checkboxText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
      },
      itemCard: {
        flexDirection: "row",
        alignItems: "center",
        height: 64,
        width: '100%', 
        padding: 15,        
        marginBottom: 15,
        backgroundColor: colors.surface2,
        borderRadius: 8,
        gap: spacing.sm,
      },
      itemName: {
        fontSize: 18,
        fontWeight: 400,
        color: colors.text,        
      },
      itemQuantity: {
        fontSize: 17,
        fontWeight: 400,
        color: colors.text2,
        backgroundColor: colors.control,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 6,
        marginLeft: 'auto',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
      removeButton: {        
        padding: spacing.sm,
        backgroundColor: colors.removeBg,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      removeButtonText: {
        color: colors.remove,
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 10
      }
});