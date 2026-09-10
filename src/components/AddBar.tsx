import { useEffect, useState } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../constants/theme";
import { BuyItem } from "./BuyList";

type NewBuyItem = Omit<BuyItem, "id" | "completed">;

type AddBarProps = {
    active: boolean;
    onActivate: () => void;
    onAdd: (item: NewBuyItem) => void;
};

const units = ["un", "kg", "cx", "pct"] as const;

export default function AddBar({ active, onActivate, onAdd }: AddBarProps) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState<NewBuyItem["unit"] | null>(null);    
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const insets = useSafeAreaInsets();
    const canAdd = Boolean(name.trim() && unit);

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

    function addItem() {
        const trimmedName = name.trim();

        if (!trimmedName || !unit) {
            return;
        }

        onAdd({ name: trimmedName, quantity, unit });
        setName("");
        setQuantity(1);
        setUnit(null);
    }

    return (
        <Pressable
            style={[
                styles.container,
                active ? styles.activeContainer : styles.inactiveContainer,
                { bottom: insets.bottom + keyboardHeight + 15 },
            ]}
            onPress={onActivate}
        >
            <TextInput
                style={styles.input}
                onChangeText={setName}
                onFocus={onActivate}
                value={name}
                placeholder="Novo item..."
                placeholderTextColor={colors.text2}
            />

            <Pressable
                style={[styles.addButton, canAdd ? styles.enabledAddButton : styles.disabledButton]}
                onPress={addItem}
                disabled={!canAdd}
            >
                <Text style={[styles.buttonText, canAdd && styles.enabledButtonText]}>+</Text>
            </Pressable>

            {active && (
                <View style={styles.secondRow}>
                    <InputSpinner
                        style={styles.spinner}
                        skin="square"
                        rounded={true}
                        max={99}
                        min={1}
                        step={1}
                        colorRight={colors.surface2}
                        colorLeft={colors.surface2}
                        textColor={colors.text}
                        background={colors.surface2}
                        color={colors.surface2}
                        colorAsBackground={true}
                        inputStyle={styles.spinnerInput}
                        value={quantity}
                        onChange={(value) => setQuantity(Number(value))}
                    />

                    <View style={styles.units}>
                        {units.map((option) => (
                            <Pressable
                                key={option}
                                style={[styles.unit, unit === option && styles.selectedUnit]}
                                onPress={() => setUnit(option)}
                            >
                                <Text style={[styles.unitText, unit === option && styles.selectedUnitText]}>
                                    {option}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        left: 0,
        right: 0,        
        marginLeft: 20,
        marginRight: 20,
        zIndex: 1,
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
        height: 130,
        borderColor: colors.acc,
    },
    input: {
        flex: 1,
        minWidth: 120,
        color: colors.text,
        fontSize: 16,
    },
    secondRow: {
        flexDirection: "row",
        alignItems: "stretch",
        gap: spacing.xs,
        marginTop: spacing.xs,
        width: "100%",
    },
    spinner: {
        flex: 1,
        backgroundColor: colors.surface2,
        marginRight: 3
    },
    spinnerInput: {
        backgroundColor: colors.surface2,
    },
    units: {
        flex: 2,
        flexDirection: "row",
        gap: spacing.xs,
    },
    unit: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 34,
        backgroundColor: colors.control,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 6,
    },
    selectedUnit: {
        backgroundColor: colors.acc,
        borderColor: colors.acc,
    },
    unitText: {
        color: colors.text2,
        fontWeight: "600",
    },
    selectedUnitText: {
        color: colors.bg,
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
    enabledAddButton: {
        backgroundColor: colors.acc,
    },
    disabledButton: {
        opacity: 0.45,
    },
    buttonText: {
        color: colors.text2,
        fontSize: 25,
        fontWeight: 700,
        lineHeight: 18
    },
    enabledButtonText: {
        color: "#000",
    },
})