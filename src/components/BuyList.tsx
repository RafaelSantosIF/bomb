import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import type { BuyItem } from "../app/(tabs)/buyList";
import { colors, spacing } from "../constants/theme";

type BuyListProps = {
  list: BuyItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function BuyList({ list, onToggle, onRemove }: BuyListProps) {  
  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={list}
      renderItem={({ item }) => (
        <View style={[styles.itemCard, item.completed && styles.cardCompleted]}>
          <Pressable
            style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
            onPress={() => onToggle(item.id)}
          >
            {item.completed && <Text style={styles.checkboxText}>✔</Text>}
          </Pressable>

          <Text style={[styles.itemName, item.completed && styles.cardCompleted]}>
            {item.name}
          </Text>
          <Text style={[styles.itemQuantity, item.completed && styles.cardCompleted]}>
            {item.quantity} {item.unit}
          </Text>
          
          <Pressable
            style={styles.removeButton}
            onPress={() => onRemove(item.id)}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </Pressable>
        </View>
      )}
    />
  );
    
}

const styles = StyleSheet.create({              
      checkbox: {
        width: 26,
        height: 26,
        borderWidth: 2,
        borderColor: '#4B5058',
        backgroundColor: colors.surface2,
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
      cardCompleted: {
        backgroundColor: colors.buy,
        color: colors.text3,
        textDecorationLine: 'line-through',
      },
      itemName: {
        fontSize: 18,
        fontWeight: 400,
        color: colors.text,        
      },
      itemQuantity: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: 'monospace',
        color: colors.text2,
        backgroundColor: colors.surface,
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