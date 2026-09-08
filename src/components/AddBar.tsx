import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { colors, spacing } from "../constants/theme";
import { BuyItem } from "./BuyList";

type NewBuyItem = Omit<BuyItem, "id" | "completed">;

type AddBarProps = {
    onAdd: (item: NewBuyItem) => void;
};

const units = ["un", "kg", "cx", "pct"] as const;

export default function AddBar({ onAdd }: AddBarProps) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState<NewBuyItem["unit"] | null>(null);

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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Novo item..."
                placeholderTextColor={colors.text2}
            />

            <Pressable
                style={[styles.addButton, (!name.trim() || !unit) && styles.disabledButton]}
                onPress={addItem}
                disabled={!name.trim() || !unit}
            >
                <Text style={styles.buttonText}>+</Text>
            </Pressable>

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
        </View>            
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
        bottom: 10,
        marginLeft: 20,
        marginRight: 20,
        zIndex: 1,
        height: 130,
        backgroundColor: colors.surface,
        borderColor: colors.surface2,
        borderWidth: 2,
        borderRadius: 10,
        padding: spacing.sm,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
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
    disabledButton: {
        opacity: 0.45,
    },
    buttonText: {
        color: colors.text2,
        fontSize: 25,
        fontWeight: 700,
        lineHeight: 18
    }
})