import { Image, StyleSheet, Text, View } from "react-native";
import BuyList from "../../components/BuyList";
import { colors, spacing } from "../../constants/theme";

let listTitle = "Compras da Semana";

type BuyItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  completed: boolean;
};

type BuyListProps = {
  list: BuyItem[];
  list2: BuyItem[];
};

const list: BuyItem[] = [
    { id: '1', name: 'Arroz', quantity: 5, unit: 'kg', completed: false },
    { id: '2', name: 'Feijão', quantity: 3, unit: 'kg', completed: false },
    { id: '3', name: 'Macarrão', quantity: 2, unit: 'pct', completed: false },
  ]; 

const list2: BuyItem[] = [];

export default function List() {
  if (list.length === 0 && list2.length === 0) {
      return (
          <View style={styles.container2}>
              <Image source={require('../../../assets/images/cart.png')} style={styles.image} />
              <Text style={styles.title2}>Nada na lista ainda</Text>
              <Text style={styles.text}>Escreva o primeiro item na barra abaixo. Fica salvo no aparelho, mesmo sem internet!</Text>
          </View>     
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionRotule}>Minha Lista</Text>
      <Text style={styles.title}>{listTitle}</Text>
      <BuyList list={list} />
      <BuyList list={list2} />
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
  container2: {
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
  title2: {
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
});