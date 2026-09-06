import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/theme";

export function BuyList() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionRotule}>Minha Lista</Text>
      <Text style={styles.title}>Compras da Semana</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"  
  },
  title: {
    fontSize: 31,
    fontWeight: 700,
    color: colors.text
  },
  sectionRotule: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.acc
  },
});