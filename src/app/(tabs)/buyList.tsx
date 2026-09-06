import { StyleSheet, Text, View } from "react-native";
import BuyList from "../../components/BuyList";
import { colors, spacing } from "../../constants/theme";

export default function List() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionRotule}>Minha Lista</Text>
      <Text style={styles.title}>Compras da Semana</Text>
      <BuyList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: spacing.xl,  
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 31,
    fontWeight: 700,
    color: colors.text,
    marginBottom: spacing.md
  },
  sectionRotule: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.acc
  },
});