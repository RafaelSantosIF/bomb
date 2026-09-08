import AddBar from '@/src/components/AddBar';
import { Host, LinearProgressIndicator } from '@expo/ui/jetpack-compose';
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BuyList, { BuyItem } from "../../components/BuyList";
import { colors, spacing } from "../../constants/theme";

let listTitle = "Compras da Semana";
const list: BuyItem[] = [
  { id: '1', name: 'Arroz', quantity: 5, unit: 'kg', completed: false },
  { id: '2', name: 'Feijão', quantity: 3, unit: 'kg', completed: false },
  { id: '3', name: 'Macarrão', quantity: 2, unit: 'pct', completed: false }    
]; 

export default function List() {
  const [items, setItems] = useState<BuyItem[]>(list);

  function toggleItem(id: string) {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function removeItem(id: string) {
    setItems(currentItems =>
      currentItems.filter(item => item.id !== id)
    );
  }

  function addItem(item: Omit<BuyItem, 'id' | 'completed'>) {
    setItems(currentItems => [
      ...currentItems,
      {
        ...item,
        id: `${Date.now()}-${Math.random()}`,
        completed: false,
      },
    ]);
  }

  const pendingItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);
  
  if (items.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.sectionRotule}>MINHA LISTA</Text>
          <Text style={styles.title}>{listTitle}</Text>
          <View style={styles.container2}>
              <Image source={require('../../../assets/images/cart.png')} style={styles.image} />
              <Text style={styles.title2}>Nada na lista ainda</Text>
              <Text style={styles.text}>Escreva o primeiro item na barra abaixo. Fica salvo no aparelho, mesmo sem internet!</Text>
          </View>
          <AddBar onAdd={addItem} />
        </View>             
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionRotule}>MINHA LISTA</Text>
      <Text style={styles.title}>{listTitle}</Text>

      {completedItems.length > 0 && (
        <View style={styles.progressBar}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {pendingItems.length} pendentes
            </Text>
            <Text style={styles.progressText}>
              {completedItems.length} de {items.length} itens no carrinho
            </Text>
          </View>
          <Host style={styles.progressTrack}>
            <LinearProgressIndicator
              progress={completedItems.length / items.length}
              color={colors.acc}
              trackColor={colors.surface}
              drawStopIndicator={{stopSize: 0}}
            />
          </Host>          
        </View>
      )}

      {pendingItems.length > 0 && (
      <BuyList
        list={pendingItems}
        onToggle={toggleItem}
        onRemove={removeItem}
      />
      )}

      {completedItems.length > 0 && (
        <View style={styles.inCart}>
          <Text style={styles.completedTitle}>
            NO CARRINHO - {completedItems.length}
          </Text>
          <View style={styles.line} />
        </View>
      )}

      <BuyList
        list={completedItems}
        onToggle={toggleItem}
        onRemove={removeItem}
      />

      <AddBar onAdd={addItem} />
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 40,  
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    paddingBottom: 102,
    width: '100%',
    height: '100%',
    position: 'relative',    
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
    backgroundColor: colors.bg,
    marginBottom: 60,
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
    color: colors.acc,
    fontFamily: 'monospace',
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
  inCart: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.text3,
    marginRight: spacing.sm,   
  },
  line: {
    borderBottomColor: colors.text3,
    borderBottomWidth: 3,    
    marginVertical: 0,
    flex: 1,  
  },
  progressBar: {
    width: '100%',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xs,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.text2,
  },
  progressTrack: {
    width: '100%',
    height: 8,
  },
});
