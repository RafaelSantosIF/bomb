import { View } from "react-native";
import List from "./(tabs)/buyList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: '100%',        
        backgroundColor: '#A3E635',
      }}
    >
      <List />     
    </View>
  );
}
