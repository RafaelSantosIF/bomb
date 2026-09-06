import { View } from "react-native";
import { BuyList } from "./(tabs)/buyList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BuyList />     
    </View>
  );
}
