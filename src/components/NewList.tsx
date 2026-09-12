import { useEffect, useState } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../constants/theme";

type NewListProps = {
    active: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
    onAdd: (name: string) => void;
};

export default function NewList({ active, onActivate, onDeactivate, onAdd }: NewListProps) {
    const [name, setName] = useState("");
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillChangeFrame" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showSubscription = Keyboard.addListener(showEvent, (event) => {
            setKeyboardHeight(event.endCoordinates.height);
        });
        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function addList() {
        const trimmedName = name.trim();

        if (!trimmedName) {
            return;
        }

        onAdd(trimmedName);
        setName("");        
    }
    
    return (
        <Pressable
            style={[
                styles.container,
                active ? styles.activeContainer : styles.inactiveContainer,
                { bottom: insets.bottom + keyboardHeight + 10 },
            ]}
            onPress={onActivate}
        >
            <TextInput
                style={styles.input}
                onChangeText={setName}
                onPressIn={onActivate}
                onFocus={onActivate}
                onBlur={onDeactivate}
                value={name}
                placeholder="Nome da Lista"
                placeholderTextColor={colors.text2}
            />
            <Pressable style={[styles.addButton, active && styles.activeAddButton]} onPress={addList} >
                <Text style={[styles.buttonText, active && styles.activeButtonText]}>+</Text>
            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "row",        
        flexWrap: "wrap",
        left: 0,
        right: 0,        
        marginLeft: 20,
        marginRight: 20,
        zIndex: 2,
        height: 70,
        backgroundColor: colors.surface,        
        borderWidth: 2,
        borderRadius: 10,
        padding: spacing.sm,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    inactiveContainer: {
        borderColor: colors.surface2,
    },
    activeContainer: {
        borderColor: colors.acc,
    },
    input: {
        flex: 1,        
        minWidth: 120,
        color: colors.text,
        fontSize: 18,
        height: '100%'
    },
    addButton: {
        marginLeft: 'auto',
        marginBottom: 5,
        backgroundColor: colors.surface2,
        width: 50,
        borderRadius: 10,
        padding: spacing.lg,
        aspectRatio: 1,
        alignItems: 'center',
    },
    activeAddButton: {
        backgroundColor: colors.acc,
    },
    buttonText: {
        color: colors.text2,
        fontSize: 25,
        fontWeight: 700,
        lineHeight: 18
    },
    activeButtonText: {
        color: "#000",
    },
})