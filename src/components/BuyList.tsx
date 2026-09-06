import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";

export default function BuyList() {
    const list = [{ id: '1', name: 'Arroz', quantity: 5, unit: 'kg' }, { id: '2', name: 'Feijão', quantity: 3, unit: 'kg' }, { id: '3', name: 'Macarrão', quantity: 2, unit: 'pct' }];

    if (list.length == 0){
        return (
            <View style={styles.container}>
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
                    <View style={styles.checkbox}></View>                     
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>{item.quantity} {item.unit}</Text>
                    <View style={styles.removeButton}>
                        <Button onPress={() => list.splice(list.indexOf(item), 1)} title="X" color={colors.removeBg}/>
                    </View>
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
        width: '85%',  
      },
      title: {
        fontSize: 25,
        fontWeight: 700,
        color: colors.text,
        marginBottom: spacing.sm
      },
      text: {
        fontSize: 17,
        fontWeight: 400,
        color: colors.text2
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
      itemCard: {
        flexDirection: "row",
        alignItems: "flex-start",
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
        justifyContent: "space-between",
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
        marginLeft: 'auto',
        color: colors.remove,
      }
});