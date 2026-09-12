import { useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { colors, spacing } from "../constants/theme";
import { BuyItem } from "./BuyList";

type NewListType = {
  id: string;
  name: string;  
  completed: boolean;
  values: BuyItem[];
};

type ListsProps = {
  lists: NewListType[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;  
  onOpen:   (list: NewListType) => void;
};

export default function AllLists ({lists, onRemove, onOpen}: ListsProps) {
    const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleCardPress(item: NewListType) {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
            onOpen(item);
            return;
        }

        clickTimeout.current = setTimeout(() => {
            clickTimeout.current = null;
        }, 250);
    }

    return (
        <FlatList
            style={{ flexGrow: 0 }}
            data={lists}
            renderItem={({ item }) => (
                <Pressable
                    style={[styles.itemCard, item.completed && styles.cardCompleted]}
                    onPress={() => handleCardPress(item)}
                >
                    <Text style={[styles.itemName, item.completed && styles.cardCompleted]}> {item.name} </Text> 

                    <Pressable
                        style={styles.removeButton}
                        onPress={() => onRemove(item.id)}
                    >
                    <Text style={styles.removeButtonText}>X</Text>
                </Pressable>                   
                </Pressable>                
            )}
        />
    )
}

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        height: 64,
        width: '100%', 
        padding: 15,        
        marginTop: 15,
        backgroundColor: colors.surface2,
        borderRadius: 8,
        gap: spacing.sm,
    },
    cardCompleted: {

    },
    itemName: {
        fontSize: 18,
        fontWeight: 400,
        color: colors.text
    },
    removeButton: {        
        padding: spacing.sm,
        backgroundColor: colors.removeBg,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginLeft: 'auto',
    },
    removeButtonText: {
        color: colors.remove,
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 10
    }
});

export type { ListsProps, NewListType };

